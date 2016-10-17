# API Doc

Comme Easy.js se veut être un framework uniquement dédié pour du traitement backend, donc pas de génération de vues, apidoc a été implémenté dans le workflow du framework afin de pouvoir générer un site statique permettant de tester votre API.

Pour plus d'informations sur le fonctionnement de apidoc, vous pouvez vous referrer à sa [documentation](apidocjs.com).

La doc de votre API se fera dans vos contrôleurs, car en effet c'est à ce niveau que vos routes et vos paramètres seront exécutés. Vous pouvez donc annoter vos méthodes de contrôleurs selon les conventions défini par apidoc, pour déclarer les paramètres attendu et la sortie générée.

Example :

class MyBundleController extends Controller {

}