# Authorization

Une autre partie important après l'authentification est bien évidemment l'authorisation.

En parallèle du chapitre sur l'authentification, le comportement par défaut de l'authorisation de Easy.js est de vérifier le token (fourni par l'authentification) en le récupérant dans le header `x-access-token`, ou dans le body `token`, ou bien en paramètre url `token=...`.

Si vous décidez d'utiliser une authentification personnalisée, alors vous devez recréer le mécanisme d'authorisation aussi, si vous en avez besoin bien évidemment.

