'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = middlewares;
function middlewares(userFactory, params) {
  /*
   * Global dependencies
   */
  var bundleManager = userFactory.bundleManager;
  var router = bundleManager.router;

  /*
   * Skeleton bundle dependencies
   */
  var userMiddlewaresController = bundleManager.getFactory('User').getController('Middlewares');

  /*
   * Middlewares
   */
  router.use('/roles/:idRole/users/:idUser', function (req, res, next) {
    userMiddlewaresController.userExists().then(function () {
      next();
    });
  });
}