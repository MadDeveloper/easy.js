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

Récupère l'intégralité du body de la requête (ne récupère pas le raw body pour les requêtes de type mime `text/plain`, utilisez plutôt `getRawBody()`)

```javascript
const body = request.getBody()
const username = body.username
const password = body.password
```

### getRawBody()

Récupère le raw body (fonctionne uniquement pour les requêtes de type mime `text/plain`)

```javascript
const token = request.getHeader( 'x-access-token' )
```

 /** * getRawbody - description * * @returns {type} description */ getRawbody() { return this.scope.rawBody }

 /** * getParams - description * * @returns {type} description */ getParams() { return this.scope.params }

 /** * getBodyParameter - description * * @param {type} key description * @returns {type} description */ getBodyParameter( key ) { return this.getBody()[ key ] }

 /** * setBodyParameter - description * * @param {type} key description * @param {type} value description * @returns {type} description */ setBodyParameter( key, value ) { this.getBody()[ key ] = value }

 /** * getRouteParameter - description * * @param {type} param description * @returns {type} description */ getRouteParameter( param ) { return this.getParams()[ param ] }

 /** * getAppParameter - description * * @param {type} key description * @returns {type} description */ getAppParameter( key ) { return this.getAppParameters()[ key ] }

 /** * getAppParameters - description * * @returns {type} description */ getAppParameters() { return this.scope[ this._appName ] }

 /** * setAppParameter - description * * @param {type} key description * @param {type} value description * @returns {type} description */ setAppParameter( key, value ) { this.scope[ this._appName ][ key ] = value }

 /** * getProperty - returns direct property on express request object * * @param {string} property * @returns {any} */ getProperty( property ) { return this.scope[ property ] }

 /** * getProperty - set direct property on express request object * * @param {string} property * @param {any} value */ setProperty( property, value ) { this.scope[ property ] = value }

 /** * urlContains - description * * @param {type} paths description * @returns {type} description */ urlContains( paths ) { let contains = false

 if ( 'string' === typeof paths ) { contains = -1 !== this.scope.originalUrl.indexOf( paths ) } else if ( Array.isArray( paths ) ) { paths.forEach( path => { contains = contains || -1 !== this.scope.originalUrl.indexOf( path ) }) }

 return contains }

 /** * store - description * * @param {type} property description * @param {type} value description * @returns {type} description */ store( property, value ) { /* * Defining or redefine property in app cache scope, stored in request */ const applicationCache = this.getAppParameter( this._applicationCacheScope )

 applicationCache[ property ] = value this.setAppParameter( this._applicationCacheScope, applicationCache )

 return this }

 /** * find - description * * @param {type} property description * @returns {type} description */ retrieve( property ) { return this.getAppParameters()[ this._applicationCacheScope ][ property ] }
