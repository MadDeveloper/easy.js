# Logging

Le logging mis à votre disposition va vous permettre de pouvoir tracer, selon un dégré de niveau (d'un simple log à un emergency), tout ce que vous aimerez savoir ce qu'il se passe dans votre projet.

Le logging est implémenté à travers trois classes : `Logger`, `LogWriter` et `LogFileManager`.

La seule classe qui vous intéresse est `Logger`. Cette classe implémente toutes les méthodes nécessaires au log que souhaitez stocker. Suivant la méthode utilisée, un fichier adéquat sera créé s'il n'existe pas déjà dans le dossier `logs`. Chaque fichier correspond à un ou plusieurs dégrés de log (une table de correspondance est fournie à la fin du document).

Le classe `Logger` suit le [PSR-3](http://www.php-fig.org/psr/psr-3/) de PHP, chaque méthode de log prend donc en paramètre deux arguments : un message et un contexte. Le paramètre `message` défini donc le message, et le contexte va définir les variables contextuelles à remplacer dans le message.

La classe `Logger` est définie en tant que composant injectable via le container. Pour récupérer le logger procédez ainsi :

```javascript
const logger = container.getComponent( 'logger' )
```

Vous pouvez directement définir la classe `Logger` en tant que dépendance d'un service : `component.logger`.

| Method | File | Description |
|--------|------|-------------|
| log | std | Logs message |
| debug | debugs | Detailed debug informations |
| info | events | Interesting events |
| notice | events | Normal but significating events |
| warning | warn | Exceptionnal occurrences that are not errors |
| error | errors | Runtime errors that do not require immediate action but should typically be logged and monitored |
| critical | errors | Criticals conditions |
| alert | fatals | Action must be taken immediately |
| emergency | fatals | System is unusable |

Pour faciliter le debuggage, toutes les erreurs `500` sont loggées dans le fichier `~/logs/fatals.log` par défaut.