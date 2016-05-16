'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = middlewares;
function middlewares(skeletonFactory, params) {
  /*
   * Global dependencies
   */
  var bundleManager = skeletonFactory.bundleManager;
  var router = bundleManager.router;

  /*
   * Skeleton bundle dependencies
   */
  var skeletonMiddlewaresController = bundleManager.getFactory('Skeleton').getController('Middlewares');

  /*
   * Middlewares
   */
  router.use('/skeletons/:id', function (req, res, next) {
    skeletonMiddlewaresController.skeletonExists().then(function () {
      next();
    });
  });
}