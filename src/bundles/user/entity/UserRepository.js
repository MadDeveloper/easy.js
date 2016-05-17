export default class UserRepository {
    constructor( userFactory ) {
        this._userFactory = userFactory
    }

    readAll( role ) {
        let user = this.userFactory.getModel()
        
        return user.where({ role_id: role.get( 'id' ) }).fetchAll()
    }

    read( byParam, options ) {
        let user = this.userFactory.getModel()
        const forgeParam = ( this.userFactory.getRootController().isNumber( byParam ) ) ? { id: byParam } : ( ( undefined !== byParam.id ) ? { id: byParam.id } : { email: byParam.email } )

        return user.forge( forgeParam ).fetch( options )
    }

    save( user, params, options ) {
        return user.save({
            username: params.username,
            email: params.email,
            password: params.password,
            role_id: params.role_id
        }, options )
    }

    delete( user, options ) {
        return user.destroy( options )
    }

    /*
     * Getters and setters
     */
    get userFactory() {
        return this._userFactory
    }
}
