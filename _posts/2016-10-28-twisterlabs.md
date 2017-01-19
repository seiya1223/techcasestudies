---
layout: post
title: "Using Azure Functions to facilitate human connections with Twister Labs"
author: "Lauren Tran"
author-link: "#"
#author-image: "{{ site.baseurl }}/images/twisterlabs/latra.jpg"
date: 2016-11-23
categories: [Azure App Service, Azure Functions]
color: "blue"
#image: "{{ site.baseurl }}/images/twisterlabs/twisterlabs-hackathonsmall.png" #should be ~350px tall
excerpt: At a recent hackathon in San Francisco, Microsoft teamed up with Twister Labs—a San Francisco-based startup—to migrate their stack from Parse.com to Azure and to leverage Azure's platform-as-a-service features for their core workloads.  Over the course of the two days, we migrated their stack to Azure App Service and built two Azure Functions to power an interpersonal communication feature in their app, Dostt. 
verticals: Social Media
language: English
---

## Using Azure Functions to facilitate human connections with Twister Labs ##

At a recent, two-day hackathon in San Francisco, Microsoft teamed up with Twister Labs—a San Francisco-based startup—to migrate their stack from Parse.com to Azure and to leverage Azure's platform-as-a-service features for their core workloads.  

Core team:

- Rohit Jhangiani ([@RohitJhangiani](https://twitter.com/RohitJhangiani)) – CTO, Twister Labs 
- Francisco de la Peña ([@franontherocks](https://twitter.com/franontherocks)) – CEO, Twister Labs 
- Lauren Tran ([@LtkTran](https:/twitter.com/LtkTran)) – Technical Evangelist, Microsoft 
- Rita Zhang ([@ritazzhang](https://twitter.com/ritazzhang)) – Principal Software Development Engineer, Microsoft 
- David Makogon ([@dmakogon](https://twitter.com/dmakogon)) – Senior Software Development Engineer, Microsoft 
- Bhargav Nookala ([@bhargav](https://twitter.com/bhargav)) – Senior Software Development Engineer, Microsoft 

Over the course of the two days, we migrated their stack to Azure App Service and built two Azure Functions to power an interpersonal communication feature in their app, Dostt, formerly known as Stumblr. Our solution took advantage of Azure Functions and MongoDB's aggregation pipeline to make their existing solution more scalable, instead of using Parse APIs.

![Twister Labs and Microsoft]({{ site.baseurl }}/images/twisterlabs/twisterlabs-hackteam.png?raw=true "Twister Labs and Microsoft")


## Customer profile ##

Twister Labs is a San Francisco-based startup that focuses on designing and developing human-centered mobile apps. One of their flagship apps, Dostt (*friend* in Hindi), aims to facilitate chance encounters and connect people with similar interests. 

## Problem statement ##

Twister Labs' apps were hosted on Parse.com, which is shutting down in January 2017. They were in urgent need of a new home for their back-end services. They needed a way to rewrite their "chance encounter" matchmaking approach that would leverage Azure features instead of Parse APIs.

## Solutions, steps, and delivery ##

The Microsoft Startup team met Twister Labs when they began working out of the San Francisco Reactor.  Twister Labs was evaluating multiple cloud providers, including Azure, AWS, and GCP, to host their back end.  They were interested in a serverless solution and were particularly interested in AWS Lambda.  We gave them an overview of Azure App Service, and specifically Azure Functions, to achieve the functionality they needed.

Twister Labs joined us for a hackathon, where we worked with them on their Parse migration and implementation of Azure Functions.

<h3>Parse migration to Azure App Service</h3>

First, we tackled the Parse migration by leveraging Azure App Service to host the open-sourced Parse Server.  Parse Server can be deployed to any hosting service that can run Node.js, so this was a perfect scenario for Azure Web Apps. We started by spinning up a new web app in the Azure portal.  Then, we cloned the [Parse Server Example](https://github.com/Azure/parse-server-example) and added the existing app code to the sample.  We pushed the code up to BitBucket and deployed to the web app by configuring continuous deployment in the App Deployment settings.  Once we deployed the app to Azure App Service, the next step was to migrate the database, where we took two separate approaches: 

1. We migrated the existing MongoDB data to [mlab](https://mlab.com/), a database-as-a-service provider, which is a great option for those who have never set up a MongoDB production instance before.  We chose the free tier, which worked well for testing purposes.  
2. We deployed a Ubuntu 14.04 instance and set up a MongoDB instance in the virtual machine.  We mounted a 1 TB disk to the virtual machine and configured the database to live on the mounted disk.  Finally, we migrated the data over using a backup and restore.  

<h3>Azure Functions</h3>

Next, we needed a solution to implement a critical feature of their app that would notify users about other users nearby who share similar interests. This scenario was an excellent use case for Azure Functions that could leverage both the timer trigger and queue trigger inputs. 

We designed the solution to leverage two separate Azure Functions in order to achieve scale as they bring on more users.  The first function uses a timer trigger to determine which users have enabled "chance encounter" mode by querying the MongoDB.  We set the function to run every minute to poll the database, ensuring that users continue to get matches instead of only getting one match.  For each user that currently wants to be matched, we wrote a message to an Azure Queue with the username.  When messages get added to the queue, the second function triggers and runs another database query to find user matches.  After finding a match, the function outputs to Twilio in order to send an SMS to the user.  

![Dostt on Azure - Architecture Diagram]({{ site.baseurl }}/images/twisterlabs/twisterlabs-architecture.png)

In each Azure Function, there is a `function.json` file that specifies the function's `bindings`. 

The first Azure Function takes a timer input, where the `schedule` property tells the function when to run.  In our case, the function is set to run every minute.  

```
{
    "name": "myTimer",
    "type": "timerTrigger",
    "direction": "in",
    "schedule": "0 */1 * * * *"
}
```

The output is a storage queue with connection string `dosttpeoplefinder_STORAGE`:

```
{
    "type": "queue",
    "name": "outputQueueItem",
    "queueName": "outqueue",
    "connection": "dosttpeoplefinder_STORAGE",
    "direction": "out"
}
```

The Azure portal allows you to specify the input and output bindings under the 'Integrate' tab (shown below) and generates `function.json` for you.  You can either edit the `function.json` directly or through the portal.  

Function Input: Timer

![Azure Portal Input Binding]({{ site.baseurl }}/images/twisterlabs/twisterlabs-timerinput.png)


Function Output: Queue

![Azure Portal Output Binding]({{ site.baseurl }}/images/twisterlabs/twisterlabs-queueoutput.png)


We set up continuous integration from our git repository, and the portal reflects the code.  Without CI configured, the portal allows for direct editing under the 'Develop' tab.

![Node.js Function in Azure Portal]({{ site.baseurl }}/images/twisterlabs/twisterlabs-indexjs.png)


In `index.js`, we connect to the database:

`const connectionString = process.env.DBCONNECT;`

and write the query results to the queue:

`context.bindings.outputQueueItem = username;`

The second Azure Function takes that queue as input:

```
module.exports = function (context, inputQueueItem) {
    ...
}
```

and outputs to a Twilio service to send the user an SMS:

```
var msg = screenName + ", we've found matches for you: " + friends + '!';
context.bindings.message = {
    body: msg,
    to: phone,
    from: process.env.TWILIO_FROM
};
```

We provide the Twilio `accountSid` and `authToken` in the `function.json` output binding:

```
{
    "type": "twilioSms",
    "name": "message",
    "accountSid": "TWILIO_ID",
    "authToken": "TWILIO_KEY",
    "to": "",
    "from": "",
    "body": "",
    "direction": "out"
}
```

## End customer example ##

Twister Labs is an early-stage startup.  Their application, Dostt, currently has a small user base, but the features enabled by Azure are planned to be rolled out in a near future version.  

Below shows the end-user experience with Twilio and push notifications from the "chance encounter" feature:

![Twilio texts to user]({{ site.baseurl }}/images/twisterlabs/twisterlabs-twilio.jpg?raw=true "Twilio texts to user")


## General lessons ##

Twister Labs was thrilled at how easy it was to onboard onto Azure and that we were able to migrate their app in less than 2 days.  

>“The Hackfest was amazing!! We started from scratch & learned a lot about Azure during the hackfest. We accomplished a lot in 2 days, thanks to our driven & focused team. We were able to set up: an Azure App service hosting parse, an Azure VM hosting our MongoDB w all our migrated user data, customize our parse server to configure push notifications & set up FB auth, set up the parse dashboard on Azure, configure FB auth in Azure and the coolest feature was setting up Azure functions to send push notifications and text notifications using Twilio. A big thank you to Bhargav, David, Lauren, and Rita! Documentation seems a bit out-of-date for certain features e.g. iOS/Swift 3, Stack Overflow upvotes. Portal help can be better e.g. workflow, storage options."

## Additional resources ##

The code for the Azure Functions has been open-sourced here: [peoplefinder-azurefunction](https://github.com/ritazh/peoplefinder-azurefunction)

Parse migration resources:

* [Azure welcomes Parse developers](https://azure.microsoft.com/en-us/blog/azure-welcomes-parse-developers/)
* [Parse migration guide](https://github.com/ParsePlatform/parse-server/wiki/Parse-Server-Guide)

Azure Functions input and output bindings:

* [Azure Functions timer trigger](https://azure.microsoft.com/en-us/documentation/articles/functions-bindings-timer/)
* [Azure Functions Storage queue bindings](https://azure.microsoft.com/en-us/documentation/articles/functions-bindings-storage-queue/)
* [Azure Functions Twilio output binding](https://azure.microsoft.com/en-us/documentation/articles/functions-bindings-twilio/)

*Author: Lauren Tran, Microsoft Startup Technical Evangelist* 
