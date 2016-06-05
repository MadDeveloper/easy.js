/**
 * @class Repository
 */
export default class Repository {
    /**
     * @param  {type} factory description
     * @constructor
     */
    constructor( database ) {
        this._database = database
    }

    /**
     * getModel - returns entity
     *
     * @returns {Entity}
     */
    getModel() {
        const modelClass = require( `./${model.capitalizeFirstLetter()}` ).default /* .default is needed to patch babel exports.default build, require doesn't work, import do */

        return new modelClass( this )
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
}
