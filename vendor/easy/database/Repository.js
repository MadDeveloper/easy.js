/**
 * @class Repository
 */
class Repository {
    /**
     * @constructor
     * @param  {bookshelf.Model} model
     * @param  {EntityManager} em
     */
    constructor( model, em ) {
        this.model = model
        this.collection = em.getCollection( model )
        this.entityManager = this.em = em
        this.database = this.db = em.database
        this.orm = this.database.instance
    }

    /**
     * findAll - fetch all models
     *
     * @param  {Object} options = {}
     * @returns {Promise}
     */
    findAll( options = {} ) {
        return this.collection.forge().fetch( options )
    }

    /**
     * find - fetch model by id
     *
     * @param  {Number} id
     * @param  {Object} options = {}
     * @returns {Promise}
     */
    find( id, options = {} ) {
        return this.model.forge({ id }).fetch( options )
    }

    /**
     * save - save or update model if already exists
     *
     * @param  {bookshelf.Model} model
     * @param  {Object} params
     * @param  {Object} options = {}
     * @returns {Promise}
     */
    save( model, params, options = {} ) {
        return new Promise( ( resolve, reject ) => {
            this.orm.transaction( t => {
                options.transacting = t

                model.save( params, options )
                    .then( model => {
                        t.commit()
                        resolve( model )
                    })
                    .catch( error => {
                        t.rollback()
                        reject( error )
                    })
            })
        })
    }

    /**
     * patch - patch model
     *
     * @param  {bookshelf.Model} model
     * @param  {Object} patch
     * @param  {Object} options = {}
     * @returns {Promise}
     */
    patch( model, patch, options = {} ) {
        return new Promise( ( resolve, reject ) => {
            let patchToApply = {}
            patchToApply[ patch.path.substring( 1 ) ] = patch.value

            this.orm.transaction( t => {
                options.transacting = t
                options.patch = true

                this.save( model, patchToApply, options )
                    .then( model => {
                        t.commit()
                        resolve( model )
                    })
                    .catch( error => {
                        t.rollback()
                        reject( error )
                    })
            })
        })
    }

    /**
     * delete - delete model
     *
     * @param  {bookshelf.Model} model
     * @param  {Object} options = {}
     * @returns {Promise}
     */
    delete( model, options = {} ) {
        return new Promise( ( resolve, reject ) => {
            this.orm.transaction( t => {
                options.transacting = t

                model.destroy( options )
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
}

module.exports = Repository
