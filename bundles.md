# Bundles

Les bundles définissent tout la logique de votre application, c'est dedans que l'on y définiera nos [Controlleurs](controller.md), nos configurations bundle telles que le [routing](routing.md), [middlewares](middlewares.md), [security](security.md), notre [Repository](repository.md) et [Entity](entity.md).

Un bundle comporte tout son code métier afin de pouvoir être réutilisé dans plusieurs application sans devoir le coder à nouveau.

Par défaut, Easy.js intègre 3 bundles : role, user, skeleton.

Les bundles role et user sont intégrés par défaut car ils sont utilisés pour l'inscription, authentification et authorisation déjà implémentées (nous le verrons par la suite, mais toutes ces fonctionnalités sont bien évidemment personnalisables). Il est possible de pouvoir supprimer ces bundles en veillant à corriger les configurations associées.

En ce qui concerne le bundle skeleton, c'est un cas particulier innovant dans le monde du framework. Le skeleton permet d'avoir une base pour la création de nos bundles puisque la création d'un bundle se fait via la commande `npm run bundles:new myBundle` qui vous guidera pour la création de ce dernier. L'implication du skeleton est donc qu'il va servir de support, son code sera duppliqué en remplaçant toutes les occurences de `Skeleton` par `MyBundle` et `skeleton` par `myBundle` dans le code. Il vous est possible de modifier le skeleton afin de pouvoir retrouver des mêmes fonctionnalités dans tous vos bundles. En cas d'erreur de votre part, il vous est possible de pouvoir reset le skeleton avec la commande `npm run bundles:restore:skeleton`. Prochainement, il vous sera possible de pouvoir gérer des snapshots de votre skeleton.

