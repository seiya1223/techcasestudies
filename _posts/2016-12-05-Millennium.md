---
layout: post
title:  "A DevOps hackfest helps Millennium move to a Resource Manager model, including access control"
author: "Miroslav Kubovcik, Marek Lani, and Stanislav Harvan"
author-link: "#"
#author-image: "{{ site.baseurl }}/images/authors/photo.jpg"
date:   2016-12-23
categories: [DevOps]
color: "blue"
#image: "{{ site.baseurl }}/images/imagename.png" #should be ~350px tall
excerpt: In this DevOps hackfest, Microsoft worked with Millennium to integrate an Azure Resource Manager model into an existing custom Azure services provisioning system that was based on an Azure Service Management model. 
language: English
verticals: Other
---


In this DevOps hackfest, Microsoft worked with Millennium to integrate an Azure Resource Manager model into an existing custom Azure services provisioning system that was based on an Azure Service Management (ASM) model. The hackfest included implementation of Role-Based Access Control (RBAC) for Azure resources provisioning submitted by technical team members (developers, IT operations). The close cooperation between the Microsoft and Millennium teams also led to new ideas, which have been validated in proofs of concept and in starting pilots. This report describes the scope of the cooperative effort:

- Re-architect the existing solution from an ASM model to a Resource Manager model including RBAC.
- Pilot a Visual Studio Team Services (VSTS) project using Resource Manager continuous integration focused on creating an Azure Virtual Machine from an existing Sharepoint Virtual Machine image.
- Pilot a VSTS web application project (ASP.NET Framework) using continuous deployment to Windows Server 2016 containers provisioned from a custom Docker image.
- Azure Container Service learning for future use with Windows Server 2016.

**The team included:**

- Andrej Gono – Tech Leader for Application Development, Millennium, plus three developers from his team
- Miroslav Kubovcik – DX Technical Evangelist, Azure, ISV; Microsoft
- Marek Lani – DX Technical Evangelist, Azure, Dev; Microsoft
- Stanislav Harvan – DX Technical Evangelist, ISV; Microsoft

## Customer profile ##

