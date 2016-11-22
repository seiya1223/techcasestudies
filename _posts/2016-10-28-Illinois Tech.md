---
layout: post
title:  "Using Azure Functions to create an attendance-taking app for Illinois Tech"
author: "Martin Schray"
author-link: "#"
#author-image: "{{ site.baseurl }}/images/authors/photo.jpg"
date:   2016-11-21
categories: [Azure App Service, Azure Functions]
color: "blue"
#image: "{{ site.baseurl }}/images/IllinoisTech/IllinoisTech.png"
excerpt: This article provides an overview and learnings from the Illinois Tech hackfest using Azure Functions, WPF, ClickOnce, and Azure Web Apps to build an RFID-reading student attendance app.
language: English
verticals: Education
---

<img src="{{ site.baseurl }}/images/IllinoisTech/IllonoisTech.png" width="600">

In this joint development effort, Microsoft teamed up with Illinois Tech's Interprofessional Projects Program (IPRO) to create an easy-to-update client application and a serverless computing back end to greatly speed IPRO course attendance taking. 

Core team:

- Jeremy Alexis – Illinois Tech Institute of Design Faculty and Director of Interprofessional Projects Program (IPRO)
- Martin Schray ([@mschray](https://twitter.com/mschray)) – Senior Technical Evangelist, Microsoft
 
In our solution, we created a Windows Presentation Foundation (WPF) app with ClickOnce updates, Azure Functions (serverless computing), web deployment slots, and continuous integration and deployment with Visual Studio Team Services.  The solution used a USB RFID reader to read student IDs to accelerate attendance taking.


## Customer ##

The [Illinois Institute of Technology](https://web.iit.edu/) (IIT), also known as Illinois Tech, is a private, technology-focused, research university offering undergraduate and graduate degrees in engineering, science, architecture, business, design, human sciences, applied technology, and law.

One of 21 institutions that are part of the Association of Independent Technological Universities (AITU), Illinois Tech offers exceptional preparation for professions that require technological sophistication, an innovative mindset, and an entrepreneurial spirit.

### The Interprofessional Projects Program at Illinois Tech ###

Illinois Tech offers an innovative and comprehensive approach to providing students with a real-world, project-based experience—the integration of interprofessional perspectives in a student team environment. Developed at Illinois Tech in 1995, [IPRO](https://ipro.iit.edu/) consists of student teams from the junior through graduate levels, representing the breadth of the university’s disciplines and professional programs. The multidisciplinary IPRO team project course experience is offered via three platforms that provide students a variety of choices that tap their passion and disciplinary knowledge.
 
## Pain point or problem area to be addressed ##

The Interprofessional Projects Program at Illinois Tech offers students a great experience in user-centric design. It has more than 40 class offerings and 800 students. All undergraduates must take two IPRO courses in which they will learn human-centric design principles and how to work with others in different technical disciplines. Most courses have an instructor and some courses have one or more teaching assistants (TAs), but this is not the norm. Most TAs are graduate students at Illinois Tech’s Institute of Design and are highly skilled and have a lot to add to courses, so the program would like to reduce the time they spend taking attendance. They are exploring several approaches to minimize the time and effort involved.  

Currently, there is a lead time of about 5 minutes to prepare the spreadsheet used to track attendance.  It also takes on average one minute per student to move from student to student, find a student's attendance record, verify their picture, and update their attendance record. For a class of 30 to 50 students, that takes a significant amount of time that could be devoted to teaching. Since there is no assigned seating and students are organized into teams, this adds to the time and challenge of taking attendance.  Most classes *do not* have a TA, which means the time-consuming task falls to the faculty. To maximize the time for teaching, some faculty do not regularly take attendance, so assessment including attendance is a continued focus at Illinois Tech. 

There is no single, integrated way to accurately assess if students are going to class. All of the different ways that people take attendance cannot easily be integrated.  It would be incredibly valuable, from an assessment perspective, to simply know how well-attended classes actually are.  By dramatically lowering the amount of time to capture attendance, faculty and TAs could have more time to teach and engage students in value-adding interactions. 

## Solution (steps and delivery) ##

The current-state value stream map shows that the current manual process is fairly well-optimized without forcing students and teams to have assigned seating, which was considered onerous to the classroom experience.  The current-state value stream map also pointed out that lowering the time to locate and record each student's attendance was the key area to address in improving the attendance-taking experience. 

![Current state]({{ site.baseurl }}/images//IllinoisTech/CurrentState.png) 

The future state in the value stream mapping shows that lead time stayed about the same (about 5 minutes), but that the time to check in each student could be lowered to around five seconds per student, which was an 83% improvement.  Our solution was to implement a Windows application that scans student RFID cards to take attendance and stores this attendance information both in a .csv for easy use by faculty, but also in the cloud for a planned future attendance reporting solution.  

![Future state]({{ site.baseurl }}/images//IllinoisTech/FutureState.png)

**Technical Details**

We call the application *Taking Names*.  We wrote a Windows Presentation Foundation (WPF) client and used Azure App Service to host the ClickOnce web application for deploying the WPF application.  We can publish the Taking Names WPF client directly from Visual Studio to our Azure App Service web application.  This ClickOnce publishing of the app provides automatic updates of the client to the attendance workstation whenever there are new features or updates.  

The Taking Names application uses a USB RFID card reader to read student RFID ID cards and check students in.  We created a series of Azure Functions that provide the cloud computing and storage of application data via Azure Table storage.  Azure Functions allow student names and IDs for all IPRO courses to be captured.  Azure Functions also provide the functionality to look up student RFID card IDs and associate them to students.  Additionally, Azure Functions are used to capture student attendance records, log system activity and events, and all other computing needs of the application.
	
We integrated Taking Names Git repository with Azure App Functions Continuous Integration/Continuous Deployment (CI/CD) functionality.  We set up this functionality via the [Azure portal](http://portal.azure.com).  

We used Azure Function's auto-scale capability to ensure the Azure Functions could meet the widely varied demand the system sees with high peaks of usage.  We set up an Azure web deployment slot to deploy from version control to staging to allow for testing and used Azure's Virtual IP swap to move seamlessly from staging to production by swapping IP (e.g., not copying bits).     

*Illinois Tech Taking Names demo video*

[![Illinois Tech taking names Demo Video](http://img.youtube.com/vi/f9MUBwbG1OA/0.jpg)](http://www.youtube.com/watch?v=f9MUBwbG1OA)


*Students scan their ID cards to indicate they are attending class*

![Students scan their ID cards to indicate they are attending class.]({{ site.baseurl }}/images/IllinoisTech/1.JPG)


*Jeremy Alexis addresses his large IPRO class*

![Jeremy Alexis addresses this large IPRO Class]({{ site.baseurl }}/images/IllinoisTech/2.JPG)



**Architecture**

The client application is a WPF app using ClickOnce deployment to allow for easy updating.  The application talks to a set of Azure Functions that provide lookup, identification, and capture of student attendance records.  The Azure Functions leverage Azure Table storage for durable and expandable cloud storage.

*Taking Names architecture*

![Taking Names Architecture]({{ site.baseurl }}/images/IllinoisTech/Architecture.png) 



**Key learnings**

Creating an application that allows effortless client application updates via CLickOnce deployment and using Azure Functions and Azure Continuous Deployment enabled the team to quickly move from concept to prototype to deployed solution.
 
## Conclusion ##

Automating the previously manual processes of capturing attendance removed a monotonous and time-consuming task from faculty and teaching assistants.  Automating attendance improved faculty and TA morale and allowed them to spend time previously lost to taking attendance on value-adding activities that improved the student classroom experience.  The value stream mapping process provided the focal point to design this improvement and change.  Azure Functions were an easy way to do "serverless computing" and allowed rapid prototyping to explore Illinois Tech's desire to bring attendance into the 21st century.

## General lessons ##

**Insights**

Looking at the value stream map, we removed a number of manual steps from the current-state process.  The team was able to deploy a technology solution allowing self-check-in and dramatically decreasing the amount of time needed for attendance taking.  The continuous integration to Azure deployment slots and ClickOnce application updates made updating the application exceptionally painless, quick, and easy.   

The Illinois Tech IPRO team is an incredibly agile organization and was thrilled to move from prototyping to quickly using this solution in its courses.  From a technical perspective, the team had the following insights:  

- Azure Functions have deployment slots (just like Azure App Service), making deployment easy.
- Azure Functions make it quick and easy to develop new capabilities without worrying about servers, virtual machines, or infrastructure.
- When deployments are complete, you can easily fire webhooks as a notification mechanism. 
- Using Azure deployment slots, you can deploy to a non-production site for testing and quickly move to production using Azure Virtual IP swapping.


**Resources**

[Azure Functions - Process events with serverless code](https://msdn.microsoft.com/en-us/library/s22azw1e.aspx)

[Azure Functions Developer Reference](https://azure.microsoft.com/en-us/documentation/articles/functions-reference/)

[Azure Storage Table Design Guide: Designing Scalable and Performant Tables](https://azure.microsoft.com/en-us/documentation/articles/storage-table-design-guide/)

[Table Service Concepts](https://msdn.microsoft.com/library/dd179463.aspx/)

[ClickOnce Security and Deployment](https://msdn.microsoft.com/en-us/library/t71a733d.aspx)

[ClickOnce Update Strategy](https://msdn.microsoft.com/en-us/library/s22azw1e.aspx)

[Azure Functions Developer Reference](https://azure.microsoft.com/en-us/documentation/articles/functions-reference/)

[Publishing a web site from source control](https://azure.microsoft.com/en-us/documentation/articles/app-service-continous-deployment/)
	
[The Azure Runtime Environment](https://github.com/projectkudu/kudu/wiki/Azure-runtime-environment)

[Setting Continuous Deployment](https://github.com/projectkudu/kudu/wiki/Continuous-deployment)

[Scale up an app in Azure](https://azure.microsoft.com/en-us/documentation/articles/web-sites-scale/) 

[Set up staging environments for web apps in Azure App Service](https://azure.microsoft.com/en-us/documentation/articles/web-sites-staged-publishing/)
	
