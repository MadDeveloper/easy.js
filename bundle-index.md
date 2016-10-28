# Index.js file

Ce fichier est le point d'entrée de n'importe quel bundle. Son rôle est d'exposer le contrôleur principal et les routes pour le framework.
Les routes doivent être exportées sous le nom de `routes` et le contrôleur principal sous le nom de `controller` (veillez à respecter la casse).

La structure par défaut du fichier `index.js` de tout bundle est la suivante :

```javascript
export * from './config/routes'
export { MyBundleController as controller } from './controllers/MyBundleController'
```

Généralement, vous ne ferez pas de traitement dans ce fichier, il servira uniquement à exposer les fonctionnalités et configurations et notre bundle.

Suite à cette courte introduction, nous allons maintenant voir comment configurer notre [routing](bundle-routing.md) de bundle.