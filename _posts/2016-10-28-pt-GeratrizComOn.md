---
layout: post
title:  "Building a sustainable, scalable solution with Geratriz to measure utility use at shopping malls"
author: "João Almeida"
author-link: "http://github.com/joalmeid"
#author-image: "{{ site.baseurl }}/images/geratriz/geratriz01.png"
date:   2017-01-05
categories: IoT
color: "blue"
#image: "{{ site.baseurl }}/images/geratiz/geratriz02.png" #should be ~350px tall
excerpt: O projeto WeMeter da Geratriz tem como objetivo fornecer uma clara ideia de consumo de Utilities como energia, gás, agua e diesel. Depois de uma primeira implementação, os resultados não foram os esperados, tendo sido criada uma nova abordagem baseada em cloud. Este projeto visava reduzir drasticamente custos de provisionamento, manutenção dos dispositivos físicos e atingir um nivel de escalabilidade que permitisse executar  esforços de internacionalização já planeados. Adicionalmente foram definidos outros objectivos como a integração com parceiros da Geratriz (SenseWaves), para a análise de dados especializada no consumo energético.  
language: Portuguese
verticals: [Energy, Smart Cities, Facility Management, Smart Building]
---

## Geratriz e ComOn - Uma parceria forte ##

<img src="{{ site.baseurl }}/images/geratriz/geratriz02.png" width="300">

