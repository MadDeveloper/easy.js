'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});
exports.default = security;
function security(skeletonFactory) {
    /*
     * Dependencies
     */
    var skeletonSecurityController = skeletonFactory.getController('Security');
    var bundleManager = skeletonFactory.bundleManager;
    var router = bundleManager.router;

    /*
     * Security middlewares
     */
    router.use('/skeletons', function (req, res, next) {
        skeletonSecurityController.authorize().then(function () {
            next();
        });
    });
}