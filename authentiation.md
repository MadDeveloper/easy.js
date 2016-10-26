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

Vous pouvez 