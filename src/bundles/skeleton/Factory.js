export default class SkeletonFactory {
    constructor( bundleManager, params ) {
        this._bundleManager = bundleManager
        this._params = params
        this._currentBundle = 'Skeleton'
        this._database = this._bundleManager.database
    }

    getRepository( repository ) {
        if ( !repository ) {
            repository = this.currentBundle
        }

        return require( __dirname + '/../entity/' + repository + 'Repository' )( this )
    }

    getForgedEntity( paramsForForging ) {
        return this.getModel()( paramsForForging )
    }

    getModel( model ) {
        if ( !model ) {
            model = this.currentBundle
        }

        return require( __dirname + '/../entity/' + model )( this )
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

        return new ( require( __dirname + '/../controllers/' + controller + 'Controller' ) )( this )
    }

    getConfig( config, params ) {
        return require( __dirname + '/../config/' + config )( this.bundleManager, params )
    }

    getBundleManager() {
        return BundleManager
    }

    getRootController() {
        return this.getBundleManager().container.getComponent( 'Controller' )
    }

    /*
     * Getters and setters
     */
    get bundleManager() {
        return this._bundleManager
    }

    get params() {
        return this._params
    }

    set params( params ) {
        this._params = params
        return this
    }

    get currentBundle() {
        return this._currentBundle
    }

    get database() {
        return this._database
    }
}
