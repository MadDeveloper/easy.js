'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});
exports.default = middlewares;
function middlewares(userFactory, params) {
    /*
     * Dependencies
     */
    var userMiddlewaresController = userFactory.getController('Middlewares');
    var bundleManager = userFactory.bundleManager;
    var router = bundleManager.router;

    /*
     * Middlewares
     */
    router.use('/roles/:idRole/users/:idUser', function (req, res, next) {
        userMiddlewaresController.userExists().then(function () {
            next();
        });
    });
}