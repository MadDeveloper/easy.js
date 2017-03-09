/*
* This file is part of the easy framework.
*
* (c) Julien Sergent <sergent.julien@icloud.com>
*
* For the full copyright and license information, please view the LICENSE
* file that was distributed with this source code.
*/

const Configurable = require( '../interfaces/Configurable' )

/**
 * @class EntityManager
 * @extends Configurable
 */
class EntityManager extends Configurable {
    /**
     * @constructor
     */
    constructor() {
        super()

        this._database = null
        this._bundlesPath = ''
        this._cached = new Map()
        this._cached.set( 'models', new Map() )
        this._cached.set( 'repositories', new Map() )
    }

    /**
     * Configure entity manager
     *
     * @param {string} bundlesPath
     * @param {Database} database
     */
    configure( bundlesPath, database ) {
        this._bundlesPath = bundlesPath
        this._database = database
    }

    /**
     * Get specific bundle repository
     *
     * @param {string} repository
     * @param {Object} [options = {}]
     * @returns {Repository}
     */
    getRepository( repository, options = {}) {
        if ( 0 === repository.length ) {
            return {}
        }

        if ( this.isCached( repository ) ) {
            return this.getCache( repository, this._cacheRepositoriesNamespace() )
        }

        let associatedModel = {}

        if ( 'model' in options ) {
            associatedModel = 'string' === typeof options.model ? this.getModel( options.model ) : options.model
        }

		try {
			const repositoryClass = require( `${this.bundlesPath}/${repository}` )

			return this.cache( new repositoryClass( associatedModel, this ), repository, this._cacheRepositoriesNamespace() )
		} catch ( error ) {
			throw new Error( `The repository ${repository} cannot be loaded.\n${error}` )
		}
    }

    /**
     * Returns the entity model
     *
     * @param {string} model
     * @returns {bookshelf.Model}
     */
    getModel( model ) {
        if ( 0 === model.length ) {
            return {}
        }

        if ( this.isCached( model ) ) {
            return this.getCache( model, this._cacheModelsNamespace() )
        }

		try {
			const modelClass = require( `${this.bundlesPath}/${model}` )

			return this.cache( new modelClass( this ).build(), model, this._cacheModelsNamespace() )
		} catch ( error ) {
			throw new Error( `The model ${model} cannot be loaded.\n${error}` )
		}
    }

    /**
     * Returns cache repositories namespace
     *
     * @returns {string}
	 *
	 * @private
     */
    _cacheModelsNamespace() {
        return 'repositories'
    }

    /**
     * Returns cache models namespace
     *
     * @returns {string}
	 *
	 * @private
     */
    _cacheRepositoriesNamespace() {
        return 'models'
    }

    /**
     * Check if an object is cached from a key id following a type
     *
     * @param {string} [key='']
     * @param {string} [type='models']
     * @returns {boolean}
     */
    isCached( key = '', type = 'models' ) {
        return this.cached.has( type ) && this.cached.get( type ).has( key )
    }

    /**
     * Retrieve cached object by a key id following a type
     *
     * @param {string} [key='']
     * @param {string} [type='models']
     * @returns {Object}
     */
    getCache( key = '', type = 'models' ) {
        if ( this.isCached( key, type ) ) {
            return this.cached.get( type ).get( key )
        }

        return {}
    }

    /**
     * Cache an object with a key id into specific type
     *
     * @param {Object} [object={}]
     * @param {string} [key='']
     * @param {string} [type='models']
     * @returns {Object}
     */
    cache( object = {}, key = '', type = 'models' ) {
        if ( this.cached.has( type ) ) {
            this.cached.get( type ).set( key, object )

            return object
        }

        return {}
    }

    /**
     * Uncache object referenced by a key id following a type
     *
     * @param {string} [key='']
     * @param {string} [type='models']
     */
    uncache( key = '', type = 'models' ) {
        if ( this.cached.has( type ) ) {
            this.cached.get( type ).delete( key )
        }
    }

    /**
     * Get bundles path
     *
     * @returns {string}
     */
    get bundlesPath() {
        return this._bundlesPath
    }

    /**
     * Get cached objects
     *
     * @returns {Map}
     */
    get cached() {
        return this._cached
    }

    /**
     * Get the database instance
     *
     * @returns {Database}
     */
    get database() {
        return this._database
    }
}

module.exports = EntityManager
