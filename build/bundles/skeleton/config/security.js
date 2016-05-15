'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = security;
function security(bundleManager, params) {
  /*
   * Global dependencies
   */
  var router = bundleManager.router;

  /*
   * Skeleton bundle dependencies
   */
  var skeletonSecurityController = bundleManager.getFactory('Skeleton').getController('Security');

  /*
   * Security middlewares
   */
  router.use('/skeletons', function (req, res, next) {
    skeletonSecurityController.authorize().then(function () {
      next();
    });
  });
}