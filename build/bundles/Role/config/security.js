'use strict';

var security = function security(BundleManager, params) {
  /*
   * Global dependencies
   */
  var router = BundleManager.getRouter();

  /*
   * Role bundle dependencies
   */
  var RoleSecurityController = BundleManager.getFactory('Role').getController('Security');

  /*
   * Security middlewares
   */
  router.use('/roles', function (req, res, next) {
    RoleSecurityController.authorize().then(function () {
      next();
    });
  });
};

module.exports = security;