
# TriCycle Extended

Le projet **TriCycle Extended** est un projet étudiant permettant de scanner un produit et de savoir comment le recycler à l'aide d'un application mobile et d'un scanner connecté au téléphone en Bluetooth.

Un objet connecté doté d'un scanner permettant de scanner le code barre du produit à jeter affichera les informations sur un petit écran LCD pour indiquer à l’utilisateur si l’objet a été scanné.
Les informations du produit scannés seront consultables sur l’application mobile.

L’application propose à l’utilisateur un historique de ses produits scannés avec des informations détaillées sur le produit et sur le type de poubelle où il doit être jeté. L’utilisateur pourra également ajouter ou supprimer un produit s’il n’existe pas dans la base de données existante.

Le projet disposera d’une application mobile mais également desktop pour un meilleur confort de lecture.

## Technologies Utilisées

Pour l'application mobile, nous avons utilisés:
 - Le framework IONIC
 - Une API avec Node.js

Pour la base de données nous avons utilisés:
- MongoDB
- La base de [OpenFoodFacts](https://fr.openfoodfacts.org/)
 
 
 Le site est composé de 7 pages:
 - La page **Connexion**
 - La page **Accueil**
 - La page **Profil**
 - La page **Historique**
 - La page **Fiche Produit**
 - La page **Création de Produit**
 - La page **Administration**
 
 
## Architecture Logicielle

-  **src** > **app**
	  - admin
	  -  create
	  -  history
	  -  home
	  -  models
	  -  product
	  -  profil
	  -  services
	  -  signin
	  -  tabs
	
Le dossier **admin**  contient les fichiers de la page d'administration d'utilisateur et de produit
Le dossier **create** contient les fichiers de la page de création d'article
Le dossier **history**  contient les fichiers  de la page d'historique des produits scannés
Le dossier **home**  contient les fichiers de la page principale qui affiche des statistiques et le dernier produit scannés
Le dossier **models**  contient les modèles
Le dossier **product** contient les fichiers de la page de détails des produits scannés
Le dossier **profil**  contient les fichiers de la page de détails du profil d'un utilisateur
Le dossier **services**  contient les services afin de ce connecter avec l'API
Le dossier **signin**  contient les fichiers de la page de connexion
Le dossier **tabs**  contient le component du menu de navigation


## Installation

L'application est disponible sous forme de fichier  **.apk** qui peut être installé sur un téléphone Android, elle est disponible dans le dossier ***APK*** .
Une version **Desktop** est disponible sur Windows et MacOS avec un **.exe** et **.dmg** dans le dossier ***builds*** .

Le programme Arduino permet d'utiliser le scanner, l'écran LCD et le module Bluetooth, il est téléchargeable sous le nom de *finale_tricycle.ino*

Afin de voir le fonctionnement de l'application vous pouvez visionner la vidéo de démonstration: https://youtu.be/WWtlz9-pH_U
