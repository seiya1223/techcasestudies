---
layout: post
title:  "How FishAngler extended their mobile application using Azure Functions"
author: "Joe Raio"
author-link: "#"
#author-image: "{{ site.baseurl }}/images/authors/photo.jpg"
date:   2016-11-28
categories: [Azure App Service]
color: "blue"
#image: "{{ site.baseurl }}/images/imagename.png" #should be ~350px tall
excerpt: In this App Service hackfest, Microsoft teamed up with FishAngler to replace existing worker roles and extend functionality of their mobile app using Azure Functions. 
language: English
verticals:  [Social Media, Outdoors]
---

[FishAngler](http://www.fishangler.com) is a startup based in South Florida that has a cross-platform mobile app for fishermen to log and share their catches.

The app seeks to increase the angler’s overall experience with the rollout of features that enable anglers to record, forecast, and increase their fishing skill level. The collection and segmentation of fishing data will pave the way for anglers to accurately target species like a pro.

FishAngler allows anglers to connect and benefit from community data gathered through fishing, bait, weather reports, catch locations, and more.

The project team included the following:

- Jonas Stawski [(@jstawski)](https://twitter.com/jstawski) – CTO, FishAngler
- Joe Raio [(@joescars)](https://twitter.com/joescars) – Senior Technical Evangelist, Microsoft
- Anastasia Zolochevska – SDE, Microsoft
- Zain Rizvi – Software Engineer, Microsoft

*FishAngler and Microsoft at the hackfest* 

![FishAngler and Microsoft at the hackfest]({{ site.baseurl }}/images/fishangler/the-team-hackfest.jpg)


## Pain point ##

Because FishAngler was already powered by Microsoft Azure, they came to us with two very specific requests.

*Note: The term "**Catch**" used from here forward refers to the user posting a fish that they caught using the app. The post contains pictures and metadata including location, fish type, media, and more.* 

**Item 1: Replace existing worker roles with Azure Functions**

Currently, several worker roles provide different functionality for the app. For example, there is a worker role that generates the user's home feed as new content is uploaded by other users that they follow.

FishAngler aimed to replace these worker roles with Azure Functions to speed up development because debugging worker roles was a cumbersome process. 

**Item 2: Use face detection in user pictures for smart cropping**

As users upload pictures of their catches (such as posing with fish they caught), the app needs to crop them to fit the aspect ratio of the home feed on the mobile device. Thus, sometimes a user’s face would be cropped out of the picture because they had to default to cropping from a specific side.

FishAngler aimed to create an Azure function that would use Cognitive Services Face API to detected faces in every picture that is uploaded. They could then use that data later to intelligently crop the picture on the device to make sure all faces are visible.  

### Expected results and outcome ###

By replacing existing worker roles with Azure Functions, the customer aimed to: 

- Speed up development between iterations.
- Reduce cost by switching to a serverless PaaS model versus using virtual machines on an IaaS model.
- Simplify scalablity options. 
- Extend existing functionality.

## Solution ##

The following process was put into place using Azure Functions and Cognitive Services Face API.

1. User creates a new “catch” including photos and catch information. 
2. This information is then sent to two separate existing APIs:
    * API1 – Creates record in DocumentDB with all the catch information and metadata. In addition, it creates a record in a Service Bus queuing up the catch for processing.
    * API2 – Takes the user's photos and uploads them into blob storage.
3. **HomeFeedGenerator** function monitors the Service Bus queue. As new records are created, the function triggers and generates items for the user’s home feed. 
4. **ImageFaceFinder** function monitors the container in blob storage where the photos are uploaded. As new photos are added, the image is sent to Cognitive Services Face API and an object is returned with the location of all faces in the picture. 
5. **ImageFacesAttachMeta** function receives an HTTP POST from the previous function with the source CatchId and a JSON object containing all of the face data. It then takes this data and attaches it to the original document inside of DocumentDB.

*Figure 1. Azure Portal showing functions*

![Figure 1: Azure Portal Showing Functions]({{ site.baseurl }}/images/fishangler/portal-screen.jpg)


*Figure 2. ImageFacesAttachMeta function output*

![Figure 2: ImageFacesAttachMeta Function Output]({{ site.baseurl }}/images/fishangler/record-updating.jpg)


## Architecture ##

*Figure 3. Overall architecture diagram*

![Figure 3: Overall Architecture Diagram]({{ site.baseurl }}/images/fishangler/diagram-1.png)


*Figure 4. Video walkthrough of architecture and solution*

[![Figure 4: Video walkthrough of architecture and solution]({{site.baseurl}}/images/fishangler/video-thumb.jpg)](https://channel9.msdn.com/Blogs/joeraio/FishAngler-Azure-Functions)


## Tools used and code artifacts ##

To facilitate rapid progress during the hackfest, we used continuous integration through GitHub to update and test the Azure Functions. In addition, Visual Studio code was used as the primary code editor.

All code can be found here: [https://github.com/FishAngler/AzureFunctions](https://github.com/FishAngler/AzureFunctions)

In addition, we used an [Azure Functions npm package](https://www.npmjs.com/package/generator-azurefunctions) to create the initial templates locally.

*Figure 5. Azure Functions template generator*

![Figure 5: Azure Functions Template Generator]({{ site.baseurl }}/images/fishangler/yo-generator.jpg)


*Figure 6. All Azure Functions in Visual Studio code*

![Figure 6: All Azure Functions in Visual Studio Code]({{ site.baseurl }}/images/fishangler/vscode.jpg)


## Opportunities going forward ##

FishAngler is planning to replace specific worker roles with Azure Functions where applicable. In addition, FishAngler showed interest in learning more about Microservices. We will work with them to create Microservices on Service Fabric where we think they are a better fit. 

## Conclusion ##

>I think the hackfest was a success. I had a lot of fun, learned about Functions, and met very interesting and knowledgeable people. We will check out the new features as they become available. We look forward to working with you again in the near future.

>Jonas Stawski – CTO, FishAngler

Microsoft and FishAngler worked together to come up with a solution that leverages Azure Functions and adds flexibility to their application. The hackfest was a valuable use of time for all involved and allowed us to rapidly prototype ideas and come up with many more.  

## Resources ##

- [FishAngler project code](https://github.com/FishAngler/AzureFunctions)
- [Azure Functions generator npm package](https://www.npmjs.com/package/generator-azurefunctions)
- [Visual Studio code](http://code.visualstudio.com/)
- [Azure Functions](https://azure.microsoft.com/en-us/services/functions/)
