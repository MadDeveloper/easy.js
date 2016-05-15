'use strict';

var routing = function routing(BundleManager, params) {
  /*
   * Global dependencies
   */
  var router = BundleManager.getRouter();

  /*
   * User bundle dependencies
   */
  var UserFactory = BundleManager.getFactory('User');
  var UserRoutingController = UserFactory.getController('Routing');

  /*
   * Middlewares
   */
  UserFactory.getConfig('security');
  UserFactory.getConfig('middlewares');

  /*
  * Routes definitions
  */
  router.route('/roles/:idRole/users').get(function () {
    UserRoutingController.getUsers();
  }).post(function () {
    UserRoutingController.createUser();
  });

  router.route('/roles/:idRole/users/:idUser').get(function () {
    UserRoutingController.getUser();
  }).put(function () {
    UserRoutingController.updateUser();
  }).patch(function () {
    UserRoutingController.patchUser();
  }).delete(function () {
    UserRoutingController.deleteUser();
  });
};

module.exports = routing;