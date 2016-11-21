---
layout: post
title:  "Building an innovative car-tracking system with Things Expert"
author: "Allan Targino"
author-link: "#"
date:   2016-11-21
categories: IoT
color: "blue"
excerpt: Microsoft teamed up with Things Expert to develop a car-tracking solution for use by car rental companies. This article describes the general execution and the results. 
language: English
verticals: Telecommunications
---


![Figure 1 - Things Expert Logo]({{ site.baseurl }}/images/ThingsExpert1.png)


Things Expert wanted to create a car-tracking solution that was more efficient than the ones already on the market. The target market for the solution would be car rental companies, which implement car tracking devices to obtain significant discounts from insurance companies. Microsoft worked with a team at Things Expert to devise such a solution. 

## Customer ##

[Things Expert](http://www.things.expert/thingsexpert/index_en.asp) is a subsidiary of Datora Telecom that focuses on research and innovation. Datora Telecom operates in the communications market, providing efficient call termination services, transportation, and outsourcing to its customers, always with the most modern technology available. 

A pioneer in the use of packet voice transmission (VoIP) technology in Latin America, Datora Telecom is an experienced provider of services to Brazil's largest telephone companies. Datora also has operations in Portugal, Spain, USA, Italy, Guatemala, and cities throughout Brazil. Datora has infrastructure such as towers and antennas, and by working through Things Expert, their innovation division, they intend to develop new businesses with the technology they already have. 

Things Expert focuses on making targeted solutions that provide data through sensors, connectivity, artificial intelligence, treatment of data and big data, and that can be customized according to the needs of each client.

For this project, the Microsoft and Things Expert team included:

* Caio Garcez – Microsoft, Technical Evangelist
* Tati Fontes – Microsoft, Audience Marketing 
* Thiago Oliveira – Microsoft, Audience Marketing intern
*	Allan Targino – Microsoft, Technical Evangelist intern
* Carmen Pedrossian – Microsoft, Partner Business Evangelist intern
*	Christiano Faig – Microsoft, Partner Business Evangelist
*	Daniel Fuchs – Things Expert, Founder & CIO
*	Thiago Schuber – Things Expert, Developer
 
## Pain point ##

Car-tracking solutions currently on the market are based on installing GPS devices on cars. This has two drawbacks: high battery consumption and high usage of data connection (incurring mobile operator costs). Microsoft and Things Expert wanted to improve an existing market solution. To do so, we needed to overcome four barriers:

*	Battery consumption
*	High data usage
*	Scalability to support an estimated 200,000 cars initially
*	Integrity of the messages, so none of the messages sent to the cloud would be lost

In our first meeting, we discussed the architecture of the solution and the technologies needed. It was decided that GSM modems would be attached to the cars. These would make a phone call, but as the call reached the call signal center, it would be intercepted and therefore not incur a charge because the call would not be from a valid phone number—it would actually be embedded latitude and longitude information. The call center that receives the call is the property of Datora Telecom, which gives viability to the expected solution.
 
## Solution ##

With this idea in mind, we designed the scheme of the solution:

1.	The GSM modem embedded in the car makes a call to the call center.

2.	The call center identifies who is calling and who is to be called, and extracts the latitude and longitude information embedded in the phone number.

3.	The call center searches an internal database to identify the company associated with the car making the call.

4.	The call center translates the GSM modem (the car) into a virtual device from the IoT Hub. If this is the first time, the center inserts the information; otherwise, it sends the data to the IoT Hub.

5.	Stream Analytics formats the data and sends it to Azure Storage table.

This structure is in regard to the first step of the solution—the insertion and manipulation of data. The second part, regarding data consumption, also was designed during the initial meeting. It looked like this:

*	The client would have two APIs to consult their data: a long-term and a short-term view.

*	The short-term API would cost the client less.

*	If a client wants to consult information older than 7 days (time characterized as long term), they would pay a higher price.

This initial architecture had some issues we would later diagnose. First was that having Datora's call center identify and match the number to the car company would not be very productive. Also, the use of IoT Hub raised some questions regarding the costs of the solution. (Later, we found out the cost with Event Hub would be about 100 times cheaper than IoT Hub given the low-length messages and the low-frequency sending.) Finally, the API management merged into only one due to the different and flexible charging plan models intrinsically present on it.

With this in mind, we made some changes to the original structure. Matching the companies to the phone numbers was moved to Stream Analytics, the two API queries were collapsed to only one, and IoT Hub was replaced by Event Hub in order to achieve a more cost-effective solution.

With this revised design, we solved all of the identified issues:

*	Battery consumption will be low because GSM modems do not use much.

*	The solution does not consume data because the calls are made via phone (and there are no charges because the calls are intercepted by the call center before they can be completed).

*	The scalability and integrity needed was reached via Event Hub

The solution we create needs to scale up well and be elastic enough to receive the messages from all cars, since the partner has estimated having up to 200,000 cars using it.

## Architecture ##

We came up with many ideas in our first brainstorming meeting. Basically, they already had developed this framework involving their mobile infrastructure and messaging through their network, but they needed to connect it to the cloud.

Once we determined their server already could send HTTP messages, we started to design the cloud connection part of the solution. See the result in Figure 2.

*Figure 1. Data insertion architecture*

![Figure 1 – Data insertion architecture]({{ site.baseurl }}/images/ThingsExpert2.png)


## Code artifacts ##

### Event Hub, Stream Analytics, and Storage tables ###

After the message from the car gets into their mobile signaling server, it sends an HTTP message to Event Hub with the GPS data and additional ID fields. A typical message is shown below (Code Snippet 1). Essentially it carries the Id_thing field (related to the IMEI or IMSI number from the GSM modem) and latitude and longitude information.  

*Code Snippet 1. Typical message sent from cars.*

```json
{
 "anum":"21960101935",
 "bnum":"008102980000000180014",
 "cgi":"724030041128843",
 "id_thing":"724180050340589",
 "lat":"-23.5813055556",
 "long":"-46.62425"
}

```

When a message enters Event Hub, Stream Analytics uses static reference data to find out whose company the car belongs to, matching the car’s ID (id_thing) with the company’s ID (account number). The Stream Analytics topology and code follows:

*Figure 2. Stream Analytics inputs and outputs topology.*
 
![Figure 2 – Stream Analytics inputs and outputs topology]({{ site.baseurl }}/images/ThingsExpert3.png)


*Code Snippet 2. Stream Analytics query code.*

```SQL
--Processing
WITH ProcessedInput AS (
    SELECT
        CASE
            WHEN LEN(id_thing) = 17 THEN CONCAT('90', id_thing)
            WHEN LEN(id_thing) = 15 THEN CONCAT('8000', id_thing)
            ELSE CONCAT('X', id_thing)
        END AS id_thing, System.TimeStamp AS datetime_event, lat AS latitude, long AS longitude, dts AS date_event, tts AS time_event, anum AS numA, bnum AS numB, cgi AS CGI        
    FROM
        Labcom01in
)

--Output: xDR
SELECT
    PI.id_thing, PI.datetime_event, Ref.account, PI.latitude, PI.longitude, PI.date_event, PI.time_event, PI.numA, PI.numB, PI.CGI
INTO
    xDRout
FROM
    ProcessedInput PI
JOIN
    Idthingrdin Ref
ON
    PI.id_thing = Ref.id_thing

```


As shown above, Stream Analytics stores the processed data on an Azure Table storage in order to be queried later by our API. 

### Azure AD, App Service, and API Management ###

With the insertion step complete, it was time to develop the API that the car companies would use. It should be secure enough to provide access and data only to authorized users with their associated account numbers. The Things Expert team decided to use Azure Active Directory (Azure AD) to both manage the users and secure the API. They also decided to use extensible properties do extend the AD schema and store the account number information, associating every user with an account number (unique for every company—this way, a single company can have multiple authorized users).

We chose ASP.NET Web API as our primary technology to build the API, due to the easy integration with Azure AD using the OpenID plug-in. It was very fast to build an API that retrieves the content of an Azure Table storage and send it in JSON format to the requester.

Combining ASP.NET Web API and Azure AD extensible properties in the controller present in the solution, we get the respective account number from authenticated user and retrieve the car's information from the Storage table. For instance, here are the models used and an action in the main controller that retrieves the information:

*Code Snippet 3. ThingEntity model, referencing to the exact way data is stored in the table.*
 
```cs
using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;

namespace ZeroMegaAPI.Models
{
 public class ThingEntity : TableEntity
 {
  // Your entity type must expose a parameter-less constructor
  public ThingEntity() { }
  
  // Define the PK and RK
  public ThingEntity(string id_thing, string datetime_event)
  {
   this.PartitionKey = id_thing;
   this.RowKey = datetime_event;
  }
  
  public string id_thing { get; set; }
  
  public DateTime datetime_event { get; set; }
  
  public string account { get; set; }
  
  public string cgi { get; set; }
  
  public string latitude { get; set; }
  
  public string longitude { get; set; }
  
  public string numa { get; set; }
  
  public string numb { get; set; }
 }
}

```

*Code Snippet 4. ThingPosition model, referencing the way data is displayed by the API.*


```cs
using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;

namespace ZeroMegaAPI.Models
{
 public class ThingPosition
 {
  public string IDThing { get; set; }
  
  public DateTime DateTimeEvent { get; set; }
  
  public string Latitude { get; set; }
  
  public string Longitude { get; set; }
 }
}
```

*Code Snippet 5. Example of an Action present in PositionController.*

```cs
[Route("api/Position")]
public async Task<IEnumerable<ThingPosition>> Get() {
 var user = getUPN();
 var account = GetAccountId(user);
 return await _repository.GetAllThingsPositions(account);
}

```

The final development step was just to host our Web API somewhere, so we chose to host it as an API in Azure App Service, which gives us the documentation of the API using Swagger, with no additional effort.

*Figure 3. Automatic Swagger documentation for the Web API.*

![Figure 3 – Automatic Swagger documentation for the Web API]({{ site.baseurl }}/images/ThingsExpert4.png)


After that, using a great [article from Steve Danielson](https://docs.microsoft.com/en-us/azure/api-management/api-management-howto-protect-backend-with-aad) in Azure official documentation, we created an API Management environment, used our Azure AD tenant as an OAuth authorization server, and just added a reference to the Azure API App using the Swagger doc file. The API Management gave us a middleware to limit and charge users per API usage, providing us great analytics and insights data.

*Figure 4. Some members of the team watching the solution work after the easy integration with API Management.*

![Figure 4 – Some members of the team watching the solution work]({{ site.baseurl }}/images/ThingsExpert5.jpg)


This way, the final data query architecture has been consolidated like this:

*Figure 5. Data query architecture.*

![Figure 5 – Data query architecture]({{ site.baseurl }}/images/ThingsExpert6.png)


## Conclusion ##

This project ended with a successful solution that gave the partner what they needed and gave Microsoft the chance to create innovative technologies, such as Event Hub. The project was implemented in three weeks with a dedicated technical evangelist in the account, helping with any issues that came up.

We accomplished our goal of making a more cost-efficient tracking solution than the ones already on the market and overcame the barriers of the project: the high battery consumption, high data usage, need for scalability, and integrity of the messages. Battery consumption and data usage no longer were a problem once we used GSM modems, and integrity and scalability were reached due to Event Hub.

A complete cycle of insertion data from GSM modems and respective data consumption from a Web API were built to support a car localization scenario, but the whole solution could be used to send any kind of relevant data from it, seen to be an incredible alternative for the existing market. Besides that, after some months of data retrieving, we could use Machine Learning to predict or learn much more about the information we initially had. 

The good relationship built during the project resulted in an open door for Microsoft at Things Expert and the possibility of developing other solutions, some already being discussed by the team.

*Figure 6. Finishing the solution delivery and pricing it. We did it!*

![Figure 6 – Finishing the solution delivery and pricing it. We did it!]({{ site.baseurl }}/images/ThingsExpert7.jpg)


