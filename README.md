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

## Webpack
La façon la plus simple d’installer webpack est de passer par npm, vous devez donc, au préalable, installer nodeJs et npm.
L’installation de webpack est locale, nous devons donc l’installer pour chaque projet.

### Installation
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

### Configuration
Configuration du fichier package.json
```
{
  "name": "tutoriel-webpack",
  "version": "1.0.0",
  "description": "Tutoriel webpack",
+   "private": true, ← afin de ne jamais publier le module (même pas par accident)
-   "main": "index.js", ← car nous voulons exécuter le code depuis index.html
  "scripts": {
    "test": "echo \"Error: no test specified\" && exit 1"
  },
  "author": "",
  "license": "ISC",
  "devDependencies": {
    "webpack": "^5.89.0",
    "webpack-cli": "^5.1.4"
  }
}
```
La ligne main : "index.js" vient par défaut avec la commande npm init car node.js sert avant tout à faire des programmes serveur.  
Comme voulons exécuter une application web côté client, il faut l’enlever afin que ce soit le fichier index.html qui serve de racine.  

Lorsque nous travaillerons avec des cadriciels spécifiquement conçus pour du développement web côté client, ReactJs par exemple, le fichier package.json sera correctement configuré dès le début.

### Modifier le code pour utiliser jQuery localement
Installer jQuery
```
npm install jquery
```

## Retirer le CDN de jQuery dans l'entête du fichier index.html
```
- <script src="https://code.jquery.com/jquery-3.7.1.min.js" integrity="sha256-/JqT3SQfawRcv/BIHPThkBvs0OEvtFFmqPF/lYI/Cxo=" crossorigin="anonymous"></script>
```

## Importer jQuery
Modifier le fichier helloworld.js pour importer jQuery depuis le node_modules
```
import $ from 'jquery';

export default function helloworld() {
    const element = $('<div>Helloworld</div>');
    return element;
}
```
Modifier le fichier index.js pour importer jQuery depuis le node_modules
```
import $ from 'jquery';
import helloworld from './components/helloworld.js'

$('body').append(helloworld());
```

## Créer un build Webpack
Exécuter la commande suivant dans la console.
```
npx webpack
```
Cela devrait avoir créer un dossier 'dist/' contenant le code source unifié et minifié.  

Ajouter le dossier dist/ à votre .gitignore pour ne pas versionner la version de build.
```
node_modules/
dist/
```

## Faire pointer votre fichier html sur le fichier unifié
Modifier le fichier index.html pour pointer sur le fichier dist/main.js
Vous pouvez retirer le type="module" puisqu'il n'y en a plus, tout les modules sont unifiés.
Mais attention, comme vous n'avez plus besoin du type="module", n'oubliez d'ajouter le 'defer' comme on faisait en début de session.
```
<!DOCTYPE html>
<html lang="en">

<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <script src="./dist/main.js" defer></script>
    <title>Mon premier build Webpack</title>
</head>

<body>

</body>

</html>
```


## Personnalisation
Notez que les noms : main.js, dist/ et src/ sont choisi spécialement pour fonctionner avec les configurations par défaut de webpack.  
Nous pouvons les modifier en créant un fichier webpack.config.js à la racine du projet.
````
+ webpack.config.js
``
Ajouter le contenu suivant dedans:
```
const path = require('path');

module.exports = {
  entry: './src/index.js',
  output: {
    filename: 'main.js',
    path: path.resolve(__dirname, 'dist')
  }
};
```
Le fichier de configuration sera utilisé automatiquement si un fichier du nom de webpack.config.js existe à la racine du projet.  
Nous pouvons toutefois préciser un fichier de configuration avec un autre nom en passant celui-ci en argument dans la commande.
```
npx webpack --config webpack.config.js
```
## Script NodeJs
Il est aussi possible d’ajouter des scripts à notre fichier package.json.  
Ces scripts peuvent ensuite être exécutés avec la commande npm run.

Ajoutons un script pour exécuter webpack dans la section 'scripts' du fichier package.json
```
  "scripts": {
    "test": "echo \"Error: no test specified\" && exit 1",
+    "build": "webpack --config webpack.config.js"
  },
```
Tester le script avec la commande :
```
npm run build
```

## Surveiller le répertoire
Évidemment, compiler un build webpack à chaque fois que nous voulons tester nos modifications peut être redondant.  C’est pourquoi nous allons le configurer pour surveiller notre répertoire de développement.

Ajouter les propriétés watch et watchOptions avec les valeurs ci-dessous, dans le fichier webpack.config.js
```
module.exports = {
+  watch: true,
+  watchOptions: {
    ignored: /node_modules/  
  },
  entry: './src/index.js',
  output: {
    filename: 'main.js',
    path: path.resolve(__dirname, 'dist')
  }
};
```

Avec cette propriété, une fois le build initial créé, webpack surveillera les modifications afin de relancer automatiquement un nouveau build à chaque changement dans le code source.  
On lui spécifiera d’ignorer le dossier node_modules, qui contient tous les fichiers ajoutés via npm install et qui est très lourd à surveiller, pour des raisons de performance, de toute façon un module node doit être importé dans un fichier pour être utilisé.

Faites ctrl-c pour arrêter la surveillance.

# Bravo!