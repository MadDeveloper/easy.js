'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});
exports.default = routing;
function routing(userFactory, params) {
    /*
     * Dependencies
     */
    var userRoutingController = userFactory.getController('Routing');
    var bundleManager = userFactory.bundleManager;
    var router = bundleManager.router;

    /*
     * Middlewares
     */
    userFactory.getConfig('security');
    userFactory.getConfig('middlewares');

    /*
    * Routes definitions
    */
    router.route('/roles/:idRole/users').get(function () {
        userRoutingController.getUsers();
    }).post(function () {
        userRoutingController.createUser();
    });

    router.route('/roles/:idRole/users/:idUser').get(function () {
        userRoutingController.getUser();
    }).put(function () {
        userRoutingController.updateUser();
    }).patch(function () {
        userRoutingController.patchUser();
    }).delete(function () {
        userRoutingController.deleteUser();
    });
}