# Response

La réponse fait aussi partie d'un processus important lors d'une requête, puisque c'est cette dernière qui sera retournée, ou plutôt formattée, pour être retournée au client.

Comme pour la classe `Request`, la classe `Response` est une surcouche du framework Express, cependant la surcouche va permettre de pouvoir retourner des réponses de manière plus rapides et concises dans devoir se soucier comment cela est géré.

Vous pouvez accéder au vrai objet réponse de Express avec `response.scope`.

# Methodes

Chaque méthode termine la réponse et la retourne.
Les paramètres de chaque réponse sont retournés au format json.

### ok( params )

Retourne une réponse `200 OK`

```javascript
response.ok()
response.ok(
```

 /** * created - description * * @param {type} params description * @returns {type} description */ created( params ) { const res = this.scope res.status( this.status.created ).json( params ) }

 /** * notFound - description * * @param {type} params description * @returns {type} description */ notFound( params ) { const res = this.scope res.status( this.status.notFound ).json( params ) }

 /** * notModified - description * * @param {type} params description * @returns {type} description */ notModified( params ) { const res = this.scope res.status( this.status.notModified ).json( params ) }

 /** * gone - description * * @param {type} params description * @returns {type} description */ gone( params ) { const res = this.scope res.status( this.status.gone ).json( params ) }

 /** * unauthorized - description * * @param {type} params description * @returns {type} description */ unauthorized( params ) { const res = this.scope res.status( this.status.unauthorized ).json( params ) }

 /** * methodNotAllowed - description * * @param {type} params description * @returns {type} description */ methodNotAllowed( params ) { const res = this.scope res.status( this.status.methodNotAllowed ).json( params ) }

 /** * unsupportedMediaType - description * * @param {type} params description * @returns {type} description */ unsupportedMediaType( params ) { const res = this.scope res.status( this.status.unsupportedMediaType ).json( params ) }

 /** * tooManyRequests - description * * @param {type} params description * @returns {type} description */ tooManyRequests( params ) { const res = this.scope res.status( this.status.tooManyRequests ).json( params ) }

 /** * noContent - description * * @param {type} params description * @returns {type} description */ noContent( params ) { const res = this.scope res.status( this.status.noContent ).json( params ) }

 /** * internalServerError - description * * @param {type} params description * @returns {type} description */ internalServerError( params ) { const req = this.request.scope const res = this.scope const alertLog = `[{currentDate}] -- {remoteHostIp} -- {method} {originalUrl} {statusCode} -- ${params}\n`

 this._logger.alert( alertLog, { '{currentDate}': new Date().toUTCString(), '{remoteHostIp}': req.ip || req.connection.remoteAddress || req.headers['x-forwarded-for'], '{method}': req.method, '{originalUrl}': req.originalUrl, '{statusCode}': this.status.internalServerError })

 res.status( this.status.internalServerError ).json( params ) }

 /** * badRequest - description * * @param {type} params description * @returns {type} description */ badRequest( params ) { const res = this.scope res.status( this.status.badRequest ).json( params ) }

 /** * forbidden - description * * @param {type} params description * @returns {type} description */ forbidden( params ) { const res = this.scope res.status( this.status.forbidden ).json( params ) }

 /** * attachment - description * * @param {type} filePath description * @param {type} options description * @returns {type} description */ attachment( filePath, options ) { const res = this.scope // res.attachment( filePath ) res.sendFile( filePath, options, error => { if ( error ) { res.status( error.status ).end() } }) }
