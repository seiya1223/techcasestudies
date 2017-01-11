---
layout: post
title:  "Mise en place d'une plateforme d'hébergement web automatisée basée sur Docker, pour ENGIE LAB CRIGEN"
author: "Julien Corioland, Benjamin Guinebertière, Pascal Sauliere"
author-link: "#"
#author-image: "{{ site.baseurl }}/images/authors/photo.jpg"
date:   2017-01-06
categories: [DevOps]
color: "blue"
#image: "{{ site.baseurl }}/images/imagename.png" #should be ~350px tall
excerpt: Pour les besoins du centre de recherche ENGIE LAB CRIGEN, Microsoft les a accompagné dans la mise en place d'une plateforme d'hébergement d'application totalement automatisée et basée sur des conteneurs Docker, dans Microsoft Azure.
language: [French]
verticals: [Energy]
---


ENGIE LAB CRIGEN a récemment été accompagné par Microsoft et Docker lors d'un _hackfest_ ayant pour objectif d'améliorer la manière dont ils mettent à disposition des applications dans l'entreprise.

Les principaux axes de travail abordés lors de ce POC ont été la mise en place des bonnes pratiques DevOps pour déployer en continu une application composée de services Node.js, d'une base de données MongoDb, le tout sur la plateforme Microsoft Azure à l'aide de conteneurs Docker.

Voilà les différentes pratiques DevOps et technologies mises en place lors de ce POC:

- Continuous Integration
- Continuous Deployment
- Infrastructure as Code
- Azure Container Service
- Docker Datacenter
- GitLab
- Visual Studio Team Services

Le _hackfest_ s'est déroulé en deux phases : une première permettant l'établissement d'un _Value Stream Map_ (VSM), afin de mettre en évidence la manière dont ENGIE LAB CRIGEN met à disposition l'application à ses utilisateurs et les points d'améliorations qui sont possibles. La seconde phase a consisté à prototyper la plateforme d'hébergement basée sur Docker, en y incluant directement les bonnes pratiques DevOps mises en évidence lors de la première phase.

Voilà la liste des différentes personnes ayant travaillé sur ce sujet :

#### ENGIE LAB CRIGEN : ####

- Delphine Leblanc, Chef de projet
- Kévin Mencé, Chef de projet IT
- Eric Sablonière, Activité Informatique
- Jean-François Philippe, Ingénieur de recherche
- Alain Chenuaud, Architecte Infrastructure
- Thomas Roueche, Chef de projet
- Nabil Debbou, Responsable DevOps
- Didier Morhain, Expert Cloud
- Cao Truong Hoang, Ingénieur
- Gregory Chatelain, Consultant

#### Docker : ####

- Stéphane Woillez (@swoillez)

#### Microsoft : ####

- Julien Corioland, Technical Evangelist (@jcorioland)
- Benjamin Guinebertière, Technical Evangelist (@benjguin)
- Pascal Sauliere, Technical Evangelist (@psauliere)
- Benoît Touzé, Consultant MCS
- Pascal Veque, Cloud Solution Architect
 
## Présentation du client ##

