---
layout: post
title: "Using Xamarin, HockeyApp, and Azure App Service to power operations behind Chefs For Seniors"
author: "Lauren Tran, Ian Philpot, Jerry Nixon, and John Alioto"
author-link: "#"
#author-image: "{{ site.baseurl }}/images/authors/latra.jpg" 
date: 2017-01-27
categories: [Mobile Application Development with Xamarin]
color: "blue"
#image: "{{ site.baseurl }}/images/ChefsForSeniors/HackTeamSmall.png" #should be ~350px tall
excerpt: Microsoft and Chefs For Seniors teamed up to build a Xamarin app and website that would facilitate chef operations. The Xamarin app shows chefs the menus they need to prepare for their clients and provides them grocery lists with the ability to mark items as purchased. 
verticals: Service
language: English
---


Microsoft and [Chefs For Seniors](http://chefsforseniors.com/) teamed up to build a Xamarin app and website that would facilitate chef operations behind the scenes at Chefs For Seniors.

**Core team:**

- Nathan Allman – COO, Chefs For Seniors 
- Ian Philpot ([@tripdubroot](https://twitter.com/tripdubroot)) – Senior Technical Evangelist, Microsoft 
- Jerry Nixon ([@jerrynixon](https://twitter.com/jerrynixon)) – Senior Technical Evangelist, Microsoft 
- John Alioto ([@jpalioto](https://twitter.com/jpalioto)) – Principal Technical Evangelist, Microsoft 
- Lauren Tran ([@LtkTran](https://twitter.com/LtkTran)) – Technical Evangelist, Microsoft 

The Xamarin app allows chefs to view their clients and plan for upcoming meals. It shows chefs the menus they need to prepare for their clients, and provides them grocery lists with the ability to mark items as purchased. The solution also leverages Azure App Service—both Web Apps and API Apps—to host the admin portal built with Node.js and the database API layer respectively. The admin portal allows an administrator to interact with Azure SQL Database and input new menu items, clients, and chefs.

## Customer profile ##

Chefs For Seniors provides personalized in-home meal preparation for senior citizens on a weekly basis that aligns with dietary restrictions. The service includes grocery shopping, help with meal selection, in-home cooking, and companionship during meal prep.  Chefs For Seniors, a Wisconsin-based startup, relocated to the Bay Area of California for 3 months to join Batch 17 at 500 Startups. 

## Problem statement ##

Currently, the chefs at Chefs For Seniors handle their planning and operations by carrying large binders with them to their clients' homes and to the grocery store to ensure they are purchasing the right ingredients and are fully prepared to cook all of their upcoming meals. Chefs For Seniors needed to build an app as they scale in order to make operations more manageable. Their chefs largely carry Android and iOS devices, where a mobile app would greatly improve the efficiency and ease of preparing meals for clients. An admin interface and database were also needed to build and maintain a repository of menu items, recipes, clients, and chefs.

## Solutions, steps, and delivery ##

Chefs For Seniors needed to build its app for iOS and Android. Using Xamarin would allow the startup to build a cross-platform solution that shares a single code base without having to build two separate native apps. The team also leveraged Azure App Service to enable rapid development and deployment of the admin website that would be built using Node.js. The team approached the solution by building out UI, API, and database layers separately, and then integrating them together screen by screen.

<!-- ![Chefs For Seniors & Microsoft]({{ site.baseurl }}/images/ChefsForSeniors/HackTeam.png) -->
![Chefs For Seniors & Microsoft]({{ site.baseurl }}/images/ChefsForSeniors/HackTeam.png) 

<h3>Xamarin</h3>

Xamarin.Forms was the selected cross-platform technology because the application was intended for a mobile device and primarily forms over data. 

_Our Xamarin.Forms basic structure_

![Xamarin Forms Structure]({{ site.baseurl }}/images/ChefsForSeniors/J01.png) 


Because Xamarin.Forms is primarily an XAML technology, Model-View-ViewModel (MVVM) was the foundational design pattern for in-memory data management. Using Xamarin.Forms, we were able to build a single interface and run it on the UWP, iOS, and Android platforms. 

> More about Xamarin.Forms: [https://github.com/xamarin/Xamarin.Forms](https://github.com/xamarin/Xamarin.Forms) 
 
_The dashboard for Microsoft’s Visual Studio Emulator for Android_

![Visual Studio Emulator for Android]({{ site.baseurl }}/images/ChefsForSeniors/J02.png)  


Microsoft’s Visual Studio Emulator for Android was the best option for debugging the application in Android, but it has to be said that most of the application was built and tested in the UWP app, which loaded the fastest and was the easiest to debug using Visual Studio debugging tools for apps. 
 
_Our basic Prism for Xamarin.Forms references_

![Prism for Xamarin Forms references]({{ site.baseurl }}/images/ChefsForSeniors/J03.png)  



To simplify implementation and solve common problems with navigation in an MVVM app, we adopted Prism for Xamarin.Forms, a mature, best-of-breed framework that got us off the ground fast. With Prism our application had simple access to dependency injection, messaging, and view-model navigation.

> More about Prism for Xamarin.Forms: [https://github.com/PrismLibrary/Prism](https://github.com/PrismLibrary/Prism)  
 
_Our data repository interface and implementations_

![Data Repository interface]({{ site.baseurl }}/images/ChefsForSeniors/J04.png) 



In addition to MVVM and basic, platform-specific dependency injection, we leveraged the repository pattern to abstract REST calls implemented for runtime, design time, and a disconnected state. This allowed the web API to be built at a separate cadence from the mobile application. 

> More about repository pattern: [https://msdn.microsoft.com/en-us/library/ff649690.aspx](https://msdn.microsoft.com/en-us/library/ff649690.aspx)
 
_The high-level map of screen flow in the mobile application_

![Screen Flow]({{ site.baseurl }}/images/ChefsForSeniors/J05.png) 



Building the application required several considerations. First, what must be persisted across pages and within state. Second, how does navigation presume a back stack and how do we handle reverse navigation. Prism, the repository, and smart use of C# features enabled most of this easily.
 
_The basic, pre-polish interaction of the mobile client_

![GIF of Mobile App]({{ site.baseurl }}/images/ChefsForSeniors/J06.gif) 



To handle persistence across page navigation, the application preserved the type of the item being passed, while passing only its key. This serializable approach meant (at least in the UWP application) any future decision to persist navigation state upon suspension would be fully supported.

Objects were persisted by the repository, but not passed across pages. Only the key of the target type was passed in navigation. This simplified navigation, allowing the receiving view-model to call the repository using the passed key. If the object were in memory or needed to be fetched from the service was a matter for the repository only. It also prevented mistakenly referencing objects and preventing garbage collection. 

Simple types, like keys, enable deep linking. After restore, the problem with navigating back through the navigation stack remained. To resolve this, the receiving page would need to receive its parent's key and so on through the forward stack either as a parameter or static resource. This foundational project laid the groundwork for such a solution.

Significant opportunities for advanced features remain for the future revisions of the application. Specifically, a more comprehensive use of HockeyApp, the introduction of offline support through SQLite, localization of strings, deep-linking throughout the app, and other features supported by Xamarin.Forms. 

<h3>Mobile DevOps</h3>

HockeyApp allows developers to bring Mobile DevOps to their apps. It supports iOS, Android, OS X, and Windows. HockeyApp provides beta distribution, crash reporting, user metrics, feedback, and powerful workflow integrations.

We began the DevOps discussion with our partner around crash reports, but quickly learned that app analytics would have a large impact on their business process. Prior to building in HockeyApp, the partner did not have any visibility into what recipes were popular and what items needed to be purchased. This type of app analytics will enable Chefs For Seniors to improve its end-customer experience by highlighting popular dishes and menus.

This is a new application for Chefs For Seniors. The team wanted an automated solution for publishing beta versions of their app to testers. They also wanted to gain understanding of how people are using the app in the wild. HockeyApp provides both a beta distribution channel and tooling for gaining insights into users.

We also leveraged HockeyApp for a few purposes during the development lifecycle. We tracked crash reports, which provided valuable information about why the app was on different devices. We also enabled custom tracing to collect information about how the application was performing.

Integration into the application was simple. We created a package for each platform we targeted in the HockeyApp Dashboard. We then added the NuGet packages to each project in Visual Studio and initialized HockeyApp for each project. Once completed, we implemented a metrics service, shown below, that only required one line of code to log events in each project.

```cs
class MetricsManagerService : IMetricsManagerService
{
	public void TrackEvent(string eventName)
	{
#if __IOS__ || __DROID__ 
		MetricsManager.TrackEvent(eventName);
#endif

#if WINDOWS_UWP || WINDOWS_PHONE_APP || WINDOWS_APP
		Microsoft.HockeyApp.HockeyClient.Current.TrackEvent(eventName);
#endif

	}
}
```

![HockeyApp Dashboard]({{ site.baseurl }}/images/ChefsForSeniors/hockeyapp_dashboard.png) 


For custom tracing, we followed [Paul DeCarlo's pattern for using Dependency Injection (DI)](https://github.com/toolboc/HockeyApp-Integration-for-Xamarin.Forms). By programming to an interface and injecting the concrete implementation of each tracing class for each platform, we were able to reduce the amount of code it takes to implement custom traces across iOS, Android, and UWP.

![HockeyApp Service]({{ site.baseurl }}/images/ChefsForSeniors/hockeyapp_service.png)


<h3>Azure App Service</h3>

<h4>API App</h4>

The goal of the CFS API layer is to provide a REST interface for the Xamarin client app to call into. The need to scale automatically as well as have load-balancing built in on the front end made an Azure Web API a natural choice. 

The CFS API layer is a façade providing REST CRUD functionality and use-case specific endpoints to be called by the client apps. The API layer also provides Swagger metadata for each API call for easy cross-platform client SDK creation. 

_A typical controller interface allowing access to the model layer and Swagger metadata_

<!-- ![Web API Controller]({{ site.baseurl }}/images/ChefsForSeniors/WebAPIController.png) -->
![Web API Controller]({{ site.baseurl }}/images/ChefsForSeniors/WebAPIController.png)


The layout for the API layer is a typical MVC pattern with business logic in the controller layer fronting data logic in the model layer. Communication with the clients is facilitated by a DTO pattern. Each data transfer object can be used by both the client and the server side, making shared use of objects easier.  

_The solution layout with the controller classes_

<!-- ![Web API Solution Layout]({{ site.baseurl }}/images/ChefsForSeniors/WebAPISolutionLayout.png) -->
![Web API Solution Layout]({{ site.baseurl }}/images/ChefsForSeniors/WebAPISolutionLayout.png)



<h4>Web Apps</h4>

Because the Web Apps feature of Azure App Service provides excellent support for Node.js and an easy way to configure continuous integration from GitHub, we decided to host the admin portal on Azure App Service. With a small dev team, Chefs For Seniors needed a fully managed solution that would handle scaling and enable the team to easily deploy. 

The Chefs For Seniors admin portal provides an interface for an administrator at Chefs For Seniors to interact with the database. The admin can update and maintain information on chefs, clients, menu items, and ingredients. We built the admin portal with Express, Node, and Jade and npm module `tedious`—a TDS driver for connecting to SQL Server—to allow Node to execute queries on our Azure SQL database.  For example, the below code snippet makes a request to insert a new client into the database using parameters entered by the admin.

_Node.js SQL database query_

<!-- ![Node.js SQL Database Query]({{ site.baseurl }}/images/ChefsForSeniors/WebAppAddClient.png) -->
![Node.js SQL Database Query]({{ site.baseurl }}/images/ChefsForSeniors/AddClient.png)



Web Apps also allowed us to easily set our environment variables in the portal under 'Application settings'.

_Setting environment variables in Application settings_

<!-- ![Web App Application Settings]({{ site.baseurl }}/images/ChefsForSeniors/WebAppApplicationSettings.png) -->
![Web App Application Settings]({{ site.baseurl }}/images/ChefsForSeniors/ApplicationSettings.png)


The environment variables in `index.js` provide database information to enable us to connect to the SQL database.

```
var config = {  
    userName: process.env.DB_USERNAME,
    password: process.env.DB_PASSWORD,  
    server: process.env.DB_SERVER,  
    options: {encrypt: true, database: process.env.DB_NAME}  
}; 
``` 

We configured continuous integration through the Azure portal by setting the GitHub repo as the deployment source under 'Deployment options'.  

_Configuring continuous integration in Deployment options_

<!-- ![Web App Continuous Integration]({{ site.baseurl }}/images/ChefsForSeniors/DeploymentOptions.png) -->
![Web App Continuous Integration]({{ site.baseurl }}/images/ChefsForSeniors/DeploymentOptions.png)


<h3>Azure SQL Database</h3>

Chefs For Seniors had been operating off of Excel spreadsheets containing their data on meals, recipes, and ingredients for each week of service. Given the highly relational nature of their data, we decided to build them a database using Azure SQL Database, which would provide them a managed relational database solution. The database includes the tables depicted below.  

<!-- ![Azure SQL Database Diagram]({{ site.baseurl }}/images/ChefsForSeniors/DatabaseDiagram.png) -->
![Azure SQL Database Diagram]({{ site.baseurl }}/images/ChefsForSeniors/SQLDiagram.png)


In addition to setting up the database architecture, we wrote stored procedures to be called by the data logic layer. For example, `spGetClientsByChefID` returns all clients for a particular chef, with their names, email addresses, and dietary restrictions. These get operations provide the UI layer with data to present the chefs.

```
CREATE PROCEDURE [dbo].[spGetClientsByChefID] 
	@ID int
AS
BEGIN
	SET NOCOUNT ON;
	WITH ClientCTE (ID, Name, Email, DietaryRestrictions)
	AS
	(
		SELECT C.ID, C.Name, C.Email, DR.Name
		FROM CLIENT C
		INNER JOIN CHEF_CLIENT CC ON C.ID = CC.ClientID
		LEFT JOIN CLIENT_DIETARY CD ON C.ID = CD.ClientID
		LEFT JOIN DIETARYRESTRICTION DR ON CD.DietaryRestrictionID = DR.ID
		WHERE ChefID = @ID
	) 
	SELECT DISTINCT ID, Name, Email, DietaryRestrictions = 
		STUFF(( SELECT N', ' + DietaryRestrictions
		FROM ClientCTE as C
		WHERE T.ID = C.ID
		FOR XML PATH(N'')), 1, 2, N'')
	FROM ClientCTE T Group By ID, Name, Email, DietaryRestrictions
END
```
_Stored procedure `spGetClientsByChefID`._

<h3>Architecture diagram</h3>

<!-- ![Architecture Diagram]({{ site.baseurl }}/images/ChefsForSeniors/Architecture.png) -->
![Architecture Diagram]({{ site.baseurl }}/images/ChefsForSeniors/Architecture.png)


## End customer example ##

Admin portal screen for adding and removing chefs:

<!-- ![Admin Portal Chefs Page]({{ site.baseurl }}/images/ChefsForSeniors/WebAppAdminPortal.png) -->
![Admin Portal Chefs Page]({{ site.baseurl }}/images/ChefsForSeniors/AdminPortal.png)


## General lessons ##

By following an n-tier architecture, we had a significant amount of upfront work to lay the plumbing and infrastructure, but the foundation allows for scalability, extensibility, and an easy handover to the partner developers.  

In working with Web APIs in Azure App Service, we found it an extremely easy way to stand up an HTTP endpoint for our client application. Similarly, Web Apps provided very quick and simple deployment of our Node app through GitHub.  

Interacting with Azure SQL Database directly through SQL Server Management Studio can be time-consuming due to network latency. Thus, interacting with SQL Server locally and then using SQL Server Migration Wizard is a best practice.

Chefs For Seniors was very pleased with the robust architecture built and is looking forward to integrating the app into daily operations.

>"I was introduced to the tech evangelist team during my time at 500 Startups, and shared my vision for a mobile application for our team of chefs. Over the next few months, the Microsoft team worked to make that vision a reality utilizing Xamarin for development and Azure for hosting. During the Xamarin hackathon in New York, we worked collaboratively to build the foundation for our menu planning/grocery list app that will enable Chefs For Seniors to scale much easier. I thoroughly enjoyed working with the team, and am grateful for their time spent adding significant value to my startup." - Nathan Allman, COO, Chefs For Seniors

## Additional resources ##

The code for this solution has been open-sourced here: [GitHub Repository](http://github.com/laurentran/cfs)

Xamarin resources:

* [Xamarin.Forms](https://github.com/xamarin/Xamarin.Forms)
* [Prism for Xamarin.Forms](https://github.com/PrismLibrary/Prism)
* [Repository Pattern](https://msdn.microsoft.com/en-us/library/ff649690.aspx)

Web Apps resources:

* [Connect to a SQL Database Using Node.js](https://docs.microsoft.com/en-us/azure/sql-database/sql-database-develop-nodejs-simple)
* [Continuous Deployment to Azure App Service](https://docs.microsoft.com/en-us/azure/app-service-web/app-service-continuous-deployment)
* [Get Started with API Apps, ASP.NET, and Swagger in Azure App Service](https://docs.microsoft.com/en-us/azure/app-service-api/app-service-api-dotnet-get-started)
