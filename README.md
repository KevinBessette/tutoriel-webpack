# tutoriel-webpack

## Créer l’arborescence du projet suivante :
```
webpack-tutorial
+  | - index.html
+  | -  src/index.js
+  | -  src/components/helloworld.js
```
## Ajouter le code suivant dans helloworld.js
```
export default function helloworld() {
    const element = $('<div>Helloworld</div>');
    //la variable $ provient du module ajouté manuellement dans le .html  
    return element;
}
```

## Ajouter le code suivant dans index.js
```
import helloworld from './components/helloworld.js'

$('body').append(helloworld());
```

## Ajouter le code suivant dans index.html
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