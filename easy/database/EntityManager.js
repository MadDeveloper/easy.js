const Configurable = require( 'easy/interfaces/Configurable' )

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
        this._cached = {
            models: {},
            repositories: {}
        }
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
     * @returns {Repository}
     */
    getRepository( repository ) {
        if ( repository.length > 0 ) {
            if ( this.isCached( repository ) ) {
                return this.getCache( repository, 'repositories' )
            }

            const repositoryInfo = repository.split( '/' )
            const repositoryClass = require( `${this.bundlesPath}/${repositoryInfo[ 0 ]}/entity/${repositoryInfo[ 1 ]}` )

            return this.cache( new repositoryClass( this.getModel( repository ), this ), repository, 'repositories' )
        }
    }

    /**
     * getModel - returns entity
     *
     * @param {string} model
     * @returns {bookshelf.Model}
     */
    getModel( model ) {
        model = model.replace( '.repository', '' )

        if ( this.isCached( model ) ) {
            return this.getCache( model, 'models' )
        }

        const modelInfo = model.split( '/' )
        const modelClass = require( `${this.bundlesPath}/${modelInfo[ 0 ]}/entity/${modelInfo[ 1 ]}` )

        return this.cache( new modelClass( this ), model, 'models' )
    }

    /**
     * getCollection - returns collection of Model (cf. Bookshelf.js)
     *
     * @param {Model} model
     * @returns {bookshelf.Collection}
     */
    getCollection( model ) {
        return this.orm.Collection.extend({
            model
        })
    }

    /**
     * isCached - check if an object is cached from a key id following a type
     *
     * @param  {string} key = ''
     * @param  {string} type = 'models'
     * @returns {boolean}
     */
    isCached( key = '', type = 'models' ) {
        return this.cached.hasOwnProperty( type ) && this.cached[ type ].hasOwnProperty( key )
    }

    /**
     * getCache - retrieve cached object by a key id following a type
     *
     * @param  {string} key = ''
     * @param  {string} type = 'models'
     * @returns {object}
     */
    getCache( key = '', type = 'models' ) {
        return ( this.cached.hasOwnProperty( type ) && this.cached[ type ].hasOwnProperty( key ) ) ? this.cached[ type ][ key ] : {}
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
        if ( this.cached.hasOwnProperty( type ) ) {
            this.cached[ type ][ key ] = object

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
        if ( this.cached.hasOwnProperty( type ) ) {
            delete this.cached[ type ][ key ]
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
     * @returns {object}
     */
    get cached() {
        return this._cached
    }

    /**
     * get - database instance
     *
     * @returns {Object}
     */
    get orm() {
        return this.database.instance
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
