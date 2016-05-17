'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});
exports.default = security;
function security(roleFactory, params) {
    /*
     * Dependencies
     */
    var roleSecurityController = roleFactory.getController('Security');
    var bundleManager = roleFactory.bundleManager;
    var router = bundleManager.router;

    /*
     * Security middlewares
     */
    router.use('/roles', function (req, res, next) {
        roleSecurityController.authorize().then(function () {
            next();
        });
    });
}