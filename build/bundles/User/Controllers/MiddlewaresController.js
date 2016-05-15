'use strict';

function MiddlewaresController(UserFactory) {
    /*
     * Global dependencies
     */
    var BundleManager = UserFactory.getBundleManager();
    var http = BundleManager.getContainer().getDependency('Http');
    var Controller = BundleManager.getContainer().getDependency('Controller');
    var Request = BundleManager.getContainer().getDependency('Request');

    return {
        userExists: function userExists() {
            return new Promise(function (resolve, reject) {
                var requireOptions = {
                    requireBy: Request.getRouteParameter('idUser'),
                    options: {}
                };

                Controller.doesRequiredElementExists('User', requireOptions, BundleManager, function (user) {
                    Request.define('user', user);
                    resolve();
                });
            });
        }
    };
}

module.exports = MiddlewaresController;