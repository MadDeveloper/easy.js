'use strict';

var middlewares = function middlewares(BundleManager, params) {
  /*
   * Global dependencies
   */
  var router = BundleManager.getRouter();

  /*
   * Skeleton bundle dependencies
   */
  var SkeletonMiddlewaresController = BundleManager.getFactory('Skeleton').getController('Middlewares');

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