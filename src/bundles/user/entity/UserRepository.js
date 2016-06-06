import Entity from './../../../vendor/easy/database/Repository'

export default class UserRepository extends Repository {
    constructor( database ) {
        super( database, {
            Role: factory.getController( 'role' ).getRepository().getModel()
        })
    }

    readAll( role ) {
        let user = this.getModel()

        return user.where({ role_id: role.get( 'id' ) }).fetchAll()
    }

    read( byParam, options = {} ) {
        let user = this.getModel()
        const forgeParam = ( typeof byParam === "number" || ( typeof byParam === 'string' && byParam.isNumber() ) ) ? { id: byParam } : ( ( undefined !== byParam.id ) ? { id: byParam.id } : { email: byParam.email } )

        return user.forge( forgeParam ).fetch( options )
    }

    save( user, { username, email, password, role_id }, options = {} ) {
        return new Promise( ( resolve, reject ) => {
            this.database.transaction( t => {
                options.transacting = t

                user.save({
                    username,
                    email,
                    password,
                    role_id
                }, options )
                .then( resolve )
                .catch( reject )
            })
        })
    }

    delete( user, options = {} ) {
        return new Promise( ( resolve, reject ) => {
            this.database.transaction( t => {
                options.transacting = t

                user.destroy( options )
                .then( resolve )
                .catch( reject )
            })
        })
    }
}
