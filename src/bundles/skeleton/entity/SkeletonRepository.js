import Entity from './../../../vendor/easy/database/Repository'

export default class SkeletonRepository extends Repository {
    constructor( entityManager ) {
        super( entityManager )

        this._skeletonCollection    = this.entityManager.getCollection( 'skeleton' )
        this._skeletonModel         = this.entityManager.getModel( 'skeleton' )
    }

    readAll( options = {} ) {
        let skeletons = this.skeletonCollection
        return skeletons.forge().fetch( options )
    }

    read( id, options = {} ) {
        return this.skeletonModel.forge({ id }).fetch( options )
    }

    save( skeleton, params, options = {} ) {
        return new Promise( ( resolve, reject ) => {
            this.database.transaction( t => {
                options.transacting = t

                skeleton.save( params, options )
                .then( skeleton => {
                    t.commit()
                    resolve( skeleton )
                })
                .catch( error => {
                    t.rollback()
                    reject( error )
                })
            })
        })
    }

    patch( skeleton, patch, options = {} ) {
        return new Promise( ( resolve, reject ) => {
            let patchToApply = {}
            patchToApply[ patch.path.substring( 1 ) ] = patch.value

            options.patch = true

            this.save( skeleton, patchToApply, options )
            .then( resolve )
            .catch( reject )
        })
    }

    delete( skeleton, options = {} ) {
        return new Promise( ( resolve, reject ) => {
            this.database.transaction( t => {
                options.transacting = t

                skeleton.destroy( options )
                .then( resolve )
                .catch( reject )
            })
        })
    }

    /**
     * get - skeleton collection
     *
     * @returns {Collection}
     */
    get skeletonCollection() {
        return this._skeletonCollection
    }

    /**
     * get - skeleton model
     *
     * @returns {Skeleton}
     */
    get skeletonModel() {
        return this._skeletonModel
    }
}
