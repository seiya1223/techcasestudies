---
layout: post
title:  "How modern IoT technologies are being used to monitor the ancient Mitreo archaeological site"
author: "Erica Barone, Daniele Antonio Maggio"
author-link: "#"
#author-image: "{{ site.baseurl }}/images/authors/photo.jpg"
date:   2016-12-21
categories: [IoT]
color: "blue"
#image: "{{ site.baseurl }}/images/imagename.png" #should be ~350px tall
excerpt: Researchers at Politecnico di Milano worked with Microsoft to develop a way to remotely monitor conditions at the Mitreo archaeological site in Rome. 
language: [English]
verticals: [Cultural Heritage, Public Sector, Smart Cities, Environmental]
---


This project focused on the use of IoT technologies to monitor the status of a relevant archaeological site: the Mitreo in the basement of the Circus Maximus in Rome. We worked together with Politecnico di Milano, one of the most important universities in Italy, in order to use data gathered from specific sensors installed inside the Mitreo to remotely monitor CO2, vibrations, temperature, and humidity.

The Mitreo is a sanctuary discovered in the 1930s in good condition during structural work for the Teatro Nazionale dell’Opera. Probably built in the second century AD, the large building was modified many times, and in the third century AD, its ground floor became a Mitreo. 

*Mitreo at Circus Maximus - Rome*

![DataVisualization]({{ site.baseurl }}/images/PolimiMitreo/mitreoCircusMaximum.jpg)


IoT technologies used:

- Specific sensors installed at Mitreo: Accelerometer (on-device), Temperature (MCP9700A), Humidity (808H5V5), Carbon Dioxide (TGS4161), Light Dependent Resistor (VT43N2), Soil Temperature (PT1000)
- Libelium Waspmotes as computing unit for the sensors
- Raspberry Pi 2 as field gateway, running Raspbian OS with Mono installed and a C# console application
- 802.15.4 low-power wireless networking among sensors and gateway
- Azure IoT Hub for data ingestion, one message each 30 minutes
- Azure Stream Analytics to send data to DB and Power BI
- Azure SQL Database for data storage
- Power BI Embedded
- Web Apps feature of Azure App Service for public visualization

Project team:

- Luca Mottola – Associate Professor, Politecnico di Milano, Italy, and Senior Researcher at SICS Swedish ICT
- Koustabh Dolui – Master Student, Politecnico di Milano
- Erica Barone – Technical Evangelist, Microsoft
- Daniele Antonio Maggio – Technical Evangelist, Microsoft

## Customer profile ##

