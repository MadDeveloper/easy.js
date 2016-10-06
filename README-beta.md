# Easy.js #

## before install

```
npm i -g babel-cli apidoc
```

## Launch app

    npm start

## Config

### Config

### Routing

### Database

### SSL/TLS keys

### bundleRegistered

- chaque bundle qui possède ses propres routes doit être enregistré via le BundleManager dans le fichier /config/bundlesRegistered.js


## Bundle

### Config

#### Routing
#### Security
#### Middlewares

### Entity

#### Repository

### Controllers

### Factory

### Tests

### Skeleton




## Services



## Logs

- Toutes les erreurs 500 sont enregistrées dans le fichier /logs/serverError via le fichier /vendor/easy/Http.js


## Options (--expose-gc, --production, --memory)



## Authentication (JWT)

- En mode dev les tokens ne sont pas vérifiés, afin de faciliter le debuggage


## bin

- Le framework peut être géré via la console dans le dossier /bin
    - créer un bundle : node createBundle MyBundle
    - migrer la db: node migrate (migrate on windows)
