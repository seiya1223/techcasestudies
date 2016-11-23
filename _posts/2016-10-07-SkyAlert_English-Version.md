---
layout: post
title:  "An IoT solution to improve and expand the SkyAlert seismic warning system"
author: "Amin Espinoza"
author-link: "#"
#author-image: "{{ site.baseurl }}/images/authors/photo.jpg"
date:   2016-11-23
categories: IoT
color: "blue"
#image: "{{ site.baseurl }}/images/imagename.png" #should be ~350px tall
excerpt: The most important action for a seismic warning system is to send alerts as quickly and accurately as possible. Microsoft worked with SkyAlert to devise an IoT solution for improving and expanding their earthquake alert system.
language: English
verticals: Public Sector
---

The most important action for a seismic warning system is to alert users as quickly as possible. An added value is to be able to alert with some precision on the intensity of the coming earthquake and to withhold alerts from areas where it will not be felt. Microsoft teamed up with SkyAlert to help them improve and expand their alert system using an IoT solution. 

 
## Customer ##
The SkyAlert platform is the only one in the world that will alert you and advise you on what to do before, during, and after an earthquake. It specializes in real-time reporting on seismic and volcanic issues. It detects, processes, and sends earthquake alert notifications through its own devices.
 
## Pain point ##

SkyAlert currently delivers alerts to a satellite and is limited by the coverage offered. Being at the center of Mexico, the transmission is made in the form of a broadcast that sometimes reaches devices that should not receive the alert. Nor is there confirmation of the alert being received because there is no bidirectional communication.

If a user’s device doesn’t receive alerts, or if service is interrupted, the solution has a “keep alive” function to know when a user device is not connected to the system.
 
## Solution ##

The plan was to implement a smart device with an Internet connection, which would expand coverage. In addition, the use of components in the cloud for IoT could achieve bidirectional communication, real-time data processing, analysis information, and implementation of machine learning predictive models, making SkyAlert the world's most comprehensive and intelligent seismic alert system.

## Architecture ##

This architecture diagram represents the three main logical blocks of the solution where the “Device connectivity” layer shows how user devices connect to Azure Services such as IoT Hub and Event Hub. The “Data processing” layer represents all the logical components to process, store, analyze, and manage data. And the “Presentation layer” shows dashboards and control panels for device monitoring, device management, telemetry data, and general user information. 

![Architecture]({{ site.baseurl }}/images/Architecture.png)


### Device data model ###

SkyAlert implements a solution for consumer IoT devices. That is why the parameters that identify a device will change to what is most used in the industry. We have to add certain fields to identify which user is associated with the device. The metadata that identifies each device is as follows:

1. Device properties
2. Commands
3. Object type
4. IoT Hub properties

The first field involves the unique device ID that identifies it, data such as creation date, device status, firmware version, type of connection (LAN, WLAN), MAC address, IP address, hardware model, user that has been logging on, status of the query, length, region to which it belongs within the geographic zones to alert, connection status, and a field that helps identify when the last metadata was updated.

Commands are a way of expressing messages that may include certain parameters, to be sent to the devices. Each device can have different commands, according to the needs of the users. However, all share the alert, test, and deployment of messages. 

The Object type helps us to process the data in the stream processors. This helps us determine if it is an object of type metadata, telemetry, or alerts. And more specifically, it helps us to know if it is a device of production, development, or testing.

The properties of the IoT Hub involve data that is created with the help of the registry manager, and stored in the device data model for administrative purposes within our device portal.

The data model looks as follows:

