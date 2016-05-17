'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});
exports.default = middlewares;
function middlewares(skeletonFactory) {
    /*
     * Dependencies
     */
    var skeletonMiddlewaresController = skeletonFactory.getController('Middlewares');
    var bundleManager = skeletonFactory.bundleManager;
    var router = bundleManager.router;

    /*
     * Middlewares
     */
    router.use('/skeletons/:id', function (req, res, next) {
        skeletonMiddlewaresController.skeletonExists().then(function () {
            next();
        });
    });
}