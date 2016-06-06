/**
 * @class Entity
 */
export default class Entity {
    /**
     * @constructor
     * @param  {Bookshelf} database
     */
    constructor( database ) {
        this._database = database
    }

    /**
     * get - database (Bookshelf) object
     *
     * @returns {Bookshelf}
     */
    get database() {
        return this._database
    }
}
