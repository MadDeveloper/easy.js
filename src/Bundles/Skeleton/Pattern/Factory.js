function SkeletonFactory( BundleManager, params ) {
    return {
        currentBundle: 'Skeleton',

        getRepository: function( repository ) {
            if ( !repository ) {
                repository = this.currentBundle;
            }

            return require( __dirname + '/../Entity/' + repository + 'Repository' )( this );
        },

        getForgedEntity: function( paramsForForging ) {
            return this.getModel()( paramsForForging );
        },

        getModel: function( model ) {
            if ( !model ) {
                model = this.currentBundle;
            }

            return require( __dirname + '/../Entity/' + model )( this );
        },

        getNewModel: function() {
            return new ( this.getModel() );
        },

        getCollection: function( fromModel ) {
            return this.getDatabase().Collection.extend({
                model: this.getModel( fromModel )
            });
        },

        getController: function( controller ) {
            if ( typeof controller === "undefined" ) {
                controller = 'Routing';
            }

            return new ( require( __dirname + '/../Controllers/' + controller + 'Controller' ) )( this );
        },

        getConfig: function( config, params ) {
            return require( __dirname + '/../config/' + config )( this.getBundleManager(), params );
        },

        getBundleManager: function() {
            return BundleManager;
        },

        /*
         * Aliases
         */
        getDatabase: function() {
            return BundleManager.getDatabase();
        },

        getVendorController: function() {
            return this.getBundleManager().getDependencyInjector().getDependency( 'Controller' );
        }
    }
}


module.exports = SkeletonFactory;