A [*Geratriz*](https://geratriz.pt/) atua nos setores de Água e Energia, oferecendo serviços de engenharia técnica para oferecer soluções inovadoras e eficientes. Com grande experiência e presença nos mercados de Água e Energia.

Pesquisa e desenvolvimento estão na raiz de sua criação. Trabalhando no terreno com desafios de engenharia complexos, recorrem a tecnologia de ponta para atingir os seus objetivos. Tem uma equipa dedicada à pesquisa e desenvolvimento, focada em trazer inovação e soluções eficientes para os clientes finais. Trata-se de uma equipe multidisciplinar de Engenharia (Química, Meio Ambiente, Elétrica e Mecânica) que coordena várias equipes de especialistas compostas de eletromecânicos, eletricistas, soldadores, serralheiros, mecânicos, analistas e outros, que complementam todas as áreas cobertas nas indústrias que atendem.

<img src="{{ site.baseurl }}/images/geratriz/geratriz03.png" width="300">

[*ComOn*](http://www.comon.pt/) é um parceiro focado no Marketing digital, com conhecimentos técnicos adquiridos na última década, através de compromissos com empresas de topo em Portugal e no estrangeiro. Mais do que uma agência de serviços completos, [*ComOn*](http://www.comon.pt/) investiu em segmentos-chave com um espírito de *startup*. Eles têm uma equipe de engenharia focada em projetos em nuvem, mas também na *Internet of Things* (IoT).

## Monitorização de energia e Água em centros comerciais ##

Os grandes centros comerciais, operam num mercado competitivo onde têm de gerir multiplas instalações físicas, onde os consumos de Utilities se tornaram preponderantes. As variações dos habitos de consumo dos utilizadores finais, as alterações climatéricas, o mercado energético aberto são hoje realidades com forte impacto na estratégia dos centros comerciais. 

Cada centro comercial tem necessidade de recolher e analisar métricas de consumo, com o objetivo de procurar eficiencia, detectar anomalias de consumo, gerir contractos com fornecedores e reduzir custos. Para tal, é necessário aferir e comparar consumos de diferentes edificios, zonas e segmentado por diferentes tipos de consumos. Prever os consumos afetos a cada utilidade permite também planear picos de necessidade, reduzir penalidades de consumo e reforça a capacidade de negociação com fornecedores. Torna-se preemtório atingir capacidades próximas de tempo real, na obtenção de relatórios, capacidades rápidas de comparação temporal e financeira.

![Leitor de energia]({{ site.baseurl }}/images/geratriz/geratriz04.jpg)


## WeMeter ##

A Geratriz apresenta soluções aos seus clientes finais (Centros Comerciais) com a sua plataforma [*WeMeter*](http://geratriz.pt/en/content/company/all-in-one-monitoring-and-management-utility/). Trata-se de plataforma web de gestão centralizada de serviços de infrastrutura, direcionado a grandes instalações e edifícios. Proporcionam acesso a painéis simples e intuitivos em qualquer computador ou smartphone. Regista, gere e controla o consumo de eletricidade, água e gás. Ao gerar relatórios eficazes com dados e gráficos complexos com conteúdo rico e personalizável, democratiza-se a análise de tendências e previsão.

Os cliente podem aceder ao histórico de consumos de água e energia, relatórios pré-definidos e personalizados em unidades de medida (Kwh/m3) ou moeda (euros). A ferramenta foi igualmente desenvolvida para cálculo provisional, recorrendo a métodos de cálculo bastante precisos, onde o cliente pode fazer estimativas futuras dos diversos consumos monitorizados, com margens de erro bastante reduzidas.

Esta solução foi inicialmente disponibilizada há dois anos, mas os resultados não foram os esperados. Geratriz sofreu problemas de desempenho e escalabilidade, e deparou-se com altos custos de manutenção especialmente com o hardware. O WeMeter estava em funcionamento noutras plataformas de nuvem, e com arquitecturas inadequadas recorrendo a serviços genéricos (não pensados nas necessidades de IoT). A Geratriz rapidamente começou a procurar soluções sustentáveis, escaláveis ​​e extensivéis.

Em termos de negócio, Geratriz, tem como objectivo de curto prazo iniciar o processo de internacionalização, para o WeMeter e através da sua carteira de clientes internacionais. No entanto, há necessidade de ter total confiança na plataforma, antes trablhar com clientes de maiores dimensões.

### Instalação e manutenção de Hardware ###

A solução da Geratriz, o WeMeter, requeria um processo de análise sobre as instalações dos seus clientes. O principal motivo prendia-se com a necessidade de instalação de hardware que correspondessem a um conjunto de requisitos técnicos já identificados.

-  Instalação electrica requeria técnicos certificados para instalação de leitores de energia e/ou água.
-  A disperção dos leitores pelos edificios varia caso a caso, tendo impacto no número de dispositivos necessários. 
-  A comunicação entre dispostivos e conectividade à Internet, varia conforme a disposição dos edificios.
-  A manutenção dos dispositivos requer deslocação física às instalações dos clientes.
-  A fiabilidade da ligação à Internet está dependente da conectividade GPRS, que se multiplica perante a quantidade de dispositivos.
-  Incapacidade de executar tarefas de manutenção básicas de forma remota.
-  Custos inerentes à aquisição, instalação e manutenção dos dispositivos.
-  Conectividade estabelecida através de protocolos TCP propriatários, de forma insegura.


### Escalabilidade e resiliencia ###

A solução do WeMeter, oferecia poucas caracteristicas de escalabilidade e resiliencia, tanto no tratamento dos dados recolhidos, como no processamento dos mesmos. Com apenas alguns edificios de média dimensão a Geratriz, deparou-se com a nacessidade de garantir a correcta recolha de dados através de parametrizações nos dispositivos. Muitas vezes era necessário reenviar quantidades de dados, persistidos nos dispositivos, devido a falta de conectividade com a sua plataforma. Eram utilizados processos fornecidos pelo dispositivo para enviar dados, através de FTP.

A nivel do processamento de dados, a arquitectura exigia que os dados passassem por fornecedores cloud diferentes e através de processamentos individuais sobre cada registo recolhido. O processamento envolvia o calculo de agregações temporais e por classificação de consumo e custos. Como consequencia, o processamento de um mês de dados poderia atingir três semanas de execução manual. O impacto sobre a disponibilidade dos dados aos seus clientes era tremendo, não oferecendo real valor. O facto de estarem a trabalhar sobre um mercado aberto, faz com que existam variações de preço, que obrigavam muitas vezes a um reprocessamento dos dados, tendo um custo operacional enorme.

### Segurança ###

Estando a Geratriz bem informada quando ao mercado de IoT, a segurança foi um dos requisitos identificados deste início. Depois das recentes notícias em torno da utilização de dispositivos de IoT para ataques DDOS, a Geratriz decidiu compreender as características de segurança da sua actual solução. Foram identificados várias falhas, que poderiam ser exploradas. Como tal, foram identificados várias áreas de preocupação que envolviam os dispositivos no terreno, a sua comunicação com a Internet e a segurança da sua solução cloud based. Todas estas áreas teriam de ser abordadas na nova solução.

## Estratégia de negócio ##

Um dos objetivos da Geratriz foi investigar uma nova arquitetura de hardware que reduzisse os custos de instalação e manutenção. Em paralelo desejava-se alcançar uma abordagem mais padronizada com vista a facilitar a evolução do produto no futuro próximo. Os parceiros internacionais da Geratriz, investigam formas menos intrusivas de medir os consumos de água/energia, logo havia uma necessidade de seguir uma implementação standard. A Geratriz necessitava uma plataforma de dados que permitisse o processamento de todos os dados recolhidos, e capacitada para lidar com grandes volumes de dados. A equipa, visa comercializar a sua plataforma junto dos seus clientes com instalações físicas de grande dimensão. O objetivo de disponibilizar dados perto de tempo real na plataforma WeMeter é fundamental para o seu negócio. A Geratriz está consciente de que seria necessário implementar alterações fundamentais através de soluções Big Data provisionadas num ambiente cloud.

Com este objetivo, a equipe de pesquisa da Geratriz trabalhou, em estreita colaboração, com a [*ComOn*](http://www.comon.pt) e Microsoft. Todos trabalharam em prol de alinhar uma solução tecnológica que correspondesse a todos os requisitos previamente identificados, oferecendo valor acrescentado à sua oferta comercial.

Autores:

- João Almeida – Senior Technical Evangelist, Microsoft Portugal
- Luis Calado – Principal Technical Evangelist, Microsoft Portugal
- José Lima – Senior Researcher, Geratriz
- Carlos Quadrado – Development Lead, ComOn 
- Carlos Simões – Senior Developer, ComOn

![Equipa hackfest]({{ site.baseurl }}/images/geratriz/geratriz05.jpg)


## Solução ##

Dados os desafios colocados pela Geratriz, seria necessário encontrar uma solução com elevada capacidade de fiabilidade, resiliencia e reduzindo os custos operacionais da mesma.

- Na arquitectura de hardware é importante maximizar o numero de dados recolhidos a partir de leitores de energia e água. Foi criado o dispositivo WeMeter, baseado em Raspberry Pi 3. A opção deveu-se ao facto de terem sido identificados mais de 100 leitores energéticos e água (cerca de 5) situados em zonas técnicas relativamente próximas e com a possibilidade de termos uma conectividade por cabos. Com apenas um Raspberry Pi 3, foi possível interligar um máximo de 20 dispositivos através das 4 entradas USB do Raspberry com um conversor de RS-485 para USB, através de um chipset da FTDI. Os preços destes dispositivos são bastante baixos. Para os contadores de água foram utilizados contadores capacitados de emitir pulsos electricos por um volume de água especificado. A integração com o RaspBerry 3 é feito através de um shield [*PiFace Digital*](http://www.piface.org.uk/products/piface_digital_2/), também amplamente adoptado pela comunidade. O shield de PiFace permite a entrada de 8 inputs digitais, o que permite ler até um máximo de 8 contadores de água diferentes por RaspBerry Pi 3. 

- A facilidade de instalação do dispositivo WeMeter era crucial, pelo que teria de ser uma tarefa simples para poder ser efectuada remotamente e sem necessitar apoio das equipas de engenheria da Geratriz. O facto dos contadores energéticos serem ligados em série para um cabo USB e este ao Raspberry Pi 3, reduz drasticamente a complexidade de instalação. Paralelamente, foi identificada a necessidade de alterar remotamente a configuração do dispositivo WeMeter, e tal foi atingido através das capacidade de device management do IoT Hub.  

- Possibilidade de criar casing apropriado para um cenário industrial, era igualmente um requisito relevante. A forte adopção de Raspberry Pi 3 e comunidades como [*3D Hubs*](https://www.3dhubs.com/), fará com que seja possível idelizar várias caixas, com custos reduzidos.

- Finalmente, a ligação à Internet foi efectuada através de Wifi. Isto porque muitas das instalações dos clientes estão já capacitados com redes Wifi seguras. Em todo o caso, a aquisição de GPRS USB Dongle é um cenário altamente interessante dado a maturidade das soluções apresentadas pelos operadores de telecomunicações. Hoje inclusivé existem planos de dados orientados ao volume de dados, e já numa prespectiva empresarial, facilitando a gestão dos mesmos pela Geratriz.

- Havendo um frontend do WeMeter em fase final de desenvolvimento, o modelo de dados encontrava-se ainda associado aos antigos dispositivos

### Solução técnica ###

Focando a solução ténica na arquitetura de devices a serem utilizados num dado edificio a ser monitorizado, a seguinte tabela resume a solução encontrada e testada:

| Componente                  | Fornecedor        | Detalhes                                                                     | Descrição  |
|----------------------------|-----------------|----------------------------------------------------------------------------------|----------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------|
| Contador de energia             | Algodue elettronica | [*Contador de energia UEM1P5 Mid*](http://algodue.it/eng/uem1p5.html)    | Contador de energia de 4 módulos DIN, para medição energética em cenários industriais e residenciais. Com comunicação embutida, de acordo com os protocolos RS485 Modbus RTU/ASCII, M-Bus ou Ethernet Modbus TCP. |
| Contador de energia             | Kael Elektronik Ltd | [*Contador de energia ENERGY-02-DIN*](http://www.kael.com.tr/eng/pdf/ENERGY-02%20POWER-01%20eng.pdf)    | O dispositivo monitoriza total de energia activa (ΣkWh) das três fases, medindo voltagens AC RMS e RMS. |
| Contador de água              | ZENNER International GmbH & Co. KG | [*MTKD-N-I*](http://www.zenner.com/product_categories/category/water-meters_multi-jet_dry-dial/product/products_water-meters_mtkd.html) | MTKD é um contador multi-jato de disco seco para água potável fria, com rolos de 7 ou 8 dígitos para diferentes valores de pulso e retrocompativel com pulsador mecânico. O valor de pulso padrão é 100 l/pulso. Suporta medição de consumo de água potável fria até 50 ° C e aprovado de acordo com MID.|
| Dispositivo WeMeter             | Raspberry Pi Foundation | [*Raspberry Pi 3 Model B*](https://www.raspberrypi.org/products/raspberry-pi-3-model-b/)    | O Raspberry Pi é um computador numa única placa, com um CPU A1.2GHz de 64 bits, quad-core, ARMv8 e rede *wireless* de standard 802.11n, 4 portas USB e 40 pinos GPIO, além de outros recursos.|
| Conversor ModBus/USB       | FTDI Chip       | [*Conversor USB-RS485*](http://www.ftdichip.com/Products/Cables/USBRS485.htm)    | O cabo USB-RS485 é um cabo série UART conversor de níveis de USB para RS485 e que incorpora o componente integrado FTDI FT232RQ resposável por converter todo o protocolo e sinalização USB. O cabo fornece uma maneira rápida e simples de conectar dispositivos com uma interface RS485 a USB. |
| Shield para Raspberry Pi | OpenLX SP Ltd   | [*PiFace Digital 2*](http://www.piface.org.uk/products/piface_digital_2/)    | O PiFace digital é um *shield* de Raspberry Pi que permite que sejam ligadas luzes, *switches*, motores e sensores para serem utilizados com aplicações desenvolvidas com Scratch, Python, C ou JavaScript. |
| *Hotspot* móvel 3G USB            | Meo / ZTE       |  [*ROUTER 3G 21.6 Mbps  - ZTE MF65*](https://conteudos.meo.pt/meo/Documentos/Manuais/Routers/ZTE-MF65-Manual.pdf) | O ZTE MF65 é um *hotspot* móvel 3G que funciona com as redes GSM/ GPRS/EDGE/WCDMA/HSPA/HSPA+. Com interfaces USB e Wi-Fi. Com *downlink* HSDPA 21Mbps, *quad-band GSM* e *tri-band UMTS*. |
| Azure Cloud                | Microsoft       | [*Microsoft Azure IoT Services*](https://azure.microsoft.com/en-us/develop/iot/) | A plataforma Microsoft Azure é utilizada para fornecer todas as capacidades de processamento e inteligência, incluíndo registro de dispositivos, segurança, ingestão de dados, análise em tempo real, armazenamento e visualização. |

![Bancada técnica para o WeMeter]({{ site.baseurl }}/images/geratriz/geratriz06.png)


### Arquitectura ###

Nesta secção detalhamos a arquitectura implementada, descrevendo os principais requisitos e os componentes utilizados. Foram identificadas duas áreas isoladas com caracteristicas diferentes. Apresentamos os detalhes de arquitectura para o WeMeter Device a o backend assente em Microsoft Azure. 

O WeMeter Device foi testado com várias contadores de energia e água. O objetivo principal foi identificado como a definição de um device com bastos custos de operacionalização e com capacidade de integrar com um elevado número de contadores. O desenvolvimento teria de ser de rapida prototipagem e facil de implementar o suporte a contadores de diferentes fornecedores.

#### O dispositivo WeMeter

O WeMeter device foi desenhado com vista a reduzir os custos e cumprir com os requisitos de recolha de informação necessários à solução do WeMeter.
Para tal foi desenhado com base em RaspBeery Pi 3, principalmente pelas capacidades nativas de ligação Wifi. No cenário dos edificios de Shopping Malls, usualmente existe rede Wifi disponivel no edificio, mas por questões de segurança a rede seria garantida por um Router 3G Wifi, gerido pela própria Geratriz. Desta forma a rede utilizada é controlada e assente num plano de dados contratualizado e gerido. Adicionalmenta a maior parte dos contadores das várias utilities, localizam-se em zonas técnicas onde um unico Router 3G pode providenciar conectividade a vários WeMeter devices. 

**Monitorização energética**

A monitorização energética foi definida com base no output dos contadores energéticos. Como pratica da industria existem vários contadores que permitem o acesso aos dados com base no protocolo de [*RS-485*](https://en.wikipedia.org/wiki/RS-485)/[*ModBus*](https://en.wikipedia.org/wiki/Modbus) - RS-485 is used as the physical layer underlying many standard and proprietary automation protocols used to implement Industrial Control Systems, including the most common versions of Modbus.

Com o adaptador [*RS485 to USB Converter*](http://www.ftdichip.com/Products/Cables/USBRS485.htm) da FTDI, foi possível reduzir drasticamente a complexidade de instalação do dispositivo. Cada entrade de USB permite interligar em série até um máximo de 256 contadores de energia (limitado pelo protocolo de ModBus). Cada contador de energia é identificado por um ID, sobre a qual todas as querys de Modbus são implementadas. 

O software do WeMeter Device foi desenvolvido em NodeJS, dada a grande agilidade e suporte pela comunidade. Foi através de packages como
[*serial port npm*](https://www.npmjs.com/package/serialport) que o acesso via USB foi desenvolvido e com o package [*modbus-rtu npm*](https://www.npmjs.com/package/modbus-rtu) foi possível obter as leituras energéticas dos contadores.

A geratriz trabalha maioritariamente com dois tipos de contadores energéticos (KAEL e Algodue) que têm caracteristicas diferentes na sua estrutura de dados e utilização dos protocolos de ModBus. Por exemplo os registos de dados da Algodue são em 32bits e os da Kael em 16bits, o que requereu lógica especifica para cada um dos contadores.

**Monitorização de água**

Os contadores de água são hoje em dia comercializados, com capacidade de monitorização através de Pulses - é actualmetne o standard de industria. Como tal recorremos ao PiFace, para interligar os inputs digitais proveninentes dos contadores de água. O PiFace permite um total de 8 inputs digitais que neste caso correspondem a contadores de água. Com recurso ao package 
[*piface npm*](https://www.npmjs.com/package/piface-node) foi possível detectar os eventos de alteração dos pulses, e com base na configuração e convenções, atigiu-se novamente uma fácil instalação do dispositivo.

Finalmente, é importante descrever como toda a configuração do WeMeter Device é assente num unico ficheiro de configuração em JSON. Este ficheiro identifica e descreve todos os contadores de utilities. A visão passou por reduzir o processo de deployment ao sistema operativo [*Raspbian*](https://www.raspbian.org/), o software do device WeMeter e ao ficheiros de configuração. 

### Arquitectura da plataforma cloud ###

A arquitectura do backend da solução WeMeter visa atingir elevados niveis de escalabilidade e agilidade na extensabilidade para um mercado internacional. Como tal foi seguida uma implementação de acordo com a [*Azure IoT Reference Architecture*](http://download.microsoft.com/download/A/4/D/A4DAD253-BC21-41D3-B9D9-87D2AE6F0719/Microsoft_Azure_IoT_Reference_Architecture.pdf). Nesta arquitectura são identificados requisitos de near-real time e de agregação de acordo com requisitos temporais e das várias zonas que compõem um dado edificio de um cliente. 
A ingestão de dados, foi o principal ponto na qual foi identificado o [*Azure IoT Hub*](https://azure.microsoft.com/en-us/services/iot-hub/), como peça fundamental: 

**IoT Hub**

A implementação do *backend* na nuvem tem como peça principal o Azure IoT Hub, um serviço *cloud* que permite gestão de dispositivos, upload de dados de forma sergura e um volume alto de ingestão de dados. Nas fases de instalação do WeMeter num dado cliente(shopping mall), cada dispositivo será registado, tendo já identificado os dados que serão recolhidos. Estes dados virão de um conjunto de contadores energéticos e de água. O principal objectivo é garantir a ingestão de dados dos recursos monitorizados, nomeadamente Volume de água, Phase 1 voltage (V), Phase 2 voltage (V), Phase 3 voltage (V), active energy (Wh), reactive energy (VArh), power factor (PF) and three phase voltage (V3ph).

O formato de dados é baseado em JSON, tal como exemplificado em baixo, e através de AMQP, de forma sergura com um *encrypted tunnel*. Foi utilizado o 
[*Microsoft Azure IoT device SDK for Node.js*](https://github.com/Azure/azure-iot-sdks/blob/master/node/device/readme.md).

```json
[{
    "id": "DeviceEmulatorWeMeter",
    "msgId": "5334465e-a8ba-d888-d4d3-6fbf685f9800",
    "date": "2016-10-28T11:23:55.279Z",
    "payload": [{
        "type": "VPh1",
        "value": 401.5230712890625,
        "unity": "V"
    }, {
        "type": "VPh2",
        "value": 401.5230712890625,
        "unity": "V"
    }, {
        "type": "VPh3",
        "value": 401.5230712890625,
        "unity": "V"
    }, {
        "type": "Wh",
        "value": 401.5230712890625,
        "unity": "Wh"
    }, {
        "type": "VArh",
        "value": 401.5230712890625,
        "unity": "VArh"
    }, {
        "type": "PF",
        "value": 401.5230712890625,
        "unity": ""
    }, {
        "type": "w",
        "value": 401.5230712890625,
        "unity": "V3ph"
    }]
}]
```

**Stream Analytics**

Foi utilizado o [*Azure Stream Analytics*](https://azure.microsoft.com/en-us/services/stream-analytics/) integrado com o IoT Hub, para processar os dados em real time, de acordo com as várias necessidades de agregação. 

![Configuração para Azure Stream Analytics]({{ site.baseurl }}/images/geratriz/geratriz07.png)


Um dos Jobs de Stream Analytics, de nome wmStreamAnalytics, permitiu redireccionar os dados um Event Processor, baseado numa implementação de Service Bus Queues. A abordagem foi baseada no tutorial de [*Process device-to-cloud messages*](https://docs.microsoft.com/en-us/azure/iot-hub/iot-hub-csharp-csharp-process-d2c). Este processo permitiu invocar as APIs do WeMeter para aceder a business rules, e à identificação dos clientes, edificios e zonas.   

**Storage**

Foi definido workflow de processamento cujo objectivo seria o de processamento/agregação de dados, de acordo com as regras de negócio definidas pela Geratriz, com base no seu conhecimento de consumo de Utilities. Foi definido um cold path que guarda os dados provenientes de todos os devices numa BLOB Storage (binary large object). A informação permanece no mesmo formato JSON original enviado pelo WeMeter Device. O objetivo principal deste componente foi de efectuar análise sobre os dados submetidos aquando da execução do projeto, mas também para permitir o processamento de dados históricos recolhidos pela solução. 

Para planos futuros ficou definido a implementação de um cluster HD Insight que permitiria efectuar agregações por hora, dia, semana mês e ano, e (re)calcular os consumos atingidos com base em preços unitários das utilities. É importante mencionar que poderão haver alterações nos tarifários e que necessitaram de um processamento dos dados.

**Web API do WeMeter**

A Web API da plataforma WeMeter corresponde a uma REST API, que foi inicialmente desenvolvida para suportar o Front-End do WeMeter, mas também, os calculos de processamento de dados. Esta última feature foi gradualmente delegada para um flow de processamento de dados assente em Stream Analytics.

Foi totalmente desenvolvido com Javascript (ECMA 2015) com [*Microsoft Visual Studio Code*](https://code.visualstudio.com) por uma equipa de developers com Windows e macOS. Foram adoptadas as praticas de agile development com [*Visual Studio Team Services*](https://www.visualstudio.com/team-services/) com Continuous Integration e Continuous Deployment para a plataforma de [*Azure App Service*](https://azure.microsoft.com/en-us/services/app-service/).

**Front End do WeMeter**

O projeto WeMeter já tinha começado anteriormente com base numa implementação IoT diferente. Um dos assets já com desenvolvimento avançado correspondia ao Web Front End, onde a experiencia de utilização foi criada com base em input em profissionais da área de Utilities e clientes. O feedback obtido permitiu um desenvolvimento de um front-end simples e objetivo.

O Front End do WeMeter foi desenvolvido tendo em conta os Modern Web Standards, com foco numa utilização cross-platform e cross-browser. Tal como a API, o desenvolvimento foi baseado em Javascript (ECMA 2015) recorrendo a [*Microsoft Visual Studio Code*](https://code.visualstudio.com), [*Visual Studio Team Services*](https://www.visualstudio.com/team-services/) e [*Azure App Service*](https://azure.microsoft.com/en-us/services/app-service/).

Na perspectiva de UI, o WeMeter permite um dado cliente ter uma visão holistica de uma dado edificio, evidenciando as várias utilities monitorizadas, com os respectivos consumos efectuados:

![WeMeter - Consumos por tipo de consumo]({{ site.baseurl }}/images/geratriz/geratriz08.png)


Para cada utility, é possível ver o respectivo consumo ao longo do tempo, agregando os consumos registados por todos os devices, independentemente da zona física do edificio. É ainda possível avaliar os consumos por área, para entender os padrões de consumo.

![WeMeter - Consumo total energético]({{ site.baseurl }}/images/geratriz/geratriz09.png)


![WeMeter - Consumo total de água]({{ site.baseurl }}/images/geratriz/geratriz10.png)


Dado que cada edificio é usualmente gerido por grandes equipas, é possível fazer uma análise por área de consumo. Os consumos são classificados por utilização da utility, ou seja, é possível distinguir o consumo energético para iluminação ou HVACs.  

![WeMeter - Consumo por áreas de edifício]({{ site.baseurl }}/images/geratriz/geratriz11.png)


![WeMeter - Consumo energético]({{ site.baseurl }}/images/geratriz/geratriz12.png)


## Conclusões ##

O principal objetivo do projeto foi a definição de uma solução para o WeMeter Device, tendo em conta os requisitos pre-identificados.

![Notas levantamento de requisitos do WeMeter]({{ site.baseurl }}/images/geratriz/geratriz13.png)


A fase inicial começou por um trabalho de procurement em torno de devices já disponiveis no mercado. Os requisitos a nivel de conetividade permitiram explorar arquitecturas [*star*](https://en.wikipedia.org/wiki/Star_network) ou [*mesh*](https://en.wikipedia.org/wiki/Mesh_networking), descritas exaustivamente na Internet, principalmente na comunidade de IoT. Foram contemplados protocolos como WiFi, Bluetooth(BLE), ZigBee, Z-Wave, SigFox or LoRaWan. A necessidade de atingir uma solução de near-real time e o volume de dados identificados descartou SigFox ou LoRa. O baixo custo e flexibilidade dos WiFi Router 3G foram os principais motivos pela escolha desta opção. O facto de se ter em mente a internacionalização, foi também um ponto relevante, visto que estão disponiveis na maioria dos países.

A opção de utilizar o Raspberry Pi para computação prendeu-se com o elevado suporte da comunidade e possibilidade de utilizar vários sistemas operativos com runtime distintos. Neste caso os skills das equipas associados a NodeJS, determinaram o Raspberry com o sistema operativo Raspbian. O esforço dado pela comunidade de desenvolvimento permitiu atingir rapidos resultados na utilização de protocolos como ModBus ou monitorização de água por pulsos.

Hoje em dia toda a tarefa de procurement de devices fica facilitara através do [*Azure IoT Partner Catalog*](http://azureiotpartners.azurewebsites.net) onde podemos avaliar as specs e features de vários devices, e encontrar os fornecedores para os mesmos. 

Outras conclusões relevantes na selecção do device:

-   A capacidade de ligar via USB (4 inputs) vários contadores energéticos em série;
-   A capacidade de detectar os pulsos dos contadores de água e através de configuração determinar o consumo;
-   A capacidade de comunicar através de Wifi, de forma nativa, tendo total controlo sobre a configuração de segurança das redes Wifi;
-   A capacidade de interligar vários WeMeter devices num único Router 3G, apropriado às zonas técnicas existentes nos centros comerciais;
-   A facilidade de utilização dos SDK de NodeJS, para comunicação com o backend Azure

Uma das principais vantagens fornecidas pelo backend Azure, foram as features do serviço IoT Hub, nomeadamente o Device Management. A Geratriz visava reduzir drasticamente os custos de manutenção, através de operações remotas. A capacidade de enviar mensagens cloud to device, permitiu reiniciar os dispostivos e apostar num formato stateless para os devices.  

Igualmente, a capacidade de registar os devices permite um proceso de provisionamento mais estruturado. Dado um novo cliente e um novo edificio a monitoriza, a Geratriz apenas necessitará registar os devices no IoT Hub e configurar o WeMeter Device. Estas acções podem ser feitas em bulk através de um backoffce que se encontra planeado.

## Oportunidades futuras ##

Com o resultado deste projeto, a Geratriz, determinou um plano de acção assente na estratégia de negócio: 

-   Como proximo passo a Geratriz optará por fazer um deployment total da solução num cliente, nomeadamente num centros comercial. Este deployment terá como objetivo uma utilização real, e validar o trabalho de dimensionamento que foi efectuado. O centro comercial será de média duração e será mais um passo de consolidação para iniciar os esforços de internacionalização. 

-   Foi identificada a necessidade de criar um backoffice do WeMeter gerido pela pópria Geratriz. Este backoffice terá como objetivo principal facilitar o deployment e tarefas operacionais sobre uma dada instalação. A capacidade dos operadores obterem informação sobre os devices, executar tarefas remotas como a alteração de configuração, reboot dos devices e o provisionamento em bulk.

-   Geratriz, tem trabalhado com um parceiro internacional - [*SenseWaves*](http://www.sensewaves.io/). Este parceiro detém um produto chamado Adaptix, que automatiza aspectos-chave da gestão de energia em edifícios, extraindo inteligência a partir de contadores de eletricidade, água e gás. Este produto disponibiliza previsões em tempo real, detecção de anomalias e análise de padrões para detectar irregularidades em milissegundos. Geratriz está determinada para integrar o Adaptix com o WeMeter. De análises iniciais, foi avaliada a arquitetura técnica da SenseWaves - Adaptix é implementado com *containers Docker* e Kubernetes. O Azure suporta o Kubernetes 1.4 e recentemente abriu a *preview* do suporte nativo em Azure: [*Kubernetes no Azure Container Service (preview)*] (https://azure.microsoft.com/en-us/blog/azure-container-service-the -cloud-s-most-open-option-for-containers /).
Este aspecto irá facilitar os esforços de integração no Azure, juntamente com WeMeter. 
