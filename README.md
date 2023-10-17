# tutoriel-webpack

## Créer un projet de base intégrant jQuery en CDN

### Créer l’arborescence du projet suivante :
```
webpack-tutorial
+  |- index.html
+  |-  src/index.js
+  |-  src/components/helloworld.js
```
### Ajouter le code suivant dans helloworld.js
```
export default function helloworld() {
    const element = $('<div>Helloworld</div>');
    //la variable $ provient du module ajouté manuellement dans le .html  
    return element;
}
```

### Ajouter le code suivant dans index.js
```
import helloworld from './components/helloworld.js'

$('body').append(helloworld());
```

### Ajouter le code suivant dans index.html
```
<!DOCTYPE html>
<html lang="en">

<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <script src="https://code.jquery.com/jquery-3.7.1.min.js"
        integrity="sha256-/JqT3SQfawRcv/BIHPThkBvs0OEvtFFmqPF/lYI/Cxo=" crossorigin="anonymous"></script>
    <script src="./src/index.js" type="module"></script>
    <title>Mon premier build Webpack</title>
</head>

<body>

</body>

</html>
```

## Le problème
Nous avons ici un fichier.html qui intègre un module externe (jquery).  Ce fichier pris sur internet contient une variable $ qui fait référence à un module contenant des méthodes pour manipuler le D.O.M.  

Ce n’est pas optimal pour deux raisons :
1.	Notre module dépend d’une URL qui pourrait changer sans préavis.  Notre application cesserait alors de fonctionner.
2.	Nous tenons pour acquis que l’intégration du script nous permettra d’utiliser une variable $, mais à moins connaître le code source ou la documentation de jquery, nous n’avons aucune façon de savoir que le $ vient du script externe et non pas d’une variable codée ailleurs dans le projet. 

## La solution
Nous allons installer localement le module jquery à partir de npm.

Nous allons importer le module dans notre code avec la commande import vue.  Cette façon de faire est encore mieux, car nous ne polluons pas l’application avec une variable $ globale.

Nous allons utiliser webpack pour faire une version unifié de tous les modules nécessaires au bon fonctionnement de l’application.

## Installation de Webpack
La façon la plus simple d’installer webpack est de passer par npm, vous devez donc, au préalable, installer nodeJs et npm.
L’installation de webpack est locale, nous devons donc l’installer pour chaque projet.

Créer un fichier package.json avec la commande suivante :
```
npm init
```
Installer webpack localement avec la commande suivante :
```
npm install webpack --save-dev
```
Installer webpack-cli localement avec la commande suivante :
```
npm install webpack-cli --save-dev
```

À ce moment-ci, vote répertoire git sera hors de contrôle.  Créer un fichier .gitignore à la racine du projet
```
+ .gitignore
```
Ajoutez-y le répertoire node_modules
```
node_modules/
```
