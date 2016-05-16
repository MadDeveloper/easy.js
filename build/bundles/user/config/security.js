'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = security;
function security(userFactory, params) {
  /*
   * Global dependencies
   */
  var bundleManager = userFactory.bundleManager;
  var router = bundleManager.router;

  /*
   * Skeleton bundle dependencies
   */
  var userSecurityController = bundleManager.getFactory('User').getController('Security');

  /*
   * Security middlewares
   */
  router.use('/roles/:idrole/users', function (req, res, next) {
    userSecurityController.authorize().then(function () {
      next();
    });
  });
}