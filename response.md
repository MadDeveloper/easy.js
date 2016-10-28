# Response

La réponse fait aussi partie d'un processus important lors d'une requête, puisque c'est cette dernière qui sera retournée, ou plutôt formattée, pour être retournée au client.

Comme pour la classe `Request`, la classe `Response` est une surcouche du framework Express, cependant la surcouche va permettre de pouvoir retourner des réponses de manière plus rapides et concises dans devoir se soucier comment cela est géré.

Vous pouvez accéder au vrai objet réponse de Express avec `response.scope`.

# Methodes

Chaque méthode termine la réponse et la retourne.
Les paramètres de chaque réponse sont retournés au format json.

### ok( params )

Retourne une réponse `200 OK` avec le contenu fourni en paramètre

```javascript
response.ok()
response.ok( 1 )
response.ok( false )
response.ok( "Hello World!" )
response.ok([ 'Hello', 'World' ])
response.ok({ data: [] })
```

### created( params )

Retourne une réponse `201 Created` avec le contenu fourni en paramètre

```javascript
response.created()
response.created( "User created" )
...
```

### notFound( params )

Retourne une réponse `404 Not Found` avec le contenu fourni en paramètre

```javascript
response.notFound()
response.notFound( "Username doesn't exists" )
...
```

### notModified( params )

Retourne une réponse `304 Not Modified` avec le contenu fourni en paramètre

```javascript
response.notModified()
...
```

### gone( params )

Retourne une réponse `410 Gone` avec le contenu fourni en paramètre

```javascript
response.gone()
...
```

### unauthorized( params )

Retourne une réponse `401 Unauthorized` avec le contenu fourni en paramètre

```javascript
response.unauthorized()
...
```

### methodNotAllowed( params )

Retourne une réponse `405 Method Not Allowed` avec le contenu fourni en paramètre

```javascript
response.methodNotAllowed()
...
```

### unsupportedMediaType( params )

Retourne une réponse `415 Unsupported Media Type` avec le contenu fourni en paramètre

```javascript
response.unsupportedMediaType()
...
```

### unprocessableEntity( params )

Retourne une réponse `422 Unprocessable Entity` avec le contenu fourni en paramètre

```javascript
response.unprocessableEntity()
...
```

### tooManyRequests( params )

Retourne une réponse `429 Too Many Requests` avec le contenu fourni en paramètre

```javascript
response.tooManyRequests()
...
```

### noContent( params )

Retourne une réponse `204 No Content` avec le contenu fourni en paramètre

```javascript
response.noContent()
...
```

### internalServerError( params )

Retourne une réponse `500 Internal Server Error` avec le contenu fourni en paramètre

```javascript
response.internalServerError()
...
```

### forbidden( params )

Retourne une réponse `403 Forbidden` avec le contenu fourni en paramètre

```javascript
response.forbidden()
...
```

### attachment( filePath, options )

Retourne un média selon son chemin d'accès `filePath`. Des options peuvent être fournies (cf. [res.sendFile](http://expressjs.com/en/api.html#res.sendFile) and [res.attachment](http://expressjs.com/en/api.html#res.attachment))

```javascript
response.attachment( 'path/to/file' )
```