/**
 * @class Entity
 */
module.exports = class Entity {
    /**
     * @constructor
     * @param {EntityManager} em
     */
    constructor( em ) {
        this.em = this.entityManager = em
        this.database = this.db = em.database
        this.orm = this.database.instance
    }
}
