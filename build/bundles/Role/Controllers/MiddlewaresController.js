'use strict';

function MiddlewaresController(RoleFactory) {
    /*
     * Global dependencies
     */
    var BundleManager = RoleFactory.getBundleManager();
    var http = BundleManager.getContainer().getDependency('Http');
    var Controller = BundleManager.getContainer().getDependency('Controller');
    var Request = BundleManager.getContainer().getDependency('Request');

    return {
        roleExists: function roleExists() {
            return new Promise(function (resolve, reject) {
                var requireOptions = {
                    requireBy: Request.getRouteParameter('id'),
                    options: {}
                };

                Controller.doesRequiredElementExists('Role', requireOptions, BundleManager, function (role) {
                    Request.define('role', role);
                    resolve();
                });
            });
        }
    };
}

module.exports = MiddlewaresController;