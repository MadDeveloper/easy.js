export default class RoleRepository {
    constructor( roleFactory ) {
        this._roleFactory = roleFactory
    }

    readAll() {
        let roles = this.roleFactory.getCollection()

        return roles.forge().fetch()
    }

    read( id, options ) {
        return this.roleFactory.getModel().forge({ id }).fetch( options )
    }

    save( role, { name, slug }, options ) {
        return role.save({
            name,
            slug
        }, options )
    }

    delete( role, options ) {
        return role.destroy( options )
    }

    /*
     * Getters and setters
     */
    get roleFactory() {
        return this._roleFactory
    }
}