[Politecnico di Milano](http://www.polimi.it/en/university/) (PoliMi) is a scientific-technological university that trains engineers, architects, and industrial designers. The university has always focused on the quality and innovation of its teaching and research, developing a fruitful relationship with the business and productive world by means of experimental research and technological transfer.
Politecnico di Milano is one of the most important universities in Italy and is the Italian Top CompSci University for Microsoft.

Research has always been linked to education and is a priority commitment that has allowed Politecnico di Milano to achieve high-quality results at an international level, connecting the university to the business world. Research activity moreover constitutes a parallel path to that formed by cooperation and alliances with the industrial system.

For this specific project, the research is related to an important archaeological site in Rome: the Mitreo in the basement of Circus Maximus. Even though our main customer is Politecnico di Milano, it's important to mention that Sovrintendenza Capitolina and University of Trieste also are involved in the project.

In November, the project was presented by Luca Mottola and Koustabh Dolui at *Sacrum facere*, an important convention dedicated to archaeologists, as shown in the image at the end of this report.

## Problem statement ##

The main goal of this project is the remote monitoring of the current status of the Mitreo, using specific sensors installed inside the archaeological site. These include accelerometers and CO2, temperature, and humidity sensors, which send data to a field gateway and then to the cloud architecture, in order to visualize data remotely using a simple public website.
 
*Website data visualization*

![Data Visualization]({{ site.baseurl }}/images/PolimiMitreo/data_visualization.png)


Starting with Mitreo, PoliMi is actually interested in the creation of a reference architecture to be used to collect data from different archaeological sites, using different kinds of specific sensors and gateways, with the same cloud reference architecture built for this project. That's why they are interested in understanding the IoT services that can be used and combined for other projects in the future.  

The main challenges of this project were to:

- Find a scalable solution to be applied to different archaeological sites.
- Integrate the cloud architecture with gateway and sensors, installed underground. We faced some connectivity issues to be taken into consideration.
- Find a solution to allow anyone to monitor the data from anywhere.

### Sensors and gateway 

First, we organized some Skype calls in order to understand the aim and the current status of the project. Basically, when we started working on the cloud architecture, all the sensors had already been selected by PoliMI and installed inside the Mitreo, as shown in the next image.

*Mitreo sensors installation*

![SensorsInstalled]({{ site.baseurl }}/images/PolimiMitreo/MitreoSensors.png)


The sensors send small data to the field gateway with their own frequency (milliseconds), and then the gateway takes care of storing the data locally. The size of these messages is quite small, as you can see in the table below, so they can be grouped together to create a single .txt file each 30 minutes, containing all the data from all the sensors. This .txt file will be parsed by the C# console application in order to send structured data to the Azure IoT Hub.

*Mitreo nodes configuration*

![SensorsRate]({{ site.baseurl }}/images/PolimiMitreo/nodeConfiguration.png)


Based on these considerations, we were able to estimate a monthly price for the whole cloud architecture before starting the development, using the Azure pricing calculator. This has been very appreciated by the customer and it was a key point to go on with the development of the project. Of course, several other aspects have been taken into account: the ease of deployment, the chance to create a portable and scalable solution, and the support and skills of Microsoft during the development of the project.

*Estimated price*

![EstimatedPriceCloud]({{ site.baseurl }}/images/PolimiMitreo/estimatedPrice.png)

 
### Development of the project: challenges 

One of the main challenges during the development of the project was the parsing of the raw data. Starting from a .txt file containing the data retrieved from all the sensors, we had to separate them and build the correct messages to be sent to IoT Hub. Of course, we had to work together with PoliMi to properly understand the data and parse it correctly. The construction of the message was a key point to get the right data visualization in the end. 

Another big challenge was the integration of the cloud architecture with the sensors and gateway. 

We had to work close to the customer, in different ways: several Skype calls, face-to-face meetings, remote development and discussions. Considering all the design, development, and test phases, we spent about 10 complete days working on it, so that we were able to coordinate the development of the project and create an end-to-end solution.

*In-person meeting with Koustabh and Luca*

![Meeting]({{ site.baseurl }}/images/PolimiMitreo/meeting.jpg)


## Solution and steps ##

As explained previously, four kinds of sensors are sending data to a field gateway with the timings that you can see in the architecture diagram below.

The gateway connects to Azure IoT Hub in order to send about 1 KB every 30 minutes. MQTT was chosen here because it is the most widely used protocol and also convenient for the model of nodes of this project. 

Azure Stream Analytics processes the stream and routes telemetry data to the appropriate table of a SQL Database.

A web app embeds the Power BI reports needed for visualization by the end users of PoliMi.

*Mitreo architecture diagram*

![Mitreo Architecture Diagram]({{ site.baseurl }}/images/PolimiMitreo/PolimiMitreo.png)


### Data available for analysis 

Ten [Libelium Waspmote](http://www.libelium.com/products/waspmote/) sensors have been used in order to gather the data. The type of sensors used was dictated by archaeologists and the people in charge of the restoration of the site. The specific type of sensor is simply the one Libelium offers for the Waspmote and includes:

- Accelerometer 
- [Temperature](http://www.microchip.com/wwwproducts/en/MCP9700A) 
- [Humidity](http://microcontrollershop.com/product_info.php?products_id=6778) 
- [Carbon Dioxide](http://microcontrollershop.com/product_info.php?products_id=6782) 
- [Light Dependent Resistor](http://www.datasheetcatalog.com/datasheets_pdf/V/T/4/3/VT43N2.shtml) (VT43N2) 
- Soil Temperature (PT1000)

Collected measurements are sent to a Raspberry Pi 2, running Raspbian OS, used as field gateway.

The OS was chosen because the customer has significant expertise with Raspbian but no expertise with Windows 10 IoT Core or other operating systems. It performs some manipulation of the data received from the sensors. For example, with values gathered from nodes 3 and 4 (accelerometers burst) the Fast Fourier Transformation (FFT) is calculated and added to the message that must be sent to the cloud.

A Python application on the gateway generates a .txt file every 30 minutes containing collected readings. Python turned out to be the easiest way to minimize efforts for Koustabh and it gives him the opportunity to replicate the system across multiple platforms in the future. This file will be used to send data to the IoT Hub. In the image below you can see a sample of the .txt file with raw data that has to be parsed by the C# console application running on the field gateway.

*Raw data - txt file*

![RawData]({{ site.baseurl }}/images/PolimiMitreo/rawData.png)


### Pre-processing

To be successful with data sending, the .txt file has to be parsed by a console application running on the field gateway. At this point we had to make a decision: the language to develop the console application. IoT Hub SDK is available both for Python and C#. We discussed the best option with the customer and chose C# for developing this application because of our technical skills. Then we installed Mono on the RPI to run the application.

This application produces a JSON array of measurements ready to be sent to IoT Hub, containing all the data from all the sensors, parsed from the .txt file. For the last tests, we used a huge .txt file, and we noticed some issues related to the size of the message to be sent to the IoT Hub.

> **Lesson learned**
> 
> If the text file is bigger than 256 KB, it has to be split into smaller files. This requirement is due to limitations on the maximum size of a device-to-cloud batch in IoT Hub.
 
*Parser structure*

![parser]({{ site.baseurl }}/images/PolimiMitreo/parser.jpg)


For nodes 3 and 4, the development of the parser was a little more complex due to the data they send to the field gateway: timestamp, node ID, battery level, axis, package number, and a set of 20 numbers representing **part** of the FFT. One single data transmission from the same sensor for the same axis is composed of 7 packages, having timestamp included within 70 milliseconds. We had to identify these packages and create a single row in the table including all the FFT values of the 7 packages (serialized as a JSON and stored all together as a string).

### Telemetry transmission 

As mentioned previously, due to connectivity issues, in the beginning we had to work with a .txt file containing real data retrieved from the sensors. Real time is not a requirement for this project, so this simulation was very close to the real scenario. In the end, we decided to keep working with a .txt file produced by the field gateway, because it was useful for the customer as a log file and also to keep using the parser we developed. 

The RPI works as an opaque field gateway, so we registered the C# console application as a unique device for IoT Hub. It means that it doesn't matter how many sensors we have to connect to the field gateway, it's the gateway itself that performs all the data manipulation and aggregation and creates the messages to be sent to IoT Hub. This choice also was made in order to use the same architecture for other archaeological sites and to set up a scalable and portable solution. 

### Security 

Azure IoT Hub allows registration of every single device, providing them a name and a symmetric key: This means each device has its own connection string. 

In terms of security, if a device's connection string gets compromised, the device management in the Azure portal allows the device to be disconnected in order to stop data transmission. 

IoT Hub provides, out of the box, an efficient solution to protect data send: This feature has been widely appreciated by the customer, even if at the beginning there were no specific requirements about secure transmissions.

### Storing telemetry using Stream Analytics 

Once the data reaches Azure IoT Hub, it must be both stored and visualized. After discussing with the customer, we decided to create a DB with four different tables, one for each kind of sensor. We chose SQL Database in order to use it with direct query as a dataset for Power BI Embedded.

The Azure Stream Analytics service is then configured with one input and four outputs, as you can see in the following image. 

*Azure Stream Analytics*

![RawData]({{ site.baseurl }}/images/PolimiMitreo/asa.png)


The query has **four** statements that route telemetry data to the appropriate table of a SQL Database, all similar to the one shown in the image below.

    SELECT
    	dateadd(s, ts, '1970-01-01') as ts,
	    id,
	    bat,
	    ax,
	    ay,
	    az,
	    te,
	    hu,
	    lt
	INTO
	    [accsample]
	FROM
	    [IoTHub]
	WHERE id=1 OR id=2


As you can see, in the statement the *dateadd* function has been used to convert Unix epoch time to a human readable date. The remaining takes the data from the stream and stores it in the table mapped by the 'accsample' output.

### Data visualization 

Visualization is the final step of this project. We chose to embed a Power BI report into an ASP.NET Web Application to explore the data. This was the best choice that allowed us to achieve two important goals of the project: create useful graphs representing the data that can be personalized and managed directly by the customer, and give the crucial feature of public access to the data collected from the sensors.

The graphs and data to be visualized and filtered through the web application have been created and improved in strict cooperation with the customer, in order to better understand how to create the best views for his needs: different tabs for different sensors, filters, and so on.

One specific need, for example, was the possibility to create a filter by timestamp for each device. 

*Data visualization with Power BI Embedded*

![Data visualization with PowerBI Embedded]({{ site.baseurl }}/images/PolimiMitreo/dataVisualization1.png)

 
## Conclusion ##

We were able to develop a complete end-to-end IoT solution to retrieve data from an important archaeological site and monitor it remotely. Of course, this has great value for researchers, who can monitor the data no matter where they are located.

Moreover, the architecture implemented is easily scalable and portable. The aim of PoliMi was to learn how to use these technologies and how to adapt the solution to other projects, and working together allowed us to achieve this goal.

The data visualization is very clear and simple, and researchers can use it to easily get insights about the status of the archaeological site.

## Going forward ##

Now the end-to-end solution to remotely monitor the Mitreo of Circus Maximus is up and running, and the project team has developed all the skills necessary to create it. In the next few months the system will be tested and used by researchers in order to evaluate the performance of the solution and to understand how to improve it, considering the specific needs that will face them. 

Moreover, PoliMi has built strong skills for Azure platforms and can easily recreate a similar architecture for different remote monitoring projects, related to other archaeological sites. 

Customer quote:

>*Collaborating with Microsoft Italy proved to be an asset in the development of our IoT-based monitoring system at Circus Maximus, and represents a stepping stone for possibly replicating the same design in other upcoming projects.*


## Additional resources ##

- Github repository for the C# console application running on the field gateway:
[https://github.com/erryB/Polimi-Mitreo-Console-Application](https://github.com/erryB/Polimi-Mitreo-Console-Application "GitHub repository for the C# console application")

- Information about the Mitreo at Circus Maximus, from Sovrintendenza Capitolina website:
[http://www.sovraintendenzaroma.it/i_luoghi/roma_antica/monumenti/mitreo_del_circo_massimo](http://www.sovraintendenzaroma.it/i_luoghi/roma_antica/monumenti/mitreo_del_circo_massimo)

- Sacrum Facere convention, the archaeological convention organized in Trieste last November where the project was presented by Luca Mottola and Koustabh Dolui:

*Sacrum Facere convention*

![DataVisualization]({{ site.baseurl }}/images/PolimiMitreo/sacrumFacere.png)






