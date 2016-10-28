# Entity Manager

Le Entity Manager est une classe Easy.js permettant de pouvoir charger un repository ou un model à la volée.

Cette classe va servir de passerelle entre vos repositories et entities, puisqu'en effet vous aurez certainement besoin de définir des relations dans vos models, ou bien pouvoir accéder à des repositories externe au bundle courant.

Entity Manager met aussi à votre disposition l'ORM Bookshelf et l'instance de la classe `Database`, dont vous n'aurez surement jamais l'utilité.

Afin d'optimiser les chargements à la volée, la classe Entity Manager possède une stratégie de mise en cache, par conséquent à chaque fois que vous demandez un model ou un repository, une instance de ce dernier sera mis en cache si ce n'est pas déjà le cas. Notez que cela implique que les méthodes pour récupérer un model ou un repository retourne une instance de votre classe et non la classe elle-même (cela facilite pour vous la partie construction et envoie de paramètres à vos classes).

**Repository**

```javascript
/* em = Entity Manager */
const myRepository = em.getRepository( 'myRespository' )

myRepository
    .findAll()
    .then( ... )
    .catch( ... )
```

**Model**

```javascript
/* em = Entity Manager */
const MyModel = em.getModel( 'myModel' )
const bookshelfModel = new MyModel()
const bookshelfCollection = MyModel.collection()
/* alias for collection */
const bookshelfCollection = em.getCollection( 'myModel' )
```

Remarquez que nous avons utilisé le mot clé `new` pour instancier un model alors que Entity Manager nous retourne déjà une instance. En réalité c'est bel et bien le cas, mais nos classe entity retourne un model Bookshelf, l'instance de notre entity n'existe plus après la fin du constructeur de celle-ci puisqu'en effet nous allons travailler sur les models Bookshelf et non nos entities directement.