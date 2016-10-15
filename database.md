# Database

Comme dans chaque projet, la mise en place et la configuration de la base de données reste une étape importante et parfois laborieuse. C'est pour ces raisons que Easy.js s'est basé sur l'ORM Bookshelf.js.

Pour ceux ne connaissant pas le rôle d'un ORM et/ou Bookshelf, vous pouvez aller lire la [documentation de Bookshelf](http://bookshelfjs.org).

La configuration de la base de données se fait en deux étapes.
Les fichiers de configurations de la base de données, comme expliqué dans le [chapitre sur les configurations](configurations.md), se situent dans le dossier `~/src/config/database/`.

Pour commencer les configurations, commencez par ouvrir le fichier `database.js`, de base ce fichier contient le connecteur et les configurations de la base de données. Le connecteur est l'instance valide (connectée) à votre base de données, par défaut, le connecteur utilisé est Bookshelf.

Deux autres connecteurs sont fournis avec l'installation de base : [Knex.js](http://knexjs.org) et [Mongoose](http://mongoosejs.com).

Attention si :
- Si vous décidez d'utiliser autre connecteur, il faudra penser à adapter votre code Repository.
- Vous décidez de supprimer un ou des connecteurs, de ne pas enlever Knex.js si vous utilisez encore Bookshelf, car en effet Bookshelf est basé sur Knex pour construire ses requêtes.

Pour faciliter la construction et l'exportation de la base de données, il vous est mis à disposition le fichier `schema.js` qui contient une représentation en objet Javascript de vos tables. Une liste exhaustive de toutes les clés/valeurs possibles pour définir les champs de la table, des jointures, etc.

Une fois le fichier `schema.js`, il faut suffit de lancer la commande `npm run database:migrate` pour construire les tables et les relations que vous avez défini dans ce dernier.

Une dernière possibilité de construction de la base de données est l'utilisation d'un fichier `.sql` contenant votre architecture et vos données. Le fichier doit être nommé selon la valeur de la clé `database` définie dans vos configurations (par défaut située dans le fichier `knex.js`. Votre fichier `myproject.sql` doit se situer à la racine du dossier de configurations de la base de données : `~/src/config/database/myproject.sql` . Et pour finir, lancez la commande `npm run database:import` pour importer toutes vos données de votre fichier sql dans votre base de données.

La base de données étant configurée et/ou construite, nous pouvons désormais commencez le développement de notre projet en continuant notre lecture avec le prochains chapitre qui traite les [Bundles](bundle.md).

- exposer toutes les combinaisons possibles de structure de table (jointure, etc.)
