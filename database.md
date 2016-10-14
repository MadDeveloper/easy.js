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