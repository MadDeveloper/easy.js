'use strict';

var middlewares = function middlewares(BundleManager, params) {
  /*
   * Global dependencies
   */
  var router = BundleManager.router;

  /*
   * Role bundle dependencies
   */
  var RoleMiddlewaresController = BundleManager.getFactory('Role').getController('Middlewares');

  /*
   * Middlewares
   */
  router.use('/roles/:id', function (req, res, next) {
    RoleMiddlewaresController.roleExists().then(function () {
      next();
    });
  });
};

module.exports = middlewares;