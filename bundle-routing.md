# Routing

Un point important dans la conception d'une API est bien évidemment les routes, ou plutôt les endpoint de notre API. En effet ils seront le point d'entrée pour accéder aux ressources de notre serveur, il est donc conseillé d'accorder tu temps à cette étape afin de rendre nos routes claires et concises.

Tous les examples de routes données suivront les conventions de nommage Restful.

Le fichier de routing d'un bundle, nommé par défaut `routes.js`, se trouve dans le dossier `~/src/bundles/myBundle/config`.
Se fichier doit exposer ses routes sous le nom d'une variable nommée `routes` (sauf si vous décidez de changer le fichier `index.js`)

Pour définir une route, il suffit de créer dans notre objet routes exporté, une clé portant le nom de la route :

```javascript
export const routes = {
    '/mybundle': {}
}
```

Exporté ainsi, cette route ne sera jamais accessible, si vous testez, vous reçevez un code d'erreur http `405 Method Not Allowed` puisque Easy.js ne trouvera aucune méthode Http associé à cette route.

Ajoutons une première route fonctionnelle avec la méthode `GET` défini dans le standard http :

```javascript
export const route = {
    '/mybundle': {
        get: 'isAlive'
    }
}
```

C'est à ce moment que vous allez vous demander à quoi sert et correspond ce 'isAlive'. Et bien c'est ici que toute la magie du framework Easy.js opère, en effet lorsque vous allez démarrer votre serveur, Easy.js va lire tous vos fichiers de configurations, donc vos routes, et dans le cas présent, il va associer la route `/mybundle` avec la méthode http `GET` à la méthode de notre contrôleur que nous avons exposé dans notre fichier [index.js](bundle-index.md).

N'ayant pas encore défini la méthode `isAlive()` dans notre contrôleur inutile de tester cette route pour le moment, nous y viendrons lors du chapitre traitant le [Controller](