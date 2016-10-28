 # Authentication

L'authentification est un module délicat à implémenter dans tout projet, en effet nous sommes souvent emmenés à dévoir gérer plusieurs type d'authentification (Google, Facebook, Twitter, Github, etc.) et aussi son propre système custom.

Cela peut s'avérer laborieux à mettre en place sois même from scratch. C'est pour ces raisons que par défaut le framework Easy.js vous permet d'utiliser une authentification custom géré avec Passport.js.

La gestion de l'authentification par défaut se passe dans le fichier de configuration suivant : `~/src/config/authentication.js`, ayant pour configuration par défaut :


```javascript
export default {
    enabled: true,
    repository: 'user',
    usernameField: 'email',
    passwordField: 'password',
    route: '/login'
}
```

La configuration est assez explicite, on retrouve une option `enabled` permettant de dire si notre API require une authentification, le repository à utiliser pour la partie custom (ici `user` utilisera le repository `UserRepository`). On retrouve par conséquent les champs d'authentification avec `usernameField` et `passworldField`, ces deux champs doivent être liés à vos champs en base de données et ceux envoyé par le client dans la requête. Et finalement on trouve la route sur laquelle s'appliquera l'authentification, ici `/login` (notons que la route est accessible en `POST` uniquement).

Une fois authentifié, un token `jsonwebtoken` est retourné. Le payload du token contient les données de l'utilisateur connecté. La durée de vie du token est défini dans le fichier de configuration `~/src/config/app.js`, la clé `duration` pour l'élement `jwt`. Pensez aussi à changer le `secret` de la configuration `jwt`, ce sera la clé secrète pour chiffrer/déchiffrer le token, s'assurer qu'il n'a pas été corrompu entre temps.


# Custom authentication

Comme décrit au début de cette section, vous allez être souvent emmenés à devoir utiliser plusieurs provider pour l'authentification, par conséquent il est possible de pouvoir mettre en place son propre système d'authentification :

```javascript
export default {
    enabled: true,
    custom: true,
    service: 'myAuthenticationService'
}
```


Comme vous le remarquez, il vous faudra passer par votre service pour gérer l'authentification, ici `myAuthenticationService` par exemple.

Votre service devra étendre de la classe `Configurable` (`~/src/vendor/easy/interfaces/Configurable.js`) faisant office d'interface (à défaut de ne pas en avoir encore en Javascript), afin d'implémenter la méthode `configure()`, ayant comme paramètre `router, container`, qui sera appelée par défaut dans votre service. Vous aurez donc accès au router de Easy.js, et au container, afin de pouvoir accéder au router Express et aux différents composants et services du projet.

Attention quand vous utilisez un système custom, aucune route n'est implémentée par défaut pour accéder à votre authentification, vous devrez donc le faire vous-même via le router Express.

Voici un exemple de service custom d'authentification :

```javascript
import Configurable from '~/src/vendor/easy/interfaces/Configurable'

export default class MyAuthenticationService extends Configurable {
    configure( router, container ) {
        const expressRouter = router.scope

        expressRouter.post( '/login', ( req, res ) => {
            const request = router.getRequest( req )
            const response = router.getResponse( res )

            this.authentication( request, response )
        })
    }

    authenticate( request, response ) {
        // my auth logic
    }
}
```

