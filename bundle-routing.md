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

N'ayant pas encore défini la méthode `isAlive()` dans notre contrôleur inutile de tester cette route pour le moment, nous y viendrons lors du chapitre traitant le [Controller](controller.md).

Nous venons de créer notre première route ! Il n'y a rien de plus simple pour tout type de route, il existe bien d'autre méthodes http prisent en charges :

* get
* post
* put
* patch
* delete
* etc.

Lors de l'écriture de vos routes, vous serez souvent amenés à devoir y intégrer des paramètres de route, un ID, un nom, etc.
Comme Easy.js se sert du router de Express, vous pouvez définir les paramètres de route avec deux points suivi du nom du paramètre, par example : `/myroute/:my_param`, définir un paramètre `:my_param` récupérable via l'objet `Request` que l'on verra plus tard.

Voici un exemple de configuration de routes :

```javascript
export const routes = {
    '/roles': {
        get: 'getRoles',
        post: 'createRole'
    },

    '/roles/:role_id': {
        get: 'getRole',
        put: 'updateRole',
        delete: 'deleteRole'
    }
}
```

Vous venez de voir comment définir des routes, cependant cela ne suffit pas pour faire un projet complet et sécurisé, en effet vous allez vouloir définir des accès à certaines routes, effectuer des contrôles sur les paramètres, etc. Nous verrons tout ceci dans les prochains chapitre, et notamment le suivant portant sur les [middlewares](bundle-middlewares.md).