[ENGIN LAB CRIGEN](http://www.engie.com/engagements/recherche-et-technologies/centres-de-recherche/le-crigen/) est le centre de recherche et d’expertise opérationnelle du Groupe ENGIE dédié aux métiers du gaz, aux énergies nouvelles et aux technologies émergentes. Situé en région parisienne, à la Plaine Saint-Denis et Alfortville, il regroupe 350 collaborateurs.
 
## Contexte et problématiques ##

ENGIE LAB CRIGEN se charge d'héberger des applications développées dans le cadre de projets de recherche, reponsant sur des stacks LAMP (Linux, Apache, PHP, MySQL), Node.js + MongoDb et autres technologies issues du monde open source. 

Le principal objectif fixé dans le cadre des différents ateliers effectués avec Microsoft était de pouvoir travailler sur la mise en place de cette plateforme.

Pour réaliser cet objectif, l'accompagnement de Microsoft s'est déroulé en deux phases :

- Un atelier de deux jours pour réaliser un _Value Stream Mapping_ (VSM) en se basant sur une application hébergée existante d'ENGIE LAB CRIGEN afin de comprendre comment ils travaillent, gèrent le cycle de vie de l'application et ainsi mettre en œuvre les pratiques DevOps à conserver, améliorer et ajouter dans la future plateforme
- Un atelier (_hackfest_) de 3 jours, pour prototyper la plateforme et mettre en place des processus automatisés d'intégration continue et de déploiement continu.

## Atelier 1 : Value Stream Mapping ##

### Architecture ###

L'application qui a été utilisée pour réaliser le VSM est composée des services suivants :

- Une API développée en Node.js
- Un site web d'administration développé en Node.js
- Un site web "front" développé en Node.js
- Une base de données MongoDb

Il y a également une application mobile qui consomme l'API mais qui n'a pas été traitée dans le cadre de l'atelier.

![Vue globale de l'application]({{ site.baseurl }}/images/2016-12-02-engiecrigen/current_architecture.jpg)

### Value Stream Map ###

Afin de mettre en évidence les points d'améliorations possibles dans la manière de gérer le cycle de vie complet de l'application, nous avons donc réalisé une *Value Stream Map* :

![Version finale du VSM]({{ site.baseurl }}/images/2016-12-02-engiecrigen/engie_crigen_vsm_final.jpg)

Cette phase extrêmement importante permet de faire en sorte que tous les acteurs autour de la table prennent le temps d'échanger sur la manière dont ils travaillent, dans le but de cartographier les différents processus et mettre en évidence des points d'amélioration possibles. 

En effet, l'un des premiers retours fait par le client en séance était de dire qu'avant même de voir les résultats de l'exercice, cela avait au moins permis de réunir tous les acteurs travaillant sur le projet dans une même salle de réunion pendant deux jours. Certains d'entres-eux ne travaillant pas sur les mêmes sites.

Le fait de réunir des profils très différents à discuter ensemble de comment ils travaillent sur le projet permet de comprendre les enjeux et objectifs de chacun, mais aussi de mettre en évidence des points de défaut à améliorer.

Dans le cas présent, nous avons notamment identifié qu'un certains nombre d'opérations étaient réalisées manuellement ou déclenchées par des envois d'emails, ce qui est potentiellement source d'erreurs et de latence dans le processus de déploiement en continu.
Nous avons également mis en évidence que l'ajout de certaines pratiques DevOps permettraient d'automatiser un certains nombre de ces tâches :

- De l’_infrastructure as code_, pour la mise en place des environnements (Azure Container Service pour la recette et Docker Datacenter pour la production)
- De la _configuration as code_, à base de Dockerfile et Docker Compose pour définir les stacks applicatives à déployer sur la nouvelle plateforme
- De l’intégration continue, pour la création des images Docker et le push de celles-ci dans une _Docker Trusted Registry_
- Du _Release Management_ pour la fluidification du déploiement en recette, et en production, avec certaines étapes d’approbation entre les différents environnements

Dans un second temps, nous avons également défini la stratégie de branches à appliquer et la manière dont une nouvelle release devrait se faire sur la nouvelle plateforme :

![Stratégie de branches à mettre en place]({{ site.baseurl }}/images/2016-12-02-engiecrigen/branching_strategy.jpg)

En résumé, l’idée ici est de dire :

-	Une branche de développement pour le travail en cours sur le _sprint_ courant, avec éventuellement des _features branches_ par développeur, si nécessaire
-	Une branche d’intégration, avec une opération de _merge_ manuelle faite par le chef de projet pour être capable de déployer l’application en l’état sur un environnement d’intégration, dans les cas où c’est nécessaire pour le projet
-	Une branche _master_, sur laquelle on _merge_ la branche de développement au travers d’une _pull request_, et donc d’une approbation (avec également la possibilité de créer des branches depuis _master_, pour appliquer un _hotfix_, par exemple)

Une fois la PR acceptée sur la branche _master_, une _release_ est déclenchée avec un déploiement automatique sur l’environnement de recette, puis après approbation, un déploiement sur la production.

La dernière étape de cet atelier était de fixer la liste des environnements et technologies à utiliser lors du _hackfest_, à savoir :

- [GitLab](https://about.gitlab.com/) pour le contrôle de code source
- [Visual Studio Team Services](https://www.visualstudio.com/team-services/) pour les builds et le Release Management
- [Azure Container Service](https://azure.microsoft.com/fr-fr/services/container-service/), avec Docker Swarm, pour l'environnement de recette
- [Docker Datacenter](https://www.docker.com/products/docker-datacenter), pour l'environnement de production

Les développeurs utilisant déjà GitLab, le choix a été fait de conserver cet outil qui est totalement interopérable avec les autres. Certaines équipes utilisent déjà Visual Studio Team Services, aussi le choix de cet outil a été fait pour cette application, dans le souci de prototyper son usage pour cette équipe. Enfin, 

ENGIE LAB CRIGEN souhaitait avoir deux environnements dans le Cloud, un pour la recette et un pour la production. En production, ils souhaitent pouvoir bénéficier du support de Docker (CS Docker Engine) qui est fourni avec les licences Docker Datacenter. Pour la recette en revanche, pas besoin de support, nous avons donc opté pour Azure Container Service qui permet de déployer simplement et rapidement la version open source de l'orchestrateur Docker Swarm.

## Atelier 2 : Hackfest ##

La deuxième phase de l'atelier d'accompagnement d'ENGIE LAB CRIGEN a été la réalisation d'un _hackfest_ de 3 jours pendant lequel nous avons prototypé la mise en place de la plateforme d'hébergement d'application web basée sur des conteneurs Docker, en y ajoutant des pratiques DevOps comme de l'intégration en continue, de l'infrastructure as code et du release management. Le but étant de permettre à ENGIE LAB CRIGEN de pouvoir déployer n'importe quelle application en continue !

Cet atelier a été divisé en 3 grandes étapes : 

- la mise en place de l'infrastructure des environnements de recette et de production, sur lequel les profils opérationnels ont travaillé
- le packaging de l'application existante afin de pouvoir l'exécuter dans des conteneurs Docker, sur lesquel les profils plutôt développeurs ont travaillé
- et enfin la mise en place du pipeline complet de CI/CD à l'aide de VSTS, avec à la fois des développeurs et opérationnels.

Afin d'être sûr de toujours garder le bon cap, nous avions des points de synchronisation régulier (après maximum 1/2 journée) pour toujours bien valider que toutes les briques s'assemblaient entre elles. Tout le monde était dans la même salle, ce qui facilite clairement la collaboration.

### Travail sur la mise en place de la plateforme ###

#### Environnement de recette ####

##### Automatisation de l'environnement de recette #####

L'environnement de recette est hébergé dans Microsoft Azure dans un cluster Docker Swarm mis en œuvre par [Azure Container Service](https://docs.microsoft.com/en-us/azure/container-service/) (ACS).

Schéma de principe d'un cluster ACS en mode Docker Swarm :

![ACS en mode Docker Swarm]({{ site.baseurl }}/images/2016-12-02-engiecrigen/acs-swarm2.png)


Le principe est d'utiliser la ligne de commande [Azure Xplat CLI](https://docs.microsoft.com/fr-fr/azure/xplat-cli-azure-resource-manager) pour déployer un nouveau cluster ACS. Cela se fait en une seule commande `azure acs create`, avec les paramètres appropriés et après avoir créé un groupe de ressources pour accueillir le cluster.

**1. Préparation**

Pour tester les commandes et le script dans Ubuntu ou dans Bash sur Ubuntu sur Windows 10 (Windows Subsystem for Linux), l'installation d'Azure CLI se fait de cette manière :

```
sudo apt-get install nodejs-legacy
sudo apt-get install npm
sudo npm install -g azure-cli
```

Pour que l'installation de l'environnement de recette soit automatisée dans un script, il faut que l'authentification dans Azure se fasse sans interaction. Pour ce faire, il faut utiliser un _Service Principal_ dans Azure AD, ainsi que [documenté ici](https://azure.microsoft.com/en-us/documentation/articles/resource-group-authenticate-service-principal-cli/).

Création du Service Principal et assignation des permissions sur l'abonnement Azure :

```
azure ad sp create -n <service principal name> -p <password> --home-page <homepage> --identifier-uris <uris>

azure role assignment create --objectId <Service Principal Object ID> -o Contributor -c /subscriptions/<Subscription ID>/
```

Les paramètres homepage et uris sont obligatoires, doivent être uniques, et vous seront utiles pour gérer le SPN plus tard, si besoin. Exemple :

```
$ azure ad sp create -n demosp1 -p Passw0rd! --home-page https://demo.com --identifier-uris https://demo.com/demo
info:    Executing command ad sp create
+ Creating application demosp1                                                 
+ Creating service principal for application 8dd44fe4-0290-4a51-b652-b8473015528d
data:    Object Id:               02b739e5-d5e7-43aa-b296-176f9b326b71
data:    Display Name:            demosp1
data:    Service Principal Names:
data:                             8dd44fe4-0290-4a51-b652-b8473015528d
data:                             https://demo.com/demo
info:    ad sp create command OK

$ azure role assignment create --objectId 02b739e5-d5e7-43aa-b296-176f9b326b71 -o Contributor -c /subscriptions/ca8358b6-1ae3-4ccd-860e-82c9dc9a9539/
info:    Executing command role assignment create
(...)
info:    role assignment create command OK
```

Une fois le Service Principal créé et autorisé comme contributeur sur l'abonnement Azure, il faut conserver ces trois éléments :

- l'_App ID_ du Service Principal
- le mot de passe du Service Principal
- le _Tenant ID_ de l'abonnement Azure

Pour afficher l'_App ID_ du Service Principal et le _Tenant ID_ de l'abonnement :

```
azure ad sp show -c <Service Principal Name> --json
azure account show
```

Dans un script automatisé, il faudra utiliser cette commande pour l'authentification :

```
azure login -u "<App ID>" -p "<password>" --service-principal --tenant "<Tenant ID>"
```

**2. Fichier de paramètres ACS**

Le déploiement automatique d'un cluster ACS utilise un fichier de paramètres JSON. Ce fichier est généré par le script proposé avec les paramètres fournis.

Pour information, un fichier de paramètres ACS est créé, vide, par cette commande :

```
azure acs config create --parameter-file acsparam.json 
```
 
Complété avec des paramètres d'exemple, il ressemble à cet exemple (la clé publique SSH a été supprimée de l'exemple) :

```
{ 
  "provisioningState": "", 
  "orchestratorProfile": { 
    "orchestratorType": "Swarm" 
  }, 
  "masterProfile": { 
    "count": 1, 
    "dnsPrefix": "acsdemomaster", 
    "fqdn": "acsdemomaster.westeurope.cloudapp.azure.com" 
  }, 
  "agentPoolProfiles": [ 
    { 
      "name": "acsdemoagent", 
      "count": 2, 
      "vmSize": "Standard_D2_v2", 
      "dnsPrefix": "acsdemoagent", 
      "fqdn": "acsdemoagent.westeurope.cloudapp.azure.com" 
    } 
  ], 
  "linuxProfile": { 
    "adminUsername": "acsadmin", 
    "ssh": { 
      "publicKeys": [ 
        { 
          "keyData": "(...)"
        } 
      ] 
    } 
  }, 
  "diagnosticsProfile": { 
    "vmDiagnostics": { 
      "enabled": null, 
      "storageUri": "" 
    } 
  }, 
  "id": null, 
  "name": null, 
  "type": null, 
  "location": "westeurope", 
  "tags": {} 
} 
```

Remarquons que les noms DNS ne doivent pas déjà exister.

**3. Script de déploiement automatique**

Le script automatisé est joint : **recette.sh**.

<script src="https://gist.github.com/jcorioland/643a43ca627333f3df1a361470979cae.js"></script>

Il effectue les tâches suivantes :

- Récupération des paramètres (à finaliser)
- Génération du fichier de paramètres ACS : `/tmp/acsparam.json`
- Authentification Azure avec le Service Principal
- Création du groupe de ressources
- Déploiement du cluster ACS
- Mise à jour de l'exécutable docker-compose avec la version 1.8.1 sur le master 0

**4. Test et suppression de l'environnement**

Une fois le cluster déployé, on peut se connecter en SSH sur un master :

```
ssh -p 2200 -i <private key file> acsadmin@<master fqdn> 
```
 
Pour connecter le client Docker au Swarm :

```
export DOCKER_HOST=:2375 
```

En cas de besoin, pour supprimer entièrement l'environnement, il suffit de supprimer le groupe de ressources :

```
azure group delete RG_acsdemo
```

#### Environnement de production ####

Contrairement à l'environnement de recette, l'environnement de production n'est pas destiné à être redéployé / cloné régulièrement. Les applications y sont bien déployées en continue, par contre le choix a été fait de ne pas recréer l'environnement à chaque déploiement d'une nouvelle version d'un service, pour la simple et bonne raison que cet environnement est destiné à être mutualisée entre plusieurs équipes.

L'accent a donc été mis sur le déploiement d'un environnement répondant aux exigences de la production, plutôt que sur l'automatisation de ce déploiement.

Le choix s'est porté sur Docker Datacenter dans Azure. [Docker Datacenter](http://www.docker.com/products/docker-datacenter) est l'environement d'entreprise proposé par Docker, composé des éléments suivants :

- Docker Engine : runtime, orchestration, réseau, volumes, avec support
- Docker Trusted Registry (DTR) : gestion et distribution sécurisées des images
- Docker Universal Control Plane (UCP) : portail de gestion du cluster

Docker Datacenter est disponible directement [dans le Marketplace d'Azure](https://azure.microsoft.com/en-us/marketplace/partners/docker/dockerdatacenterdocker-datacenter/), avec support conjoint de Microsoft et de Docker.

![Docker Datacenter]({{ site.baseurl }}/images/2016-12-02-engiecrigen/docker-datacenter.png)


Voici l'architecture que nous avons mis en place dans Azure :

![Docker Datacenter]({{ site.baseurl }}/images/2016-12-02-engiecrigen/docker-datacenter-azure.jpg)


Nous avons regroupé toute les ressources au sein d'un groupe de ressources Microsoft Azure :

![Docker Datacenter]({{ site.baseurl }}/images/2016-12-02-engiecrigen/ddc-resources-azure.png)


Les 3 grandes composantes sont : les noeuds UCP, DTR et les agents, créés dans des groupes de haute disponibilité différents et derrière des load balancers différents.

Toutes les machines virtuelles exécutent des Ubuntu 14.04.

Une fois l'infrastructure déployée, nous avons suivi la [procédure d'installation disponible sur le site de Docker](https://docs.docker.com/datacenter/install/linux/) pour l'installation et la configuration de Docker Datacenter.

### Travail sur le packaging de l'application avec Docker ###

Le travail de cette partie de l'équipe consiste à partir des sources de l'application. 
L'application a des sources dans des repos git différents :

- api. C'est l'API elle-même, ainsi que la base MongoDB qu'elle utilise.
- vitrine.
- supervision.

Il s'agit de trois applicatoins en Node.js. 

#### première approche: un repo pour déployer les sources

Notre première approche a été de créer un repo git qui serait destiné à contenir les outils pour packager le code en Docker et ainsi l'envoyer vers les autres environnements (recette, production).

L'idée était de ne pas toucher aux repos existant et d'uniquement en ajouter pour le déploiement.

Nous n'avons finalement pas suivi cette piste car nous aurions eu des dépendances entre les fichiers `Dockerfile` de ce repo et les fichiers sources eux-mêmes. Par exemple, cela aurait consisté à copier dans un même répertoire, typiquement sur une VM de build, des fichiers venant du repo `api` et des fichiers venant du repo de packaging. La gestion du cycle de vie des sources aurait été complexe.

De plus, dans une démarche DevOps, il semble nécessaire que les Dev créent eux-mêmes les conteneurs Docker de façon à avoir une idée plus précise de ce dont les Ops disposeront. 

Il sera à nouveau question de cela plus bas, à propos de la livraison de MongoDB.  

#### seconde approche

Nous avons donc plutôt opté pour une approche consistant à mettre les fichiers `Dockerfile` dans les mêmes repos que les sources qu'ils embarquent.

Les fichiers `Dockerfile` peuvent embarquer des fichiers via la commande `ADD`. Ces fichiers doivent **nécessairement se trouver sous le `Dockerfile` dans la hiérarchie des répertoires**. 
C'est pourquoi, le fichier `Dockerfile` principal se trouve à la racine du repo git.

Dans le cadre du repo `api`, nous avions besoin de deux images Docker et non d'une seule: 

- une image Docker pour packager `api` lui-même
- une image Docker pour packager la base MongoDB (nous y reviendrons plus en détail)

Pour cela, nous avons choisi de mettre les deux fichiers `Dockerfile` à la racine, avec des noms différents évidemment. 
Le fichier principal s'appelle `Dockerfile` et celui pour les outils de déploiement de la base de données `Dockerfile-tools`.

Ainsi, depuis chacun des fichiers, on peut ajouter tout ou partie des fichiers du repo. Par exemple, dans le cas d'`api`, on inclut tous les fichiers dans un dossier de travail du conteneur appelé `/data` par les deux commandes suivantes :

```
WORKDIR /data
ADD . .
```

Le contenu complet du fichier `Dockerfile` du repo `api` est le suivant:

```
# obfuscated1.westeurope.cloudapp.azure.com/crigen/obfuscated10-api
#
# VERSION   0.2

FROM obfuscated1.westeurope.cloudapp.azure.com/crigen/obfuscated10-nodejs:0.1

WORKDIR /data
ADD . .
RUN chmod a+x containerimage/init.sh
RUN npm install

ENTRYPOINT ["/bin/sh", "-c"]
CMD ["/data/containerimage/init.sh", ""]
```

NB: `obfuscated*` correspondent à des noms volontairement masqués dans cette documentation.

On remarque que l'image d'`api` hérite d'une image `obfuscated1.westeurope.cloudapp.azure.com/crigen/obfuscated10-nodejs:0.1` qui est d'ailleurs la même pour `vitrine` et pour `supervision`.

C'est pourquoi nous avons aussi un repo `base-container-images` pour cette image et d'autres; en l'occurrence `mongodb-base` et `mongodb-replicaset`. Dans ce repo `base-container-images`, on a un dossier par image Docker visée avec chacun son fichier `Dockerfile`: 

![]({{ site.baseurl }}/images/2016-12-02-engiecrigen/depc-1.png)


Le nom des images Docker est du type `obfuscated1.westeurope.cloudapp.azure.com/crigen/obfuscated10-nodejs:0.1` et non pas `crigen/obfuscated10-nodejs` pour indiquer que l'image peut être téléchargée depuis la registry `obfuscated1.westeurope.cloudapp.azure.com` et avoir pour numéro de version `0.1` ici.

Lors de nos tests, l'équipe de packaging Docker n'avait pas accès à cette registry, de façon à vérifier que nous pouvions travailler sur une VM de build ou dev sans problème.

Ce fut le cas. Ce nom contenant la registry fonctionne aussi en local. 

La gestion des numéros de versions des images Docker est dans les sources, plus précisément dans les fichiers `Dockerfile` pour que le développeur ne dépende pas d'un processus de build en aval pour avancer. 

Autrement dit, le numéro de version des images Docker est déterministe à partir des sources.

Le processus de build peut le récupérer à partir des commentaires à l'intérieur du `Dockerfile`. 

Il en est de même pour le nom des images Docker. 

#### Déploiement de la base de données MongoDB

La base de données est toujours un cas spécial quand il s'agit de déploiement car, par définition, elle contient des données.
Ces données ont un cycle de vie différent de l'application. Ce n'est pas parce qu'on passe de la version n à la version n+1 de l'application que les données changent.

Nous avons évoqué différentes hypothèses, regardé la façon dont le processus de livraison était documenté par les développeurs (il s'agit d'un document PDF qui décrit les opérations à effectuer suivant les cas rencontrés).
Nous en avons déduit que la meilleure option était de fournir aux ops des outils permettant d'exécuter les commandes nécessaires sur la base pour la créer, restaurer ses données, modifier le schéma etc. en fonction du contexte. 

Ce que Docker apporte dans ce cas est le fait que les développeurs qui rédigent la documentation, et les ops qui sont dans un environnement contraint, peuvent ici avoir accès aux mêmes environnements. 
En effet, le développeur peut packager dans un conteneur d'outils, tous les scripts, outils et autres binaires qui sont nécessaires. 
De plus, le développeur peut sur son environnement de développement tester dans les mêmes conditions que ce qu'auront les ops. 

La seule différence est que les conteneurs Docker en dev s'éxécutent sur un seul hôte (une seule VM), alors que les conteneurs des ops sont a priori plutôt exécutés sur un cluster de plusieurs hosts. 
Cette différence est gérée par les moteurs Docker et sont donc assez transparentes une fois que tout est en place.

Voici le contenu du fichier `Dockerfile-tools`: 

``` 
# obfuscated1.westeurope.cloudapp.azure.com/crigen/obfuscated10-api-tools
#
# VERSION   0.1

FROM obfuscated1.westeurope.cloudapp.azure.com/crigen/obfuscated10-api:0.2

RUN apt-key adv --keyserver hkp://keyserver.ubuntu.com:80 --recv EA312927 && \
    echo "deb http://repo.mongodb.org/apt/debian wheezy/mongodb-org/3.2 main" | tee /etc/apt/sources.list.d/mongodb-org-3.2.list && \
    apt-get update && \
    apt-get install -y \ 
        mongodb-org-shell \
        mongodb-org-tools 

RUN chmod a+x containerimage-tools/*.sh

ENTRYPOINT ["init"]

```

Ici, il n'y a pas de commande `ADD` parce qu'on hérite de l'image `obfuscated1.westeurope.cloudapp.azure.com/crigen/obfuscated10-api:0.2` qui a elle-même inclus tout le repo `api` où se trouve aussi `Dockerfile-tools`.
Cela inclut donc par exemple les fichiers `containerimage-tools/*.sh` sur lesquels on fait un `chmod`.

On aurait tout aussi bien pu opter pour une stratégie plus fine, avec des `ADD` différents dans les deux fichiers `Dockerfile` d'`api`.

On trouvera plus bas un exemple d'utilisation du conteneur généré par `Dockerfile-tools`, pour restaurer la base MongoDB.

#### Composition des conteneurs

Reste à composer tout cela dans une composition Docker. Le fichier `docker-compose.yml` et d'autres fichiers annexes se trouvent dans un 5ème repo: `compose-containers`.

Suivant qu'on est en dev/build, recette, production ou autre environnement, certains éléments de contexte changent. 
Il a été choisi d'avoir ces éléments de contexte sous forme de variables d'environnement.

Chaque environnement est responsable du positionnement des valeurs des variables.
Les sources, dans l'environnement de dev, et les repos git, fournissent les variables nécessaires et des exemples de valeurs que sont celles de développement.

Exemples, dans le repo `compose-containers`, avec le fichier `set_environment_variables.sh`:
```
export DOCKER_NETWORK_TYPE=bridge
```

et le fichier `docker-compose.env` référencé par `docker-compose.yml`: 
```
MONGODB_HOSTS_PORTS=mongodb:27017,slave1:27017,slave2:27017
MONGODB_USER=obfuscated3
MONGODB_PASSWORD=obfuscated4
MONGODB_DB=crigen
MONGODB_DEBUG=true
```

En ce qui concerne la montée en charge, il nous a semblé prudent de se limiter à une montée en charge statique au niveau du fichier `docker-compose.yml`, plutôt qu'avec des conteneurs génériques sur lesquels on demande a posteriori une montée en charge. 
Les raisons principales sont les suivantes: 

- une montée en charge dynamique n'était pas prioritaire dans le cadre du projet
- une montée en charge statique (ex: `vitrine1`, `vitrine2`) permet
    - une résolution de nom simple, sans mise en place de services tels que [CONSUL](https://www.consul.io/),
    - de connaître le nombre de noeuds à indiquer dans les chaînes de connexion MongoDB par exemple,
- au moment du hackfest, Docker ne permet pas un `docker-compose` en indiquant directement le nombre de conteneurs nécessaires pour un service. Il faut le faire après le `docker-compose up`.
- il n'est pas très compliqué d'ajouter statiquement des conteneurs dans le `docker-compose.yml` par copie de blocs et changement des numéros de ports publics. 

Au final, le fichier `docker-compose.yml` a le contenu suivant: 

```
version: '2'
services:
  vitrine1:
    image: obfuscated1.westeurope.cloudapp.azure.com/crigen/obfuscated10-vitrine:0.1
    container_name: vitrine1
    ports: 
      - "50001:3001"
    networks:
      - obfuscated10net
  vitrine2:
    image: obfuscated1.westeurope.cloudapp.azure.com/crigen/obfuscated10-vitrine:0.1
    container_name: vitrine2
    ports: 
      - "50002:3001"
    networks:
      - obfuscated10net
  api1:
    image: obfuscated1.westeurope.cloudapp.azure.com/crigen/obfuscated10-api:0.2
    container_name: api1
    ports: 
      - "50011:8894"
    networks:
      - obfuscated10net
    env_file:
      - docker-compose.env
  api2:
    image: obfuscated1.westeurope.cloudapp.azure.com/crigen/obfuscated10-api:0.2
    container_name: api2
    ports: 
      - "50012:8894"
    networks:
      - obfuscated10net
    env_file:
      - docker-compose.env
  supervision1:
    image: obfuscated1.westeurope.cloudapp.azure.com/crigen/obfuscated10-supervision:0.1
    container_name: supervision1
    ports: 
      - "50021:3001"
    networks:
      - obfuscated10net
    env_file:
      - docker-compose.env
  supervision2:
    image: obfuscated1.westeurope.cloudapp.azure.com/crigen/obfuscated10-supervision:0.1
    container_name: supervision2
    ports: 
      - "50022:3001"
    networks:
      - obfuscated10net
    env_file:
      - docker-compose.env
  mongodb-master:
    image: obfuscated1.westeurope.cloudapp.azure.com/crigen/obfuscated10-mongodb-replicaset:0.1
    networks:
      - obfuscated10net
    environment:
      ROLE: "master"
      SLAVE1: "slave1"
      SLAVE2: "slave2"
    hostname: mongodb
    container_name: mongodb
  mongodb-slave1:
    image: obfuscated1.westeurope.cloudapp.azure.com/crigen/obfuscated10-mongodb-replicaset:0.1
    networks:
      - obfuscated10net
    hostname: slave1
    container_name: slave1
    depends_on:
      - mongodb-master
  mongodb-slave2:
    image: obfuscated1.westeurope.cloudapp.azure.com/crigen/obfuscated10-mongodb-replicaset:0.1
    networks:
      - obfuscated10net
    hostname: slave2
    container_name: slave2
    depends_on:
      - mongodb-master
  api-tools:
    image: obfuscated1.westeurope.cloudapp.azure.com/crigen/obfuscated10-api-tools:0.1
    container_name: api-tools
    networks:
      - obfuscated10net
    env_file:
      - docker-compose.env
    depends_on:
      - mongodb-master
      - mongodb-slave1
      - mongodb-slave2
      - api1
      - api2
networks:
  obfuscated10net:
    driver: ${DOCKER_NETWORK_TYPE}
```

On notera le réseau Docker de type `bridge` en build/dev pour fonctionner sur un host unique. Il sera de type `overlay` sur plusieurs hosts.

#### Construction des images et exécution du code dans les conteneurs sur la VM de build/dev

Voici la façon dont nous contruisons les images depuis une VM de build ou de dev (sous Ubuntu 16.04 dans le cadre de nos tests): 

Récupération des sources depuis les différents repos: 

```
cd $obfuscated10_HOME
git clone git@obfuscated2.westeurope.cloudapp.azure.com:atelier/vitrine.git 
git clone git@obfuscated2.westeurope.cloudapp.azure.com:atelier/api.git
git clone git@obfuscated2.westeurope.cloudapp.azure.com:atelier/supervision.git
git clone git@obfuscated2.westeurope.cloudapp.azure.com:atelier/base-container-images.git
git clone git@obfuscated2.westeurope.cloudapp.azure.com:atelier/compose-containers.git
```

Potentiellement, reset des images:

```
docker rmi obfuscated1.westeurope.cloudapp.azure.com/crigen/obfuscated10-mongodb-base:0.1
docker rmi obfuscated1.westeurope.cloudapp.azure.com/crigen/obfuscated10-mongodb-replicaset:0.1
docker rmi obfuscated1.westeurope.cloudapp.azure.com/crigen/obfuscated10-nodejs:0.1
docker rmi obfuscated1.westeurope.cloudapp.azure.com/crigen/obfuscated10-api:0.2
docker rmi obfuscated1.westeurope.cloudapp.azure.com/crigen/obfuscated10-api-tools:0.1
docker rmi obfuscated1.westeurope.cloudapp.azure.com/crigen/obfuscated10-vitrine:0.1
docker rmi obfuscated1.westeurope.cloudapp.azure.com/crigen/obfuscated10-supervision:0.1
```

Construction des images: 

```
cd $obfuscated10_HOME/base-container-images
docker build -t obfuscated1.westeurope.cloudapp.azure.com/crigen/obfuscated10-nodejs:0.1 ./nodejs
docker build -t obfuscated1.westeurope.cloudapp.azure.com/crigen/obfuscated10-mongodb-base:0.1 ./mongodb-base
docker build -t obfuscated1.westeurope.cloudapp.azure.com/crigen/obfuscated10-mongodb-replicaset:0.1 ./mongodb-replicaset

cd $obfuscated10_HOME
docker build -t obfuscated1.westeurope.cloudapp.azure.com/crigen/obfuscated10-api:0.2 ./api
docker build -t obfuscated1.westeurope.cloudapp.azure.com/crigen/obfuscated10-api-tools:0.1 --file ./api/Dockerfile-tools ./api
docker build -t obfuscated1.westeurope.cloudapp.azure.com/crigen/obfuscated10-vitrine:0.1 ./vitrine
docker build -t obfuscated1.westeurope.cloudapp.azure.com/crigen/obfuscated10-supervision:0.1 ./supervision
```

Depuis cette même VM, on peut exécuter l'ensemble des conteneurs.
Dans notre cas, nous avons fait fonctionner cela depuis une VM Azure avec 14 Go de RAM, plus que sur mon ordinateur portable ;-). 

```
cd $obfuscated10_HOME/compose-containers
. set_environment_variables.sh
docker-compose up -d
```

Ces différentes commandes sont globalement celles qui sont ensuite exécutées depuis Visual Studio Team Services pour la construction automatisée des images docker depuis le code source.

#### Exemple d'utilisation du conteneur outils pour MongoDB

Voici par exemple ensuite comment on peut restaurer la base MongoDB: 

```
docker exec -ti api-tools bash
cd database/export/db-pwz-v2-20161005
mongorestore --host rs0/$MONGODB_HOSTS --db $MONGODB_DB --drop ./dump/crigen
cd /data
mongo --host rs0/$MONGODB_HOSTS $MONGODB_DB
use crigen
show collections
```

### Mise en place du déploiement en continu ###

#### Intégration Continue ####

La première tâche sur laquelle nous avons travaillé est la mise en place d'intégration continue pour faire en sorte de déclencher une build Visual Studio Team Services à chaque fois qu'une _pull request_ est acceptée sur la branche master du projet GitLab.

L'objectif principal de la build est de packager l'application dans une image Docker à partir de son Dockerfile est de la pousser automatiquement dans la Docker Trusted Registry du projet.
Pour réaliser cet objectif, il a été nécessaire de :

- Installer et configurer un agent de build Visual Studio Team Services sous Linux
- Installer l'extension Docker pour Visual Studio Team Services depuis la Marketplace
- Configurer une connexion externe vers le dépôt GitLab et la Docker Trusted Registry dans Visual Studio Team Services
- Créer une nouvelle définition de build et la connecter au dépôt GitLab

##### Installation d'un agent de build Visual Studio Team Services sous Linux #####

Visual Studio Team Services propose des agents hébergés sous Windows (fournis par la plateforme). Pour les _workloads_ Linux, comme c'est le cas ici, il est nécessaire de créer sa propre machine et d'y installer un agent.

La procedure d'installation et de configuration est décrite [sur cette page](https://www.visualstudio.com/en-us/docs/build/admin/agents/v2-linux). Dans le cas présent, nous avons créé une machine Ubuntu 16.04 dans Microsoft Azure, nous y avons installé Docker en suivant la procédure [décrite sur le site de Docker](https://docs.docker.com/engine/installation/linux/ubuntulinux/), puis nous avons configuré l'agent en suivant la documentation ci-dessus.

Nous avons choisi de créer l'agent dans un nouveau pool, nommé *Crigen-docker*. Une fois l'installation et la configuration terminées, on peut voir cet agent disponible dans les paramètres du projet d'équipe, dans Visual Studio Team Services :

![Agent Queue]({{ site.baseurl }}/images/2016-12-02-engiecrigen/agent-pool.png)


Nous configurerons ensuite chaque build et la release pour s'exécuter sur cet agent.

##### Installation de l'extension Docker pour VSTS #####

Afin de pouvoir générer les images Docker dans une build Visual Studio Team Services, il est nécessaire d'installer une extension développée par Microsoft et [disponible dans la MarketPlace](https://marketplace.visualstudio.com/items?itemName=ms-vscs-rm.docker).
Ceci se fait très simplement en cliquant sur le bouton **Install** et en suivant les instructions données par le site :

![Définitions des différentes builds]({{ site.baseurl }}/images/2016-12-02-engiecrigen/docker_vsts_integration.png)


##### Connexion de GitLab et Docker Trusted Registry dans VSTS #####

Visual Studio Team Services supporte la connexion à des dépôts Git externe, pour cela il faut se rendre dans les paramètres du projet d'équipes, onglet *Services* puis d'ajouter une nouvelle connexion vers un Git externe :

![Définitions des différentes builds]({{ site.baseurl }}/images/2016-12-02-engiecrigen/external_git.png)


Il suffit ensuite de renseigner l'URL du dépôt Git (ici hébergé sur une machine virtuelle dans Azure, dans GitLab) et les informations de connexion :

![Définitions des différentes builds]({{ site.baseurl }}/images/2016-12-02-engiecrigen/external_git_info.png)


De la même manière, il est possible de configurer une connexion vers la Docker Trusted Registry dans laquelle devront être poussées les images :

![Définitions des différentes builds]({{ site.baseurl }}/images/2016-12-02-engiecrigen/vsts_docker_dtr.png)


##### Mise en place de la définition de build #####

Une fois la configuration des différents services externes et l'installation de l'extension Docker pour Visual Studio Team Services terminées, nous pouvons passer à la création des différentes définitions de Build (une pour chaque repository).

La première étape consiste à configurer le dépôt Git auquel se lier, via l'onglet *Repository* :

![Configuration du dépôt]({{ site.baseurl }}/images/2016-12-02-engiecrigen/build-repository.png)


Nous avons ensuite besoin de 4 étapes pour chaque image Docker à envoyer dans la trusted registry :

**1.** La récupération du nom de l'image à l'aide d'un script Bash dans le Dockerfile (cf. astuce ci-dessous)
**2.** La récupération de la version de l'image à l'aide d'un script Bash dans le Dockerfile (cf. astuce ci-dessous)

![Script Bash]({{ site.baseurl }}/images/2016-12-02-engiecrigen/build-step-1.png)


**3.** Le build de l'image

![Build Docker image]({{ site.baseurl }}/images/2016-12-02-engiecrigen/build-step-2.png)


**4.** Le push de l'image dans la trusted registry

![Push Docker Image]({{ site.baseurl }}/images/2016-12-02-engiecrigen/build-step-3.png)


Enfin, il est possible de configurer la build pour s'exécuter sur l'agent Linux créé au préalable. Ceci se fait dans l'onglet *General* :

![Configuration du pool]({{ site.baseurl }}/images/2016-12-02-engiecrigen/build-general.png)


Après avoir réalisé ces quelques étapes simple, à chaque fois que des modifications sont poussées sur la branche master du projet GitLab, une build se déclenche automatiquement et se charge de recréer l'image Docker et de la pousser dans la Docker Trusted Registry.

Ils nous a ensuite suffi de répéter ces opérations pour chaque dépôt GitLab :

![Définitions des différentes builds]({{ site.baseurl }}/images/2016-12-02-engiecrigen/builds_definitions.png)


*ASTUCE*

Pour le versionnage des images, nous avons utilisé des commentaires en en-tête des fichiers Dockerfile :

    # URL_DOCKER_TRUSTED_REGISTRY/crigen/api
    #
    # VERSION   0.2

Pour récupérer le nom de l'image, nous utilisons :

    /bin/bash -c "grep \"# URL_DOCKER_TRUSTED_REGISTRY\" .../Dockerfile | awk '{print \"##vso[task.setvariable variable=image.name;]\"$2}'"

Pour récupérer la version, nos utilisons :

    /bin/bash -c "grep \"# VERSION\" .../Dockerfile | awk '{print \"##vso[task.setvariable variable=image.version;]\"$3}'"

Nous pouvons ensuite directement utiliser une tâche d'exécution d'un script bash pour pouvoir extraire le nom de l'image et numéro de version afin de l'affecter à des variables de la build que nous réutilisons par la suite :

![Affectation de la variable au moment de la build]({{ site.baseurl }}/images/2016-12-02-engiecrigen/set_vsts_variable_at_build_time.png)


![Utilisation des variables]({{ site.baseurl }}/images/2016-12-02-engiecrigen/use_vsts_variable.png)


*Pour plus d'information concernant les "logging commands" qui permettent notamment d'affecter des variables en cours de build, consultez [cette page](https://github.com/Microsoft/vsts-tasks/blob/master/docs/authoring/commands.md).* 

#### Release Management ####

Le but du Release Management est de pouvoir déclencher une séquence de déploiement après la fin d'une build. Dans le cas présent, l'application est composée de micro-services et chaque build permet de créer et d'envoyer l'image Docker qui correspond au service dans la Trusted Registry Docker. Afin de garder une certaine maîtrise sur le déploiement de l'application, il a été choisi de stocker les scripts de déploiement (basés sur [Docker Compose](https://docs.docker.com/compose/)) dans un autre dépôt GitLab.

Ce choix nous a permis de déclarer une build d'intégration continue qui se déclenche automatiquement à chaque fois que les scripts de déploiement sont modifiés et uniquement quand ceux-ci sont modifiés. Cette nouvelle build ne se charge que de copier ces scripts en sortie, pour qu'ils soient disponibles en tant qu'artefacts réutilisables dans le processus de release :

![CI Deploiement]({{ site.baseurl }}/images/2016-12-02-engiecrigen/ci-deploiement.png)


Ainsi, on retrouve bien les fichiers nécessaires au déploiement en sortie de build :

![CI artefacts]({{ site.baseurl }}/images/2016-12-02-engiecrigen/ci-artefacts.png)


A partir de là, nous pouvons définir une nouvelle définition de Release dans Visual Studio Team Services, et la lier à la build précédente afin d'en récupérer les artefacts :

![CI artefacts]({{ site.baseurl }}/images/2016-12-02-engiecrigen/release-artefacts.png)


Ensuite, nous avons défini nos deux environnements de Recette (Azure Container Service) et de Production (Docker DataCenter) :

![CI artefacts]({{ site.baseurl }}/images/2016-12-02-engiecrigen/release-overview.png)


Pour chacun des environnements, le déploiement se fait à l'aide de deux étapes :

1. La copie des fichiers de déploiement issus de la build à l'aide de SCP
2. L'exécution d'un script de déploiement via SSH : ce script est très simple puisqu'il ne fait que manipuler la ligne de commande **docker-compose**: il commence par faire un pull, pour récupérer la dernière version des images à utiliser, puis stop les services, les supprime, et démarre les nouveaux !

Pour pouvoir faire cela, nous avons tout simplement déclaré les connexions SSH dans les services externes de Visual Studio Team Services :

![CI artefacts]({{ site.baseurl }}/images/2016-12-02-engiecrigen/services-ssh.png)


Enfin, ENGIE LAB CRIGEN souhaitait pouvoir valider le passage sur l'environnement de production, nous avons donc utilisé la fonctionnalité d'approbation de Visual Studio Team Services pour faire en sorte qu'une validation manuelle soit obligatoire entre l'environnement de Recette et l'environnement de Production. Pour cela, il suffit de cliquer sur les "..." au niveau de l'environnement de Production et de cliquer sur *Assign approvers* :

![CI artefacts]({{ site.baseurl }}/images/2016-12-02-engiecrigen/release-assign-approvers.png)


Cela étant fait, à chaque fois qu'une étape de release sur la Recette se termine, le processus reste en attente d'une approbation manuelle :

![CI artefacts]({{ site.baseurl }}/images/2016-12-02-engiecrigen/release-waiting-approval.png)
 

## Conclusion ##

Dans cet atelier, Microsoft a accompagné le centre de recherche ENGIE LAB CRIGEN dans le prototypage d'une plateforme d'hébergement d'application web "as a service", totalement bâtie sur la plateforme Microsoft Azure et capable d'exécuter n'importe quelle application web, quelle que soit la technologie utilisée pour la développer, et ce grâce aux conteneurs Docker.
Cette plateforme a été pensée pour être totalement automatisée pour faire en sorte que les applications puissent y être déployées en continu, en utilisant Visual Studio Team Services.

Quelques mots du d'ENGIE LAB CRIGEN pour conclure:

*Nous avons souhaité faire cet atelier, car nous cherchons à mettre en place une infrastructure nous permettant de déployer rapidement des applications dans le cadre de nos activités de recherche (POC …).*

*Ce workshop nous a permis de tester l'association de Docker sur Azure et de découvrir les produits commerciaux de Docker (Docker Datacenter, Trusted Registry...)*

*L'accompagnement de Microsoft a permis de voir de nouvelles « bonnes pratiques » concernant pour la mise en place d’un process devops, notamment sur l’automatisation des différentes étapes et de nous aider à mettre rapidement des choses en place pendant l’atelier*

## Références externes ##

- [Value Stream Map (HD)]({{ site.baseurl }}/images/2016-12-02-engiecrigen/engie_crigen_vsm_final.jpg)

- [Azure Container Service](https://docs.microsoft.com/en-us/azure/container-service/)
- [ACS Swarm from Azure CLI](https://blogs.msdn.microsoft.com/jcorioland/2016/07/21/azure-container-service-from-the-azure-cli/)
- [Docker Datacenter](http://www.docker.com/products/docker-datacenter)
- [Docker Datacenter sur Microsoft Azure](https://success.docker.com/Datacenter/Apply/Docker_Datacenter_on_Azure)
- [Série d'articles détaillés et en français, par Anthony Costeseque](https://unifiedit.wordpress.com/2016/09/22/docker-datacenter-sur-azure-partie-1/)
- [Documentation de Docker sur l'intégration d'UCP avec la DTR](https://docs.docker.com/datacenter/ucp/1.1/configuration/dtr-integration/)
- [Création d'un agent de build Linux](https://www.visualstudio.com/en-us/docs/build/admin/agents/v2-linux)
- [Utilisation de l'extension Docker pour Visual Studio Team Services](https://blogs.msdn.microsoft.com/jcorioland/2016/08/19/build-push-and-run-docker-images-with-visual-studio-team-services/)
