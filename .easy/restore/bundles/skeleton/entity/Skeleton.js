import Entity from '~/vendor/easy/database/Entity'

/**
 * @class Skeleton
 * @extends Entity
 */
export default class Skeleton extends Entity {
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
