const { Entity } = require( 'easy/database' )

/**
 * @class Skeleton
 * @extends Entity
 */
class Skeleton extends Entity {
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

module.exports = Skeleton
