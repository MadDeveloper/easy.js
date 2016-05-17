'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});
exports.default = middlewares;
function middlewares(roleFactory, params) {
    /*
     * Dependencies
     */
    var roleMiddlewaresController = roleFactory.getController('Middlewares');
    var bundleManager = roleFactory.bundleManager;
    var router = bundleManager.router;

    /*
     * Middlewares
     */
    router.use('/roles/:id', function (req, res, next) {
        roleMiddlewaresController.roleExists().then(function () {
            next();
        });
    });
}