import Component from './../core/Component'

/**
 * @class EntityManager
 * @extends Component
 */
export default class EntityManager extends Component {
    /**
     * @constructor
     * @param  {Container} container
     */
    constructor( container ) {
        super()

        this._container     = container
        this._bundlesPath   = container.kernel.path.bundles
        this._cached        = {
            models: {},
            repositories: {},
            collections: {}
        }
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

            const repositoryClass = require( `${this.bundlesPath}/${repository.decapitalizeFirstLetter()}/entity/${repository.capitalizeFirstLetter()}Repository` ).default /* .default is needed to patch babel exports.default build, require doesn't work, import does */

            return this.cache( new repositoryClass( this ), repository, 'repositories' )
        }
    }

    /**
     * getModel - returns entity
     *
     * @param {string} model
     * @returns {Entity}
     */
    getModel( model ) {
        if ( this.isCached( model ) ) {
            return this.getCache( model, 'models' )
        }

        const modelClass = require( `${this.bundlesPath}/${model.decapitalizeFirstLetter()}/entity/${model.capitalizeFirstLetter()}` ).default /* .default is needed to patch babel exports.default build, require doesn't work, import does */

        return this.cache( new modelClass( this ), model, 'models' )
    }

    /**
     * getCollection - returns collection of Model (cf. Bookshelf.js)
     *
     * @param {string} model
     * @returns {Collection}
     */
    getCollection( model ) {
        return this.database.Collection.extend({
            model: this.getModel( model )
        })
    }

    /**
     * isCached - check if an object is cached from a key id following a type
     *
     * @param  {string} key = ''
     * @param  {string} type = 'models'
     * @returns {bool}
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
     * get - ORM (Bookshelf)
     *
     * @returns {Bookshelf}
     */
    get database() {
        return this._container.getComponent( 'Database' ).instance
    }

    /**
     * get - get cached objects
     *
     * @returns {object}
     */
    get cached() {
        return this._cached
    }
}
