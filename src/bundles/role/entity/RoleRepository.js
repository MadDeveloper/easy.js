import Repository from '~/vendor/easy/database/Repository'

export default class RoleRepository extends Repository {
    constructor( entityManager ) {
        super( entityManager )

        /*
         * Bookshelf
         */
        this._roleCollection    = this.entityManager.getCollection( 'role' )
        this._role              = this.entityManager.getModel( 'role' )
    }

    readAll() {
        /*
         * Bookshelf
         */
        return this.roleCollection.forge().fetch()

        /*
         * Mongoose
         */
        // return new Promise( ( resolve, reject ) => {
        //     this.role.find( ( error, roles ) => {
        //         error ? reject( error ) : resolve( roles )
        //         return
        //     })
        // })
    }

    read( id, options = {} ) {
        /*
         * Bookshelf
         */
        return this.role.forge({ id }).fetch( options )

        /*
         * Mongoose
         */
        // return new Promise( ( resolve, reject ) => {
        //     this.role.findById( id, ( error, role ) => {
        //         error ? reject( error ) : resolve( role )
        //     })
        // })
    }

    save( role, { name, slug }, options = {} ) {
        return new Promise( ( resolve, reject ) => {
            this.database.transaction( t => {
                options.transacting = t

                role.save({
                    name,
                    slug
                }, options )
                .then( resolve )
                .catch( reject )
            })
        })
    }

    delete( role, options = {} ) {
        return new Promise( ( resolve, reject ) => {
            this.database.transaction( t => {
                options.transacting = t

                role.destroy( options )
                .then( resolve )
                .catch( reject )
            })
        })
    }

    /**
     * get - role collection
     *
     * @returns {Collection}
     */
    get roleCollection() {
        return this._roleCollection
    }

    /**
     * get - role model
     *
     * @returns {Role}
     */
    get role() {
        return this._role
    }
}
