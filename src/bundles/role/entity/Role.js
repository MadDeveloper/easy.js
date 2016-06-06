import Entity from './../../../vendor/easy/core/Entity'

/**
 * @class Role
 */
export default class Role extends Entity {
    /**
     * @constructor
     * @param  {Bookshelf} database
     * @param  {object} dependencies
     */
    constructor( database, { User } ) {
        super( database )

        return database.Model.extend({
            tableName: 'roles',

            users() {
                return this.hasMany( User )
            }
        })
    }
}
