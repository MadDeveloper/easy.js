export default class RoleFactory {
    constructor( bundleManager ) {
        this._currentBundle = 'role'
        this._bundleManager = bundleManager
    }

    getRepository( repository ) {
        if ( !repository ) {
            repository = this.currentBundle
        }

        const repositoryClass = require( __dirname + '/entity/' + repository.capitalizeFirstLetter() + 'Repository' ).default /* .default is needed to patch babel exports.default build, require doesn't work, import do */
        return new repositoryClass( this )
    }

    getForgedEntity( paramsForForging ) {
        return this.getModel()( paramsForForging )
    }

    getModel( model ) {
        if ( !model ) {
            model = this.currentBundle
        }

        const modelClass = require( __dirname + '/entity/' + model.capitalizeFirstLetter() ).default /* .default is needed to patch babel exports.default build, require doesn't work, import do */
        return new modelClass( this )
    }

    getNewModel() {
        return new ( this.getModel() )
    }

    getCollection( fromModel ) {
        return this.database.Collection.extend({
            model: this.getModel( fromModel )
        })
    }

    getController( controller ) {
        if ( typeof controller === "undefined" ) {
            controller = 'Routing'
        }

        const controllerClass = require( __dirname + '/controllers/' + controller.capitalizeFirstLetter() + 'Controller' ).default /* .default is needed to patch babel exports.default build, require doesn't work, import do */
        return new controllerClass( this )
    }

    getConfig( config ) {
        const configClass = require( __dirname + '/config/' + config ).default /* .default is needed to patch babel exports.default build, require doesn't work, import do */
        return configClass( this )
    }

    getRootController() {
        return this.bundleManager.container.getComponent( 'Controller' )
    }

    /*
     * Getters and setters
     */
    get bundleManager() {
        return this._bundleManager
    }

    get currentBundle() {
        return this._currentBundle
    }

    get container() {
        return this.bundleManager.container
    }

    get database() {
        return this.bundleManager.database
    }
}