[Millennium, spol. s r.o.](http://millennium.cz/en/homepage) is a Slovak-based company that has been delivering and administering client portal and CRM solutions for 15 years. The company strategically focuses on Microsoft technologies, especially on development of CRM-based solutions, information portal solutions, and web and mobile custom solutions. Internally, they set up rules for all activities, which not only met customers’ expectations, but also created value for the client’s investment in Microsoft technologies.

In addition to the Slovak market, Millennium also operates in the Czech market and the United States. The company has three divisions: sales, finance and marketing, and IT (30 solution developers and IT professionals). Every software project (external or internal) has a project manager and technical leader. The same pool of developers is used for external and internal projects. This ISV partner has been meeting qualification criteria to be a certified partner of Microsoft since 2003, and all development team members have Microsoft Certified Professional (MCP) certificates. 

In 2014, the company faced the question of how to continue with IT infrastructure investments, especially in relation to a planned move to new office space. They decided to give up all hardware and move all infrastructure onto the Azure cloud platform. It meant that Millennium was the first large Slovak ISV with development and test in a cloud-only environment and this partner actively promoted their migration to Azure.

 
## Problem statement ##

To prepare for the DevOps hackfest, we needed to ensure that the whole team would:

- Have basic knowledge of Azure infrastructure services actually used in a company for a dev and test environment. 
- Have overall knowledge of the existing provisioning system now based on an Azure Service Management model.
- Know the scope of the project and important deadlines (agreed on with the partner’s CTO before the hackfest).

*Figure 1. Onboarding*

![Onboarding]({{ site.baseurl }}/images/Millennium/1Onboarding.jpg)


*Figure 2. Brainstorming*

![Brainstorming]({{ site.baseurl }}/images/Millennium/2Brainstorming.jpg)


The actual provisioning system based on the ASM model doesn’t allow for starting services supported only for Resource Manager. ASM provisioning is described with a set of API calls without flexibility to change provisioning schema in a short time. Resource Manager provisioning can be templated. ASM access control to the Azure environment is based on co-administrator access for every developer who is a member of a team project. Role-Based Access Control in the Resource Manager model is much closer to the reality of secure access rules assigned to developers working on projects. 

The partner’s dev and test vision has to be extended to containerization. Because Millennium is focused on the Windows environment, the dev and test strategy first requires an internal pilot for Windows containers using a full .NET stack. 

Part of the brainstorming was about the actual process flow (through value stream mapping) and what issues will have higher priority. We agreed on prioritization for implementation of Resource Manager including RBAC to the existing provisioning application as a new application tree, which will fully overlay the existing ASM application part in the future. Because Azure Container Service technology doesn’t currently (November 2016) support Windows containers, this part will be tested as a pilot with the functionality “ASP.NET Framework applications in life cycle management deployed to Windows Containers in Azure.” 

*Figure 3. Value stream mapping*

![Value stream mapping]({{ site.baseurl }}/images/Millennium/ValueStreamMapping.png)


Brainstorming discussions concluded that if we “upgrade” existing development and provisioning cycles with the DevOps practices Infrastructure as Code (including RBAC for developers), continuous integration and continuous deployment, we will benefit from shorter time between user acceptance testing (UAT) system provisioning, code development, and UAT testing. According to our estimation based on value stream mapping, all new application cycles in the actual provisioning system take four days. We saw that the usage of Resource Manager templates and RBAC will solve the main delays in the first provisioning of applications' UAT environments. This implementation (described below) will help us to use Infrastructure as Code and continuous integration. If the Resource Manager/RBAC process will work, we can turn on continuous deployment to the Azure host (or container) in team projects covered by Visual Studio Team Services. 

Finally, we agreed on the steps that will move our efforts to a successful upgrade of the existing ASM provisioning system to Resource Manager/RBAC provisioning and containerization:

- Analyze the simplest way to integrate Resource Manager/RBAC to the existing provisioning system: a set of method helpers showing mandatory .NET libraries (including versions) a REST call for RBAC. This will be used by Millennium dedicated developers for implementation/coding into the existing application. 

  (Brainstorming confirmed that the main problem for developers is the mix of various starter articles and versions of libraries. The Microsoft team will deliver a clear sample project with helper methods for Resource Manager virtual machine provisioning and RBAC in Resource Manager.)
- Extend implemented Resource Manager provisioning tree with small pilot for provisioning of dev and test virtual machine from a prepared virtual machine image. The Microsoft team will deliver a step-by-step tutorial, which the partner's developers will use as a basis for a pilot.
- Containerization based on Windows containers for typical web application (.NET Framework) user acceptance testing. The Microsoft team will deliver a step-by-step tutorial for UAT continuous deployment, which the partner's developers will use as a basis for a pilot.


## Solution, steps, and delivery##

**Resource Manager/RBAC to existing provisioning system**

Existing dev and test provisioning application is focused on start/stop management of virtual machines created through the portal in the classic (ASM) model. We detected these obstacles in the existing process:

- Missing fast process, how to programmatically create a new virtual machine for short-time projects/tests. 
- Using “images” feature in old portal for templating, which is not fully implemented in custom provisioning application.
- Developers/administrators who need access to Azure portal are promoted as co-administrators.

Steps on how to “upgrade” the existing provisioning system in the first phase:

- Create in the existing application a new Resource Manager menu branch, which will offer “Create RG from template,” “List VMs with status,” “Start VM,” “Stop VM,” and “Assign user to RG.”   
- Prepare Azure Storage for Resource Manager templates and save some first pilot Resource Manager templates in it.
- Prepare Azure Storage for existing VHDs with complex settings (for example, Sharepoint virtual machines).
- Because project members can be external, for this first Resource Manager RBAC upgrade we checked the Azure subscription tenant Azure Active Directory to see whether all developers were there. Azure AD syncing from Active Directory Domain Services will be activated in the next provisioning system update.  
- Implement code for event handling of all new menus.

At coding sessions after the hackfest, we solved these issues:

- Application project was extended with NuGet package Microsoft Azure Resource Manager library.
- Newtonsoft.Json library was updated to 9.0.1.
- Provisioning application has to have permissions for Azure administration through [Azure Resource Manager API](https://msdn.microsoft.com/en-us/library/azure/dn790568.aspx). It has to run with the service account created in Azure AD. We created a service account for the application in PowerShell.
- Code for RBAC for developers/administrators was implemented through REST API calls. It was more rock solid and less complicated compared to testing many RBAC .NET libraries. We maximally simplified projection of Azure AD objects through Graph REST API for provisioning application, using LINQ to JSON. We used in RBAC code only user name (from Graph API), ObjectID (from Graph API), role name and role identification (from Azure Management API). 
- Start/Stop code from ASM was unusable because it was based on ASM libraries. It was rewritten.

*Figure 4. First coding session*

![First coding session]({{ site.baseurl }}/images/Millennium/3FirstCoding.jpg)


At the end, the Millennium developers prepared the first Resource Manager branch in a provisioning system application. The Microsoft team provided basic helper methods at coding sessions. This project was used as a quick start for the upgrade of the provisioning system application. The source code is published on GitHub ([https://github.com/mirkub2/SetRBAConARMmodel](https://github.com/mirkub2/SetRBAConARMmodel)) with a detailed explanation for the whole developer community on the DX Czech/Slovak blog ([Ako v kóde nastavovať práva na zdroje Azure vyvojárom a ITčkárom](https://blogs.msdn.microsoft.com/vyvojari/2016/10/26/ako-v-kode-nastavovat-prava-na-zdroje-azure-vyvojarom-a-itckarom/)).

*Figure 5. Test after RBAC code first run*

![Test after RBAC code first run]({{ site.baseurl }}/images/Millennium/4TestafterRBAC.png)


**Containerization based on Windows containers – pilot**

Millennium is a software house focused on the Windows platform and technologies/products running on Windows operating systems. We agreed on a small first pilot, “containerization for UAT testing of web application,” which would prepare the developer team for application containers. Because the partner is developing robust web applications, .NET Framework is used in all projects. Accordingly, the pilot scenario was “deploy web application developed in team to Windows Container running in Azure.” Azure Container Service (ACS) was not included in the pilot because at the time ACS did not support Windows Containers.
 
We solved these problems:

- Windows Containers technology was new for developers, so the Microsoft team shared knowledge about Windows Containers as part of the hackfest.
- Tutorials about Windows Containers published on the Internet were mostly prepared for Windows Server 2016 TP5. These tutorials were not working on Windows Server 2016 RTM. The Microsoft team prepared a new tutorial published on the DX Czech/Slovak blog ([Ako „kontajnerizovať“ ASP.NET Framework aplikácie v Azure – krok za krokom](https://blogs.msdn.microsoft.com/vyvojari/2016/11/15/ako-kontajnerizovat-asp-net-framework-aplikacie-v-azure-krok-za-krokom/)).
- Tutorials explaining deployment of .NET Framework web applications to containers using Visual Studio were out of our pilot scope. The tutorials were focused on .NET Core application deployments or missing application lifecycle management parts. The Microsoft team prepared a new tutorial published on the DX Czech/Slovak blog ([Ako nasadiť ASP.NET Framework aplikácie do Windows kontajnerov v Azure pomocou VSTS – krok za krokom](https://blogs.msdn.microsoft.com/vyvojari/2016/11/29/ako-nasadit-asp-net-framework-aplikacie-do-windows-kontajnerov-v-azure-pomocou-vsts-krok-za-krokom/)).
- Only Windows Server Core image is usable for .NET Framework containerization. The deployment process based on “build application -> create Docker image with application -> provision Docker container -> deploy application to container” is not usable with continuous deployment/integration. It was time consuming and complicated in the containers networking part.

We agreed on these steps for the containerization pilot:

- Create an Azure virtual machine as a containerization host (according to the step-by-step tutorial from the Microsoft team).
- Create a custom Docker image for a new container, which will run .NET Framework web applications. This Docker image will be customized and the customization process will be described in detail by the Microsoft team.
- Provision a new container from a previously prepared Docker image. The container will always run, which will rapidly decrease the time between code changes in Visual Studio and change visibility for the UAT tester. The Microsoft team will provide a “how-to” for Docker commands. 
- Create a new web application project in Visual Studio Team Services with continuous integration enabled.
- Add at least two developers to the project who will develop a sample application (“check-in” to VSTS).
- Connect the VSTS project to the Azure container host. This part will be based on a tutorial prepared by the Microsoft team.   
- Test and debug all processes by the Millennium developer team.

At coding sessions after the hackfest, we solved this:

- The Microsoft team prepared a tutorial that covered these parts – “Create host for Windows containers,” “Create custom Docker image for full .NET web applications,” and “Create always running container from Docker image.” 

  These steps were described in a comprehensive blogpost published on the DX Czech/Slovak blog ([Ako „kontajnerizovať“ ASP.NET Framework aplikácie v Azure – krok za krokom](https://blogs.msdn.microsoft.com/vyvojari/2016/11/15/ako-kontajnerizovat-asp-net-framework-aplikacie-v-azure-krok-za-krokom/)). 
- The ISV partner established a small pilot team with two developers. This team created a project in VSTS with code based on MVC ASP.NET 4.6 application. The Microsoft team prepared a tutorial on how to alter an application project and how to deploy it to Windows Container using Visual Studio Team Services. We agreed on usage of Azure File Copy build step for deployment from VSTS to a mapped folder of Windows Container. 

  A comprehensive blogpost was published on the DX Czech/Slovak blog ([Ako nasadiť ASP.NET Framework aplikácie do Windows kontajnerov v Azure pomocou VSTS – krok za krokom](https://blogs.msdn.microsoft.com/vyvojari/2016/11/29/ako-nasadit-asp-net-framework-aplikacie-do-windows-kontajnerov-v-azure-pomocou-vsts-krok-za-krokom/)).
- The ISV partner team succesfully tested this basic scenario in a team of two developers.

*Figure 6. Schema of web application lifecycle with deployment to Windows Container*

![Deployment outputs]({{ site.baseurl }}/images/Millennium/5Schema.png)

 
## Conclusion and final words##

Our DevOps hackfest consisted of three major phases:

- Business and technical onboarding that includes:
  - Legal work such as nondisclosure agreements.
  - Four hours to onboard to Resource Manager/RBAC and Windows Containers, including brainstorming how to smartly extend an existing solution with a newer Azure deployment model with Role-Based Access. Part of this first hackfest session was team creation – three DX technical evangelists focused on Azure and DevOps (Microsoft), tech leader for application development (Millennium), three application developers (Millennium).
  - At least a three-day break to think about the solution individually and check actual technical resources for Resource Manager/RBAC and Windows Containers.
- Development/process evaluation, which consists of:
  - Analyzing the existing provisioning system based on an ASM model.
  - Five two-hour coding sessions in the next five weeks focused on code development (Resource Manager/RBAC part) and steps evaluation (Windows container part).
  - Regular email/Skype contact to check on the status of the project.
  - Four full days (one full day = eight hours) to prepare tutorials, which rapidly moved the project forward, including publishing for the broader community.
- Output and handoff, which includes:
  - GitHub ([https://github.com/mirkub2/SetRBAConARMmodel](https://github.com/mirkub2/SetRBAConARMmodel)).  
  
  - Related technical articles published on a local blog: 
  
    - [https://blogs.msdn.microsoft.com/vyvojari/2016/10/26/ako-v-kode-nastavovat-prava-na-zdroje-azure-vyvojarom-a-itckarom/](https://blogs.msdn.microsoft.com/vyvojari/2016/10/26/ako-v-kode-nastavovat-prava-na-zdroje-azure-vyvojarom-a-itckarom/)
    
    - [https://blogs.msdn.microsoft.com/vyvojari/2016/11/15/ako-kontajnerizovat-asp-net-framework-aplikacie-v-azure-krok-za-krokom/](https://blogs.msdn.microsoft.com/vyvojari/2016/11/15/ako-kontajnerizovat-asp-net-framework-aplikacie-v-azure-krok-za-krokom/)
    
    - [https://blogs.msdn.microsoft.com/vyvojari/2016/11/29/ako-nasadit-asp-net-framework-aplikacie-do-windows-kontajnerov-v-azure-pomocou-vsts-krok-za-krokom/](https://blogs.msdn.microsoft.com/vyvojari/2016/11/29/ako-nasadit-asp-net-framework-aplikacie-do-windows-kontajnerov-v-azure-pomocou-vsts-krok-za-krokom/)
    
  - Piloting RBAC in first team/project.
  
Next steps: 

- Microsoft will provide a consultancy during the next phase, programmatically provisioning Azure platform services in a Resource Manager model. 
- Plan PR activities.

It was a pleasure to work with the Millennium team on a project demonstrating the strength of the dev and test environment fully running in an Azure datacenter. The knowledge created during our teamwork upgraded the partner's provisioning system to higher level.


