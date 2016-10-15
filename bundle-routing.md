# Routing

Un point important dans la conception d'une API est bien évidemment les routes, ou plutôt les endpoint de notre API. En effet ils seront le point d'entrée pour accéder aux ressources de notre serveur, il est donc conseillé d'accorder tu temps à cette étape afin de rendre nos routes claires et concises.

Tous les examples de routes données suivront les conventions de nommage Restful.

Le fichier de routing d'un bundle, nommé par défaut `routes.js`, se trouve dans le dossier `~/src/bundles/myBundle/config`.
Se fichier doit exposer ses routes sous le nom d'une variable nommée `routes` (sauf si vous décidez de changer le fichier `index.js`)

