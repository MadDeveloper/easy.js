/*
* This file is part of the easy framework.
*
* (c) Julien Sergent <sergent.julien@icloud.com>
*
* For the full copyright and license information, please view the LICENSE
* file that was distributed with this source code.
*/

/**
 * @class Entity
 */
class Entity {
    /**
     * @constructor
     * @param {EntityManager} em
     */
    constructor( em ) {
        this.entityManager = this.em = em
        this.database = this.db = em.database.instance
    }
}

module.exports = Entity
