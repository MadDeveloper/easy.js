/**
 * @class Entity
 */
export default class Entity {
    /**
     * @constructor
     * @param {EntityManager} entityManager
     */
    constructor( entityManager ) {
        this.em = this.entityManager = entityManager
        this.database = this.db = entityManager.database
        this.orm = this.database.instance
    }
}
