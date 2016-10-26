# Authorization

Une autre partie important après l'authentification est bien évidemment l'authorisation.

En parallèle du chapitre sur l'authentification, le comportement par défaut du framework (en se basant sur l'authentification par défaut) est de vérifier le token (fourni par l'authentification) fourni dans en header (`x-access-token`), ou dans le body (`token`), ou en paramètre url (`token=...`).