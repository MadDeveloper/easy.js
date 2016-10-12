import Repository from '~/vendor/easy/database/Repository'

/**
 * @class SkeletonRepository
 * @extends Repository
 */
export default class SkeletonRepository extends Repository {
    /**
     * @constructor
     * @param  {EntityManager} entityManager
     */
    constructor( entityManager ) {
        super( entityManager )

        this._skeleton              = this.entityManager.getModel( 'skeleton' )
        this._skeletonCollection    = this.entityManager.getCollection( this._skeleton )
    }

    /**
     * findAll - fetch all skeletons
     *
     * @param  {Object} options = {}
     * @returns {Promise}
     */
    findAll( options = {} ) {
        return this.skeletonCollection.forge().fetch( options )
    }

    /**
     * find - fetch skeleton by id
     *
     * @param  {Number} id
     * @param  {Object} options = {}
     * @returns {Promise}
     */
    find( id, options = {} ) {
        return this.skeleton.forge({ id }).fetch( options )
    }

    /**
     * save - save or update skeleton if already exists
     *
     * @param  {Skeleton} skeleton
     * @param  {Object} params
     * @param  {Object} options = {}
     * @returns {Promise}
     */
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

    /**
     * patch - patch skeleton
     *
     * @param  {Skeleton} skeleton
     * @param  {Object} patch
     * @param  {Object} options = {}
     * @returns {Promise}
     */
    patch( skeleton, patch, options = {} ) {
        return new Promise( ( resolve, reject ) => {
            let patchToApply = {}
            patchToApply[ patch.path.substring( 1 ) ] = patch.value

            this.database.transaction( t => {
                options.transacting = t
                options.patch = true

                this.save( skeleton, patchToApply, options )
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

    /**
     * delete - delete skeleton
     *
     * @param  {Skeleton} skeleton
     * @param  {Object} options = {}
     * @returns {Promise}
     */
    delete( skeleton, options = {} ) {
        return new Promise( ( resolve, reject ) => {
            this.database.transaction( t => {
                options.transacting = t

                skeleton.destroy( options )
                    .then( () => {
                        t.commit()
                        resolve()
                    })
                    .catch( error => {
                        t.rollback()
                        reject( error )
                    })
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
