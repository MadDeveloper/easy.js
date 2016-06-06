/**
 * @class Entity
 */
export default class Entity {
    /**
     * @constructor
     * @param {EntityManager} entityManager
     */
    constructor( entityManager ) {
        this._database = entityManager.database
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
