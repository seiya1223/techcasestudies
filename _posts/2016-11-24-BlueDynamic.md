---
layout: post
title:  "An IoT solution for Blue Dynamic to gauge customer visits to brick-and-mortar stores"
author: "Filip Rehorik, Martin Simecek, and Jan Pospisil"
author-link: "#"
#author-image: "{{ site.baseurl }}/images/authors/photo.jpg"
date:   2016-12-23
categories: [IoT]
color: "blue"
#image: "{{ site.baseurl }}/images/imagename.png" #should be ~350px tall
excerpt: Microsoft and Blue Dynamic conducted a hackfest to create a proof of concept for a new product. The scope was to capture customer faces with a camera, do real-time counting and analysis of the faces, and provide outputs for other systems and UI.
language: English
verticals: Retail, Consumer Products & Services
---

Microsoft and Blue Dynamic joined forces at a hackfest to create a proof of concept for a new product. The scope was to capture customer faces from a camera, do real-time counting and advanced analysis of the captured faces, and provide outputs for other systems and UI.

The project was divided into three main parts:

1. **Data capture:** Universal Windows Platform (UWP) background app running on a Windows 10 IoT Core-powered microcomputer that continuously analyzes connected cameras, looking for faces. If detected, crop them and send to Azure IoT Hub and Azure Storage.

2. **Data transformation:** Cloud infrastructure for background processing. We combined Azure IoT Hub, Cognitive Services, Azure Storage, WebJobs, Service Bus, and the API Apps feature of Azure App Service (see schema below). The output of the process is information about the recognized person: emotion, sex, age, and face identification.

3. **Data visualization:** We designed a Power BI dashboard to visualize captured data.

**Core team:**

- Jiri Hosenseidl – MS Dynamics AX Consultant/Analyst; Blue Dynamic 
- Ondrej Liberda – Dynamics AX Consultant and Developer; Blue Dynamic 
- Martin Urza – Developer; Blue Dynamic 
- Jan Pospisil – DX Technical Evangelist, Azure, IoT, Dev; Microsoft
- Martin Simecek – DX Technical Evangelist, Azure, Mobile, Dev; Microsoft
- Jan Hajek – DX Technical Evangelist, Azure; Microsoft
- Filip Rehorik – DX Technical Evangelist Lead, ISV; Microsoft

## Customer profile ##

