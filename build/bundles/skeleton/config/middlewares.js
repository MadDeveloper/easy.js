'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = middlewares;
function middlewares(bundleManager, params) {
  /*
   * Global dependencies
   */
  var router = bundleManager.router;

  /*
   * Skeleton bundle dependencies
   */
  var SkeletonMiddlewaresController = bundleManager.getFactory('Skeleton').getController('Middlewares');

  /*
   * Middlewares
   */
  router.use('/skeletons/:id', function (req, res, next) {
    SkeletonMiddlewaresController.skeletonExists().then(function () {
      next();
    });
  });
};

module.exports = middlewares;