# Tests

Afin de pouvoir réaliser vos tests unitaires (bundles, services, etc.), Easy.js a intégrer le framework Jasmine, qui est devenu un des incontournables dans son domaine.

Pour définir un fichier de test il suffit de nommer votre fichier comme suit : `*.spec.js`.

Pour ce qui concerne comment rédiger vos tests, veuillez vous référencer à la [documentation de Jasmine](http://jasmine.github.io).

Lorsque vous voulez exécuter vos tests, il vous suffit de lancer la commande `npm test`.

Vos classes de tests doivent étendre de la classe `Test` du framework Easy.js (`src/vendor/easy/core/Tests`).
Vous devez implémenter une méthode `run()` dans votre classe afin que les tests s'exécutent (la méthode est appelé implicitement par la classe `Test` de Easy.js).

Pour que Jasmine puissent accéder aux tests, il faut instancier votre classe dans votre fichier de tests de directement.

Exemple :

```javascript
/* src/bundles/myBundle/tests/MyBundleTests.spec.js */
import Tests from '~/vendor/easy/core/Tests'

class MyBundleTests extends Tests {
    run() {
        /* tests go here */
    }
}

new MyBundleTests()
```

