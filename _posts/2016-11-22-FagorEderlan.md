---
layout: post
title:  "Enhancing a molding process using IoT solutions with Fagor Ederlan"
author: "Juan Manuel Servera"
author-link: "http://twitter.com/jmservera"
#author-image: "{{ site.baseurl }}/images/authors/jmservera.jpg"
date:   2016-12-19
categories: IoT
color: "blue"
#image: "{{ site.baseurl }}/images/imagename.png" #should be ~350px tall
excerpt: Fagor Ederlan is looking to improve its aluminum injection molding process to detect defective pieces earlier and enhance the overall quality. This project demonstrates that it's not complex to send data to the cloud using secure and reliable services, analyze the data, and build maching learning models to extract knowledge from it. 
language: English
verticals: Manufacturing
---


In the third wave of industrial evolution, we had automation that produced large amounts of data. This data had high potential for analytic applications, but it was not easy to analyze because it was siloed in the machines where it was generated. With this project, we demonstrate that it's not complex to send the data to the cloud using secure and reliable services that allow us to analyze the data in near-real time and build maching learning models to extract knowledge from it. 

The project is based on a molding machine that takes measurements each millisecond during its process.

![Robot and Mold]({{ site.baseurl }}/images/fagorederlan/robotAndMold.jpg)


The data captured during the molding process is useful to build a machine learning model that will warn us when the quality of the product may be lower than the defined standard.

