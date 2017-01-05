---
layout: post
title:  "Building a sustainable, scalable solution with Geratriz to measure utility use at shopping malls"
author: "João Almeida"
author-link: "http://github.com/joalmeid"
#author-image: "{{ site.baseurl }}/images/edp/edp01.png"
date:   2017-01-05
categories: IoT
color: "blue"
#image: "{{ site.baseurl }}/images/edp/edp02.png" #should be ~350px tall
excerpt:  Geratriz offers a platform to measure water and energy consumption at shopping malls. The company worked with Microsoft and ComOn to improve the platform's reliability and resilience while reducing operational costs. 
language: English
verticals: [Energy, Smart Cities, Facility Management, Smart Building]
---



Geratriz offers a platform to measure utility consumption at shopping malls, information that is important to facility managers. The company worked with Microsoft and ComOn to improve the platform's reliability and resilience while reducing operational costs. This in turn will help Geratriz offer a viable platform internationally.

## Customer profile ##

<img src="{{ site.baseurl }}/images/geratriz/geratriz02.png" width="300">


[*Geratriz*](https://geratriz.pt/) has extensive experience and a large business presence in the water and energy sectors. With offices in Portugal, Turkey, and Peru, it offers technical engineering services that provide innovative and efficient solutions. 

Research and development are at the root of its work. It has a multidisciplinary team of engineers (chemical, environment, electrical, and mechanical) that coordinates several other teams composed of electromechanics, electricians, welders, locksmiths, mechanics, analysts, and others who complement all areas covered in the industries they serve.

<img src="{{ site.baseurl }}/images/geratriz/geratriz03.png" width="300">


[*ComOn*](http://www.comon.pt/) is a partner focused on user marketing, with technical expertise gained through key engagements with top companies in Portugal and abroad. More than a full-service agency, ComOn has invested in key segments with a startup spirit. It has an engineering team focused on cloud projects but also on Internet Of Things (IoT). 

**The team:**

- João Almeida – Senior Technical Evangelist, Microsoft Portugal
- Luis Calado – Principal Technical Evangelist, Microsoft Portugal
- José Lima – Senior Researcher, Geratriz
- Carlos Quadrado – Development Lead, ComOn 
- Carlos Simões – Senior Developer, ComOn

![The team]({{ site.baseurl }}/images/geratriz/geratriz05.jpg)


## Energy and water data monitoring within shopping malls ##

Large shopping centers operate in a competitive market where they must manage multiple physical facilities. Utility consumption at these facilities has become a massive operational variable. Usage is impacted by evolving consumer habits, changes in climate, and the emergence of open energy markets.

Each shopping mall needs to collect and analyze consumption metrics, always seeking efficiency-detecting consumption anomalies while managing contracts with suppliers and reducing costs. To do this, it is necessary to gauge and compare various buildings' utility consumption, understand the environmental and building projects, and be able to segment by different types of consumption. 

Predicting consumption for every utility also allows planning for peak needs, reducing consumption penalties and enhancing the ability to negotiate with suppliers. It is important to achieve near-real-time capabilities in reporting because it provides temporal and financial comparison capabilities.

![Energy Reader]({{ site.baseurl }}/images/geratriz/geratriz04.jpg)


## WeMeter ##

Geratriz offers its customers (shopping mall chains) a solution with its [*WeMeter*](http://geratriz.pt/en/content/company/all-in-one-monitoring-and-management-utility/) platform. This is a web platform for an all-in-one building utility management, targeting large buildings and facilities. It provides access to simple and intuitive dashboards from any computer or smartphone. It tracks, manages, and controls electricity, water, and gas consumption. By generating effective reports with complex data and charts with rich and customizable content, it democratizes trend analysis and forecasting.

Customers can access historical consumption data for water and energy through predefined or customized reports in units of measure (kWh/m3) or currency (Euros). The tool was also developed for provisional calculation, which customers can make using very accurate methods. They can make future estimates of the various monitored consumptions with significantly reduced margins of error.

This solution was initially made available two years ago, but the outcomes were not as expected. Geratriz faced performance and scalability issues, as well as high maintenance costs with the hardware. In addition, WeMeter was built on a different cloud platform that didn't provide a clear architectural framework and foundation around IoT or ready-made services to plug into IoT solutions. Geratriz quickly started looking for a sustainable, scalable solution and was open to further investments.

Businesswise, Geratriz had strong short-term goals to globalize WeMeter through its international customers. However, it recognized a need to bring greater confidence to the platform before investing abroad.

### Hardware deployment and maintenance ###

Geratriz's solution, the WeMeter platform, required an analysis process throughout its customers' facilities. The main reason was the need to install hardware that corresponded to a set of previously identified technical requirements.

- Electrical installations required certified technicians for installation of energy and/or water readers.
- The dispersion of readers by buildings varies on a case-by-case basis, having an impact on the number of devices required.
- The communication between devices and Internet connectivity varies per building layout (fire protection doors and thick walls).
- Device maintenance required on-site physical presence. Inability to perform basic maintenance tasks remotely.
- High costs inherent to the acquisition, installation, and maintenance of devices.
- Connectivity established through proprietary TCP protocols, in an insecure way.

### Scalability and resilience ###

The WeMeter solution offered poor scalability and resiliency features, both in data ingestion and processing. With only a few medium-sized buildings, Geratriz was faced with the need to guarantee the correct data collection through parameterizations in the devices. Often it was necessary to resend huge amounts of data persisted in the devices, due to the lack of connectivity with its platform. Processes provided by the device to send data via FTP were used.

The current data processing workflow required data to pass through different cloud providers and processing of individual collected data records. This processing executed temporal aggregations and data classification by type and costs. Therefore, processing one month of data could take three weeks of manual supervised execution. This had tremendous impact on the availability of data to customers, offering no real value. Operating in an open market causes price variations, which often required reprocessing historical data, with a huge operational cost.

### Security ###

Safety was one of the identified requirements from the beginning. After recent news about the use of IoT devices for DDOS attacks, Geratriz decided to carefully understand the security specifications and capabilities throughout the current solution. Several exploitable failures were identified, as well as basic operational security flaws. As such, several areas of concern were stated as basic requirements for this project: device deployment, device connectivity, and cloud-based solutions. All of these areas would have to be addressed in the new solution.

## Business case ##

Having near real-time data in the WeMeter platform is key for Geratriz's business and the company was aware that fundamental changes had to be implemented through cloud data services, recognized as strong "big data" solutions. One of Geratriz's objectives was to investigate a new hardware architecture that would lower installation and maintenance costs, providing a more standardized approach to easing the product evolution through the following years. 

Also, international partners from Geratriz are researching less intrusive ways to measure water/energy, so there was a need to follow a standard implementation. Looking at the data platform, Geratriz needed a mature pipeline to process all collected data and plan for larger volumes of data coming from new customers and bigger physical installations.

With these goals in mind, the Geratriz research team worked closely with ComOn and Microsoft to align the technology solution with all of the identified requirements that could offer business value to the organization.

## Solution ##

Given the challenges posed by Geratriz, it would be necessary to find a solution focusing on high reliability and resilience while reducing operational costs.

-  The hardware architecture had to allow a larger numbers of utility readers to be connected in order to centralize computation in the shopping mall technical areas. The WeMeter device, based on Raspberry Pi 3, was created. The requirements described scenarios where a single device should support around 100 energy readers and 5 water readers, located relatively close, allowing wired connectivity to be considered. During this project, with a single Raspberry Pi 3, tests were done with 22 devices through the four USB ports, with an RS-485 to USB converter with an FTDI chipset. The prices of these devices are quite low. For water readers, the market currently focuses on non-intrusive readers capable of emitting electrical pulses per specific volume of water. Integration with Raspberry Pi 3 is done through a [*PiFace Digital*](http://www.piface.org.uk/products/piface_digital_2/) shield, which is also widely adopted by the community. The PiFace shield allows the entry of 8 digital inputs, allowing for installation of up to a maximum of 8 different water readers per WeMeter device.

-  Ease of installing a WeMeter device was crucial. The goal was to be executed with minimal effort from the Geratriz engineering teams, delegating to field technicians but also allowing remote validation and configuration. The fact that the energy readers are connected in serial to a USB cable and then to the Raspberry Pi 3 drastically reduces the installation complexity. Simultaneously, we identified the need to remotely change the configuration of the WeMeter device, and this was achieved through IoT Hub's device management capabilities.

-  Possibility of creating appropriate casing for an industrial scenario was also a relevant requirement. The high adoption of a Raspberry Pi 3 and communities like [*3D Hubs*](https://www.3dhubs.com/) will make it possible to prototype casings, while targeting reduced costs. 

-  The Internet connection was made via Wi-Fi. The approach uses Geratriz's own Wi-Fi networks due to security reasons. The acquisition of GPRS-based USB dongles is a highly interesting scenario given the maturity of the products presented nowadays by telecom operators. Even today there are data volume-based data plans, making it easier for Geratriz to negotiate and manage data plans from a business perspective.

-  Having a WeMeter front end in final development phases, the data model was still associated with the old device architecture.

### Technical solution ###

Focusing the technical solution on the device architecture to be used in each facility, the following table summarizes the solution found and tested:

| Component                  | Provider        | Details                                                                     | Description  |
|----------------------------|-----------------|----------------------------------------------------------------------------------|----------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------|
| Energy Counter             | Algodue elettronica | [*UEM1P5 Mid Energy Counter*](http://algodue.it/eng/uem1p5.html)    | 4 DIN modules energy counter for the energy measurement in industrial and civilian application, with built-in communication, according to the models RS485 Modbus RTU/ASCII, M-Bus or Ethernet Modbus TCP. |
| Energy Counter             | Kael Elektronik Ltd | [*ENERGY-02-DIN Energy Counter*](http://www.kael.com.tr/eng/pdf/ENERGY-02%20POWER-01%20eng.pdf)    | Device monitors the total active energy (ΣkWh) of the three phases by metering AC RMS mains voltage and RMS mains current. |
| Water Counter              | ZENNER International GmbH & Co. KG | [*MTKD-N-I*](http://www.zenner.com/product_categories/category/water-meters_multi-jet_dry-dial/product/products_water-meters_mtkd.html) | MTKD is a multi-jet dry dial meters for cold potable water, with 7- or 8-digit rollers for different pulse values and retrofittable with mechanic pulser. Standard pulse value 100 l/pulse. For consumption measuring of cold potable water up to 50° C and approved in accordance with MID.|
| WeMeter Device             | Raspberry Pi Foundation | [*Raspberry Pi 3 Model B*](https://www.raspberrypi.org/products/raspberry-pi-3-model-b/)    | The Raspberry Pi is a card-sized single-board computer, with an A1.2GHz 64-bit quad-core ARMv8 CPU and 802.11n Wireless LAN, 4 USB ports and 40 GPIO pins, besides other features. |
| ModBus/USB Converter       | FTDI Chip       | [*USB-RS485 Converter Cables*](http://www.ftdichip.com/Products/Cables/USBRS485.htm)    | The USB-RS485 cable is a USB to RS485 levels serial UART converter cable incorporating FTDI’s FT232RQ USB to serial UART interface IC device that handles all the USB signaling  and protocols. The cable provides a fast, simple way to connect devices with a RS485 interface to USB. |
| GPIO Add-on board          | OpenLX SP Ltd   | [*PiFace Digital 2*](http://www.piface.org.uk/products/piface_digital_2/)    | The PiFace digital is a GPIO add-on board for the Raspberry Pi that allows you to connect lights, switches, motors and sensors to be used with programs written with Scratch, Python, C or JavaScript. |
| Wi-Fi USB Dongle            | Meo / ZTE       |  [*ROUTER 3G 21.6 Mbps  - ZTE MF65*](https://conteudos.meo.pt/meo/Documentos/Manuais/Routers/ZTE-MF65-Manual.pdf) | ZTE MF65 is a 3G mobile Wi-Fi HotSpot working in GSM/GPRS/EDGE/WCDMA/HSPA+ network. Connectable via USB or Wi-Fi interface. With HSDPA 21Mbps downlink, quad-band GSM and tri-band UMTS. |
| Azure Cloud                | Microsoft       | [*Microsoft Azure IoT Services*](https://azure.microsoft.com/en-us/develop/iot/) | The Azure cloud is used to provide all back-end and business intelligence functions including device registration, security, data ingestion, real time analytics, storage, and display. |

![WeMeter Workbench]({{ site.baseurl }}/images/geratriz/geratriz06.png)


### Architecture ###

In this section, we detail the architecture implemented, describing the components and how they were used. Two isolated areas with different characteristics were identified. Here we present the architecture details for the WeMeter device and the Microsoft Azure-based back end.

#### Architecture - WeMeter device ####

The WeMeter device was envisioned and tested to integrate with multiple energy and water readers. The main goal was to assemble a device with low operational costs and easily extensible to accommodate different reader vendors. The development should focus on rapid prototyping.

#### WeMeter device

The WeMeter device was designed to reduce costs and meet the requirements in data reading from utility counters. This led us to a final design based on Raspberry Pi 3, mostly due to the native Wi-Fi capabilities. In the scenario of shopping malls, Wi-Fi networks are usually available in the buildings, but for security reasons the network would be guaranteed by a 3G Wi-Fi router, managed by Geratriz itself. This way, the network used is controlled and based on a contracted and managed data plan. Additionally, to most utility readers, they are deployed in technical zones where a single 3G router can provide connectivity to several WeMeter devices.

![WeMeter Device]({{ site.baseurl }}/images/geratriz/geratriz15.png)


A special note on security is mandatory. After evaluating several possibilities, the main focus was on the WeMeter device and cloud connection. Geratriz decided not to rely on its customers' Wi-Fi, even if available. All energy counters will be connected to their own Wi-Fi dongles. 

- Deployment analysis and planning will require a GPRS mapping to all devices.
- All devices will use secure Wi-Fi, provisioned by Geratriz.
- The only protocols allowed to connect with Azure IoT Hub are AMQP and HTTP secure tunnel.
- The WeMeter device was built as a stateless device. No data is kept in local storage. Access configuration to IoT Hub is encrypted using [*crypto-js npm package*](https://www.npmjs.com/package/crypto-js).

**Energy monitoring**

Energy monitoring was designed based on the energy reader's output. As an industry practice, there are several readers that allow access to data based on the [*RS-485 protocol*](https://en.wikipedia.org/wiki/RS-485) / [*Modbus*](https://en.wikipedia.org/wiki/Modbus). RS-485 is used as the physical layer underlying many standard and proprietary automation protocols used to implement Industrial Control Systems, including the most common versions of Modbus.

With FTDI's [*RS485 to USB Converter*](http://www.ftdichip.com/Products/Cables/USBRS485.htm), it was possible to drastically reduce the device's installation complexity. Each Raspberry's USB input allows us to serial connect up to a maximum of 256 power meters (limited by the Modbus protocol). Each energy meter is identified by an ID, on which all Modbus queries are executed.

The WeMeter device software was developed in NodeJS, given its great agility and support by the community. It was through packages like
[*Serial port npm*](https://www.npmjs.com/package/serialport) that USB access was implemented, while Modbus was supported by package [*modbus-rtu npm*](https://www.npmjs.com/package/modbus-rtu) that provided the API to access the energetic readings from the appliances.

Geratriz works mainly with two types of energy readers (from KAEL and Algodue vendors) and both have different characteristics in their data structure and use of Modbus protocol. For example, Algodue data records are 32 bits and KAEL 16 bits. This required building the WeMeter device code taking extensibility requirements into consideration. In the future using different energy readers, they will easily implement specific logic, making it easy to jump into new markets supporting several energy readers.

***Serial port initialization and reading Modbus data***

One of the most relevant parts was to read Modbus data from the serial connection to the energy readers. Here we show a small snippet from initialization and queries made through the Modbus protocol.

```javascript
    self.initialize=function(callback){
        wemeterMessage = wemeterMessagePrototype(config);
        wmUsb = new wmSerial(config,{logger: options.logger},constants);

        var tasks = [ 
            wmUsb.InitializeSerialPorts,
            function(cb){
                //get Port
                wmUsb.getActivePort(function(err,portResponse){
                    port = portResponse;
                    cb(err, portResponse);
                });
            } 
        ];

        async.series(tasks, callback);
    }

    self.ReadModbusData= function( deviceIndex, reading, callback) {
        numReads++;
        
        wmUsb.ports[port].modbus.readHoldingRegisters(deviceIndex, reading.registry, reading.length).then(function (data) {

            var curReading = { type: reading.type, value: ieee754.uint16ToFloat32(data[1],data[0]), unity:reading.unity}
            wemeterMessage.payload.push(curReading);

        }, function (err) {
            if(options.logger) options.logger.error('[ReadModbusData]['+config.type+'_'+config.Index+'] ' + err.name + '::' + err.message);
            callback(err);
        })
    }
```

**Water monitoring**

Water readers are nowadays commercialized, capable of doing Pulse collecting readings based on electric pulses—it is currently the industry standard. As such we turned to PiFace Digital to take advantage of the digital inputs and detect pulses from the readers. The PiFace Digital allows a total of 8 digital inputs that in this case correspond to water readers. Using the npm package
[*piface-node*](https://www.npmjs.com/package/piface-node), it was possible to detect pulses, stating a specific volume of water consumption. Usually these devices emit pulses in volumes of 1L, 10L or even 100L. Relying on our WeMeter device configuration, we can support several readers from different vendors. The installation process was also kept extremely simple.

Finally, it is important to describe how the entire WeMeter device configuration is based on a single JSON configuration file. This file identifies and describes all utility readers from IDs to enable the Modbus readings of the effective data to be read. The vision was to reduce the deployment process: provision the operating system [*Raspbian*](https://www.raspbian.org/), the WeMeter device software, and the configuration files. Raspberry Pi persistent storage is based on SD cards. 

### Architecture – cloud back end ###

The cloud back-end architecture, within WeMeter's platform, aims to achieve high levels of scalability and agility in extensibility for any international market. As such, an implementation was followed in accordance with the [*Azure IoT Reference Architecture*](http://download.microsoft.com/download/A/4/D/A4DAD253-BC21-41D3-B9D9-87D2AE6F0719/Microsoft_Azure_IoT_Reference_Architecture.pdf). In this architecture, requirements like near-real time and time-based sliding-window aggregations were key factors, while segmenting data between types of utilities and the areas/buildings in a customer facility. Data ingestion was prioritized in the project and [*Azure IoT Hub*](https://azure.microsoft.com/en-us/services/iot-hub/) was used and identified as a key piece.

![WeMeter Cloud Backend]({{ site.baseurl }}/images/geratriz/geratriz14.png)


**IoT Hub**

Azure IoT Hub is a cloud service that enables you to ingest data from a high number of devices while allowing you to do and implement device management. In the WeMeter platform, each device is registered in the provisioning phase in each project/customer (shopping mall). This provisioning phase includes also determining what data each device is collecting. This is done through device configuration where device identification, utilities description, and data collection are declared (from energy and water readers). The main goal is to guarantee the date ingestion from monitored utilities, namely Water volume, Phase 1 voltage (V), Phase 2 voltage (V), Phase 3 voltage (V), active energy (Wh), reactive energy (VArh), Power Factor (PF) and three phase voltage (V3ph).

The data format is JSON-based, as exemplified below, and is ingested using AMQP protocol through a secure encrypted tunnel. Using NodeJS as core technology to implement the WeMeter device, the integration with IoT Hub was easily implemented using [*Microsoft Azure IoT device SDK for Node.js*](https://github.com/Azure/azure-iot-sdks/blob/master/node/device/readme.md).

```json
[{
    "id": "DeviceEmulatorWeMeter",
    "msgId": "5334465e-a8ba-d888-d4d3-6fbf685f9800",
    "date": "2016-10-28T11:23:55.279Z",
    "payload": [{
        "type": "VPh1",
        "value": 401.5230712890625,
        "unity": "V"
    }, {
        "type": "VPh2",
        "value": 401.5230712890625,
        "unity": "V"
    }, {
        "type": "VPh3",
        "value": 401.5230712890625,
        "unity": "V"
    }, {
        "type": "Wh",
        "value": 401.5230712890625,
        "unity": "Wh"
    }, {
        "type": "VArh",
        "value": 401.5230712890625,
        "unity": "VArh"
    }, {
        "type": "PF",
        "value": 401.5230712890625,
        "unity": ""
    }, {
        "type": "w",
        "value": 401.5230712890625,
        "unity": "V3ph"
    }]
}]
```

**Stream Analytics**

We used [*Azure Stream Analytics*](https://azure.microsoft.com/en-us/services/stream-analytics/), directly integrated with IoT Hub, to process the stream of data being ingested by the devices. We were able to create multipurpose data aggregations, based on the different needs that were previously identified.

![Azure Stream Analytics configuration]({{ site.baseurl }}/images/geratriz/geratriz07.png)


One of the Stream Analytics jobs, named wmStreamAnalytics, allowed redirection of the data to an Event Processor, a Service Bus queue-based implementation. The approach is described in the tutorial [*Process-to-cloud messages*](https://docs.microsoft.com/en-us/azure/iot-hub/iot-hub-csharp-csharp-process-d2c). This process allowed us to invoke the WeMeter APIs to access business rules and customer deployment information: facility, buildings, areas, devices, and configurations.

**Storage**

A workflow was defined whose purpose would be data processing/aggregation, according to the business rules identified by Geratriz, based on its knowledge of utilities consumption. A cold path has been defined that stores data from all devices in a Blog storage (binary large object). The information remains in the same original JSON format sent by the WeMeter devices. This component's main goal is to be the source input to all processing data implementations. For example, to include historical data into the pipeline and/or integrate with third-party solutions.

As short-term plans, the implementation of an HD Insight cluster is a priority. It would allow aggregations by hour, day, week, and year and (re)calculate the consumption costs based on contractualized unitary utility prices. It is important to mention that there may be changes in the tariffs, making some data processing important.

**WeMeter web API**

This component is a REST API initially developed to support WeMeter's front end. However, as part of an intermediary phase, the data processing logic was also incorporated inside the web API. This last feature was gradually migrated for the Stream Analytics data processing pipeline.

This API was developed with Javascript (ECMA 2015) using [*Microsoft Visual Studio Code*](https://code.visualstudio.com), by a heterogeneous (Windows and macOS) and experienced team. Agile development was key to team efforts and organization, and highly valued by stakeholders. As tooling, [*Visual Studio Team Services*](https://www.visualstudio.com/team-services/) was used to implement continuous integration and continuous deployment to the Azure cloud platform, namely with [*Azure App Service*](https://azure.microsoft.com/en-us/services/app-service/).

**WeMeter web front end**

The WeMeter project had started earlier based on a different IoT/cloud implementation. There was strong investment in the web front end, and development was in advanced stages. This web app was built with the customer experience as a major priority. Geratriz was able to get feedback from early discussions with shopping mall management teams. That input was tremendously important and allowed for creation of a focused, objective, and still simple front end.

The WeMeter front end was developed taking modern web standards into account, focusing on cross-platform/cross-browser use. Similar to the API, the development was based on Javascript (ECMA 2015) using [*Microsoft Visual Studio Code*](https://code.visualstudio.com), [*Visual Studio Team Services*](https:/www.visualstudio.com/team-services/) and [*Azure App Service*](https://azure.microsoft.com/en-us/services/app-service/).

In the UI perspective, WeMeter allows a given customer to have a holistic view of a given facility, evidencing the various utilities monitored throughout all buildings and type of utilities:

![WeMeter - Consumption by utility type]({{ site.baseurl }}/images/geratriz/geratriz08.png)


For each utility, it is possible to see the respective consumption over time, for all devices individually or by building area. Crossing with utilities types it became possible to have very detailed insights of the consumption patterns, helping to understand them. This was considered the most important achievement toward anomaly detection and predictive maintenance scenarios.

![WeMeter - Energy Total Consumption]({{ site.baseurl }}/images/geratriz/geratriz09.png)


![WeMeter - Water Total Consumption]({{ site.baseurl }}/images/geratriz/geratriz10.png)


Given that each facility is usually managed by large teams, it is possible to do analysis per area of consumption. The consumption is classified by utility type, distinguishing, for example, between lighting or HVACs.

![WeMeter - Consumption by building areas]({{ site.baseurl }}/images/geratriz/geratriz11.png)


![WeMeter - Energy consumption]({{ site.baseurl }}/images/geratriz/geratriz12.png)


## Conclusions ##

The main goal of the WeMeter project was to define a solution for the data ingestion and device architecture, considering the pre-identified requirements.

![WeMeter blackboard]({{ site.baseurl }}/images/geratriz/geratriz13.png)


The initial phase began with procurement work around devices already available on the market. Connectivity requirements allowed exploration of IoT [*star*](https://en.wikipedia.org/wiki/Star_network) and [*mesh*](https://en.wikipedia.org/wiki/Mesh_networking) architectures, described exhaustively on the Internet, especially around IoT reference architectures. Protocols such as Wi-Fi, Bluetooth (BLE), ZigBee, Z-Wave, SigFox or LoRaWan were considered. The need to achieve a near-real-time solution and the volume of data ruled out SigFox or LoRa. The low cost and flexibility of a Wi-Fi 3G router were the main reasons for the option taken. Keeping internationalization in mind, the fact that Wi-Fi 3G routers are mature commercial solutions in most countries was also a determinant.

The option to use Raspberry Pi for computing was linked with the strong community support and the possibility of using several operating systems with different runtimes. In this case the team skills were relevant around NodeJS, making Raspbian a very interesting operating system. The efforts by the development community allowed rapid results using protocols like Modbus or digital pulses for water monitoring.

Nowadays, one can rely on the [Azure IoT Partner Catalog](http://azureiotpartners.azurewebsites.net) to find the best devices and partners. Through this online tool, it's possible to evaluate specs and features from various devices and find vendors/partners.

Other relevant conclusions from the device's procurement:

- The ability to connect via USB (4 inputs) several energy counters in serial.
- The ability to detect the pulses of water meters and read consumption, based on simple configuration.
- The ability to communicate via Wi-Fi, natively, having complete control over the security configuration of the Wi-Fi networks.
- The ability to connect several WeMeter devices on a single 3G router, appropriate to technical rooms in shopping malls.
- The ease of use of the NodeJS SDKs, for communication with the Azure back end.

The key advantages provided by the Azure back end were features provided by the IoT Hub service, specifically Device Management. Geratriz wanted to reduce costs by drastically enabling remote interventions to the devices. The ability to send messages from cloud to device allowed them to restart the devices and have them follow a stateless approach.

Likewise, the ability to register the devices allows for a more structured provisioning process. When taking on a new customer with a new facility and several buildings to monitor, Geratriz will need to register the devices only in the IoT Hub and configure the WeMeter device. These actions can be done in bulk through a back office that is planned.

## Opportunities going forward ##

Taking into account the project's results, Geratriz determined an action plan based on its business strategy:

- As a next step, Geratriz will deploy the solution fully with an existing customer (medium-sized shopping mall). This deployment will represent a real use for the platform and devices. It will help them test and validate the dimensioning phases. Finetuning the device software and provisioning steps will also be an important priority. It will be another consolidation step to start their internationalization efforts.

- We identified the need to create a WeMeter back office run and managed by Geratriz. This back office will facilitate and guide the deployment and operational tasks at a given facility. It will give Geratriz operators the ability to obtain device information and perform remote tasks such as configuration changes, device rebooting, and bulk provisioning.

- Geratriz has been working with an international partner, [*SenseWaves*](http://www.sensewaves.io/). This partner's product, Adaptix, automates key aspects of building energy management, extracting building intelligence from regular electricity, water, and gas meters. This product makes available real-time forecasting, anomaly detection, and pattern analysis to detect irregularities within milliseconds. Geratriz is set to integrate Adaptix with WeMeter. From initial briefings, we understood that SenseWaves' technical architecture for Adaptix is implemented with Docker containers and Kubernetes. Azure supports Kubernetes 1.4 and has recently released a preview for native support: [*Kubernetes on Azure Container Service (preview)*](https://azure.microsoft.com/en-us/blog/azure-container-service-the-cloud-s-most-open-option-for-containers/). This will ease integration efforts with Azure and WeMeter.