```javascript
{
  "DeviceProperties": {
    "DeviceID": "SAB0000019",
    "HubEnabledState": true,
    "CreatedTime": "2016-08-24T17:23:10.9749565Z",
    "DeviceState": "normal",
    "UpdatedTime": "2016-10-14T18:43:11.6277444Z",
    "DeviceModel": "530U3C/530U4C",
    "OsVersion": "10.0.14393.222",
    "FirmwareVersion": "1.2.17.0",
    "ConnectionType": "LAN",
    "WIFI_MAC": "wifi_mac",
    "EthernetMAC": "ethernet_MAC",
    "SubscriptionStatus": "status",
    "UserId": "emilio_ramos_v@hotmail.com",
    "Latitude": 19.183887597173452,
    "Longitude": -96.14198380149901,
    "Region": "Puebla Capital",
    "ConnState": "Connected"
  },
  "Commands": [],
  "id": "34c97b7f-c8bc-4cfd-abd0-96024d523b96",
  "ObjectType": "dev-DeviceInfo",
  "IoTHub": {
    "MessageId": null,
    "CorrelationId": null,
    "ConnectionDeviceId": "SAB0000019",
    "ConnectionDeviceGenerationId": "636076562383161122",
    "EnqueuedTime": "0001-01-01T00:00:00",
    "StreamId": null
  }
}
```

### Data stream ###

The SkyAlert devices send different types of packages, according to the data that needs to be reported. They are segmented into four types:

1. Metadata
2. Streams
3. Alerts
4. Records

![Datastreams]({{ site.baseurl }}/images/DataStreams.png)


Each of these are messages that are sent to the cloud, but they have separate functions. The metadata is sent every time there is a change in the properties of the device—that is, each change to position, network, user logon, restarting, deleting, and so on.

The second parameter is a packet that is sent every 5 minutes to report the temperature, pressure, and humidity read by the device.

Alerts are packets that are sent as they are activated. They occur only when the gas or fire sensors detect a gas leak or fire. The packet sends only the notification of the detection of an event. Each sensor is preconfigured with certain threshold levels. When those levels are exceeded, the alarm is triggered and the packet is sent.

The records are historical information gathered about a particular seismic event. The accelerometer is activated only at the moment the device is alerted about the possible arrival of an earthquake. At that moment the device begins to save all the information recorded on the event and, upon completion, a packet is sent with the data collected on it.

The first three are sent to stream processors that take real-time actions on them and help us connect them with other services within the architecture, where they will be processed. The fourth, because it is only historical data, is stored to be used for data analysis in the future.


### Device connectivity ###

![Device connectivity]({{ site.baseurl }}/images/DeviceConnectivity.png)


SkyAlert devices are designed to connect via a WLAN. Each device has the ability to work with the IP protocol, which gives us many advantages in terms of connectivity solutions because we do not need to use a field gateway—we do a direct connection between the devices and the gateway in the cloud. Raspberry Pi 3 is used as the IoT device hardware running Windows 10 IoT Core.

Within the services of Azure we find the IoT Hub very well-suited to our needs. It allows us to have bidirectional communication in a safe way, with the robustness to connect millions of devices.

The connection process is done using the Azure IoT device SDKs, particularly for the Windows platform. We establish the connection with the AMQP protocol, which gives us many advantages, such as secure communication, working with poor bandwidth, and robustness, which allows us to send millions of messages.

### Device provisioning, identity, registry, and state ###

The provisioning is done from our administration portal through the API and Azure IoT Hub devices SDK. The processes involved in provisioning are the registration, removal, activation, and deactivation of the devices. When the provisioning process is performed, the registration and identity of the devices is managed by Azure IoT Hub, allowing us to generate custom IDs and assigned keys automatically. We worry only about saving the metadata of each device in a DocumentDB collection where we store the identity of the devices, with the metadata that is related to each of them. We store it in JSON format, with the device data model shown above.

For SkyAlert, it is very important to save a log with all the changes that can be generated in the device, mainly its connection status with the IoT Hub. Taking advantage of the device state store of the IoT Hub, we check the connection status of each device enabled. If there is any change with respect to the previously reported status, it is stored.

A WebJob is responsible for performing this process. It constantly checks the current connection status and compares it to a previously stored one. If the connection status changes for the device, two actions are executed: first, the current status is registered in DocumentDB and second, a new log is stored in Azure Blob storage


### Data flow and stream processing ###

Azure Stream Analytics is a tool that helps us with the flow of data. Practically all the information we collect goes through a work of Stream Analytics. The telemetry arrives from the devices to the IoT Hub and passes through Stream Analytics to be stored in Azure Blob storage.

