import Entity from './../../../vendor/easy/core/Entity'

/**
 * @class User
 */
export default class User extends Entity {
    /**
     * @constructor
     * @param  {Bookshelf} database
     * @param  {object} dependencies
     */
    constructor( database, { Role } ) {
        super( database )

        return database.Model.extend({
            tableName: 'users',

            role() {
                return this.belongsTo( Role )
            }
        })
    }
}
