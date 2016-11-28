---
layout: post
title:  "Building a PhoneGap API with Intupower"
author: "Mostafa Elzoghbi"
author-link: "#"
#author-image: "{{ site.baseurl }}/images/authors/photo.jpg"
date:   2016-11-28
categories: [Azure App Service]
color: "blue"
#image: "{{ site.baseurl }}/images/IntuPower/IntuPower-Profile.PNG" #should be ~350px tall
excerpt:   Microsoft teamed up with Intupower to build an Azure App Service API that is integrated with Office 365 services and Microsoft Graph API. The API will be the backbone for a PhoneGap mobile app.
language: English
verticals: [Education, Financial Services]
---


Microsoft teamed up with [Intupower](http://www.intupower.com) to build an Azure App Service API that is integrated with Office 365 services and Microsoft Graph API. The API will be the backbone for the PhoneGap mobile app.


Core team:

* [Mo Hasan](http://www.mzhasan.com/) – Senior Managing Partner, Intupower
* [Misty Bright](http://www.mistybright.com/) – Managing Partner, Intupower
* [Mostafa Elzoghbi](http://www.twitter.com/mostafaelzoghbi) – Senior Technical Evangelist, Microsoft

 
## Customer profile ##
Intupower is a Microsoft partner based in Washington, DC. It offers collaborative training solutions using Adaptive
Enhanced Learning&trade; and custom Office 365/SharePoint solutions. 

*Intupower website*

![IntuPower website]({{ site.baseurl }}/images/IntuPower/IntuPower-Profile.PNG "IntuPower website")

 
## Problem statement ##

Intupower is interested in providing a world-class intranet and app solution for their clients, but it faces several challenges:

- It would like to move all of its hosting services to Azure, but the team has limited knowledge of the platform. In addition to hosting its App API, it would like to move its internal WordPress sites, all of the dev environments, and all future client projects.
- Intupower's development team has never created an app for Office 365 and is finding it difficult to locate sample code and documentation through MSDN and Microsoft Support.
- Intupower is missing the internal experience and knowledge to completely take advantage of Office 365 features through an app environment. 
- Intupower is unsure if the app framework and security options it is considering are the best solutions available.

 
## Solution, steps, and delivery ##

I met with the Intupower team to discuss the project requirements and integration points with their PhoneGap App. 

First, I started by demonstrating the process of registering the RESTful Web API into Azure Active Directory (AD), 
then how to set up the app permissions to allow the API to access Office 365 services through Microsoft Graph.

The following screenshots show how to configure app registration against Azure AD.

*Office 365 app registration in Azure Active Directory*

![App Registration Process in AAD]({{ site.baseurl }}/images/IntuPower/AAD-AppReg1.PNG "App Registration Process in AAD")


*App permissions in Azure Active Directory*


![App Registration Permissions in AAD]({{ site.baseurl }}/images/IntuPower/AAD-AppReg2.PNG "App Registration Permissions")


After registering the app, we started to implement authentication and authorization against the Microsoft logon page and we created a helper class to simplify integration with Microsoft Graph.

The following code shows how to authorize a user and cache the user's email along with the user's access token after a successful logon into the web API.

*Authorizing a user upon a successful logon and caching the access token*


![Authorization in Microsoft Graph API]({{ site.baseurl }}/images/IntuPower/Code_Authorize.PNG "Authorization in Microsoft Graph API")



Then we started the API implementation to query certain services in Office 365 such as Exchange and SharePoint Online. 

We implemented an integration with Exchange Online; therefore, we were able to send emails to Office 365 users through the API. The following code shows how we implemented sending emails using Microsoft Graph.

*Sending email to a user by using Microsoft Graph through Exchange Online*

![Sending an Email to a user]({{ site.baseurl }}/images/IntuPower/Code_SendMessage.PNG "Sending an email to a user")


*An email message from the API using Microsoft Graph*

![An email message that has been sent by the API]({{ site.baseurl }}/images/IntuPower/Emails.PNG "An email message that has been sent by the API")


Then we continued our integration with SharePoint Online by implementing a capability to query sites and site lists in the API. The following code shows how we implemented this using Microsoft Graph API.

*Query SharePoint Online sites using Microsoft Graph API*


![Query SharePoint Online Sites]({{ site.baseurl }}/images/IntuPower/Code_SPSites.PNG "Query SharePoint Online Sites")


*Query SharePoint Online site lists using Microsoft Graph API*


![Query SharePoint Online Lists]({{ site.baseurl }}/images/IntuPower/SiteListsDetailsInJSON.PNG "SharePoint Lists Info in JSON")


Since the API caches the user email as a key for the user's access token in the API, the mobile app needs to send a user's email to every call to the API. On every API call, the API verifies whether a user is authenticated or not before executing to the intended method.

If a user is not authenticated, the user will be directed to the Microsoft logon page.

Once the user is authenticated, the API returns method execution status along with the user's email that would be used for any subsequent calls to the API.

*The API response to send an email through Microsoft Graph*

![The API response to send an email through Microsoft Graph]({{ site.baseurl }}/images/IntuPower/MessageSent_O365-Highlighted.PNG "The API response to send an email through Microsoft Graph")


The following is a depiction of the solution architecture.

*PhoneGap API solution architecture for Intupower*

![Solution Architecture]({{ site.baseurl }}/images/IntuPower/Architecture.PNG "Solution Architecture")


*This video demonstrates Office 365 Web API deployed to Azure App Service*


[![Project Demo video]({{ site.baseurl }}/images/IntuPower/Video1.PNG)](https://www.youtube.com/watch?v=2wv0xNNz3pI "IntuPower Demo")


We have chosen to host the Intupower API in an Azure App Service that allows Intupower to scale up as needed. In addition,
the Azure App Service allows Intupower developers to deliver updates faster to their customers through continous integration features
in Azure App Service. 

Azure App Service allows Intupower to apply transport level security by applying SSL certificates to their mobile back-end API.


**Code artifacts**

We worked with the Intupower development team to deliver this solution using the following code base:

- Office 365 Web API using Microsoft Graph, [Github Repo](https://github.com/melzoghbi/O365API) 

## General lessons ##

Intupower was extremely excited about the fast turnout of this project by implementing integration with Microsoft Graph, which allows them a seamless process to integrate Office 365 capabilities into the Intupower PhoneGap Mobile App.

While implementing the API integration with Microsoft Graph, we found that having a valid access key is mandatory to
any Microsoft Graph API calls. Therefore, upon successful logon by the user, we store the user's valid access token so that the 
mobile app doesn't send the token back and forth over the wire. This simplifies the mobile app development by calling any Microsoft Graph API method without the need to retrieve an access token on every call.

Also, the API returns the status of a method call in the response message, so that it is easier to test the implementation of the API 
without the need to send calls from the mobile application.

One of the key learnings in this project is that you can build and integrate a RESTful API using .NET Core with Microsoft Graph
that uses all underlying Office 365 services, including Exchange Online, SharePoint Online, and Azure Active Directory.


## Additional resources ##

- [Intupower website](http://www.intupower.com)
- [Intupower blog](http://www.intupower.com/blog)
- [SharePoint Network](http://sharepointnetwork.com/)
- [SharePoint Success](http://www.sharepointsuccess.com/)


