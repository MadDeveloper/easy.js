import Entity from '~/vendor/easy/database/Entity'

/**
 * @class Role
 */
export default class Role extends Entity {
    /**
     * @constructor
     * @param  {object} dependencies
     */
    constructor( entityManager ) {
        super( entityManager )

        /*
         * Bookshelf
         */
        // return this.database.Model.extend({
        //     tableName: 'roles',
        //
        //     users() {
        //         return this.hasMany( entityManager.getModel( 'user' ) )
        //     }
        // })

        /*
         * Mongoose
         */
        if ( !this.database.models.role ) {
            this.database.model( 'role', this.database.Schema({
                name: String,
                slug: String
            }))
        }

        return this.database.model( 'role' )
    }
}
