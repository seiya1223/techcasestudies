---
layout: post
title:  "How Hark replaced IaaS with Azure App Service"
author: "Marcus Robinson"
author-link: "#"
#author-image: "{{ site.baseurl }}/images/authors/photo.jpg"
date:   2017-01-07
categories:  [Azure App Service]
color: "blue"
#image: "{{ site.baseurl }}/images/imagename.png" #should be ~350px tall
excerpt: Hark is an IoT startup that moved from using traditional IaaS to Azure PaaS, enabling it to concentrate on its application rather than the infrastructure.
verticals: [Pharmaceutics, Technology]
---

Hark is an IoT startup that had carried out prototyping of its monitoring platform on IaaS. Microsoft worked with Hark to assist with the migration of services to Azure App Service to enable it to focus on its application and hence accelerate the time taken to get the service into production.

### Participants 

The core hack team included: 

- Jordan Appleson ([@jordanisonfire](https://twitter.com/jordanisonfire)) – CEO, Hark
- Andrew Hathaway ([@andrewhathaway](https://twitter.com/andrewhathaway)) – CTO, Hark 
- Julian Kay ([@juliankay](https://twitter.com/juliankay)) – CSA, Hark
- Marcus Robinson ([@techdiction](https://twitter.com/techdiction)) – Technical Evangelist, Microsoft 
- Ross Smith ([@ross_p_smith](https://twitter.com/ross_p_smith)) – Technical Evangelist, Microsoft 
- David Little – Premier Field Engineer, Microsoft

## Customer profile ##

[Hark](https://harksys.com/) is a technology company based in the United Kingdom, building an interconnected cloud-based sensor platform that allows users to monitor, store, and gain insight into their environmental data in real time. Alongside its own hardware, Hark allows any industry standard sensor to connect to its platform with an almost plug-and-play nature for rapid deployments.

## Problem statement ##

To minimize costs, Hark had been developing its application locally using technologies such as Docker and then deploying to low-cost cloud virtual machine providers. Hark made the decision to use Microsoft Azure to host its production application due to the availability of mature PaaS services.

Once Hark decided to use Azure to accelerate the development process and allow the team to focus on the product rather than maintaining server-based services, it also made the decision to use Azure native PaaS wherever possible.

## The hack ##

### Architecture overview ###

Hark had already begun migrating its web applications to Azure App Service. The desired architecture consists of a number of Azure services. This includes the Web Apps feature of App Service that hosts both customer-facing websites and APIs, with a data layer consisting of Azure Table storage and Azure SQL Database. 

<img src="{{ site.baseurl }}/images/hark/pre_hack_appservices.PNG" width="700">


### Architecture components

- An SPA accessed by users. This uses Node.js and is hosted within a virtual machine on Digital Ocean. 
- Two applications providing APIs are currently hosted within a single web app, although once the code base is separated will be hosted separately.
- A console application running inside an Azure virtual machine that processes data.
- Two event hubs and an Azure Stream Analytics job that perform data calculations.
- A number of storage locations, including Azure Storage accounts and SQL Database.

### Hack focus ###

The focus of the hack was to:

- Migrate the SPA from Digital Ocean to Web Apps.
- Split the Payload API and Website API web applications into two web apps.
- Migrate the console applications to use Azure App Service web jobs.
- Create the required Azure Resource Manager templates to enable automated deployment of App Service.

At the end of the hack the desired architecture was as follows:

<img src="{{ site.baseurl }}/images/hark/hack_arch_new.png" width="600">

--------------------------------------


### Azure Resource Manager templates

Azure Resource Manager templates allow solution infrastructure to be defined as code. This ensures consistency each time the application is deployed.

**Creating the Resource Manager templates**

Because Hark had already deployed the majority of its applications using the Azure portal rather than creating the templates from scratch, they were exported using the "automation script" feature of a resource group:

![Automation script]({{ site.baseurl }}/images/hark_automation_script.png)


Once the template was exported, a number of errors were presented:

![Automation script error bar]({{ site.baseurl }}/images/hark_automation_script_error_bar.png)


![Automation script errors]({{ site.baseurl }}/images/hark_automation_script_errors.png)


These errors are due to the fact that a number of resources are currently not supported for export. For the web app resources, this included:

- Web app config, such as application settings
- Web site extensions

A number of other issues with the template would need to be resolved, including:

- The application had been deployed into a single resource group. We required multiple resource groups.
- The template had a large number of parameters that will never be used.
- Selected resource properties that were exported show resource status/current configuration and cannot be set using a Resource Manager template.

### Web app configuration ###

Configuration for both web apps needed to be provided within the Resource Manager template. Some configuration items will change in each environment, and others will remain consistent—one example being Azure Application Insights. There is an instance of Application Insights for each web app in each environment.

The following JSON extract shows how the ```APPINSIGHTS_INSTRUMENTATIONKEY``` application setting is set based on an ```APPINSIGHTS_INSTRUMENTATIONKEY``` parameter passed in when deployed:

```
 "parameters": {
      "APPINSIGHTS_INSTRUMENTATIONKEY": {
      "type": "string"
    },
	...
 }

```

Setting the value in the appsettings resource:

```  
{
            "apiVersion": "2015-08-01",
            "name": "appsettings",
            "type": "config",
            "dependsOn": [
              "[resourceId('Microsoft.Web/Sites', variables('TopHatSiteName'))]"
            ],
            "properties": {
                "APPINSIGHTS_INSTRUMENTATIONKEY": "[parameters('APPINSIGHTS_INSTRUMENTATIONKEY')]",
         ...
             }
},
```

The compete Resource Manager template can be found here: [https://github.com/marrobi/ARMTemplates/tree/master/HARK](https://github.com/marrobi/ARMTemplates/tree/master/HARK). Please note that this was created during a hack, has been sanitized of certain information to enable publication, and will need to be worked on further before reuse.

### Using Azure App Service web jobs as opposed to console applications within a virtual machine ###

Hark does not want the overhead of managing the servers running the console applications. To remove this overhead, the processes running as console applications were migrated from a virtual machine scale set to Azure App Service Web Jobs. This only required small, isolated code changes given the way that Hark had written its event processors. The changes involved writing a wrapper around the existing services.

<img src="{{ site.baseurl }}/images/hark/webjobs.jpg" width="700">


A dedicated App Service service plan and web app were created to run the web jobs.

This can be seen in the following Resource Manager template: [https://github.com/marrobi/ARMTemplates/blob/master/HARK/webapps_eventhub_asa.json](https://github.com/marrobi/ARMTemplates/blob/master/HARK/webapps_eventhub_asa.json)

### Build and release

A large part of the hack was designing DevOps processes to automate the deployment of the solution. 

Because the application is still in early stages of deployment, we decided to have just two environments, Development and Production. Hark intends to add a separate Testing environment at a later point. We used Visual Studio Team Services to automate the release of the application. The following image shows the release pipeline for the deployment of the Resource Manager templates and associated web apps.

<img src="{{ site.baseurl }}/images/hark/ReleasePipeline.PNG" width="700">


### Migrate the SPA from Digital Ocean to Azure Web Apps ###

Because we had a release pipeline defined in Visual Studio Team Services, migration of the SPA was relatively straightforward. The main issue encountered was the time taken to deploy the web app. This was due to the huge size of the node_modules folder. During this time the web app is unavailable. As Azure Traffic Manager is implemented, there is no downtime. However, Hark intends to implement staging slots to prevent failover via Traffic Manager.

<img src="{{ site.baseurl }}/images/hark/story_slots.jpg" width="700">


## Conclusion

By the end of the hack we had successfully removed all reliance on virtual machines and along with this automated the deployment of the platform using Visual Studio Team Services. This has enabled Hark to concentrate on developing its application rather than managing infrastructure. Hark now has paying customers using the platform on Microsoft Azure.

### Azure Functions

At the time of the hack Azure Functions was in preview. We discussed the feasibility of replacing the web apps with Azure Functions during the hack but because it was in preview, the decision was made to wait until general availability. Since the hack, Jordan Appleson of Hark has migrated some of the web app functionality into functions and automated the deployment using VSTS. He has written this up in the following blog article: [http://jordanappleson.co.uk/azure/2016/12/01/deploy-azure-functions-from-visual-studio-team-services](http://jordanappleson.co.uk/azure/2016/12/01/deploy-azure-functions-from-visual-studio-team-services)

