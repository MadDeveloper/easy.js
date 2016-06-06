import Entity from './../../../vendor/easy/database/Repository'

export default class RoleRepository extends Repository {
    constructor( database ) {
        super( database, {
            User: factory.getController( 'user' ).getRepository().getModel()
        })
    }

    readAll() {
        let roles = this.getCollection()

        return roles.forge().fetch()
    }

    read( id, options = {} ) {
        return this.getModel().forge({ id }).fetch( options )
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
}
