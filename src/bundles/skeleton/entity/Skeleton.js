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
        // if ( !this.database.models.skeleton ) {
        //     this.database.model( 'skeleton', this.database.Schema({
        //
        //     }))
        // }
        //
        // return this.database.model( 'skeleton' )
    }
}
