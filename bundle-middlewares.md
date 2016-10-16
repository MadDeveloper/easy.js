# Middlewares

Les middlewares sont comme des micro-contrôleurs permettant de pouvoir exécuter des vérifications, pré-charger des données, etc.
Les middlewares sont transposés en middlewares du framework Express.

Easy.js impose, pour le moment, que les middlewares se déclarent sur une route définie.

La déclaration d'un ou plusieurs middlewares se fait dans la configurations des routes d'un bundle via la clé `middlewares`, et chaque middleware est déclaré sous un nom, englobant ses configurations.
Pour configurer un middleware, il faut définir son type \(route ou param, cf. Express\), et la méthode du contrôleur à appeler \(cf. [Index file](bundle-index.md)\). La méthode appelée reçevra respectivement en paramètre un objet [Request](request.md) et [Response](response.md).

```javascript
export const routes = {
    '/mybundle': {
        get: '...',
        post: '...',
        ...,
        middewares: {
            oneMiddleware: {
                route: '/mybundle', // or param: 'my_param'
                method: 'myMethod'
            }
        }
    }
}
```

Cela peut paraitre redondant de devoir écrire la même route dans le middleware alors que nous sommes dans la même route en terme de configuration, cela sera apporté comme amélioration dans les prochaines versions.

Pour des soucis de découpage de code, ou bien de trop grande quantité de middlewares, nous pouvons écrire nos middlewares dans un fichier `middlewares.js` situé au même niveau que celui du routing, et l'importer dans ce dernier.

Exemple :

```javascript
/* middlewares.js */
export default {
    myMiddlewares: {
        oneMiddleware: {
            route: '/mybundle',
            method: 'myMethod'
        },
        secondMiddleware: {
            param: 'my_param',
            method: 'myOtherMethod'
        }
    }
}

/* routes.js */
import middleware from './middlewares'

export const routes = {
    '/mybundle': {
        get: '...',
        post: '...',
        ...,
        middewares: middlewares.myMiddlewares
    }
}
```

Pour finaliser notre middleware il suffit maintenant d'écrire la méthode dans notre contrôleur. Nous verrons plus en détails ce dernier dans le chapitre traitant justement du [Controller](controller.md).

Maintenant que nous savons comment définir des middlewares, il devient tout aussi important de savoir comment définir des accès à une ou des routes de manière plus généraliste, passons donc au chapitre suivant sur la [sécurité](bundle-security.md).

