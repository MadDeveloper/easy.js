function SkeletonRepository( SkeletonFactory ) {
    return {
        readAll: function( options ) {
            var Skeletons = SkeletonFactory.getCollection();
            return Skeletons.forge().fetch( options );
        },

        read: function( id, options ) {
            return SkeletonFactory.getModel().forge({ id: id }).fetch( options );
        },

        save: function( skeleton, params, options ) {
            return skeleton.save({

            }, options );
        },

        patch: function( skeleton, patch, options ) {
            var patchToApply = {};

            patchToApply[ patch.path.substring( 1 ) ] = patch.value;

            return skeleton.save( patchToApply, options );
        },

        delete: function( skeleton, options ) {
            return skeleton.destroy( options );
        }
    }
}

module.exports = SkeletonRepository;
