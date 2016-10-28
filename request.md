# Request

La request est un élément important dans le processus http, puisque c'est dedans que l'on pourra retrouver tous les éléments nécessaire pour répondre correctement au client, ou bien même faire transiter temporairement des données.

La classe `Request` de Easy.js est une surcouche de l'objet `request` Express. Cet objet est capturé lors d'un premier middleware et est envoyé au constructeur de la `Request` Easy.js. Tout ceci est déjà intégré vous n'avez pas besoin de le faire vous-même.

L'avantage de la surcouche Easy.js va être de pouvoir fournir des méthodes plus simples et permettant de faire des traitements plus lourds que si vous les auriez fais vous-même.

Vous pouvez accéder à l'objet Express avec `request.scope`.

# Methods

### methodIs( method )

Permet de vérifier si la méthode passée en paramètre correspond à la méthode http de la requête courante.

```javascript
if ( request.methodIs( 'post' ) ) {
    /* HTTP POST method used */
}
```

### getMethod()

Récupère la méthode http de la requête.

```javascript
const method = request.getMethod()
```

### getHeader( header )

Permet de récupérer un header spécifique.


```javascript
const token = request.getHeader( 'x-access-token' )
```

### getBody()

Récupère l'intégralité du body de la requête (ne récupère pas le raw body pour les requêtes de type mime `text/plain`, utilisez plutôt `getRawBody()`).

```javascript
const body = request.getBody()
const username = body.username
const password = body.password
```

### getRawBody()

Récupère le raw body (fonctionne uniquement pour les requêtes de type mime `text/plain`).

```javascript
const rawBody = request.getRawBody()
```

### getParams()

Récupère les paramètres `GET` selon les paramètres définis dans les noms de routes (cf. [req.params](http://expressjs.com/en/api.html#req.params)).

```javascript
const params = request.getParams()
const userId = params.userId
```

### getBodyParameter( param )

Permet de récupérer un paramètre spécifique dans le body.

```javascript
const userId = request.getBodyParameter( 'userId' )
```

### setBodyParameter( key, value )

Permet de définir un paramètre dans le body pour une valeur donnée.

```javascript
request.setBodyParameter( 'userId', userId )
```

### getRouteParameter( param )

Récupère un paramètre de routing selon un nom. Utilise en arrière-plan la méthode `getParams()`.

```javascript
const userId = request.getRouteParameter( 'userId' )
```

### getAppParameters()

Récupère tous les paramètres d'application.

```javascript
const params = request.getAppParameters()
const userId = params.userId
```

### getAppParameter( key )

Récupère un paramètre d'application.

```javascript
const userId = request.getAppParameter( 'userId' )
```

### setAppParameter( key, value )

Défini un paramètre d'application. Les paramètres d'application sont stockés dans l'objet `req` Express, dans un namespace ayant pour valeur le nom de votre projet.

```javascript
request.setAppParameter( 'userId', userId )
```

### getProperty( key )

Récupère une propriété directe de l'objet `req` Express.

```javascript
const myAppScope = request.getProperty( 'myApp' )
```

### setProperty( key, value )



Défini une propriété sur l'objet `req` Express. Attention, à utiliser avec précautions afin de ne pas effacer les composantes nécessaires au bon fonctionnement du framework Easy.js et Express.


```javascript
request.setProperty( 'something', '...' )

const something = request.scope.something
/* alias */
const something = request.getProperty( 'something' )
```

### urlContains( paths )

Permet de savoir si l'url de la requête contient les segments définis dans le paramètre path.

```javascript
if ( request.urlContains([ '/user/friends', '/user/relations' ]) {
    /* code */
}
```

### store( property, value )

Permet de stocker un élément dans un namespace dédié du namespace application dans l'objet `req`.

```javascript
request.store( 'user', { id: 1 } )
```

### find( property )

Récupère un élément stocké avec la méthode `store()`.

```javascript
const user = request.find( 'user' )

console.log( user.id )
```
