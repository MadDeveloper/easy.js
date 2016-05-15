'use strict';

function UserFactory(BundleManager, params) {
    return {
        currentBundle: 'User',

        getRepository: function getRepository(repository) {
            if (!repository) {
                repository = this.currentBundle;
            }

            return require(__dirname + '/../Entity/' + repository + 'Repository')(this);
        },

        getForgedEntity: function getForgedEntity(paramsForForging) {
            return this.getModel()(paramsForForging);
        },

        getModel: function getModel(model) {
            if (!model) {
                model = this.currentBundle;
            }

            return require(__dirname + '/../Entity/' + model)(this);
        },

        getNewModel: function getNewModel() {
            return new (this.getModel())();
        },

        getCollection: function getCollection(fromModel) {
            return this.getDatabase().Collection.extend({
                model: this.getModel(fromModel)
            });
        },

        getController: function getController(controller) {
            if (typeof controller === "undefined") {
                controller = 'Routing';
            }

            return new (require(__dirname + '/../Controllers/' + controller + 'Controller'))(this);
        },

        getConfig: function getConfig(config, params) {
            return require(__dirname + '/../config/' + config)(this.getBundleManager(), params);
        },

        getBundleManager: function getBundleManager() {
            return BundleManager;
        },

        /*
         * Aliases
         */
        getDatabase: function getDatabase() {
            return BundleManager.getDatabase();
        },

        getRootController: function getRootController() {
            return this.getBundleManager().getContainer().getComponent('Controller');
        }
    };
}

module.exports = UserFactory;