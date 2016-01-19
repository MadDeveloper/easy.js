# Prep'App API #

Notes:

- En mode dev les tokens ne sont pas vérifiés, afin de faciliter le debuggage
- Le framework peut être géré via la console dans le dossier /bin
    - créer un bundle : node createBundle MyBundle
    - migrer la db: node migrate (migrate on windows)
- chaque bundle qui possède ses propres routes doit être enregistré via le BundleManager dans le fichier /config/bundlesRegistered.js
- Toutes les erreurs 500 sont enregistrées dans le fichier /logs/serverError via le fichier /vendor/easy/Http.js

## Launch app


## Config

### Config

### Routing

### Database

### SSL/TLS keys

### bundleRegistered



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



## Options (--expose-gc, --production, --memory)



## Authentication (JWT)



## bin