In a canonical scenario, the data is gathered from the sensors (directly, via a [PLC](https://en.wikipedia.org/wiki/Programmable_logic_controller) or a gateway) and sent to the cloud, but in many manufacturing projects we have to deal with old and/or proprietary systems that cannot be directly connected. You must get the data from existing sensors, using diverse communication protocols and with special calibration issues. Furthermore, many factories have low bandwidth connectivity and overloading their communications is a big concern.

The machine on which we were going to make this pilot has control software that already gathers all the sensors' information as *CSV* files. For each piece it calculates averages, means, and other statistical values from the data.

Because we wanted to minimize the impact we have on the machine, we developed a lightweight Windows Service that detected new *CSV* files in a folder and sent them zipped to IoT Hub. All the rest of the process is executed on the cloud side.

To develop the service, we took into account all the communications concerns, we created a test plan using a large amount of files, and tested the service under the most probable situations such as network outages and other connectivity problems.

**To minimize problems, we took these measures:**

* The service keeps track of the last file being zipped, and when the service starts (or restarts) it takes all the files it didn't send already.
* We limit the size of the *Zip* files to avoid having a very large file the first time the service starts after a period of inactivity.
* We check for connectivity and only send files when we are sure of it.
* Zipped files are persisted in disk and are only deleted when the file is correctly sent to the cloud.

**Two machine learning models will be built with the gathered data:**

- The first will be built on the data from in-mold sensors, and will be correlated with a dataset of defective parts. This will greatly enhance the project because it will allow early detection of defective pieces.  
- In the future, the plan is to build a model to enhance the molding process directly, but for this we will need to retrieve the molding parameters as well.

**The main technologies we used:**

* IoT Hub, to receive sensor data as events and files.
* Intel Curie, to gather environmental data.
* Azure Functions, to uncompress data and do some math preparation on the data (to calculate the characteristics of the curves that represent the data).
* Azure Stream Analytics, to join the datasets and ask the machine learning model.
* Azure Machine Learning Studio, to easily build the machine learning models and create the API endpoints.

## Customer profile ##

**[MONDRAGON Corp.](http://www.mondragon-corporation.com/eng/])** is a leading Spanish business group, integrated by autonomous and independent cooperatives, with production subsidiaries and corporate offices in 41 countries and sales in more than 150 countries.

The hackfest participants were from the three companies that are working on the project: **Fagor Ederlan** (Edertek), **LKS**, and **ETIC**.

**[Fagor Ederlan](http://www.fagorederlan.es/ENGLISH/tabid/208/language/en-US/Default.aspx)**, a cooperative under MONDRAGON Corp., is a leading automotive supplier specializing in complete product solutions for chassis and powertrain applications. A global company with 20 manufacturing sites worldwide, Fagor Ederlan Group has its headquarters and main industrial facilities in the Basque Country. This is where we developed and deployed the prototype, but one big concern is how to scale this to the whole company, with a focus on security and on working scenarios with very low bandwidth.

**[LKS](http://www.lks.es/I.aspx)** is the systems integrator that is helping Fagor Ederlan build the machine learning models to improve their manufacturing process. LKS group is one of the main references in the Spanish professional services sector. It has a staff of around 700 and generates an annual turnover of more than 50 million. Part of the Consulting and Engineering Division of MONDRAGON, it provides services in the fields of management and technology consulting, legal advisory, architecture and engineering in urban planning, construction and infrastructure, promotion, real estate consulting, and design.

**[ETIC](http://www.embedded-technologies.org/en-us)** (Smart Cities Innovation Center) is a non-profit business service cooperative specializing in the development of products, services, and applications within the context of Smart Cities. By virtue of a framework agreement, it operates as a Microsoft Innovation Center. Located in the town of [Mondragón (Arrasate)](https://es.wikipedia.org/wiki/Mondrag%C3%B3n) in the Basque Country, ETIC is providing its knowledge in building IoT solutions in Azure with Power BI and Machine Learning.

The main hack team includes the following:

 Fagor Ederlan | LKS | ETIC | Microsoft
 ---|---|---|---
Eber Arregui (Project Manager) | Vicente Briz | Natividad Herrasti (Managing Director) | [Juan Manuel Servera](https://twitter.com/jmservera) (Senior Technical Evangelist)
Yolanda Mendi (IT)| Miguel Baroja (Data) | Aitor Gomez (Dev)
Ibai Peña (IT)| |Aitor Akizu (Dev)
Jesús Para (Data Analytics)||Jon Alza (Dev)
Imanol Santos (Installation technician) ||Josu Lopez (Dev)
 | | Maite Beamurgia (Data Scientist)


The hackfest focused on three different areas:

- Learning how to use IoT Hub and how it enhances the real-time capture of the data and solves the security concerns of the company.
- Creating the Windows Service to gather actual data using the technology that they are using today, but sending it to the cloud to help analyze it.
- Creating a simulator that uses samples of the real data obtained manually from the machine. This will allow us to build a prototype of the full solution with all the data management, real-time analytics, machine learning, and visualization. This simulator allowed us to test everything without having to deploy it inside a real machine. 
 
## Pain point: automated data gathering ##

The objective of the solution they are building is the early identification of defective pieces in an aluminum molding machine.
During the injection process, the machine takes many parameters per millisecond, such as speed, pressure, and injector run. This creates an 800 KB *CSV* file with all the measures and another one of averages.

The process of filling the die and cooling the piece takes between 60 to 90 seconds. The speed can be enhanced manually by an experienced operator by modifying the machine configuration from the control computer.

When the piece is finished, there is an X-ray and visual inspection of the pieces to detect defective ones. But the final check comes from the customer, which usually happens one month after the piece is built.

The main issues they were facing were:

- The molding and data gathering is controlled by a proprietary system that cannot be modified.
- They cannot read directly from the sensors, they can just take the *CSV* files regularly.
- The PC was using Windows XP and it had no network connection.
- The data gathering is not complete until the piece is assembled one month later.

The company fixed the PC issue by upgrading their systems, but some of the other fixes will be done in the future:

- The molding controller was upgraded with a more powerful machine with Windows 7, so we will have better .NET compatibility.
- In the future, they will evaluate new IO-Link compatible sensors so data could be retrieved in real time using an OPC-UA gateway, allowing us to try to improve the system by using an early detection of the defective pieces, which could be discarded directly by the robot instead of having to wait for a human inspection.
- The process will be improved with real-time data, but if there are network issues, we will be able to identify the defective pieces in a later step, when the network connectivity is reestablished.
- Customer feedback is taken manually in paper form, but it will be upgraded to a web service to feed the machine learning model automatically.

The concerns that arose about this project:

- **Security:** The IT department of the company is also involved, and they are concerned about the security of the whole system.
- **Connectivity and bandwidth limits:** Their current broadband network is limited, so they want to limit bandwidth usage of the system and control when the data is sent to the cloud to avoid having bandwidth problems with their other systems during this prototype.
- **Generalization:** We are going to create a pilot over one molding process, but they have a very broad range of pieces they build, so we should think about what parts of the solution are reusable and what should be built or modified in every case.
- **Costs** of the whole system and scalability of the system to the full manufacturing plant.
 
## Solution ##

The LKS + ETIC team was already building the machine learning model, but until now, the *CSV* files were retrieved manually via a USB flash drive and then the data was uploaded to the machine learning platform. We built a prototype in incremental steps, focused on the data gathering, but left the solution open to build a real-time solution in the future, the one that will be used when the IO-Link sensors are installed.

### Hackfest agenda ###

During the first meetings, we agreed on an agenda that should be flexible because the access to the molding machine depended on the production needs.

We did a *five-day hackfest* in two blocks:

- In the first three days we developed all the basic parts to have a reliable solution that sends the data to the cloud.
- We started the second part of the hackfest a week later, focusing on enhancing the security and reliability of the system.

![Collage]({{ site.baseurl }}/images/fagorederlan/hackfestcollage.jpg)

Day 1 | *Hackfest preparation* 
--- | --- 
IoT Lab | We dedicated the morning to an IoT Hub lab to get familiar with the technology and all the parts we were going to use. In the lab, we used Intel Edison with Grove kits, Raspberry Pi 2 with FEZ HAT and connected to the cloud using Node.js and also the node-red platform. 
Kanban board | During the afternoon, we discussed the technology we were going to use for each part and created an initial Kanban board with the work for the next days. |

*The IoT Hub lab*

<img src="{{ site.baseurl }}/images/fagorederlan/iotLab.jpg" width="700">


Day 2 | *Divide teams and start work* 
--- | ---
Windows Service | Develop a file watcher that zipped the files and connected to Azure Storage to send them. 
Azure Functions | To uncompress the files and extract characteristics from the curves. 

Day 3 | *Visualization* 
--- | ---
ASA + Power BI | Use Azure Stream Analytics and Power BI to represent the data. 
Simulator | We developed a data simulator to test the solution and created a set of tests. 
Storage of the data | We sent all the data to the Azure Table storage to build the ML model.

Day 4 | *Improve security using IoT Hub*
--- | ---
IoT Hub | Replaced the code that connected directly to Azure Storage to enhance the security using IoT Hub. We also connected an Intel Genuino 101 with environmental sensor to improve the data model.
Azure ML Model | We connected the basic Azure Machine Learning Model to Stream Analytics to get real-time predictions.
Tests | We designed a test plan to test the whole project, but mainly the Windows Service that had to run inside the control machine.

Day 5 | *Deployment and conclusions*
--- | ---
Last tweaks | We used the morning to fix all that we found during the test phase before going to the factory to install the service.
Deployment | The factory visit was the culmination of all the work, where we could see how the molding process was done.
Conclusions | On the afternoon of the last day, we discussed the future of the solution and made the cost calculations of the deployment to the whole factory.

### Solutions built during the hackfest ###

We had a very aspiring agenda, but we managed all the work in a Kanban board, where we pivoted quickly when we detected any stoppers or new scenarios. As a result, the solutions we built were not exactly what we defined at the beginning, but were much more adjusted to the project needs. So, the results of the hackfest were:

* A Windows Service connected to IoT Hub to gather and compress *CSV* documents and other direct sensor information.
* A command-line simulator, used to test the full solution without having to deploy it inside a running machine.
* Two Azure Functions: one for decompressing the files and another to extract the characteristics from the curves.
* A Stream Analytics query, to join all the data from the different files, do the last data preparation steps, and ask the Azure Machine Learning model.
* A Machine Learning model, fed with all the historical data that has been gathered by the control computer and joined with the customer labels that are retrieved one month later. This model will be retrained with new data when needed.
* An Azure Resource Manager template, so we will be able to deploy this solution multiple times.
* A Power BI dashboard to see the curves and the Azure Machine Learning-trained model results as executed in Stream Analytics for each piece in real time.

![PowerBI Dashboard]({{ site.baseurl }}/images/fagorederlan/PowerBIDemo.png)


## Architecture ##

In the technology diagram below you will find the different technologies we are using to get all the information from the machine.
On the left is the deployment we did inside the control PC, while on the right is all the technology we are using in Azure right now,
plus what we want to add in the near future, marked with a green asterisk.

![Schema]({{ site.baseurl }}/images/fagorederlan/schema.svg)


While we use a Service -> IoT Hub -> Function -> ASA -> Power BI pipeline for live data, we cannot use the same method for the historical data that is already stored in the controller computer. It is a huge amount of data that may be uploaded manually from another computer with a higher bandwidth. In any case, the work won't be done by the functions directly, but we will create an HDInsight deployment that will do the data preparation and characterization for the machine learning model. This will not be necessary for the new machines, but for all the old ones that have been working for several years.

## Device used and code artifacts ##

You will find the code at the [Fagor Ederlan repository](https://github.com/jmservera/FagorEderlan).

It contains the code for the Windows Service, the [Intel Genuino 101](https://software.intel.com/en-us/iot/hardware/curie/dev-kit) board, and all the [Azure](https://azure.microsoft.com) deployment artifacts.

![Intel Genuino 101]({{ site.baseurl }}/images/fagorederlan/genuino.jpg)


## Going forward ##

In this project, we did the data gathering in a secure, reliable, and scalable way, but there's still much work to do. Now that we have the data in the cloud, we can do incremental improvements in the machine learning models and create new ones that could offer recommendations to improve the molding process.

Another fundamental aspect of this development has been the security and the scalability of the system:

* The IoT Hub, Stream Analytics, and Azure Functions used in the project will scale easily, but the machine learning model is unique for each mold and machine, and a solution for using multiple models should be developed.
* The security of the overall system has been a big concern during the project development.

The service sending the files and gathering real-time environmental data should not open security issues in the system that controls the molding process and robot assistant—IoT Hub provides a high degree of security at scale and simplifies this kind of deployment.

## Conclusion ##

Automating the upload of files and the data preparation has solved a critical problem of the solution that the team was building. Furthermore, it opens the door to tackle the issues in near real time, saving costs and time and enhancing the quality of the product that will arrive to the customers.

The IoT solutions we have in Azure solved many of the concerns of the IT department and reduced the complexity of the solution:

* Security: No information about the storage is set at the device level; we have a secure channel communication and the ability to use certificates.
* Scalability: IoT Hub scales to millions of devices.
* Bandwidth limits: The files are compressed before sending them through the wire and uncompressed on arrival; they are also stored until the send process finishes successfully.
* Use of the existing hardware: We deployed only a lightweight Windows Service inside the control PC.
* External sensors extensibility: Adding sensors is easy because the Windows Service is extensible via a USB serial connection. We can connect an Arduino or a Genuino 101 and all the information transmitted via USB is directly sent through the IoT Hub messaging system.
* Command and control: IoT Hub allows us to build command and control solutions; adding a C2D receiver in the control PC is now very easy.
* Complexity reduction: Capturing the data, building the Machine Learning-trained model, and connecting all the parts of the solution was a complex and manual process. The services that we are using in Azure—IoT Hub, Azure Functions, Azure Machine Learning, and Stream Analytics—all provide a seamless integration among one another.

## Customer impressions ##

Natividad Herrasti (ETIC):

> Azure IoT Suite is the basic and powerful tool for the development of IoT solutions by capturing data from sensors and machines, by storing it in the cloud, by processing and extracting insights and knowledge from all data and by presenting these insights in powerful interactive dashboards. After the hackfest, ETIC has the expertise for creating and developing many new IoT solutions.

