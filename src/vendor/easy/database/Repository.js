/**
 * @class Repository
 */
export default class Repository {
    /**
     * @constructor
     * @param  {Bookshelf} database
     * @param  {object} modelDependencies
     */
    constructor( database, modelDependencies = {} ) {
        this._database          = database
        this._modelDependencies = modelDependencies
    }

    /**
     * getModel - returns entity
     *
     * @returns {Entity}
     */
    getModel() {
        const modelClass = require( `./${model.capitalizeFirstLetter()}` ).default /* .default is needed to patch babel exports.default build, require doesn't work, import do */

        return new modelClass( this, this.modelDependencies )
    }

    /**
     * getCollection - returns collection of Model (cf. Bookshelf.js)
     *
     * @returns {Collection}
     */
    getCollection() {
        return this.database.Collection.extend({
            model: this.getModel()
        })
    }

    /**
     * get - returns database connection (ORM)
     *
     * @returns {Bookshelf}
     */
    get database() {
        return this._database
    }

    /**
     * get - model dependencies
     *
     * @returns {object}
     */
    get modelDependencies() {
        return this._modelDependencies
    }
}
