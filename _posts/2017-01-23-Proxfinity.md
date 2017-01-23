---
layout: post
title:  "How Azure services can help Proxfinity migrate from retiring Parse"
author: "Martin Schray"
author-link: "#"
#author-image: "{{ site.baseurl }}/images/Proxfinity/AuthorsPhoto350.png"
date:   2017-01-23
categories: [IoT]
color: "blue"
#image: "{{ site.baseurl }}/images/Proxfinity/ProxfinityLogo.png"
excerpt: In a joint development effort, Microsoft worked with Proxfinity to develop a proof of concept that demonstrates how Proxfinity can leverage Azure IoT Hub and Azure Stream Analytics to support its migration from Parse.
verticals: [Social, "Retail, Consumer Products & Services"]
language: English
---



In this joint development effort, Microsoft teamed up with Michael Howells, the CTO of Proxfinity, to develop a proof of concept that demonstrates how Proxfinity could leverage Azure IoT Hub and Azure Stream Analytics to support Proxfinity's migration from Parse. With Parse being retired in January 2017, the Proxfinity team took the preparatory step prior to the hackfest of moving its Parse environment to Azure Virtual Machines—the Azure infrastructure-as-a-service offer. 

Core team:

- Michael Howells – Cofounder and CTO, Proxfinity
- Martin Schray ([@mschray](https://twitter.com/mschray)) – Senior Technical Evangelist, Microsoft 
- Ryan Joy ([@atxryan](https://twitter.com/atxryan)) – Senior Technical Evangelist, Microsoft
- Lauren Tran ([@LtkTran](https://twitter.com/LtkTran)) – Technical Evangelist, Microsoft 
- Jennifer Marsman ([@jennifermarsman](https://twitter.com/jennifermarsman)) – Principal Technical Evangelist, Microsoft  
 
In our solution, we used Azure IoT Hub and Azure Stream Analytics to capture, process, transform, and store data from Proxfinity's smart networking wearable that facilitates, guides, and optimizes how people meet, connect, and network.
 
## Customer profile ##

<img src="{{ site.baseurl }}/images/Proxfinity/ProxfinityLogo.png" width="400">
 
Chicago-based [Proxfinity](https://www.proxfinity.com/) has developed a wearable technology platform that drives face-to-face interaction with intelligent, real-time matching, fosters sustained collaboration, and measures engagement and event impact.

Proxfinity's platform visually connects professionals attending events when they are close by and share interests. In addition to providing a visual cue, the smart badge records the interactions that take place, allowing stakeholders to receive definitive next steps and dashboard data that can be used to make human capital decisions, evaluate meeting success, and more.

Proxfinity has had great success within corporate management meetings, CEO summits, capability weeks, and other events in Chicago, New York, and Osaka, Japan, and is currently working to secure repeat multi-event contracts with Fortune 500 companies and strategic partners and resellers. Proxfinity was also a Chicago Innovation Award 2016 winner!

*Proxfinity representatives Christine, Lisa, Mitch, and Michael*

![Proxfinity's people]({{ site.baseurl }}/images/Proxfinity/ProxfinityTeam.png)

 
## Pain point or problem area to be addressed ##

Proxfinity's technical team had built an environment that connected the Proxfinity networking smart badge (wearable) to protocol gateways and ultimately to Parse for processing, storage, transformation, and reporting. This technical architecture has worked successfully for the Proxfinity team for both small and large events and clients.  

*Proxfinity Parse architecture*

![Proxfinity Parse architecture]({{ site.baseurl }}/images/Proxfinity/v1.png)


However, when Facebook announced that hosted Parse would be retired in January 2017, Michael Howells, CTO of Proxfinity, began to consider alternative platforms. While Parse had been a fine solution, Michael wanted to find an alternative hosted platform. He was interested in exploring how Azure's IoT capabilities might support the Proxfinity need for data capture, processing, storage, and reporting in the near-term and well into the future.  
 
## Solution, steps, and delivery ##

Proxfinity wanted to migrate from Parse in two phases. The first phase and focus of this effort was to create a hosted Parse environment in an Azure virtual machine. The Proxfinity smart badges (for example, clients) would continue to connect and communicate with Parse, but now Parse was hosted on Azure. The Parse implementation on Azure would continue its current approach to storage, processing, and reporting. However, the code was modified to duplicate all inputs from smart badges and to write to an Azure IoT hub. This clever strategy allowed the current system to continue to operate, thereby lowering risk while allowing the new Azure implementation to be built and tested with real data. The image below captures the architecture that was built to Proxfinity hackfest that brought Proxfinity data to the Azure IoT hub to enable processing, storage, and reporting.   

*Proxfinity Azure version 1 architecture*

![Proxfinity Azure Version 1 architecture]({{ site.baseurl }}/images/Proxfinity/v2.png)


The IoT hub was the collection point for data flowing into Azure. While there is language support for reading IoT hubs from Java and .NET, as well as via REST APIs, the team decided to use Azure Steam Analytics. Stream Analytics provides a [SQL-like language](https://msdn.microsoft.com/en-us/library/azure/mt582049.aspx) that can be used to read data from an IoT hub and distribute that data to data stores like Azure SQL Database, Azure SQL Data Warehouse, Azure Table storage, Azure Data Lake, Azure DocumentDB, and other data stores. The team decided to write hot path (critical) data to SQL Server to facilitate easy reporting and cold path (archival) data to DocumentDB to capture a replica of all incoming data.  

Part of the reason the team selected SQL Database for hot path data was the power of SQL to manipulate and query data as well as the availability of a large talent pool that knows how to use SQL. Additionally, the team decided to use Power BI Embedded for reporting; Power BI Embedded supports Azure SQL Database via DirectQuery. [DirectQuery](https://docs.microsoft.com/en-us/azure/power-bi-embedded/power-bi-embedded-connect-datasource) supports talking directly to Azure SQL Database (rather than caching static data), so Power BI Embedded reports would immediately reflect the latest data. Finally, Stream Analytics supports SQL-like capabilities such as [CROSS APPLY](https://msdn.microsoft.com/en-us/library/azure/dn706229.aspx) that allowed the team to unroll JavaScript arrays into multiple SQL rows, transforming incoming data to allow for easier reporting. The team decided to use DocumentDB for cold path storage since it natively supports the JSON format of the incoming data and efficiently stores (and retrieves) high volumes of data inexpensively, which is perfect for Proxfinity's desire to archive incoming data.     
  
### Technical details

In the days leading up to our hackfest, Michael Howells, the Proxfinity CTO, built out the Parse implementation using Azure Virtual Machines. This allowed for the migration of Proxfinity's Parse-hosted implementation from Parse to Azure. This ensured that Proxfinity was well ahead of Facebook's January 2017 retirement of Parse. While Azure offers a [managed implementation of Parse](https://azure.microsoft.com/en-us/blog/announcing-the-publication-of-parse-server-with-azure-managed-services/), Michael chose to build out an Azure Virtual Machines infrastructure for Parse, allowing for more control and configuration of his Parse environment. Michael used [Azure Resource Manager](https://docs.microsoft.com/en-us/azure/azure-resource-manager/resource-group-overview) and its concept of Resource Groups to collect and manage all of the Azure resources related to Proxfinity's virtual machine-hosted Parse implementation. 

At the hackfest, we used the Azure Resource Group Michael had created for the hosted Parse implementation and then created the Azure resources needed for our hackfest. Using the [Azure portal](http://portal.azure.com), we created our IoT hub, our managed SQL database, and our DocumentDB database. Michael's team registered their Parse implementation as an IoT device using the Azure [Device Explorer for IoT Hub devices](https://github.com/Azure/azure-iot-sdk-csharp/blob/master/tools/DeviceExplorer/readme.md). Next the Proxfinity team modified their Parse implementation on Azure to duplicate all data by writing it to the Azure IoT hub. Based on the JSON data being streamed into the IoT hub, we began to design and build our [Azure Steam Analytics jobs](https://azure.microsoft.com/en-us/services/stream-analytics/). Stream Analytics jobs has three parts: one or more inputs, one or more Stream Analytics queries, and one or more outputs.  

*Proxfinity Azure Stream Analytics Job Topology*

![Proxfinity Azure Stream Analytics Job Topology]({{ site.baseurl }}/images/Proxfinity/JobTopology.png)


There were two data record types being written to Proxfinity's IoT hub. Because Stream Analytics components (inputs, queries or outputs) cannot be modified while a Stream Analytics job is running, we decided to create separate Stream Analytics jobs for each record type that outputs to the SQL database. This would allow for one record type to be stopped and edited while the other continued to be processed. Without looking at the specific details for Proxfinity's Stream Analytics query below, note the familiar SQL elements of SELECT, INTO, and FROM. Additionally, note the use of the familiar `where` clause to allow processing of a single record of type RESULT in this query.  

*Proxfinity Azure Stream Analytics for Result*

![Proxfinity Azure Stream Analytics for Result]({{ site.baseurl }}/images/Proxfinity/ASAFrom.png)


For the Stream Analytics jobs storing results in the SQL database, we made extensive use of the built-in functions to transform the data so we could easily recreate reports from the incoming data. This included using built-in functions for arrays, strings, creating cross products from arrays, and casting incoming data to SQL types.  

Additionally, we created a separate Stream Analytics job to output all record types to DocumentDB. Again, creating separate Stream Analytics jobs allows them to be started, stopped, and modified independently. Since DocumentDB is a JSON document store, we were able to directly output the JSON documents pulled from IoT hub directly into DocumentDB. Since DocumentDB was being used for archival of all incoming data, we did not perform any transformations on the data.   
   
Now that we had pulled data from the IoT hub and stored it in SQL Server and DocumentDB, we turned our attention to the reporting needs of Proxfinity. Proxfinity wanted to create visually stunning reports for its customers and embed these reports into its customer portal. To create either Power BI reports (for consumption via an Office 365 portal) or Power BI Embedded reports for embedding in applications or web pages, you use the [Power BI Desktop](https://powerbi.microsoft.com/en-us/desktop/) application. We downloaded the free Power BI Desktop application and connected it to the Proxfinity SQL database to create the needed reports. Power BI Desktop allows technical and non-technical users to create sophisticated and engaging reports giving end users capabilities such as sorting and filtering data.  

Once we were done creating our first report, we saved it into the Power BI Desktop .pbix file format. We could publish the Power BI report to Proxfinity's Office 365 portal, but because Proxfinity wanted to provide these reports for its customers, we needed to publish them to an Azure Power BI workspace and embed them in a web app. While development is under way to allow publishing of Power BI Embedded directly through the [Azure portal](http://portal.azure.com/), this functionality was not complete at the time of this writing. However, [the Power BI command-line interface (CLI)](https://github.com/Microsoft/PowerBI-Cli/) made it quite straightforward to publish our Power BI Embedded report to the Power BI workspace.  

Now that the Power BI report was published to the Power BI workspace, we built a web app and embedded the report into the web page. The web app was written in Node.js and deployed to Azure.    

[![Proxfinity Demo Video](http://img.youtube.com/vi/uzS16kc6mS0/0.jpg)](http://www.youtube.com/watch?v=uzS16kc6mS0)


### Architecture

We leveraged a number of Azure components in building this solution, including:

- Azure Storage virtual machine images 
- Azure Virtual Machines to host the Parse implementation
- Azure Resource Groups
- Azure IoT Hub
- Azure Stream Analytics
- Azure SQL Database
- Azure DocumentDB
- Web Apps feature of Azure App Service (Azure platform as a service, or PaaS)
- Azure Power BI workspace  

The architecture can be seen in the diagram below.

*Proxfinity Azure version 1 architecture*

![Proxfinity Azure Version 1 architecture]({{ site.baseurl }}/images/Proxfinity/v2.png)


Eventually, the Proxfinity team will retire its virtual machine-hosted Parse implementation and stream data directly into the Azure IoT hub. The envisioned architecture is diagrammed below.

*Proxfinity Azure version 2 architecture*

![Proxfinity Azure Version 2 architecture]({{ site.baseurl }}/images/Proxfinity/V3.png)


### Key learnings

- The inputs, queries, and outputs in an Azure Stream Analytics job can only be edited when the job is stopped, so it makes sense to create different Stream Analytics jobs for different data stores. In our case we created a separate Stream Analytics job for each SQL table we worked with and another for DocumentDB.  
- By default, a single channel is created when an IoT hub is created. Each channel is limited to five readers. When creating an IoT hub (or after, if needed), it is recommended to create a channel for each anticipated Azure Stream Analytics job.
- Azure Stream Analytics query language has a number of capabilities for converting, working with string, and working with arrays. Since IoT data is often optimized for compactness, it is useful to have these built-in functions to help reformat data for downstream usage.
- While at the time of this writing you cannot upload a Power BI Embedded report via the Azure portal, the Power BI command-line interface (CLI) allows you to easily accomplish this task.
- The IoT hub can be read by .NET and Java clients via REST APIs as well as Azure Stream Analytics. Stream Analytics is a quick and effective mechanism for extracting data from the IoT hub and getting this data to downstream systems.
- When starting a Stream Analytics job, you can start at a specific date and time, now or from the last stop of the job.
- By default, data written to the IoT hub stays in the hub for 24 hours. Because you can start Stream Analytics at a specific data and time, you can write data to an IoT hub and use this data repeatedly over a 24-hour period for testing.
- When writing the select statement in Stream Analytics queries, you rename columns and cast data in route to the datastore you are writing to.  
 
## Conclusion ##

Unexpected announcements like the retirement of technologies such as Parse provide both challenges and opportunities. The challenge is the unexpected need to find and select new technologies and build replacement solutions using those you are currently using. The opportunity is to review what you've done, consider all that you have learned since then, reflect on how your application has evolved over time and re-architect a new solution with that knowledge.  

Michael Howells, the Proxfinity CTO, used the retirement of Parse as an opportunity to leverage what he and his team had learned to build a new solution on Azure. Michael's new solution was not a simple lift and shift, but a reimagining of the Proxfinity solution leveraging Azure's offerings and capabilities such as Azure IoT Hub and Azure Stream Analytics. Michael designed a phased approach that provided minimal disruption as they moved from hosted Parse to Parse hosted on Azure virtual machines and gradually added Azure capabilities such as IoT Hub and Azure Stream Analytics. 

After the hackfest, Michael said, "I was impressed with how quickly we were able to stream data into the IoT hub and have Azure Stream Analytics jobs load that data into our databases."       


## General lessons ##

**Insights**

- We were able to quickly modify the existing Parse implementation written in Node.js to stream data into the IoT hub. Once the data was being streamed into the IoT hub, we were able to quickly define the inputs, outputs, and queries to move data from the IoT hub into SQL Database and DocumentDB.
- Michael Howells' phased approach to moving to Azure allowed the team to quickly experiment and test using live data from the Proxfinity application.
- Our hackfest team was made up of local and remote team members in different time zones. By carefully defining approaches, desired goals, and outcomes before starting, thoughtfully designing small testable tasks, and establishing predefined team check-ins that worked for the different time zones of all participants, the distributed hackfest team was very effective and productive.
- In many ways the moving of the Parse implementation to Azure was on the critical path for the hackfest. Michael decided that moving Parse to Azure virtual machines should be done before the hackfest. This was a great call, allowing us to not worry about getting this task done during the hackfest and instead focus on loading data into the IoT hub and the downstream processing via Stream Analytics. Good design of what is in scope and what is a prerequisite before the hackfest is a critical factor in the success of a hackfest.
- Data coming from IoT devices is often optimized for small transmission sizes using things like bits masks. This likely means that data streaming from IoT devices will likely need to be converted, restructured, or modified before being stored in data stores. Depending on the scope of the transformation that needs to occur, Stream Analytics has utility functions to manipulate strings and arrays, do type conversation and apply aggregate functions.         


**How the learnings and insights can be applied elsewhere**

It is critical to collaboratively design the goals and desired outcomes and determine the preliminary research and prerequisites before a hackfest. Michael Howells and the Microsoft team had a number of planning calls leading up to the hackfest. These calls were every bit as important as what happened at the hackfest and set the stage for a productive and successful event.  

For the hackfest, some steps could have been done in code such as registering devices and setting up, configuring, and publishing Power BI Embedded reports. However, given the short timeframe of the hackfest, there were UI tools in the case of device registration and a command-line interface (CLI) tool in the case of Power BI Embedded that were much easier and quicker than writing code for these tasks.

**Resources**

- [Power BI command-line interface](https://github.com/Microsoft/PowerBI-Cli/)
- [Azure IoT Hub command-line interface](https://www.npmjs.com/package/iothub-explorer/)
- [Device Explorer for IoT Hub devices](https://github.com/Azure/azure-iot-sdk-csharp/blob/master/tools/DeviceExplorer/readme.md)
- [Learn about Azure IoT Hub](https://azure.microsoft.com/en-us/services/iot-hub/) 
- [What is Azure IoT Hub](https://docs.microsoft.com/en-us/azure/iot-hub/iot-hub-what-is-iot-hub/)
- [Microsoft Azure IoT Reference Architecture](http://download.microsoft.com/download/A/4/D/A4DAD253-BC21-41D3-B9D9-87D2AE6F0719/Microsoft_Azure_IoT_Reference_Architecture.pdf)
- [Azure Stream Analytics](https://azure.microsoft.com/en-us/services/stream-analytics/)
- [Azure Stream Analytics Query Language Reference](https://msdn.microsoft.com/en-us/library/azure/dn834998.aspx)
- [Azure Stream Analytics - Query Language Elements](https://msdn.microsoft.com/en-us/library/azure/mt582049.aspx)
- [Publishing a web site from source control](https://azure.microsoft.com/en-us/documentation/articles/app-service-continous-deployment/)
- [Setting Continuous Deployment](https://github.com/projectkudu/kudu/wiki/Continuous-deployment)
 

