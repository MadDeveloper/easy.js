export default class SkeletonFactory {
    constructor( bundleManager ) {
        this._currentBundle = 'Skeleton'
        this._bundleManager = bundleManager

        /* alias */
        this._container     = this._bundleManager.container
        this._database      = this._bundleManager.database
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

        return new ( require( __dirname + '/../entity/' + model ) )( this )
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

    getConfig( config ) {
        return require( __dirname + '/../config/' + config )( this )
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

    get database() {
        return this._database
    }

    get container() {
        return this._container
    }
}
