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
     * @param {bookshelf.Model} model
     * @param {EntityManager} em
     */
    constructor( model, em ) {
        this.model = model
        this.entityManager = this.em = em
        this.database = this.db = em.database.instance
    }

    /**
     * Fetch all models
     *
     * @param {Object} [options = {}]
     * @returns {Promise}
     */
    findAll( options = {}) {
        const collection = this.database.Collection.extend({ model: this.model })

        return collection.forge().fetch( options )
    }

    /**
     * Fetch model by id
     *
     * @param {Number} id
     * @param {Object} [options = {}]
     * @returns {Promise}
     */
    find( id, options = {}) {
        return this.model.forge({ id }).fetch( options )
    }

    /**
     * Save or update the model if already exists
     *
     * @param {bookshelf.Model} model
     * @param {Object} [params={}]
     * @param {Object} [options={}]
     * @returns {Promise}
     */
    save( model, params = {}, options = {}) {
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
     * Patch the model
     *
     * @param {bookshelf.Model} model
     * @param {Object} [patch={ path: '', value: null }]
     * @param {Object} [options={}]
     * @returns {Promise}
     */
    patch( model, patch = { path: '', value: null }, options = {}) {
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
     * Delete the model
     *
     * @param {bookshelf.Model} model
     * @param {Object} [options={}]
     * @returns {Promise}
     */
    delete( model, options = {}) {
        return new Promise( ( resolve, reject ) => {
            this.database.transaction( t => {
                options.transacting = t

                model
                    .destroy( options )
                    .then( () => {
                        t.commit()
                        resolve()

                        return null
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
