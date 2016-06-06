/**
 * @class EntityManager
 */
export default class EntityManager {
    /**
     * @constructor
     * @param  {Container} container
     */
    constructor( container ) {
        this._container     = container
        this._bundlesPath   = container.kernel.path.bundles
        this._database      = container.getComponent( 'Database' ).scope
    }

    /**
     * getRepository - get specific bundle repository (e.g. skeleton -> SkeletonRepository)
     *
     * @param {Repository} repository
     * @returns {Repository}
     */
    getRepository( repository ) {
        if ( repository.length > 0 ) {
            const repositoryClass = require( `${this.bundlePath}/${repository.decapitalizeFirstLetter()}/entity/${this.bundle.capitalizeFirstLetter()}Repository` ).default /* .default is needed to patch babel exports.default build, require doesn't work, import do */

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
        const modelClass = require( `${this.bundlePath}/${model.decapitalizeFirstLetter()}/entity/${model.capitalizeFirstLetter()}` ).default /* .default is needed to patch babel exports.default build, require doesn't work, import do */

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
        return this._database
    }
}