The metadata goes through the same process. However, its destination is an Event Hub, which takes them to a WebJob that will be in charge of updating the document that corresponds to the device associated with such metadata. Logs are passed directly from each device to a Blob storage.

All of this is on the part of the user devices. But we also collect information from the sensors that are responsible for the detection of earthquakes. They are constantly sensing what is happening in their location and taking readings of seismic activity. This data arrives at the SkyAlert seismic detection network, where it is processed, but at the same time, a fork causes the readings to be sent through an Event Hub.

The data of the sensors that travel through the Event Hub arrives at a work of Stream Analytics that connects it with two outputs under certain business rules. The first one is storage, where each log that arrives is taken to a file in Azure Blob storage. The second is a Machine Learning job, only for data that has exceeded the thresholds established in the rules of Stream Analytics.

There is another communication channel through the Event Hub: REDSSA processes the sensor data and determines which devices should receive an alert message. These messages, preprocessed by REDSSA, arrive via an Event Hub to a WebJob where a query is made to devices that need to be alerted and the message is sent to them.

To use the devices, each user must have an account within the SkyAlert platform. Data such as username, password, other personal information, the device with which the account is associated, and payment information are stored in a SQL Database within the Microsoft Azure services.

### Security ###

Using Azure IoT Hub, we can manage device identities, which helps us to secure messages. Based on documentation about security from this cloud component, we found the following:

- The communication path between devices and Azure IoT Hub, or between gateways and Azure IoT Hub, is secured using industry-standard Transport Layer Security (TLS) with Azure IoT Hub authenticated using X.509 protocol.
- In order to protect devices from unsolicited inbound connections, Azure IoT Hub does not open any connection to the device. The device initiates all connections.
- Azure IoT Hub durably stores messages for devices and waits for the device to connect. These commands are stored for two days, enabling devices connecting sporadically due to power or connectivity concerns to receive these commands. Azure IoT Hub maintains a per-device queue for each device.

This perfectly fit our needs in data transmission, so that data such as telemetry and alerts can travel across the IoT Hub securely from device to cloud.

The same thing happens when we send data from cloud to devices, using the security protocols offered by the Azure IoT Hub and the messaging acknowledgment system. We can get delivery confirmation even when a message is not sent by our system so that we can identify when a false alarm has been sent from an unknown source.

User data is encrypted for the authentication process for device metadata. We only encrypt userId so that is the unique field. In this datamodel that relates a device with user information, we have to protect as much as possible. We don’t find the need to encrypt the other metadata since we see a safe way of transport in the IoT Hub and it is safely stored in the DocumentDB.

In case of earthquake alerts, we have a confirmation system. Actually, this system is REDSSA (Red de Sensores Sismicos SkyAlert), reading data from sensors and processing information in order to deliver alerts about potentially dangerous earthquakes.

In case of gas and fire alarms, they have a hardware and software adjusted threshold so that the only way to trigger an alert is by exceeding the threshold. The sensors can have a margin of error and a risk of false alarms.


### Solution UX ###

There are two parts within the user experience. The first is a UWP app running on Windows 10 IoT core, where the user can log on to receive the services of the SkyAlert platform. On the screen, they can see a weather forecast, device sensor readings, seismic alert logs, and volcano status.

Starting screen

![Home screen]({{ site.baseurl }}/images/Home.PNG)

Earthquake screen

![Sismos]({{ site.baseurl }}/images/Sismos.PNG)

Weather screen

![Storm]({{ site.baseurl }}/images/Storm.PNG)

Volcano screen

![Volcano]({{ site.baseurl }}/images/Volcanes.PNG)

The second part is the administration portal, which is based on the Azure App Service. A website developed in ASP.NET MVC 5, where users are registered, administers the provisioning, messages, logs, and activity of the devices. It consists of four fundamental elements:

1. Device Monitoring
2. Device Administration
3. Telemetry
4. Users

The monitoring of the devices is through a map, with colored dots indicating which devices are connected to the IoT Hub and which are not. Monitoring this helps with contacting customers to let them know of potential problems with their device or network connection.

