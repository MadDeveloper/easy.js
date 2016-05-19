'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});
exports.default = security;
function security(userFactory) {
    /*
     * Dependencies
     */
    var userSecurityController = userFactory.getController('Security');
    var bundleManager = userFactory.bundleManager;
    var router = bundleManager.router;

    /*
     * Security middlewares
     */
    router.use('/roles/:idrole/users', function (req, res, next) {
        userSecurityController.authorize().then(function () {
            next();
        });
    });
}