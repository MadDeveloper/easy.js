/**
 * @class Repository
 */
export default class Repository {
    /**
     * @constructor
     * @param  {EntityManager} entityManager
     */
    constructor( entityManager ) {
        this._entityManager = entityManager
        this._database      = entityManager.database
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
