'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = routing;
function routing(roleFactory, params) {
  /*
   * Dependencies
   */
  var roleRoutingController = roleFactory.getController('Routing');
  var bundleManager = roleFactory.bundleManager;
  var router = bundleManager.router;

  /*
   * Middlewares
   */
  roleFactory.getConfig('security');
  roleFactory.getConfig('middlewares');

  /*
   * Routes definitions
   */
  router.route('/roles').get(function () {
    roleRoutingController.getRoles();
  }).post(function () {
    roleRoutingController.createRole();
  });

  router.route('/roles/:id').get(function () {
    roleRoutingController.getRole();
  }).put(function () {
    roleRoutingController.updateRole();
  }).delete(function () {
    roleRoutingController.deleteRole();
  });
}