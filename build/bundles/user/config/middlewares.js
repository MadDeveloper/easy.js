'use strict';

var middlewares = function middlewares(BundleManager, params) {
  /*
   * Global dependencies
   */
  var router = BundleManager.router;

  /*
   * Skeleton bundle dependencies
   */
  var UserMiddlewaresController = BundleManager.getFactory('User').getController('Middlewares');

  /*
   * Middlewares
   */
  router.use('/roles/:idRole/users/:idUser', function (req, res, next) {
    UserMiddlewaresController.userExists().then(function () {
      next();
    });
  });
};

module.exports = middlewares;