---
layout: post
title:  "Accelerating and scaling social integration of newcomers to Sweden with Kompis Sverige"
author: "Simon Jäger"
author-link: "https://twitter.com/simonjaegr"
#author-image: "{{ site.baseurl }}/images/authors/photo.jpg"
date:   2017-01-09
categories: [Azure App Service, Power BI Embedded]
color: "blue"
#image: "{{ site.baseurl }}/images/imagename.png" #should be ~350px tall
excerpt: Learn how the Bestie app allows Kompis Sverige to accelerate and scale its work to integrate people who have found safety in Sweden. This solution is powered by components such as Azure App Service and Power BI Embedded.
language: [English]
verticals: [Social]
---

Today in Europe, millions of people are on the move, displaced by war and persecution. They are individuals, families, even children on their own. At the start of the century, only about 30 children came to Sweden with no parents or relatives. Last year, the number was 30,000.

The challenges of leaving their homes behind and starting over are immense and daunting. Many are forced to leave their country, their belongings, their friends, even as bombs smash the ground behind them. When they find safety in a new country, they must start over in an unfamiliar environment. 

They need assistance, much like someone with a broken leg, who is patched up and taught to walk again.   

- How do we make sure they find new friends? 
- How do we help them with the questions that no one has time to answer?
- How can we explain the everyday things that are confusing?
- How can we help them adopt the new ways of the culture they find themselves exposed to? 
- How do we learn from their experiences, learnings, and wisdom?

These questions and more need to be addressed in order to help these newcomers adapt and fit in. We need to know their thoughts so we can express our culture in a simple and learnable way and build the invisible bridges that lead to understanding. 

**Make our new Swedes become established Swedes.**

Sweden's Kompis Sverige, a nonprofit organization, set out to do exactly that. It builds friendships. New and established Swedes reach out and Kompis Sverige helps to connect them and form relationships.

The need for new Swedes to find someone to learn from is huge, and the willingness of established Swedes to help is even greater. Now what is needed is to create those bridges in a more efficient way, one that supports the objective of finding and matching people so they can share and learn from each other and ultimately become lifelong friends.

Kompis Sverige and Microsoft set out to create a technical solution to help accelerate and scale this vision, which Kompis Sverige also wants to export to other countries around the world. They believe the need to connect is truly universal.

In this case study, we will cover the ideas, takeaways, and learnings from developing the custom web app “Bestie” for Kompis Sverige.
It's a solution that relies heavily on many PaaS (Platform as a Service) solutions in Microsoft Azure, such as Azure App Service (Web Apps and Functions), Power BI Embedded, Azure Active Directory, and Azure SQL Database.  

To understand what the solution achieves, we need to look at how Kompis Sverige operates today. Broken down to its simplest form, its objective is to create friendships based on individual terms and attributes. This is done first by collecting the profile data—for instance, by conducting an interview and asking a set of standardized questions. The data is then collected in a content management system. Later someone will look at this profile while browsing the data to locate a good match based on the answers gathered from the interview.

The objective of Bestie is to accelerate and extend this procedure and workflow. Allowing profile data to be gathered in a controlled way enables compute power to be put into the mix. Bestie enhances the workflow by allowing self-interviews (published to the web), but most importantly by matching two profiles. What "matching two profiles" means in this context is to introduce them as friends. 

Through a set of customizable rules, the team can instruct the web app to provide suggestions right away for profile matches, giving the customer a user interface with suggestions to support their decisions. This can reduce time and improve accuracy in matches, allowing Kompis Sverige to focus more on growing their business instead of performing tasks that could be automated.

A key issue for the current solution has been security. Much emphasis has been placed on this, and many practices have been put into effect to make sure that sensitive data stays secure and recoverable. 

![Screenshot of Bestie]({{ site.baseurl }}/images/bestie/screenshot1.png)


### Key technologies ###

- **Web Apps** – Hosting both the production and a staging environment.
- **Azure Functions** – Data processing to enable real-time data for Power BI Embedded, mail notifications, and other tasks.
- **Power BI Embedded** – Providing the reporting features.
- **Azure SQL Database** – Data storage.
- **Azure Active Directory (Office 365)** – Identity and security.
- **Microsoft Graph** – Provides access to enriching user data.

### Core team ###

- **Simon Jäger** – Development Lead, Microsoft
- **Anders Wedahl** – Business Development, Microsoft 
- **Urban Falk** – Business Development, Microsoft 
- **Tess Ferrandez** – Developer, Microsoft
- **Elina Blomberg** – Project Leader, Kompis Sverige 
- **Natalie Engdahl** – Chief Operating Officer, Kompis Sverige
- **Natassia Fry** – Founder, Kompis Sverige
- **Pegah Afsharian** – Founder, Kompis Sverige

## Customer profile ##

