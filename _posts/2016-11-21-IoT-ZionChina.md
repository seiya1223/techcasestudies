---
layout: post
title:  "Zion China uses IoT and Machine Learning to evolve its Intelligent Diabetes Management solution"
author: "Xi Wang"
author-link: "#"
#author-image: "{{ site.baseurl }}/images/authors/photo.jpg"
date:   2016-12-02
categories: IoT
color: "blue"
#image: "{{ site.baseurl }}/images/ZionChina00_Logo.png" #should be ~350px tall
excerpt: Microsoft worked with Zion China to re-architect its mobile diabetes-monitoring solution. See how they used IoT Hub and other Azure services to enhance the solution for patients and healthcare professionals. 
verticals: Healthcare
language: English
---

Zion China has developed a diabetes management mobile app designed to help patients live healthier lives by having on-the-go access to advice and information from health specialists. This E-Followup solution uses a device that continuously monitors users' glucose levels to collect health data such as blood sugar, diet, exercise, and medication. It provides personalized advice to help patients manage their health. 

The company wanted to evolve the solution to transmit data faster, optimize analytics, store information securely, and adapt to multiple devices. 

**The team**

Zion China:

- Vincent Yang – CEO
- Yanlin Li – Director of Server R&D
- Jeremiah Yan – Director of Data R&D
- Jeremiah Wang – Core R&D Engineer
- Zhenling Jiang – Data Visualization Engineer
- Yabo Lu – R&D Engineer
- Maire Zhang – QA
- Amber Liu – UX and PM

Microsoft DX China:

- Xi Wang – Technical Evangelist
- Shijun Liu – Technical Evangelist
- Michael Li – Technical Evangelist

*The Zion China and Microsoft DX teams at the hackfest*

![Hackfest]({{ site.baseurl }}/images/ZionChina10_Team02.jpg)



## Customer profile ##

