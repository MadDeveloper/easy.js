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
    }

    /**
     * getRepository - get specific bundle repository (e.g. skeleton -> SkeletonRepository)
     *
     * @param {string} repository
     * @returns {Repository}
     */
    getRepository( repository ) {
        if ( repository.length > 0 ) {
            const repositoryClass = require( `${this.bundlesPath}/${repository.decapitalizeFirstLetter()}/entity/${repository.capitalizeFirstLetter()}Repository` ).default /* .default is needed to patch babel exports.default build, require doesn't work, import does */

            return new repositoryClass( this )
        }
    }

    /**
     * getModel - returns entity
     *
     * @param {string} model
     * @returns {Entity}
     */
    getModel( model ) {
        const modelClass = require( `${this.bundlesPath}/${model.decapitalizeFirstLetter()}/entity/${model.capitalizeFirstLetter()}` ).default /* .default is needed to patch babel exports.default build, require doesn't work, import does */

        return new modelClass( this )
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
}
