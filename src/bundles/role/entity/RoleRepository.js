export default class RoleRepository( RoleFactory ) {
    constructor( roleFactory ) {
        this._roleFactory = roleFactory
    }

    readAll() {
        let roles = this.roleFactory.getCollection()

        return roles.forge().fetch()
    }

    read( id, options ) {
        return this.roleFactory.getModel().forge({ id: id }).fetch( options )
    }

    save( role, params, options ) {
        return role.save({
            name: params.name,
            slug: params.slug
        }, options )
    }

    patch( params, options ) {

    }

    delete( role, options ) {
        return role.destroy( options )
    }

    /*
     * Getters and setters
     */
    get skeletonFactory() {
        return this._skeletonFactory
    }
}
