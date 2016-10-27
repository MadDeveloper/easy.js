# Authorization

Une autre partie important après l'authentification est bien évidemment l'authorisation.

En parallèle du chapitre sur l'authentification, le comportement par défaut de l'authorisation de Easy.js est de vérifier le token (fourni par l'authentification) en le récupérant dans le header `x-access-token`, ou dans le body `token`, ou bien en paramètre url `token=...`.

Si vous décidez d'utiliser une authentification personnalisée, alors vous devez recréer le mécanisme d'authorisation aussi, si vous en avez besoin bien évidemment.

Le système d'authorisation intégré par défaut utilise un middleware afin de pouvoir vérifier l'intégrité du token utilisateur. Si ce token est valide alors on passe au middleware suivant, dans le cas échant une erreur `401 Unauthorized` sera retourné.

