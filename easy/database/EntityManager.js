/*
* This file is part of the easy framework.
*
* (c) Julien Sergent <sergent.julien@icloud.com>
*
* For the full copyright and license information, please view the LICENSE
* file that was distributed with this source code.
*/

const Configurable = require( '../interfaces/Configurable' )
const { isEqual } = require( 'lodash' )

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
     * configure - configure entity manager
     *
     * @param  {string} bundlesPath
     * @param  {Database} database
     */
    configure( bundlesPath, database ) {
        this._bundlesPath = bundlesPath
        this._database = database
    }

    /**
     * getRepository - get specific bundle repository (e.g. skeleton -> SkeletonRepository)
     *
     * @param {string} repository
     * @param {object} options = {}
     * @returns {Repository}
     */
    getRepository( repository, options = {}) {
        if ( 0 === repository.length ) {
            return {}
        }

        if ( this.isCached( repository ) ) {
            return this.getCache( repository, this.inCacheRepositories() )
        }

        let associatedModel = {}

        if ( 'model' in options ) {
            associatedModel = 'string' === typeof options.model ? this.getModel( options.model ) : options.model
        }

        const repositoryClass = require( `${this.bundlesPath}/${repository}` )

        return this.cache( new repositoryClass( associatedModel, this ), repository, this.inCacheRepositories() )
    }

    /**
     * getModel - returns entity
     *
     * @param {string} model
     * @returns {bookshelf.Model}
     */
    getModel( model ) {
        if ( 0 === model.length ) {
            return {}
        }

        if ( this.isCached( model ) ) {
            return this.getCache( model, this.inCacheModels() )
        }

        const modelClass = require( `${this.bundlesPath}/${model}` )

        return this.cache( new modelClass( this ).build(), model, this.inCacheModels() )
    }

    /**
     * inCacheModels - returns cache repositories namespace
     *
     * @returns {string}
     */
    inCacheModels() {
        return 'repositories'
    }

    /**
     * inCacheRepositories - returns cache models namespace
     *
     * @returns {string}
     */
    inCacheRepositories() {
        return 'models'
    }

    /**
     * isCached - check if an object is cached from a key id following a type
     *
     * @param  {string} key = ''
     * @param  {string} type = 'models'
     * @returns {boolean}
     */
    isCached( key = '', type = 'models' ) {
        return this.cached.has( type ) && this.cached.get( type ).has( key )
    }

    /**
     * getCache - retrieve cached object by a key id following a type
     *
     * @param  {string} key = ''
     * @param  {string} type = 'models'
     * @returns {object}
     */
    getCache( key = '', type = 'models' ) {
        if ( this.isCached( key, type ) ) {
            return this.cached.get( type ).get( key )
        }

        return {}
    }

    /**
     * cache - cache an object with a key id into specific type
     *
     * @param  {object} object = {}
     * @param  {string} key = ''
     * @param  {string} type = 'models'
     * @returns {object}
     */
    cache( object = {}, key = '', type = 'models' ) {
        if ( this.cached.has( type ) ) {
            this.cached.get( type ).set( key, object )

            return object
        }

        return {}
    }

    /**
     * uncache - uncache object referenced by a key id following a type
     *
     * @param  {string} key = ''
     * @param  {string} type = 'models'
     */
    uncache( key = '', type = 'models' ) {
        if ( this.cached.has( type ) ) {
            this.cached.get( type ).delete( key )
        }
    }

    /**
     * get - bundles path
     *
     * @returns {string}
     */
    get bundlesPath() {
        return this._bundlesPath
    }

    /**
     * get - get cached objects
     *
     * @returns {Map}
     */
    get cached() {
        return this._cached
    }

    /**
     * get - database
     *
     * @returns {Database}
     */
    get database() {
        return this._database
    }
}

module.exports = EntityManager
