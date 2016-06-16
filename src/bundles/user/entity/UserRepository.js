import Repository from '~/vendor/easy/database/Repository'

export default class UserRepository extends Repository {
    constructor( entityManager ) {
        super( entityManager )

        this._user = this.entityManager.getModel( 'user' )
    }

    readAll( role ) {
        return this.user.where({ role_id: role.get( 'id' ) }).fetchAll()
    }

    read( byParam, options = {} ) {
        const forgeParam = ( typeof byParam === "number" || ( typeof byParam === 'string' && byParam.isNumber() ) ) ? { id: byParam } : ( ( undefined !== byParam.id ) ? { id: byParam.id } : { email: byParam.email } )

        return this.user.forge( forgeParam ).fetch( options )
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

    /**
     * get - user model
     *
     * @returns {User}
     */
    get user() {
        return this._user
    }
}
