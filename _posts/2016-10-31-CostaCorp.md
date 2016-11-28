---
layout: post
title:  "IoT pH flow controls and automation with Costa Farms"
author: "Blain Barton"
author-link: "#"
date:   2016-11-03
categories: IoT
color: "blue"
excerpt: This article showcases IoT setup for Costa Farms using the Atlas Scientific pH Sensor and Adafruit Feather M0 Wifi with the Arduino IDE, sending pH messages to Microsoft Azure.
language: English
verticals: Agricultural
---

<img src="{{ site.baseurl }}/images/Costalogo.png" width="200">

[Costa Farms](http://www.costafarms.com/) is a third-generation, family-owned group of companies headquartered in beautiful Miami, Florida (aka, plant paradise!). The company sprouted in 1961 when the founder, Jose Costa Sr., purchased 30 acres south of Miami to grow fresh, vine-ripened tomatoes in the winter and calamondin citrus in the summer. That soon morphed into houseplants, and the Costa Farms family started innovating and introduced new houseplants such as the canela tree, orchids, and Cecilia Aglaonema. Costa Farms sells to big box stores such as Walmart, Home Depot, and Lowe's.

![]( {{ site.baseurl }}/images/CostaTablestech.png)

**Core team:**

- Mani Peddada – BI Architect, mpeddada@costafarms.com
- Rodney Sanchez – Software Developer, rsanchez@costafarms.com
- Blain Barton – Microsoft Senior Technical Evangelist, blainbar@microsoft.com
- Joe Raio – Microsoft Senior Technical Evangelist, Joe.Raio@microsoft.com
- David Crook – Microsoft Technical Evangelist, dcrook@microsoft.com

![]( {{ site.baseurl }}/images/CostaCore.png)

## Pain point ##
It's time consuming, costly, and difficult for growers to measure and regulate pH throughout the day and across the lifecycle of a plant.  Indeed, pH levels are one of the key factors in plant health. Furthermore, pH levels in the water and nutrient streams change constantly.  To increase plant health via nutrient uptake in turn promoting higher yield, pH needs to be more closely monitored and adjusted in real time.

The Azure loT system helps Costa Farms increase revenue and profitability in using modern technology in agriculture/farming. Recalling optimal pH levels is essential for nutrient uptake. Increased nutrient uptake directly effects yields, in turn driving improved revenue per plant harvested. On the cost side, this system will allow growers to be more productive and utilized across all growing activities as they spend less time manually checking pH values by hand.

## Solution ##
This solution uses Microsoft Azure IoT Hub with pH sensor devices on hydro water systems testing correct pH levels. The goal was to use pH sensors for testing water entering and leaving the customer's hydro systems. We used the Adafruit Feather M0 Wifi and pHSensor, Microsoft Azure and IoT Hub, Stream Analytics, Event Hub, Azure Functions, messaging via Twilio and SQL Azure. We built a "proof of concept" that customers can use in their solutions.

Below is the overall flow of the system, which we'll discuss in detail.

![System flow]( {{ site.baseurl }}/images/CostaIoT1.PNG)

There are multiple technologies for this particular IoT solution. 

The code for the hardware and software for this solution is located at [https://github.com/blainbar/CostaFarmsIoT](https://github.com/blainbar/CostaFarmsIoT). 

First, let's start with the hardware, the Adafruit Feather M0 Wifi, breadboard, Atlas Scientific pHSensor, wires that connect everything, and the pH probe itself.

Below is the breadboard drawing that shows the layout of the components. 

![Breadboard drawing]( {{ site.baseurl }}/images/Costaboard1.png)

This is the Adafruit Feather M0 Wifi using the I2C Arduino C code.

![Adafruit]( {{ site.baseurl }}/images/CostaAdafruitfeather2.png)

This is the Atlas Scientific pH red circuit board.

![pH red circuit board]( {{ site.baseurl }}/images/CostaPhcircuit3.png)

Here's an image of the device we built starting with the pH probe.

![Device]( {{ site.baseurl }}/images/CostaPhprobe1.PNG)

For the Microsoft Azure setup, we used IoT Hub, Stream Analytics, Azure SQL database, sending messages to Event Hub and to the Azure Functions, then sending the messages based on the range of the Min and Max values. 

This is the Microsoft Azure setup for Costa Farms. 

![Azure setup]( {{ site.baseurl }}/images/Costaazureportalapps.PNG)

We started with the hardware and C code setup, which starts the flow into Microsoft Azure.

Next, the messages are sent to the IoT Hub.

- Here the messages go into a SQL Azure database and are stored to be used for Power BI.

- The messages are then sent via Stream Analytics within SQL Azure. 

- Event Hub then is used to receive the data coming in. 

- There is input and output from the IoT Hub via a QUERY that is in place to route the messages based on values.

- QUERY states from SensorIoTHub to phalerts give us the NurseryId, RowId, SensorId, Strain, MinValue, MaxValue, CurrentValue, DateCreated, SensorType, and also put everything into the Azure SQL database. The messages are then sent to Event Hub.

- Event Hubs are configured for phalerts and phdata.

- Event Hub then triggers phalerts to be sent.

- Here we use Azure Functions in the flow to send messages via Twilio. 

- Code is used for the Event Hub messages, where we log the event, put the message object into class, create the message, set up and then send to Twilio services to a mobile phone. 

- Azure Functions send messages based on the min and max pH levels to Twilio.

- phalert messages are then sent to the grower's mobile phone. 

The final output sent to the mobile phone is shown here.

![Output to mobile phone]( {{ site.baseurl }}/images/Costafinaloutput.PNG)

Here are some of the plants that are grown at Costa Farms. 

![Costa plants]( {{ site.baseurl }}/images/CostaFlowers.png)

## Solution architecture ##

![Solution architecture]( {{ site.baseurl }}/images/CostaIoT1.PNG)

## Device used and code artifacts ##

[Setting up the **hardware** for pHSensor - Article 1 of 2](https://blogs.msdn.microsoft.com/blainbar/2016/10/25/hardware-assembly-for-the-adafruit-feather-m0-wifi-with-the-atlas-scientific-ph-sensor-for-remotely-monitoring-ph-water-levels-in-microsoft-azure-article-1-or-2/)

[Adafruit Feather M0 Wifi GitHub Code](https://github.com/blainbar/CostaFarmsIoT)


## Opportunities going forward ##

Costa Farms and Microsoft are working on two additional projects to complete using Microsoft Azure technologies. One is a Xamarin mobile app for sensor readings, the other is with Power BI. We look forward to working with Costa Farms on these new technologies.

## Conclusion ##

The partnership between Costa Farms and Microsoft is strong and we have agreed to build a "proof of concept" technology-driven set of best practices for their new crops, increasing remote monitoring, preventive maintenance, and power of the Microsoft IoT Suite and the latest sensor hardware.

## Testimonials ##

> “I have been able to learn some new and interesting technologies. It has been an amazing experience thanks to the Microsoft team that has worked with us: Blain Barton, Joe Raio and David Crook.

> "The collaboration has been very good and it has been fun to build something from scratch that works and serves its purpose.”   

> **Rodney Sánchez** – Software Developer

> “Through this POC I’ve learned about IoT solution architecture that gets deployed using Azure services. Besides the obvious technical learning's from this process, I have also developed a broad understanding on ways to evaluate and design IoT device requirements, infrastructure requirements and structure engagements. This has been an incredible learning experience, thank you David, Blain and Joe for coming out here and helping us expand our horizons.”  

> **Mani Mihira Peddada** – BI Architect

## Resources ##
[![Costa Farms Video](http://img.youtube.com/vi/xVkgiIojwCc/0.jpg)](http://www.youtube.com/watch?v=xVkgiIojwCc)

[Setting up the **hardware** for pHsensor](https://blogs.msdn.microsoft.com/blainbar/2016/10/25/hardware-assembly-for-the-adafruit-feather-m0-wifi-with-the-atlas-scientific-ph-sensor-for-remotely-monitoring-ph-water-levels-in-microsoft-azure-article-1-or-2/) 

[Setting up the **software** for pHsensor](https://blogs.msdn.microsoft.com/blainbar/2016/10/25/setting-up-software-for-the-adafruit-feather-m0-wifi-using-the-arduino-ide-and-c-code-for-remotely-monitoring-ph-sensors-in-microsoft-azure-article-2-of-2)