Because the portal has two levels of access—administrator and users—the dashboard deploys administrators to all devices per zone while users deploy the devices associated with their account alone.

![Dashboard]({{ site.baseurl }}/images/dashboard.PNG)

Device management is what allows you to create, delete, enable or disable devices, create a massive and personalized way for our production line, generate files with keys and encrypted to be embedded directly in the application of the dispositives. Telemetry allows us to view temperature, pressure, and humidity data by device, by region or in general of all data coming from devices. 

And the users section lets us manage payments as well as how the devices are associated with registered users.

### Data analytics ###

On the other hand, data analysis is done through a dataset we designed. This dataset consists of five fields: place of earthquake, intensity of earthquake in shindo, intensity of wave P in Wales, intensity to alert, places to alert.

With the combination of the clusters where the sensors are located, the range of intensities that can be thrown by the sensors in shindo and Wales for the P wave, we obtain a fixed dataset of approximately 4,000 rows.

This is evaluated by a predictive model in Azure Machine Learning, supported by a boosted decision tree. It becomes a temporary solution as the dataset of historical values grows. These historical values that are planned to be evaluated in the future are earthquakes presented with their respective intensity and places that were affected.

We have two datasets that compose the predictive model: the readings of the SkyAlert sensors stored in Blobs and the accelerometer registers of the devices also stored in the same service. Together they make a relation output for the dataset to evaluate in the next predictive model.


## Device used and code artifacts

The entire platform of the device runs on a Raspberry Pi 2 with Windows 10 IoT core version 14393, and runs a universal headed application. We use the I2C connection to connect to the following sensors:

1. Temperature + pressure + humidity
2. Accelerometer
3. Microcontroller

We also use a serial communication for a Zigbee module which in turn communicates wirelessly with gas and smoke sensors.

It uses a 7-inch capacitive TFT touchscreen and a pair of speakers for playback of alerts. Everything is assembled on a printed circuit board that includes a voltage regulating stage to power the audio amplifier, Raspberry, and screen.

![Device]({{ site.baseurl }}/images/Device.png)

The device is also able to triangulate its location through an API for geolocation using the Wi-Fi networks that are around it. In turn, it also consumes a weather API to give reports on the temperature and humidity of its city, forecast by days and time. SkyAlert has services in the cloud where images of the volcanos Popocatépetl, Iztaccíhuatl, and Colima are stored, retrieved through a URL and deployed in the application. Also, the historical data of the most recent earthquakes is stored and we recover them in the same way to be deployed.


## Opportunities going forward ##

With many geographically distributed devices collecting information on climate, earthquake intensity information becomes extremely valuable as it can be the most extensive database on weather and earthquake data, allowing us to create predictive models to give more accurate notice and to send earthquake warnings in a personalized way to each device.

It can also offer more complete civil protection solutions for buildings, industrial buildings, schools, and so on, with fire and gas sensors distributed throughout the facilities and with storm forecasting and seismic alerts.


## Conclusion ##

This seismic warning system is one of only four such systems that exist worldwide, alongside those belonging to the Japanese, Mexican, and Israeli governments. The solution, which can sound an alarm of up to 2 minutes in advance of an earthquake, offers users not only real-time information regarding existing risk levels, but also affords the opportunity to interact with other individuals and create a community of contacts through which help can be requested or provided in emergency situations. 

SkyAlert's solution will cover 100 percent of the areas under seismic risk in Mexico while providing alert services to more than 50 million Mexicans.

<!-- Contents -->
[architecture]: /images/Architecture.png "Architecture"
[Home]: /images/Home.PNG "Home"
[Sismos]: /images/Sismos.PNG "Sismos"
[Storm]: /images/Storm.PNG "Storm"
[Volcanes]: /images/Volcanes.PNG "Volcanes"
[dashboard]: /images/dashboard.PNG "Dashboard"
[device]: /images/Device.png "Block Diagram"
[datastreams]: /images/DataStreams.png "Data Streams"
[deviceconnectivity]: /images/DeviceConnectivity.png "Device Connectivity"
