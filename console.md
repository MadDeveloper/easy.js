# Console

La console Easy.js s'appuie sur la `console` javascript native, cependant elle est dotée de fonctionnalités supplémentaires (qui en font tout son intérêt).

Vous pouvez importer la console de cette manière :

```javascript
import Console from '~/vendor/easy/core/Console'
```

La console de Easy.js vous fourni six méthodes statiques :

| Méthode | Arguments | Description |
|---------|-----------|-------------|
| error | { title, message, consequence, exit } | Affiche un message en tant qu'erreur. Cette méthode prend un seul paramètre qui est un objet, contenant obligatoirement un titre en propriété, si message et consequence sont fourni, le message sera formaté en conséquence. Par défaut la propriété exit n'est pas obligatoire, la méthode ne stoppera donc pas l'exécution du programme, si vous souhaitez arrêter le programme en ayant levé une erreur, envoyé exit avec comme valeur soit `0` soit `1` (cf. Node.js Process) |
| warn | message | Affiche un message en tant qu'alerte |
| info | message | Affiche une information |
| success | message, exit | Affiche un message de succès. Si `exit` est fourni, le programme s'arrêtera selon le code d'erreur `exit` fourni (cd. Node.js Process) |
| log | message | Affiche un simple message (équivalent du `console.log` |
| line | |Effectue un retour à la ligne (équivalent de `console.log( '\n' )`) |

Example :

```javascript
/* src/bundles/myBundle/controllers/MyBundleController.js */
import Console from '~/vendor/easy/core/Console'

class MyBundleController extends ... {
    myMethod() {
        try {
            ...
        } catch( e ) {
            Console.error({
                title: "An error occur",
                message: "There is an error with myMethod() into MyBundleController",
                consequence: "User couldn't access resource"
            })
        }
    }
}
```

Afin d'améliorer la gestion des erreurs avec un système de sauvegardes selon leur niveau de sévérité, il est conseillé d'utiliser le [Logging](logging.md).