'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});
exports.default = routing;
function routing(skeletonFactory) {
    /*
     * Dependencies
     */
    var skeletonRoutingController = skeletonFactory.getController('Routing');
    var bundleManager = skeletonFactory.bundleManager;
    var router = bundleManager.router;

    /*
     * Middlewares
     */
    skeletonFactory.getConfig('security');
    skeletonFactory.getConfig('middlewares');

    /*
    * Routes definitions
    */
    router.route('/skeletons').get(function () {
        skeletonRoutingController.getSkeletons();
    }).post(function () {
        skeletonRoutingController.createSkeleton();
    });

    router.route('/skeletons/:id').get(function () {
        skeletonRoutingController.getSkeleton();
    }).put(function () {
        skeletonRoutingController.updateSkeleton();
    }).patch(function () {
        skeletonRoutingController.patchSkeleton();
    }).delete(function () {
        skeletonRoutingController.deleteSkeleton();
    });
}