/*
 * Skeleton model
 */
import Entity from './../../../vendor/easy/database/Entity'

export default class Skeleton extends Entity {
    constructor( database ) {
        super( database )

        return database.Model.extend({
            tableName: 'skeletons'
        })
    }
}
