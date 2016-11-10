const Entity = require( 'vendor/easy/database/Entity' )

/**
 * @class Skeleton
 * @extends Entity
 */
module.exports = class Skeleton extends Entity {
    /**
     * @constructor
     * @param  {EntityManager} em
     */
    constructor( em ) {
        super( em )

        return this.orm.Model.extend({
            tableName: 'skeletons'
        })
    }
}
