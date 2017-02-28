/*
* This file is part of the easy framework.
*
* (c) Julien Sergent <sergent.julien@icloud.com>
*
* For the full copyright and license information, please view the LICENSE
* file that was distributed with this source code.
*/

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
        this.entityManager = this.em = em
        this.database = this.db = em.database.instance
    }

    /**
     * findAll - fetch all models
     *
     * @param  {Object} options = {}
     * @returns {Promise}
     */
    findAll( options = {}) {
        const collection = this.database.Collection.extend({ model: this.model })

        return collection.forge().fetch( options )
    }

    /**
     * find - fetch model by id
     *
     * @param  {Number} id
     * @param  {Object} options = {}
     * @returns {Promise}
     */
    find( id, options = {}) {
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
    save( model, params, options = {}) {
        return new Promise( ( resolve, reject ) => {
            this.database.transaction( t => {
                options.transacting = t

                model
                    .save( params, options )
                    .then( modelUpdated => {
                        t.commit()
                        resolve( modelUpdated )

                        return null
                    })
                    .catch( error => {
                        t.rollback()
                        reject( error )

                        return null
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
    patch( model, patch, options = {}) {
        return new Promise( ( resolve, reject ) => {
            let patchToApply = {}
            patchToApply[ patch.path.substring( 1 ) ] = patch.value

            this.database.transaction( t => {
                options.transacting = t
                options.patch = true

                this.save( model, patchToApply, options )
                    .then( modelUpdated => {
                        t.commit()
                        resolve( modelSaved )

                        return null
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
    delete( model, options = {}) {
        return new Promise( ( resolve, reject ) => {
            this.database.transaction( async t => {
                options.transacting = t

                try {
                    await model.destroy( options )
                    t.commit()
                    resolve()
                } catch ( error ) {
                    t.rollback()
                    reject( error )
                }
            })
        })
    }
}

module.exports = Repository
