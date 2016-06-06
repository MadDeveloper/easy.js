import Entity from './../../../vendor/easy/database/Entity'

/**
 * @class Skeleton
 */
export default class Skeleton extends Entity {
    /**
     * @constructor
     * @param  {Bookshelf} database
     * @param  {object} dependencies
     */
    constructor( database, dependencies ) {
        super( database )

        return database.Model.extend({
            tableName: 'skeletons'
        })
    }
}
