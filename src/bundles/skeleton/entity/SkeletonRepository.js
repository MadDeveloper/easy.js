export default class SkeletonRepository {
    constructor( skeletonFactory ) {
        this._skeletonFactory = skeletonFactory
    }

    readAll( options ) {
        let skeletons = this.skeletonFactory.getCollection()
        return skeletons.forge().fetch( options )
    }

    read( id, options ) {
        return this.skeletonFactory.getModel().forge({ id }).fetch( options )
    }

    save( skeleton, params, options ) {
        return skeleton.save({

        }, options )
    }

    patch( skeleton, patch, options ) {
        let patchToApply = {}

        patchToApply[ patch.path.substring( 1 ) ] = patch.value

        return skeleton.save( patchToApply, options )
    }

    delete( skeleton, options ) {
        return skeleton.destroy( options )
    }

    /*
     * Getters and setters
     */
    get skeletonFactory() {
        return this._skeletonFactory
    }
}
