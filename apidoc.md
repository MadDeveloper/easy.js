# API Doc

Comme Easy.js se veut être un framework uniquement dédié pour du traitement backend, donc pas de génération de vues, apidoc a été implémenté dans le workflow du framework afin de pouvoir générer un site statique permettant de tester votre API.

Pour plus d'informations sur le fonctionnement de apidoc, vous pouvez vous referrer à sa [documentation](apidocjs.com).

Vos fichiers de documentation d'API doivent se situer dans le dossier `doc/` de vos bundles, c'est ici que apidoc ira chercher vos fichier de description. Il a été convenu ainsi afin d'éviter de trop lourdes annotations dans vos contrôleurs.

Example :

```javascript
/** 
 * getRoles - get all roles 
 * 
 * @api {get} /roles Get all roles 
 * @apiName GetRoles 
 * @apiGroup Role 
 * 
 * 
 * @apiSuccess {Array[Role]} raw Return table of roles 
 * @apiSuccessExample {json} Success-Response: 
 * HTTP/1.1 200 OK 
 * [ 
 *   { 
 *     "id": 1, 
 *     "name": "Administrator", 
 *     "slug": "administrator" 
 *   } 
 * ] 
 * 
 * @apiUse InternalServerError 
 */
```

Parler du fichier config de apidoc : src/config/apidoc.js
