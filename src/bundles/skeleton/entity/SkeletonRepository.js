import Repository from '~/vendor/easy/database/Repository'

export default class SkeletonRepository extends Repository {
    constructor( entityManager ) {
        super( entityManager )

        this._skeletonCollection    = this.entityManager.getCollection( 'skeleton' )
        this._skeleton         = this.entityManager.getModel( 'skeleton' )
    }

    readAll( options = {} ) {
        /*
         * Bookshelf
         */
        return this.skeletonCollection.forge().fetch( options )

        /*
         * Mongoose
         */
        // return new Promise( ( resolve, reject ) => {
        //     this.roleModel.find( ( error, roles ) => {
        //         error ? reject( error ) : resolve( roles )
        //     })
        // })
    }

    read( id, options = {} ) {
        return this.skeleton.forge({ id }).fetch( options )
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
    get skeleton() {
        return this._skeleton
    }
}
