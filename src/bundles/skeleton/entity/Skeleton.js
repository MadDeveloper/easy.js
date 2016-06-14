import Entity from '~/vendor/easy/database/Entity'

/**
 * @class Skeleton
 */
export default class Skeleton extends Entity {
    /**
     * @constructor
     * @param  {EntityManager} entityManager
     */
    constructor( entityManager ) {
        super( entityManager )

        /*
         * Bookshelf
         */
        return this.database.Model.extend({
            tableName: 'skeletons'
        })

        /*
         * Mongoose
         */
        // let model
        //
        // if ( this.database.models.role ) {
        //     model = this.database.model( 'role' )
        // } else {
        //     const roleSchema = this.database.Schema({
        //         name: String,
        //         slug: String
        //     })
        //     model = this.database.model( 'role', roleSchema )
        // }
        //
        // return model
    }
}