[Blue Dynamic](http://bluedynamic.cz/) is a Czech Republic-based company with more than 10 years of experience with Microsoft Dynamics. It has delivered services to 5,000 users in 40 retail companies in 14 European countries. Blue Dynamic focuses on Microsoft Dynamics AX & CRM implementation, including custom development, applications and infrastructure operation (105 critical apps in a 24x7 monitoring regime).

As retail customers come to expect more and more, retailers need to be able to improve and evolve the customer experience and, at the same time, compete with other retailers. This becomes a challenge when using traditional technologies. While using digital footprints of customers on ecommerce portals is now common, tracking customers visiting brick-and-mortar stores is a niche market with an outstanding potential. Blue Dynamic aims to address retailers with brick-and-mortar stores in order to help drive both the customer experience and sales revenue.

## Problem statement ##

To prepare for the IoT hackfest, we needed to ensure the whole team would:

- Have basic knowledge of what the core business of Blue Dynamic is (project kickoff).
- Have basic knowledge about the technologies that will be used as a part of the solution (technology on-boarding).
- Know the scope of the project and important deadlines (brainstorming based on gathered knowledge followed by prioritization).

*Figure 1. Onboarding*

![On boarding]({{ site.baseurl }}/images/BlueDynamic/OnBoarding.jpg)


*Figure 2. Brainstorming*

![Brainstorming]({{ site.baseurl }}/images/BlueDynamic/Brainstorming.jpg)


The solution should enable retailers to measure conversion (how many people enter the shop out of all people who walk by), display relevant advertisement in shop windows (based on who stands in front of it, how old he/she is, and so on), and other related scenarios. These scenarios resonate on the retail market and both Microsoft and the partner recognize the huge demand for such a solution. However, no partner in the market currently has such a solution available. Blue Dynamic is ready to combine its retail and Dynamics know-how and is eager to ramp up quickly on Azure IoT and Cortana-related capabilities.

To get a realistic and validated scope of the project, we first brainstormed a lot of scenarios during an envisioning meeting and then sorted them one by one based on business needs combined with effort needed to deliver them. During the discussion we discovered that for all scenarios, we need a basic architecture of apps and services, and parts of this basic infrastructure will be a core of our project.

*Figure 3. Prioritization*

![Prioritization]({{ site.baseurl }}/images/BlueDynamic/Prioritization.jpg)


## Solution and steps ##

Finally, we distilled a scope that includes the following and for which we want to make a proof of concept:

- Capturing data with a Windows 10 IoT Core-powered microcomputer that detects faces and sends them to Azure IoT Hub and Azure Storage.
- Transforming data to information using an Azure infrastructure.
- Providing information to the user with a Power BI dashboard.

*Figure 4. Basic architecture initial discussion*

![Basic architecture initial discussion]({{ site.baseurl }}/images/BlueDynamic/ArchitectureDiscussion.jpg)


We decided to use Retailizer as a code name for this project. Now let’s take a deep dive into the solution technical details. We will go through the process, from a person standing in front of a camera all the way to the cloud and Power BI at the end.

*Figure 5. Architecture*

![Architecture]({{ site.baseurl }}/images/BlueDynamic/Architecture.jpg)


## Technical delivery ##

**UWP App**

We begin with a UWP app running on an IoT device (DragonBoard in our case). We decided there’s no need for UI on the app itself and therefore chose Background Application (IoT) as our Visual Studio template. It’s technically a background task with one mandatory method: Run, which does all the work.

First, we initialize each camera connected to the board’s USB ports and add its MediaCapture object to a collection. Then we start an infinite loop that tries to capture and process pictures from the camera as fast as possible.


    private static async Task<MediaCapture[]> InitializeCameraAsync()
    {
    	List<MediaCapture> mediaCaptureDevices = new List<MediaCapture>();
    	DeviceInformationCollection videoDevices = await DeviceInformation.FindAllAsync(DeviceClass.VideoCapture);
    
    	if (!videoDevices.Any())
    	{
    		Debug.WriteLine("No cameras found.");
    		return mediaCaptureDevices.ToArray();
    	}
    	foreach (DeviceInformation device in videoDevices)
    	{
		    MediaCapture mediaCapture = new MediaCapture();
		    
		    MediaCaptureInitializationSettings mediaInitSettings = new MediaCaptureInitializationSettings
	    	{
    			VideoDeviceId = device.Id
    		};
    
    		await mediaCapture.InitializeAsync(mediaInitSettings);
    		await SetMaxResolution(mediaCapture);
    
    		mediaCaptureDevices.Add(mediaCapture);
    	}
    
    	return mediaCaptureDevices.ToArray();
    } 
    

Why use images instead of video detection? We experimented with both approaches and decided on taking photos, mostly because of lower CPU consumption and better scalability to several cameras.

These are operations we do in each round for each camera:

1. Capture a photo.
2. Detect whether any faces are in the photo.
3. Extract and crop each face from the photo.
4. Send face images to Blob storage.
5. Send message to IoT Hub.

The key part is that we detect faces locally, if supported, before sending data to the server to offload some processing from the API. We also optimize the size of transferred data by extracting only the necessary portion of a person’s face (see Figure 6). (Both tasks happen in LocalFaceDetector.cs.)

*Figure 6. Extracting faces from the photo*

![Extracting faces from the photo]({{ site.baseurl }}/images/BlueDynamic/ExtractingFaces.jpg)


```
	public async Task ProcessImageAsync(BitmapDecoder bitmapDecoder, IRandomAccessStream imageStream, string cameraId)
	{
	    try
	    {
	        SoftwareBitmap image =
	            await
	                bitmapDecoder.GetSoftwareBitmapAsync(bitmapDecoder.BitmapPixelFormat,
	                    BitmapAlphaMode.Premultiplied);
	
	        const BitmapPixelFormat faceDetectionPixelFormat = BitmapPixelFormat.Gray8;
	        if (image.BitmapPixelFormat != faceDetectionPixelFormat)
	        {
	            image = SoftwareBitmap.Convert(image, faceDetectionPixelFormat);
	        }
	        IEnumerable<DetectedFace> detectedFaces = await _faceDetector.DetectFacesAsync(image);
	
	        if (detectedFaces.Any())
	        {
	            List<Stream> faceImages = new List<Stream>();
	            foreach (DetectedFace face in detectedFaces)
	            {
	                MemoryStream faceImageStream = new MemoryStream();
	                Image faceImage = new Image(imageStream.AsStreamForRead());
	                int width, height, xStartPosition, yStartPosition;
	                EnlargeFaceBoxSize(face, image, out width, out height, out xStartPosition,
	                    out yStartPosition);
	                faceImage.Crop(width, height,
	                    new Rectangle(xStartPosition, yStartPosition,
	                        width, height)).SaveAsJpeg(faceImageStream, 80);
	                faceImages.Add(faceImageStream);
	            }
	
	
	            await _imagePersiter.PersistAsync(faceImages, cameraId);
	        }
	    }
	    catch (Exception ex)
	    {
	        Debug.WriteLine(ex.Message);
	    }
	}
	
```

UWP app’s work for each frame ends by uploading a cropped face to Azure Blob storage and a message to Azure IoT Hub. Even though the IoT Hub SDK supports uploading to Blob storage, there was no version for UWP on IoT Core, so we had to place two separate calls—first using Azure Storage SDK, second with IoT Hub SDK. 

The IoT Hub message payload contains three main pieces of information:

- Device ID—Which device is sending the data. It is a unique identifier of the DragonBoard, assigned by the server during the registration process.
- Blob Name—Name of the file we uploaded to Blob storage; JPG image with the person’s face.
- Camera ID—Since each device can have multiple cameras connected to it, we used VideoDeviceId to distinguish them.

```
	public async Task PersistAsync(IEnumerable<Stream> faceImages, string cameraId)
	{
	    foreach (Stream faceImage in faceImages)
	    {
	        Guid blobGuid = Guid.NewGuid();
	
	        var data = new
	        {
	            deviceId = _deviceConfiguration.DeviceIdString,
	            blobName = blobGuid + ".jpg",
	            cameraId
	        };
	        string messageString = JsonConvert.SerializeObject(data);
	        Message message = new Message(Encoding.ASCII.GetBytes(messageString));
	
	        await UploadImageToBlobAsync($"{data.deviceId}/{data.blobName}", faceImage);
	        Debug.WriteLine("Image uploaded.");
	
	        await _deviceClient.SendEventAsync(message);
	        Debug.WriteLine("Message sent.");
	
	        faceImage.Dispose();
	    }
	}

```

The message size is up to 1 KB and average size of the cropped face is about 4 KB. The maximum frequency of the messages to IoT Hub is limited by the time needed to get a picture from a camera via USB and detect a face. So while someone is appearing in front of a camera, we experienced a frequency of up to 20 messages/images per second. In reality, messaging frequency on the IoT Hub side depends on people traffic in a store and the number of stores/in-store cameras.

Every device needs to be registered with the server before it can push data to IoT Hub. Registration happens automatically when creating a Device Client—a request is sent to our back-end API that returns a corresponding Device Key. This key is then used to authenticate with IoT Hub. (See DeviceConfiguration.cs for more details.) This step can optionally be done by calling Azure Functions.

**IoT Hub/Stream Analytics**

IoT Hub is used as a reliable and scalable broker for device messages. It can pass messages directly to Azure Stream Analytics. It also acts as a temporary queue in case processing parts are on hold or being updated. The main scenarios are:

1. Device management. Using IoT Hub allows us to visualize device status and do selective predictive maintenance. 
2. Device security. IoT Hub has a strict SSL-based security endpoint and in case some device gets compromised, we can selectively disconnect it (prevent device from sending/receiving D2C/C2D messages).
3. Integration platform. IoT Hub can send messages in cases such as the device being temporarily disconnected or if the back end is in maintenance mode.

Stream Analytics is used for data filtering, aggregation, and future data manipulation in case of new business requirements that can’t be fulfilled with RAW device data not changing device code. The plan is to do even some basic deduplication.

To eliminate or minimize possible legal issues related to PII data, we decided not to store any pictures. We delete recognized faces immediately after analysis and store only anonymous metadata. From a business perspective there is no need to know the identity of any recognized person. Only summarized metadata and its dependency on time have an impact on later business decisions.

**WebJob**

Now we need to transform the basic data we have in Service Bus into something we call an “Event” and then assign it to a “Visit.” The idea here is to use Cognitive Services APIs to determine the age of the person whose face we have captured, what mood are they in, translate which camera captured them from technical ID to type, which our business logic can understand and persist this new object to DocumentDB.

We initially decided to use Azure WebJobs and set up a queue trigger so that every time a new message arrives to Service Bus, WebJobs fires up and starts processing.

1. Download face image from Blob storage.
2. Send it to Face Detection API.
3. Get back information about the detected face—age, gender, and smile.
4. Send face image to Face Identification API.
5. Assign face to an identified person or create a new one (in case this is the first time we see this face).
6. Fill the Event object.
7. Pair with corresponding Visit object, or create new one.
8. Persist to DocumentDB.

After building the first prototype, we immediately hit the cognitive API throttling (as noted above, we’re sending faces as often as possible, if there are any, which can result in several calls per second). That’s why our FaceApiService wraps each call into a retry cycle. It begins with a 1-second delay and doubles it on every retry until the call succeeds or passes 10 times. This solution is not ideal, since we’re hitting the Face API from parallel workers and the delay can easily go to maximum. A possible solution would be to use a secondary API key and distribute the load, or implement a smarter retry mechanism.

```
	private async Task<TResponse> RunTaskWithAutoRetryOnQuotaLimitExceededError<TResponse>(Func<Task<TResponse>> action)
	{
	    int retriesLeft = FaceApiService.retryCountOnQuotaLimitError;
	    int delay = FaceApiService.retryDelayOnQuotaLimitError;
	
	    TResponse response = default(TResponse);
	
	    while (true)
	    {
	        try
	        {
	            response = await action();
	            break;
	        }
	        catch (FaceAPIException exception) when (exception.HttpStatus == (System.Net.HttpStatusCode)429 && retriesLeft > 0)
	        {
	            Debug.WriteLine($"Face API throttled. Retries left: {retriesLeft}, Delay: {delay} ms.");
	            if (retriesLeft == 1 && Throttled != null)
	            {
	                Throttled();
	            }
	
	            await Task.Delay(delay);
	            retriesLeft--;
	            delay *= 2;
	            continue;
	        }
	        catch (FaceAPIException ex)
	        {
	            Debug.WriteLine($"{ex.ErrorCode}: {ex.ErrorMessage}");
	        }
	    }
	
	    return response;
	}
```

What’s also important to notice is that the Cognitive Services SDK closes an image stream after it’s used. We didn’t handle this properly at first and had issues with stream exceptions in the retry loop. This is very difficult to debug, so watch carefully what’s going on with your streams. We solved it by creating a copy of the stream every time our API service enters the retry loop.

```
	return await RunTaskWithAutoRetryOnQuotaLimitExceededError(
	    () =>
	    {
	        Stream copiedStream = new MemoryStream();
	        imageStream.Seek(0, SeekOrigin.Begin);
	        imageStream.CopyTo(copiedStream);
	        copiedStream.Seek(0, SeekOrigin.Begin);
	        return faceClient.DetectAsync(copiedStream, 
	            returnFaceId, 
	            returnFaceLandmarks, 
	            returnFaceAttributes);
	    });
```

Finally, we chose DocumentDB as our persistence layer because of the JSON structure it supports and the possibility to use SQL-like commands for retrieving and filtering data. As an alternative, to optimize costs, we also architected a persistence layer built upon Table storage, but that’s not part of the current solution.

**Azure Resource Manager template**

Because a major part of our solution runs on the Azure cloud, it was obvious to include an Azure Resource Manager template as well. There are several benefits to it:

- Everyone from the team can create an exact copy of the production environment and test new features there.
- Infrastructure is represented as code and saved in a source control system.
- Deployment to different environments (development, staging, production...) can be fully automated as part of the continuous integration (CI) pipeline.

Our template deploys two Cognitive Services APIs (Face and Emotion API), web app for back end, Storage Account, IoT Hub, Service Bus with a Queue, and Stream Analytics account. Once the deployment is done, the template returns connection strings that are needed in the application.

There are several approaches to template authoring—you can start from scratch, build upon a template from [GitHub](https://github.com/Azure/azure-quickstart-templates), or export your existing infrastructure directly from Azure. We did the latter and started with a full template from Azure. Getting it is simple—just click Automation Script on your Resource Group and download a ZIP file with the template and parameters.

When you open the template, you will notice it’s very, very long. That’s because Azure exports complete definitions so that you can rebuild your infrastructure to the same state it was when exported. Since we don’t need this, we started cleaning it up.

First, we deleted most of the parameters. There’s only one left: nameRoot. All other dynamic values are defined as variables and constructed during deployment. This saves everyone from dealing with uniqueness and other name restrictions, such as:

- Storage Account name needs to be globally unique and can contain only letters or numbers.
- Web app name needs to be globally unique and can contain letters, numbers, or hyphens.
- Queue name needs to be constant, because the app refers to it from code.
- And so on.

Variable definition can look like this:

	"variables": {
	  "backendName": "[concat(parameters('nameRoot'), '-backend', uniqueString(subscription().subscriptionId))]",
	  "faceApiName": "[concat(parameters('nameRoot'), '-face')]",
	  ...
	}


We relied heavily on part of the Resource Manager template engine: functions. For example, the uniqueString(subscription().subscriptionId) call makes sure that the name will be unique. If you wanted to be stricter, you could add more rules (such as length), but since our template is meant for developers, we didn’t get too thorough.

The other things that needed fixing were dependencies. In our case the Queue cannot be created until there’s a Service Bus namespace ready. We tried that initially and deployments were failing. Adding dependsOn configuration fixed it:

	  "dependsOn": [
	    "[resourceId('Microsoft.ServiceBus/namespaces', variables('serviceBusNamespaceName'))]"
	  ]

Finally, with the deployment done we wanted to get connection strings and keys for individual services to use them right away in application code.

*Figure 7. Deployment outputs*

![Deployment outputs]({{ site.baseurl }}/images/BlueDynamic/DeploymentOutputs.jpg)


We achieved this by combining another nice function in the template engine—listKeys—with resource references. For example, the Connection String for Storage Account can be returned by setting up this output:

	"StorageConnectionString": {
	  "value": "[concat('DefaultEndpointsProtocol=https;AccountName=', variables('storageAccountName'), ';AccountKey=', listKeys(resourceId('Microsoft.Storage/storageAccounts', variables('storageAccountName')), '2016-01-01').keys[0].value)]",
	  "type": "string"
	},

IoT Hub is an example of getting the key by asking for its name directly:

	"IotHubKeys": {
	  "value": "[listKeys(resourceId('Microsoft.Devices/IotHubs/Iothubkeys', variables('iotHubName'), 'iothubowner'), '2016-02-03')]",
	  "type": "object"
	},

**Power BI**

For demo purposes, we need to have some visual output. So, we created a Power BI dashboard showing overall data gathered and processed by Retailizer, having no ambition to be used in production in any form.

*Figure 8. Power BI dashboard*

![Power BI dashboard]({{ site.baseurl }}/images/BlueDynamic/PowerBI.jpg)


*Figure 9. Coding*

![Coding]({{ site.baseurl }}/images/BlueDynamic/Coding.jpg)


## Conclusion ##

Our IoT hackfest consisted of three major phases:

- Business and technical onboarding that includes:
	- Legal work such as a non-disclosure agreement.
	- Four hours to brainstorm scenarios and order them by priority with a key developer (Blue Dynamic), business consultant/analyst (Blue Dynamic), DX ISV partner manager (Microsoft), DX IoT dev specialist (Microsoft).
	- At least one day to pause and think about it individually and in smaller teams and consult with other people, including a pilot customer.
	- Four hours to revalidate scenarios, reorder them by validated priorities, and choose top priorities as a scope of the hackfest with the same people as before.
	- One and a half days for technical onboarding focused on technologies needed during the project.
	- Communication setup including a list of emails and phone numbers of all people involved. 
- Development itself that consists of:
	- Setup of a development environment (Visual Studio Team Services).
	- Four full days (one full day = eight hours).
	- Continuous documentation. Do not underestimate the value of taking photos of drawn diagrams and schemas to prevent losing already created ideas.
- Output and handoff that includes:
	- Demoing immediately after finishing proof of concept.
		- CEE Regional Retail EBC conference – potential customers.
		- Microsoft local subsidiary all-hands – potential cooperation with Microsoft sales people.
		- 1:1 for two potential customers.
	- Piloting with already agreed-on customer.
		- Three months piloting in a real environment.
		- Three months showing at conferences.
		- Expected production version after three months.
	- Next steps:
		- Additional feature (heatmaps) wanted by one potential customer.
		- Microsoft consultancy during deployment and piloting with first customers.
		- Plan co-sell activities.
		- Plan PR activities.

*Figure 10. Demo on CEE Regional Retail EBC conference*

![Demo on CEE Regional Retail EBC conference]({{ site.baseurl }}/images/BlueDynamic/Demo.jpg)


*Figure 11. Gantt chart*

![Gantt chart]({{ site.baseurl }}/images/BlueDynamic/Gantt.jpg)


It was a pleasure to work with the Blue Dynamic team on a real project demanded by customers using the newest technologies. Each project member brought unique knowledge, so together we could take the idea and make it happen.

>“Cloud is a big buzz word and everybody can imagine something different. From my perspective, the key component which enabled us to solve our pain points is Azure IoT Hub. Using IoT Hub and related services, we were able to implement an enterprise-grade infrastructure in a very short timeframe. This makes our solution very efficient while robust and prepared for growing usage in the future.”

>*—Jiri Hosenseidl, consultant and analyst* 


## Additional resources ##

- [GitHub repository](https://github.com/pospanet/TechCaseStudy_BlueDynamic) 
- [Related technical article published on a local (Czech) blog](https://blogs.msdn.microsoft.com/vyvojari/2016/10/21/azure-resource-manager-a-sablony-prakticky/)

