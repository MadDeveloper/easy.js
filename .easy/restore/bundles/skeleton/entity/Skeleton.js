import Entity from '~/vendor/easy/database/Entity'

/**
 * @class Skeleton
 * @extends Entity
 */
export default class Skeleton extends Entity {
    /**
     * @constructor
     * @param  {EntityManager} entityManager
     */
    constructor( entityManager ) {
        super( entityManager )

        return this.database.Model.extend({
            tableName: 'skeletons'
        })
    }
}