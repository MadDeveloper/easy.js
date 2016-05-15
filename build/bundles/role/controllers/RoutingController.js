'use strict';

function RoutingController(RoleFactory) {
    /*
     * Global dependencies
     */
    var BundleManager = RoleFactory.getBundleManager();
    var router = BundleManager.router;
    var database = BundleManager.getDatabase();
    var Container = BundleManager.getContainer();
    var http = Container.getComponent('Http');
    var Controller = Container.getComponent('Controller');
    var Request = Container.getComponent('Request');

    /*
     * Role bundle dependencies
     */
    var RoleRepository = RoleFactory.getRepository();

    return {
        isRequestWellParameterized: function isRequestWellParameterized() {
            var Controller = RoleFactory.getRootController();
            return Controller.verifyParams([{ property: 'name', typeExpected: 'string' }, { property: 'slug', typeExpected: 'string' }], Request.getBody());
        },

        getRoles: function getRoles() {
            RoleRepository.readAll().then(function (roles) {

                http.ok(roles.toJSON());
            }).catch(function (error) {
                http.internalServerError(error);
            });
        },

        createRole: function createRole() {
            if (this.isRequestWellParameterized()) {

                database.transaction(function (t) {

                    RoleRepository.save(RoleFactory.getNewModel(), Request.getBody(), { transacting: t }).then(function (role) {

                        t.commit();
                        http.created(role.toJSON());
                    }).catch(function (error) {
                        t.rollback();
                        http.internalServerError(error);
                    });
                });
            } else {
                http.badRequest();
            }
        },

        getRole: function getRole() {
            http.ok(Request.find('role').toJSON());
        },

        updateRole: function updateRole() {
            if (this.isRequestWellParameterized()) {

                database.transaction(function (t) {

                    RoleRepository.save(Request.find('role'), Request.getBody(), { transacting: t }).then(function (role) {

                        t.commit();
                        http.ok(role.toJSON());
                    }).catch(function (error) {
                        t.rollback();
                        http.internalServerError(error);
                    });
                });
            } else {
                http.badRequest();
            }
        },

        deleteRole: function deleteRole() {
            database.transaction(function (t) {

                RoleRepository.delete(Request.find('role'), { transacting: t }).then(function () {

                    t.commit();
                    http.noContent();
                }).catch(function (error) {
                    t.rollback();
                    http.internalServerError(error);
                });
            });
        }
    };
}

module.exports = RoutingController;