[Zion China Technology Co. Ltd.](http://www.zionchina.com/p/en/home/) of Beijing is a mobile Internet healthcare company that focuses on improving the health and well-being of its customers through innovative technology. It builds products that can improve the quality of life for patients with chronic diseases by helping them better manage their illnesses on a daily basis.
 
Zion China created the E-Followup glucose management cloud platform. They propose a new "five-wheeled train" for diabetes management involving glucose metabolism, pharmacokinetics, dietary dynamics, exercise kinetics, and patient self-motivation. This management approach fills the gaps in the field of precision medical management in China and pioneers the field of precision diabetes management.

 
## Pain points ##

Zion China wants to achieve these main technical and business goals:

1. Design a smart, fast, and cost-effective way to continuously feed data from devices to the cloud. 
2. Optimize the analytic suite, moving from BI analysis to proactive predication. 
3. Persist data storage for future use and ensure data security.
4. Get insights from data easier.

**1. Smart, fast, and cost-effective way to continuously feed data from devices to the cloud**

Zion China provides 7-day glucose metabolism test report services and 3 months of glycated hemoglobin strengthen management services. Users wear a dynamic glucose device to collect blood glucose data every 3 minutes. They can access blood glucose changes for 7 days. At the same time, the device collects data on the user's daily diet, exercise, medication, insulin, and other information. Zion China can analyze the data to identify the impact of various factors on the user and assess the current state of the user's glucose level and the risk of hidden high or low blood glucose levels. The device also can assess the user's diet preferences to provide personalized life recommendations. 

While wearing the device, a user will generate more than 3,000 readings of blood glucose in a 7-day period, once every 3 minutes. High-frequency data transmission and large amounts of data storage have become a major technical problem. 

**2. Optimize the analytic suite, moving from BI analysis to proactive predication** 

In the past, even with a data analytic product, doctors spent 4 hours or more on each data analysis. It takes a long time to find the correlation between the data, and it needs to accumulate a lot of data to find the appropriate conclusion. 

**3. Persist data storage for future use and ensure data security**

Zion China wants to ensure that all the persisted stored data, even with all personal information removed, is stored in a secure manner.

**4. Get insights from data easier**

Users and doctors need to view data in many different scenarios, such as web pages, mobile apps, tablets, and so on. Zion China needs a tool that can be adapted to multiple devices and is easy to develop and proficient in data analysis and presentation.
 
## Solution ##

Zion China’s original technical solution was based mostly on traditional BI with data sourced from on-premises and various devices or cloud storage. 

The Microsoft DX China team worked with Zion China to re-architect the solution:

- Adding IoT Hub to the front end to serve real-time data transmission from device to cloud.
- Using Azure Machine Learning to generate proactive predication on glucose and patient data. 
- Using Transparent Data Encryption in Azure SQL Database to secure data.
- Using Power BI and Power BI Embedded for easier insights visualization. 

Key Microsoft technologies:
 
- Azure IoT Hub
- Azure Stream Analytics
- Azure SQL Database
- Azure Machine Learning
- Power BI Embedded

## Architecture ##

This is the architecture of the Zion China solution.

![Architecture]({{ site.baseurl }}/images/ZionChina01_Arch.jpg)


## Device used and code artifacts ##

**Device**

Zion China uses dedicated glucose data devices to collect data from patients. The data will be securely transferred from the device to a mobile app via Bluetooth. Then the mobile app (iOS and Android) will securely transfer the data to IoT Hub through AMQP and HTTPS. All of the patient's personal information is removed before the data transfer.

Below are the key technical components with code artifacts.

**IoT SDK integration**

IoT Hub is used to transfer real-time data to the cloud. In this project, data from the glucose device is transferred via Bluetooth to a mobile app on Android or iOS. Below is the key code to integrate IoT SDK with the app.

The following code was used to register devices with IoT Hub.

```python
def generate_sas_token(uri, key, policy_name='device', expiry=3600):
	"""
	generate authorization
	uri: 主机名
	key: Iothub中共享访问策略中的主密钥
	policy_name: 共享策略名称
	expiry: 超时时间
	"""
    ttl = time() + expiry
    sign_key = "%s\n%d" % (uri, int(ttl))
    signature = b64encode(HMAC(b64decode(key), sign_key, sha256).digest())

    return 'SharedAccessSignature ' + urlencode({
        'sr' :  uri,
        'sig': signature,
        'se' : str(int(ttl)),
        'skn': policy_name
    })


class DeviceIdentify:
	'''
	Iot device register
	'''
	def __init__(self, uri, deviceId, version, authorization):
		"""
		uri: 'https://'' + 主机名 + '/'
		deviceId: 表示用户的硬件设备的一个字符串
		version: '2016-02-03'
		authorization: sas_token
		"""
		self.uri = uri
		self.deviceId = deviceId
		self.version = version
		self.url = self.uri + self.deviceId + "?api-version=" + self.version
		self.values = {
			"deviceId": self.deviceId
		}
		self.authorization = authorization

	def identifyDevice(self):
		data = json.dumps(self.values)
		#context = ssl._create_unverified_context()#python 2.7之后, 需要验证ssl

		request = urllib2.Request(self.url, data, {"Authorization": self.authorization, "Content-Type": "application/json"})
		request.get_method = lambda: "PUT"

		try:
			response = urllib2.urlopen(request)###http error 409 conflict 重复注册的问题
			#response = urllib2.urlopen(request, context=context)###python 2.7之后, 这样使用
			result = response.read()
		except Exception as err:
			return {
				'status': 'unabled',
				'error': {
					'description': str(err),
					'code': 95000
				}
			}
		else:
			return json.loads(result)




```

The following code was used to send a message from Android to IoT Hub.

```java


public class SendMessage2Iothub{

    // 发送信息到iothub
	/**
	 * sendIOTMessage 向iothub发送消息
	 * @param connString 连接字符串,如：HostName=*******;DeviceId=*****;SharedAccessKey=*******"
	 * @param obj 发送对象：字符串、json等
	 * @return
	 * @throws Exception
	 */
	private void sendIOTMessage(String connString, Object obj) throws URISyntaxException, IOException {
        IotHubClientProtocol protocol = IotHubClientProtocol.AMQPS;
        DeviceClient client = new DeviceClient(connString, protocol);
        try {
            client.open();
        } catch(IOException e1) {
            System.out.println("Exception while opening IoTHub connection: " + e1.toString());
        } catch(Exception e2) {
            System.out.println("Exception while opening IoTHub connection: " + e2.toString());
        }
        try {
            String msgStr = obj.toString();
			Message msg = new Message(msgStr);
            msg.setProperty("messageCount", protocol.name());
            System.out.println(msgStr);
            EventCallback eventCallback = new EventCallback();
            client.sendEventAsync(msg, eventCallback, cGlucoseExchangeEntity.getPid());
        } catch (Exception e) {
        }

    }
	
}

```

The following code was used to send a message from iOS to IoT Hub.

```
//
//  LotHubSingleton.m
//  diabetesDataCenter
//
//  Created by 将离。 on 2016/10/19.
//  Copyright © 2016年 zionchina. All rights reserved.
//

#import "LotHubSingleton.h"

#import <AFNetworking.h>

#define HOSTNAME @""
#define HOSTURL [NSString stringWithFormat:@"https://%@",HOSTNAME]

#define SendMessagePath @"/messages/events"
#define ReciveMessagePath @"/messages/devicebound"

#define DeiviceId @""
#define DevicePrimaryKey @""
#define DeviceSasToken @""

@interface LotHubSingleton()

@end

@implementation LotHubSingleton

// 发送信息到iothub
/**
 * sendSendMessageToLotHubRequestWithDicitionary 向iothub发送消息
 * @param messageDictionary 发送对象：字符串、json等
 * @return
 * @throws Exception
 */

- (void)sendSendMessageToLotHubRequestWithDicitionary:(NSDictionary *)messageDictionary
{
    AFSecurityPolicy * securityPolicy = [AFSecurityPolicy policyWithPinningMode:AFSSLPinningModeCertificate];
    securityPolicy.allowInvalidCertificates = YES;
    securityPolicy.validatesDomainName = NO;
    
    NSString *postUrl = [NSString stringWithFormat:@"%@/devices/%@%@?api-version=2016-02-03",HOSTURL,DeviceId,SendMessagePath];
    
    AFHTTPSessionManager *manager = [AFHTTPSessionManager manager];
    manager.responseSerializer.acceptableContentTypes = [NSSet setWithObjects:@"text/html",@"application/json", @"text/json", @"text/javascript",@"application/javascript",nil];
    manager.securityPolicy = securityPolicy;
    manager.requestSerializer.timeoutInterval = 10.f;
    
    NSMutableURLRequest *mUrlRequest = [[AFJSONRequestSerializer serializer] requestWithMethod:@"POST" URLString:postUrl parameters:nil error:nil];
    mUrlRequest.HTTPBody = [NSJSONSerialization dataWithJSONObject:messageDictionary options:NSJSONWritingPrettyPrinted error:nil];
    [mUrlRequest setValue:DeviceSasToken forHTTPHeaderField:@"authorization"];
    
    [[manager dataTaskWithRequest:mUrlRequest completionHandler:^(NSURLResponse * _Nonnull response, id  _Nullable responseObject, NSError * _Nullable error) {
        if (!error) {
            NSInteger statusCode = [(NSHTTPURLResponse *)response statusCode];
            NSLog(@"statusCode: %ld responseObject: %@",statusCode, responseObject);
        } else {
            NSLog(@"Error: %@, %@, %@", error, response, responseObject);
        }
    }] resume];
    
}






@end

```


**Stream Analytics**

Stream Analytics was used to process ingested data in real time on IoT Hub and stream useful data for analyzing onto SQL Database.

*Stream Analytics input configuration*

![Stream Analytics input]({{ site.baseurl }}/images/ZionChina03_SA_input.png)



*Stream Analytics output configuration*

![Stream Analytics output]({{ site.baseurl }}/images/ZionChina04_SA_output.png)


    
**SQL Database security configuration**

With SQL Database, high-end security features can be easily configured to ensure data security. Below are some of the configurations.

*Dynamic data masking helps prevent unauthorized access to sensitive data*

![Data masking]({{ site.baseurl }}/images/ZionChina05_SQL_Security01.png)


*Transparent data encryption*

![Data encryption]({{ site.baseurl }}/images/ZionChina06_SQL_Security02.png)


**Machine Learning**

Machine Learning was used to fundamentally improve the whole solution's analytic and predication level.

*Azure Machine Learning studio*

![Machine Learning]({{ site.baseurl }}/images/ZionChina07_AML.png)


**Power BI Embedded on the Zion China user portal**

The solution used Microsoft Power BI to bring visualization of the data insight to users.

*Power BI Embedded as key data visualization technology*

![Power BI]({{ site.baseurl }}/images/ZionChina08_DataVisz_PowerBI.png)


## Opportunities going forward

Zion China is expanding its solutions to top hospitals and healthcare management organizations. With the new IoT Hub, Machine Learning, and full stack powered by Azure, Zion China can expand its business and be more agile and cost-effective.

### Joint team effort

Zion China and Microsoft DX China worked together to determine how to integrate Azure services into the solution. With both teams' deep involvement and investment, we made great progress toward empowering the solution with intelligent Azure services.

*The Zion China and Microsoft DX teams working together*

![Team at work]({{ site.baseurl }}/images/ZionChina09_Team01.jpg)


*Discussing the architecture redesign and key issues*

![Discussion]({{ site.baseurl }}/images/ZionChina11_Team03.jpg)


*Working on the architecture redesign*

![Architecture work]({{ site.baseurl }}/images/ZionChina12_Team04.jpg)


## Conclusion ##

With Azure IoT Hub, Machine Learning, SQL Database, and Stream Analytics, Zion China has evolved its solution to the next level. With the availability of these new technologies, industry experts can work together to bring a better life to more patients. 

