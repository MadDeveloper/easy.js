# Configurations

Les fichiers de configurations sont importants pour votre projet, c'est une manière simple et efficace de pouvoir facilement modifier le comportement du framework.

Les fichiers de configurations sont classés selon deux parties :
* Les configurations globales
* Les configuratons de bundles

Dans cette section nous allons parler des configurations globales, pour les configurations de bundles veuillez vous reporter au chapitre sur les [Bundles](bundles.md).

Voici les fichiers de configurations après une nouvelle installation :

```
|- config/
|--- database/
|--- keys/
|--- apidoc.js
|--- app.js
|--- authentication.js
|--- bundles.js
|--- roles.js
|--- services.js
```

Quelques explications à propos de ces fichiers/dossiers :

* `database/` Contient des configurations à propos des connecteurs de la base de données
* `keys/` Contient les clés SSH/TLS pour lancer le serveur en HTTPS
* `apidoc.js` Défini des blocks de définitions
*  `app.js` Contient les configurations générale de l'application (Contexte, serveur, JWT, database, etc.)
* `authentication.js` Permet de définir la stratégie d'authentification
* `bundes.js` Spécifie les bundles activés afin de charger leurs configurations
* `roles.js` Associe les roles à leur identifiant (par défaut liés avec ceux en base de données)
* `services.js` Fichier contenant les définitions de services, leur chemin et leurs dépendances

Nous rentrerons dans les détails de chacun des fichiers dans les prochains chapitres, et notamment le suivant qui porte sur la mise en place des [configurations de la base de données](database.md).