The initiative was conducted by [Kompis Sverige](http://kompissverige.se/) and Microsoft. Kompis Svergie’s vision is to erase the boundaries between new and established Swedes. They want to open up Sweden by creating interactions and relations between people. Friendships provide the foundation for valuable exchanges, it broadens the perspectives, reduces language barriers, and breaks apart stereotypes. By creating friendships on individual grounds, they can provide the necessary tools and conditions for a well-functioning and multicultural society—a Sweden where the boundaries between new and established Swedes are erased. 

> **"In order for our society to develop and reach its full potential, we need a sense of security and belonging to each other."**

>**-Kompis Sverige**

  ![Kompis Sverige Logo]({{ site.baseurl }}/images/bestie/logo.png)
  


## Problem statement ##

The customer operates in a very dynamic way, as they’re changing and evolving their workflow and way of conducting interviews to gather data. This means the underlying data model must support a very flexible and ever-changing nature. This gave the team a set of challenges for modeling real-time reports and establishing workflows.

The challenges the solution set out to solve in terms of customer and technical needs can be summarized as such:

- Maintain a dynamic data-model while still providing the foundation for reporting visualizations and analyzation tools.
- Provide reporting and data in real time.
- Establish security, roles, and recovery practices to ensure any sensitive data stays safe.
- Perform recurring background work and processing to automate the system to its fullest extent (mailing, texting, cleanups, data processing, and so on).
- Provide valuable data and insights for the customer to sharpen their decisions when creating friendships and reducing manual labor (by automation).
- 100% PaaS components. 

## Solution, steps, and delivery ##

### Architecture overview ###

The solution consists of a multitude of Azure technologies (see [Key Technologies](#key-technologies)) and a few third-party solutions. Everything is contained within a single [Azure Resource Group](https://docs.microsoft.com/en-us/azure/azure-resource-manager/resource-group-overview) and consists entirely of PaaS components. This allows for the customer to reduce maintenance costs. 

![Architecture Diagram of Bestie]({{ site.baseurl }}/images/bestie/architecture1.png)


The solution is served via a set of Web Apps (a feature of Azure App Service), backed by a few Azure Functions. The front end is built with the ASP.NET Core framework, sharing the business logic in .NET with the Azure Functions.

Data visualizations and analyzations are embedded into the solution with Power BI Embedded. 

The data layer consists of three Azure SQL Databases: application data, business intelligence data, and backup data.  

Both [SendGrid](https://sendgrid.com/docs/Integrate/Partners/Microsoft_Azure.html) and [46elks](https://46elks.com/) provide additional abilities for the Azure Functions to perform various tasks (such as mailing, SMS texting, and so on).

The solution relies on [Microsoft Graph](https://graph.microsoft.io/en-us/) and Azure Active Directory Graph to enrich the user experience, including user details, photos, application roles, and more. 

The solution is monitored with the Azure portal using custom dashboards. 

![Azure Dashboard for monitoring Bestie]({{ site.baseurl }}/images/bestie/dashboard.jpg)


### Web Apps ###

The solution is hosted in Web Apps (a feature of Azure App Service). The production and staging environments share the Azure App Service Plan and are located on different web apps. The staging environment is a deployment slot of the production environment. All of the deployments are made toward the staging environment.

**Deployment slots and swapping**

This setup allows us to keep the production-ready and tested code on a single environment (production). This is crucial when minimizing the development disturbance for the users. The users with little room for error and no role in the development are directed to the production environment, whereas the project leaders from Kompis Sverige may access the staging environment to evaluate and test features, before it is deployed in the production environment.

Once a set of features has matured in the staging environment, a swap of the two environments is made. This occurs almost instantly (done via the Azure Portal) and allows us to keep a backup of the previous production environment. This is useful in scenarios where a mission-critical error may slip into the production environment and we must recover swiftly. In such cases, we will simply swap the environments again, thus minimizing the impact for the users.

![Swapping of Azure Web App environments]({{ site.baseurl }}/images/bestie/swapping.gif)


**Minimizing load times**

The solution takes care of collecting profile data from interviews, conducted by anyone getting access to a form from Kompis Sverige. It is crucial that we make sure to deliver and render the form in the user’s web browser as fast as possible.

There are many things you can do in terms of the application code and execution, but there is a clever feature in the application settings of the Azure Web App that we used. By default, Azure Web Apps are unloaded once they’ve been idle for a while. To counter this, we turned on the AlwaysOn feature in the application settings. This ensures that the web app stays loaded and ready to serve incoming requests at any hour.

![The AlwaysOn feature for Azure Web Apps]({{ site.baseurl }}/images/bestie/alwayson.png)


### Azure Functions ###

The solution relies heavily on Azure Functions to perform tasks from routine housekeeping to data processing. We developed the Azure Functions alongside the Azure Web App, sharing a common code base in C#.  

Each of the Azure Functions has been defined as a timer trigger. This means each and every Azure Function will run independently on a set time interval. We created definitions for this with multiple function.json files in the root folder of the Azure Function.

```json
{
    "bindings": [
      {
        "type": "timerTrigger",
        "name": "timerInfo",
        "schedule": "0 */15 * * * *",
        "direction": "in"
      }
    ]
}
```

The schedule property in the bindings array is a [CRON expression](https://docs.microsoft.com/en-us/azure/azure-functions/functions-bindings-timer#schedule-examples). This is a string that represents the time interval for the Azure Function to be triggered.

These are the Azure Functions built for the solution.

**Mail processing (every 15 minutes)** 

This Azure Function takes care of any automated mail deliveries. The users of the solution can configure mails and timeframes for which these mails should be delivered. They can define a timeline of mails to be delivered depending on the status of interviewed profiles.

The Azure Function was connected to a [SendGrid](https://docs.microsoft.com/en-us/azure/app-service-web/sendgrid-dotnet-how-to-send-email) account, located in the same Azure subscription. The SendGrid service then takes care of delivering the mails with appropriate signatures and formatting.  

As the Azure Functions are written in C#, integrating with the SendGrid client library is straightforward. We used the NuGet Package Manager to install the [SendGrid.CSharp.Http.Client](https://github.com/sendgrid/csharp-http-client) client library into the project. The Azure Function must then load the assembly, which can be done by referencing the binaries at the top of the *.csx file.

```cs
#r "..\bin\SendGrid.dll"
#r "..\bin\SendGrid.CSharp.HTTP.Client.dll"

The mail delivery is then done as the following.

/// <summary>
/// Sends a mail using SendGrid. </summary>
/// <param name="to"> The recipient of the mail. </param>
/// <param name="mail"> The mail to send. </param>
/// <returns> A boolean indicating the success of the call. </returns>
private async Task<bool> SendMailWithSendGridAsync(string to, Mail mail)
{
    try
    {
        // Get the HTML content for the mail.
        var htmlContent = CreateMailHtmlContent(mail);

        // Create the SendGrid mail details.
        var sendGridMail = new SendGrid.Helpers.Mail.Mail(
            new Email(SendGridConfiguration.SenderEmailAddress, "Kompis Sverige"), 
            mail.Subject, new Email(to), new Content("text/html", htmlContent));

        // Send the mail.
        Response response = await SendGridClient.client.mail.send.post(requestBody:
            sendGridMail.Get());
        return response.StatusCode == HttpStatusCode.Accepted;
    }
    catch
    {
        // Ignored.
    }
    return false;
}
```

**Power BI Embedded data processing (every hour)**

Because the data model for the application is an open schema (see [Problem Statement](#problem-statement)), this made it very difficult and compute-intensive to allow for Power BI (or any other data visualization/analyzation solution) to work with. In addition, when building the visualizations (reports), the users should not have access to some of the sensitive application data that exists (see [Security](#security)).

To solve this problem, we built an Azure Function to construct a normalized schema with data. It also takes care of removing much of the sensitive data, allowing only information out of visualization/analyzation interest to be processed. 

The data is then moved into a separate Azure SQL Database (see [Azure Functions](#azure-functions)) by the Azure Function. This is done by creating SQL commands that clean, update, and insert data.

Allowing the customer to build Power BI reports on a great data model and to use [DirectQuery](https://powerbi.microsoft.com/en-us/documentation/powerbi-desktop-use-directquery/) in Power BI. This ensures that reports can be built with real-time data from the Azure SQL Database.

Ultimately, the Power BI visualizations are uploaded and embedded into the solution (see [Power BI Embedded](#power-bi-embedded)). The visualizations will then acquire the newest data processed by the Azure Function, using DirectQuery.

**Profile unlocking (every 15 minutes)**

The solution automatically assigns ownerships (locks) for profiles to users when they are being actively worked on. This prevents situations where certain actions taken by a user on a profile would negatively affect other users working on the same profile. 

This Azure Function is a pure housekeeping task that makes sure to release these ownerships when a user is no longer working on the locked profiles.

**Notifications (every 60 minutes)** 

Once a profile has been registered in the system and been given a date for a meeting, a text message (SMS) will be sent, detailing the time and place. The interviewed profile is also able to respond to the text, allowing the profile to notify the system if he/she is unavailable. The profile owner will then be able to respond accordingly. 

This Azure Function has the responsibility to send these text messages on the same day that the meetings will occur. These text messages are delivered through [46elks](https://46elks.com/) SMS service and their REST API. The Azure Function issues simple HTTP requests to perform the operations, as such:

```cs
// Ensure that the country code is included.
var verifiedNumber = EnsureCountryCode(number);

// Clamp the message.
var truncatedMessage = message.Substring(0, Math.Min(message.Length, maxLength));
truncatedMessage = truncatedMessage.Trim();

// Create the status update URI.
var whenDeliveredUri = $"{ElksConfiguration.StatusUrl}/api(v1.1)/sms/{sms.Id}/status";

// Create the API credentials.
var credentials = Convert.ToBase64String(Encoding.ASCII.GetBytes(
    $"{ElksConfiguration.Username}:{ElksConfiguration.Password}"));

// Create the HTTP client.
var httpClient = new HttpClient();
httpClient.DefaultRequestHeaders.Authorization = new AuthenticationHeaderValue("Basic", credentials);

// Create the HTTP message.
var content = new FormUrlEncodedContent(new[]
{
    new KeyValuePair<string, string>("from", ElksConfiguration.From),
    new KeyValuePair<string, string>("to", verifiedNumber),
    new KeyValuePair<string, string>("message", truncatedMessage),
    new KeyValuePair<string, string>("whendelivered", whenDeliveredUri),
});

// Send the request.
var response = await httpClient.PostAsync($"{ElksConfiguration.ApiUrl}/a1/SMS",
    content);
```

**User synchronization (every 30 minutes)**

The entire identity for the solution is backed by Azure Active Directory. Some of the data needs to be present and quickly accessible (such as Azure Active Directory roles, profile pictures, and so on). 

This Azure Function makes sure to cache the critical data in the Azure SQL Database. This also enables the solution to deliver some of this data in circumstances where an Azure Active Directory application/user access token isn’t present. 

As this is a headless solution where any UI cannot be presented, this Azure Function needs to acquire an Azure Active Directory application access token to access data from Azure Active Directory. This is done by requesting the Directory.ReadWrite.All scope with an HTTP POST call as such:

```cs
/// <summary>
/// Acquires an Azure Active Directory application token. </summary>
/// <param name="resource"> The resource to gain access to. </param>
/// <returns> An access token. </returns>
public async Task<string> GetAppAccessTokenAsync(string resource)
{
    try
    {
        // Create the request body.
        var values = new List<KeyValuePair<string, string>>
        {
            new KeyValuePair<string, string>("grant_type", "client_credentials"),
            new KeyValuePair<string, string>("client_id", ClientId),
            new KeyValuePair<string, string>("client_secret", ClientSecret),
            new KeyValuePair<string, string>("redirect_uri", RedirectUri),
            new KeyValuePair<string, string>("resource", resource),
            new KeyValuePair<string, string>("scope", "Directory.ReadWrite.All")
        };

        var body = new FormUrlEncodedContent(values);

        // Get the response.
        var httpClient = new HttpClient();
        var response = await httpClient.PostAsync(new Uri($"https://login.microsoftonline.com/{TenantId}/oauth2/token"),
            body);
        var content = await response.Content.ReadAsStringAsync();

        // Deserialize result.
        var result = JsonConvert.DeserializeObject<AadTokenResponse>(content);
        return result.AccessToken;
    }
    catch
    {
        // Ignored.
    }
    return null;
}
```

Once an Azure Active Directory application access token has been acquired, the Azure Active Directory Graph API can be called. All of the details such as Azure Active Directory tenant identifiers, client identifiers, client secrets, and so on aren’t stored in the Azure Function code for security reasons. Instead, these are stored in the app settings (see [Security](#security)) of the Azure Function. These can then be accessed with the [CloudConfigurationManager](https://www.nuget.org/packages/Microsoft.WindowsAzure.ConfigurationManager/). 

```cs
// Get the Azure Active Directory application token resolver.
var aadAppTokenResolverService = new AadAppTokenResolverService(
    CloudConfigurationManager.GetSetting("Authentication:AzureAd:TenantId"),
    CloudConfigurationManager.GetSetting("Authentication:AzureAd:PostLogoutRedirectUri"),
    CloudConfigurationManager.GetSetting("Authentication:AzureAd:ClientId"),
    CloudConfigurationManager.GetSetting("Authentication:AzureAd:ClientSecret"));

// Get the Azure Active Directory application access token.
var accessToken = aadAppTokenResolverService.GetAppAccessTokenAsync(
    CloudConfigurationManager.GetSetting("AadGraph:Resource"));
```

### Power BI Embedded ###

The solution relies heavily on Power BI Embedded for its internal and external reporting. We integrated the reporting into the dashboard views, allowing for quick access and a daily overview of the progress. 

We built the reports using the Power BI [DirectQuery](https://powerbi.microsoft.com/en-us/documentation/powerbi-desktop-use-directquery/) feature. This enables the reports to query the datasets once they are loaded into the browser (real time). 

Because the underlying data model is extremely dynamic, a dedicated Azure Function exists to process and create normalized and anonymized data for Power BI Embedded to query (see [Azure Functions](#azure-functions)).

While the reports are changing as the customer makes adjustments to data they collect and are interested in, many analyzations can be done right on the dashboard view by anyone with access to the solution. 

![Power BI Embedded in Bestie]({{ site.baseurl }}/images/bestie/pbie.gif)


The Power BI Embedded report is embedded using the [angular-powerbi](https://github.com/Microsoft/PowerBI-Angular) module. The module provides the iframe for where the Power BI Embedded surface area can be rendered. This is done as such:

```html
<powerbi-report class="powerbi-dashboard-report"
                on-embedded="ctrl.onEmbedded($embed)"
                embed-url="powerbi.embedUrl" 
                access-token="powerbi.jwt"
                options="powerbi.options"></powerbi-report>
```

In order to authenticate Power BI Embedded, a JWT token must be passed to it. During the development an SDK was not available for Power BI Embedded for ASP.NET Core, so we ported a version of the [PowerBIToken](https://github.com/Microsoft/PowerBI-CSharp/blob/827c9f53c1ec7ee62cd0d6a306c347194fa2858e/sdk/PowerBI.Core/Security/PowerBIToken.cs) class (located in the SDK) for the solution.

The data to render the report (Power BI Embedded Report URL, token, optional options, and so on) are provided from the server side of the solution to the client. The server side uses the [Power BI Embedded REST API](http://docs.powerbi.apiary.io/#) (detailed below) to gather the necessary data. The REST API is consumed with the built-in HTTP-stack in .NET Core.

```cs
// Generate token.
var embedToken = PbieToken.Create(PbieConfiguration, setting.Value);
var jwt = embedToken.Generate();
```

The customer is able to work within Power BI Desktop to build reports and analyze data. A challenge that existed was to streamline the workflow from Power BI Desktop into the solution itself (embedded). This was solved by allowing for Power BI Desktop documents to be uploaded into the solution, and using the above code, embedding them.

During the development an SDK was not available for Power BI Embedded for ASP.NET Core, so we had to develop the entire flow using the built-in HTTP-stack. 

To achieve this properly, we developed a workflow with six operations:

- Import the Power BI Desktop document file.
- Wait for the import to finish (by polling the state).
- Set the connection string of the data set.
- Get the data source of the report.
- Set the data source credentials.
- Delete the old report (if necessary). 


![Power BI Embedded Architecture of Bestie]({{ site.baseurl }}/images/bestie/architecture2.png)


This is then achieved by invoking the UploadPbixFileAsync method in the following code:

```cs
/// <summary>
/// Uploads a Power BI Desktop document file. </summary>
/// <param name="stream"> The file contents to upload. </param>
/// <returns> The import. </returns>
public async Task<PbieImport> UploadPbixFileAsync(Stream stream)
{
    // Create the content.
    var multiPartContent = new MultipartFormDataContent
    {
        new StreamContent(stream)
    };

    // Import the .PBIX file.
    var import = await ImportPbixFileAsync(multiPartContent);

    // Wait for the processing to complete.
    var startTime = DateTime.UtcNow;
    while (import.ImportState != "Succeeded")
    {
        // Get the new import status.
        import = await GetImportAsync(import.Id);

        if (import == null || DateTime.UtcNow - startTime > TimeSpan.FromMinutes(60))
        {
            return null;
        }
    }

    // Get the data set and report.
    var dataSet = import.Datasets.FirstOrDefault();
    var report = import.Reports.FirstOrDefault();
    if (dataSet == null || report == null)
    {
        return null;
    }

    // Update the data set connection string.
    var result = await UpdateDataSetConnectionAsync(dataSet);
    if (!result)
    {
        return null;
    }

    // Get the data sources.
    var dataSources = await GetDataSourceAsync(dataSet);
    if (dataSources == null || dataSources.Length == 0)
    {
        return null;
    }

    // Get the data source.
    var dataSource = dataSources.First();

    // Update the data source credentials.
    result = await UpdateDataSourceCredentialsAsync(dataSource);
    if (!result)
    {
        return null;
    }

    // Get the settings.
    var reportSetting = DbContext.Settings.FirstOrDefault(s => s.Name == PbieConfiguration.ReportKey);
    var dataSetSetting = DbContext.Settings.FirstOrDefault(s => s.Name == PbieConfiguration.DataSetKey);

    // Delete the old data set (if needed).
    if (dataSetSetting != null)
    {
        await DeleteDataSetAsync(new PbieDataSet
        {
            Id = dataSetSetting.Value
        });
    }

    // Create settings if needed.
    if (reportSetting == null)
    {
        DbContext.Settings.Add(reportSetting = new Setting
        {
            Name = PbieConfiguration.ReportKey
        });
    }

    if (dataSetSetting == null)
    {
        DbContext.Settings.Add(dataSetSetting = new Setting
        {
            Name = PbieConfiguration.DataSetKey
        });
    }

    // Update setting values.
    reportSetting.Value = report.Id;
    dataSetSetting.Value = dataSet.Id;

    // Save the changes.
    await DbContext.SaveChangesAsync();
    return import;
}

/// <summary>
/// Imports a Power BI Desktop document file. </summary>
/// <param name="content"> The file contents to upload. </param>
/// <returns> The import. </returns>
public async Task<PbieImport> ImportPbixFileAsync(HttpContent content)
{
    try
    {
        // Get the response.
        var name = "Report" + Guid.NewGuid().ToString().Replace("-", "").Substring(0, 10);
        var uri = GetUri($"imports?datasetDisplayName={name}");
        var response = await HttpClient.PostAsync(uri, content);

        // Deserialize the response.
        var data = await response.Content.ReadAsStringAsync();
        var import = JsonConvert.DeserializeObject<PbieImport>(data);
        return import;
    }
    catch
    {
        // Ignored.
    }
    return null;
}

/// <summary>
/// Gets an import object. </summary>
/// <param name="id"> The the ID of the import object. </param>
/// <returns> The import. </returns>
public async Task<PbieImport> GetImportAsync(string id)
{
    try
    {
        // Get the response.
        var uri = GetUri($"imports/{id}");
        var response = await HttpClient.GetAsync(uri);

        // Deserialize the response.
        var data = await response.Content.ReadAsStringAsync();
        var import = JsonConvert.DeserializeObject<PbieImport>(data);
        return import;
    }
    catch
    {
        // Ignored.
    }
    return null;
}

/// <summary>
/// Updates the data set connection settings </summary>
/// <param name="dataSet"> The data set to update the connection settings for. </param>
/// <returns> A boolean indicating the success of the update. </returns>
public async Task<bool> UpdateDataSetConnectionAsync(PbieDataSet dataSet)
{
    try
    {
        // Get the response.
        var uri = GetUri($"datasets/{dataSet.Id}/Default.SetAllConnections");
        var data = new PbieDataSetConnection
        {
            ConnectionString = PbieConfiguration.ConnectionString
        };
        var response = await HttpClient.PostAsJsonAsync(uri, data);
        return response.IsSuccessStatusCode;
    }
    catch
    {
        // Ignored.
    }
    return false;
}

/// <summary>
/// Gets the data sources for a data set. </summary>
/// <param name="dataSet"> The data set to get the data sources for. </param>
/// <returns> The data sets. </returns>
public async Task<PbieDataSource[]> GetDataSourceAsync(PbieDataSet dataSet)
{
    try
    {
        // Get the response.
        var uri = GetUri($"datasets/{dataSet.Id}/Default.GetBoundGatewayDataSources");
        var response = await HttpClient.GetAsync(uri);

        // Deserialize the response.
        var data = await response.Content.ReadAsStringAsync();
        var dataSources = JsonConvert.DeserializeObject<PbieDataSources>(data);
        return dataSources.Value.ToArray();
    }
    catch
    {
        // Ignored.
    }
    return null;
}

/// <summary>
/// Updates the data source credentials settings. </summary>
/// <param name="dataSource"> The data source to update the credentials for. </param>
/// <returns> A boolean indicating the success of the update. </returns>
public async Task<bool> UpdateDataSourceCredentialsAsync(PbieDataSource dataSource)
{
    try
    {
        // Get the response.
        var uri = GetUri($"gateways/{dataSource.GatewayId}/datasources/{dataSource.Id}");
        var data = new PbieDataSourceCredentials
        {
            CredentialType = "Basic",
            BasicCredentials = new PbieDataSourceBasicCredentials
            {
                Username = PbieConfiguration.Username,
                Password = PbieConfiguration.Password
            }
        };
        var response = await HttpClient.PatchAsJsonAsync(uri, data);
        return response.IsSuccessStatusCode;
    }
    catch
    {
        // Ignored.
    }
    return false;
}

/// <summary>
/// Deletes a data set. </summary>
/// <param name="dataSet"> The data set to delete. </param>
/// <returns> A boolean indicating the success of the delete. </returns>
public async Task<bool> DeleteDataSetAsync(PbieDataSet dataSet)
{
    try
    {
        // Get the response.
        var uri = GetUri($"datasets/{dataSet.Id}");
        var response = await HttpClient.DeleteAsync(uri);
        return response.IsSuccessStatusCode;
    }
    catch
    {
        // Ignored.
    }
    return false;
}

/// <summary>
/// Gets a request URI. </summary>
/// <param name="resource"> The resource to access. </param>
/// <returns> A request URI. </returns>
public Uri GetUri(string resource)
{
    return new Uri(BaseUrl + resource);
}
```

The end result allows the customer to upload and edit their embedded reports in a very flexible manner. 

![Uploading Power BI Desktop document in Bestie]({{ site.baseurl }}/images/bestie/uploading.gif)


### Outlook add-in ###

A part of the Web Apps feature is the ability to integrate with Outlook. Doing so is straightforward, as we leveraged the existing solution and simply extended it. The Outlook add-in acquires an identity token (JWT) for the user (provided by the [Office.js](https://dev.office.com/reference/add-ins/javascript-api-for-office) library).

The Web API then validates the identity token, looks up the correct Azure Active Directory user, and creates a session token. We then used this token for the Outlook add-in to communicate with the Web API.

We achieved the validation with the [Exchange Web Services Managed API](https://www.nuget.org/packages/Microsoft.Exchange.WebServices/) library. The validation also checks the audience claim of the identity token, which is the host URI of the Outlook add-in. Therefore, it must be passed to the Web API along the identity token itself.

```cs
// Validate the token.
var token = (AppIdentityToken)AuthToken.Parse(value.Jwt);
token.Validate(new Uri(value.RequestUri));
```

Initializing the Outlook add-in and acquiring the identity token with the Office.js library.

```js
// Initialize the Office context.
Office.initialize = function(reason) {
    // Acquire the identity token.
    Office.context.mailbox.getUserIdentityTokenAsync(function (result) {
        if (result.status !== 'succeeded') {
            return;
        }

        // Create the embedd session.
        var hostUri = window.location.href.split('?')[0];
        embeddService.createSession(new Data.EmbeddSession(<any>{
            jwt: result.value,
            requestUri: hostUri
        })).then(function (embeddSession) {
            if (!embeddSession) {
                return;
            }

            // ....
        }.bind(this));
    }.bind(this));
}.bind(this);
```

![Outlook Add-in for Bestie]({{ site.baseurl }}/images/bestie/addin.gif)


### Security ###

Because the solution consists of multiple parts, different types of security have been applied for different areas. 

**Web App/Web API**

The communication is made using (HTTPS) SSL encryption. The majority of the Web API operations requires a valid access access/identity (JWT) token to be passed throughout the request pipeline. The authentication layer is configured with the ASP.NET Core OpenID Connect middleware (based upon OAuth 2.0). The authentication layer ensures that the correct client (Azure Active Directory application registration) and authority (Azure Active Directory instance and domain) are trying to access the solution.

We configured the Azure Active Directory application with two types of roles. These are "Project Leader" and "Administrator," reflecting the two types of tasks and privileges you may need to perform within the solution. The roles are defined in the Azure Active Directory application manifest as such:

```json
"appRoles": [
  {
    "allowedMemberTypes": [
      "User"
    ],
    "description": "Project Leaders can view and manage profiles.",
    "displayName": "Project Leader",
    "id": "[GUID]",
    "isEnabled": true,
    "value": "ProjectLeader"
  },
  {
    "allowedMemberTypes": [
      "User"
    ],
    "description": "Administrators can manage the application and perform all actions.",
    "displayName": "Administrator",
    "id": "[GUID]",
    "isEnabled": true,
    "value": "Administrator"
  }
]
```

Once the Azure Active Directory user has been assigned one of the two roles, a claim containing the role is included within the token that is passed throughout the solution. The token is validated using the signature and the role claim is then trusted and enforced. 

Different views are displayed depending on the user role. For instance, administrative actions are not presented to a user with a project leader role. As for the Web API, depending on the operation requested in the Web API, a different role type may be required. If the correct type of role isn’t presented in a Web API operation, it is simply blocked.

**Role management**

Assigning and removing Azure Active Directory application roles in the Azure Active Directory application can be done via the Azure Management Portal. To provide a better user experience, we integrated this functionality into the solution using the Azure Active Directory Graph API. 

Consuming the Azure Active Directory Graph API is ideally done with a client library. However, (at the time of this writing) there exists an issue in the client libraries for assigning Azure Active Directory application roles. Instead, this was achieved with simple REST operations.

This was done as illustrated below.

```cs
/// <summary>
/// Gets the app role assignments for the application. </summary>
/// <returns> An array of app role assignments. </returns>
public async Task<AadAppRoleAssignment[]> GetAppRoleAssignmentsAsync()
{
    try
    {
        // Create the HTTP client.
        var httpClient = new HttpClient();
        httpClient.DefaultRequestHeaders.Authorization = new AuthenticationHeaderValue("Bearer", AccessToken);

        // Get the response.
        var requestUri = GetRequestUri($"servicePrincipals/{Configuration.ServicePrincipalId}/appRoleAssignedTo");
        var response = await httpClient.GetAsync(requestUri);
        var content = await response.Content.ReadAsStringAsync();

        // Serialize the response.
        var result = JsonConvert.DeserializeObject<AadResponseObject<AadAppRoleAssignment>>(content);
        return result.Value.ToArray();
    }
    catch
    {
        // Ignored.
    }
    return null;
}

/// <summary>
/// Assigns an app role to a given user. </summary>
/// <param name="userId"> The identifier of the user. </param>
/// <param name="role"> The new role type to assign the user. </param>
/// <returns> An app role assignment. </returns>
public async Task<AadAppRoleAssignment> AssignAppRoleAssignmentAsync(string userId, RoleType role)
{
    try
    {
        // Get the role id.
        var roleId = GetRoleId(role);
        if (roleId == null)
        {
            return null;
        }

        // Create the HTTP client.
        var httpClient = new HttpClient();
        httpClient.DefaultRequestHeaders.Authorization = new AuthenticationHeaderValue("Bearer", AccessToken);

        // Get the response.
        var requestUri = GetRequestUri($"users/{userId}/appRoleAssignments/");
        var response = await httpClient.PostAsJsonAsync(requestUri, new
        {
            id = roleId.Value.ToString(),
            principalId = userId,
            principalType = "User",
            resourceId = Configuration.ServicePrincipalId
        });
        var content = await response.Content.ReadAsStringAsync();

        // Serialize the response.
        var result = JsonConvert.DeserializeObject<AadAppRoleAssignment>(content);
        return result;
    }
    catch
    {
        // Ignored.
    }
    return null;
}

/// <summary>
/// Creates a request URI for the Azure AD Graph. </summary>
/// <param name="resource"> The desired resource to inject into the request URI. </param>
/// <returns> A request URI. </returns>
private Uri GetRequestUri(string resource)
{
    return new Uri($"{Configuration.Resource}/myorganization/{resource}?api-version={Configuration.Version}");
}
```

**App settings**

In order to determine the Azure Active Directory authority, application registration, and role types, multiple identifiers are required. These are for security purposes not stored within the application code. We stored them in the Web Apps settings—in the app settings section, to be more precise. 

![App settings in the Azure Web Apps for Bestie]({{ site.baseurl }}/images/bestie/appsettings.jpg)


We did this in the production environment and the staging environment. It also allowed us to keep different sets of configurations depending on the environment (production/staging). For the development environments, the app settings were stored in the [Secret Manager tool for ASP.NET Core](https://docs.microsoft.com/en-us/aspnet/core/security/app-secrets). 

Environment variables are generally stored in plain text and are not encrypted. If the machine or process is compromised, then environment variables can be accessed by untrusted parties. Additional measures to prevent disclosure of user secrets may still be required.

**Data**

Sensitive and potentially persistent parts of the data located in the Azure SQL Database is salted and encrypted with the .NET Core implementations of AES. Furthermore, [TDE (Transparent Data Encryption)](https://msdn.microsoft.com/library/dn948096) is applied on both the main Azure SQL Database and its geo-replicated copy.

The key and the salt are located apart, in different undisclosed locations. 

The data architecture consists of an application Azure SQL Database, which is geo-replicated to the nearest datacenter. Because the current user base of the solution is located in Sweden, the primary Azure SQL Database is located in The Netherlands datacenter (West Europe). Its data is actively replicated to the datacenter in Ireland (North Europe). 

![Geo-replication of the Azure SQL Databases for Bestie]({{ site.baseurl }}/images/bestie/georep.png)


There are multiple advantages of this setup. One is that we can do a failover to the secondary Azure SQL Database at any given time. In addition, the secondary Azure SQL Database is readable, meaning that we can offload non-critical data reads toward this instance, thus spreading the data load efficiently.

In addition to the application Azure SQL Database, there is also a business intelligence (BI) Azure SQL Database. Because of the heavy encryption and security on the application data, it's very hard for any BI solutions to operate and perform functions on it. Therefore, an Azure Function makes sure to normalize and anonymize data, which is then pushed to the BI Azure SQL Database. 

The BI Azure SQL Database is the one that Power BI Embedded is allowed to access and query. This provides a secure separation of the crucial data, allowing valuable BI/reporting to be created while keeping sensitive data out of the picture. 

### Automation ###

As with any web app, things need to be automated—everything from minification to compilation. The solution uses the popular automation/task runner tool [Grunt](http://gruntjs.com/). It runs JavaScript tasks and has great support in Visual Studio Task Runner Explorer.

The Task Runner Explorer finds your Gruntfile and its tasks. The tasks are the operations you want to automate. Our solution uses the following:

- [grunt-contrib-uglify](https://github.com/gruntjs/grunt-contrib-uglify): Minification of JavaScript files.
- [grunt-contrib-watch](https://github.com/gruntjs/grunt-contrib-watch): Watching for file changes in the development directory. Triggers tasks upon file changes.
- [grunt-contrib-sass](https://github.com/gruntjs/grunt-contrib-sass): Compilation of SASS files.
- [grunt-contrib-cssmin](https://github.com/gruntjs/grunt-contrib-cssmin): Minification of CSS files.
- [grunt-typescript](https://www.npmjs.com/package/grunt-typescript): Compilation of TypeScript files.

![Grunt tasks running in the Visual Studio Task Runner Explorer for Bestie]({{ site.baseurl }}/images/bestie/grunt.gif)


## Conclusion ##

The solution demonstrates a scalable and low-maintenance approach, powered by many PaaS (Platform as a Service) components in Azure. By building a solution in this manner, we allow the customer to scale to any needs with the use of a dial. In addition, we allow for the customer to expand and scale their organization out into the world, while maintaining security and control. 

Power BI itself is an incredibly powerful tool that allows customers to explore their data and find new and valuable insights. With Power BI Embedded integrated into the solution itself, these valuable tools are available for any users and customers. In addition, they can continue to evolve their reports and find new, relevant ways to visualize their data and business—and then simply upload and share the reports with ease in the solution.

Azure Functions power the solution with background processing, built with shared code between the Azure Functions and web app. In the future, we are looking to expand the use of Azure Functions by plugging in more components and enriching the data and automation further.

Since the solution integrated with Azure Active Directory (and Kompis Sverige's Office 365), we’re able to enrich the solution with the data living in Office 365. It makes the solution an integral part of their Office 365 experience, and we’re looking to bring even more functionality into the solution using Microsoft Graph.
