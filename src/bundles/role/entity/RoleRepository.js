import Entity from './../../../vendor/easy/database/Repository'

export default class RoleRepository extends Repository {
    constructor( factory ) {
        super( factory )

        this._roleCollection    = this.entityManager.getCollection( 'role' )
        this._roleModel         = this.entityManager.getModel( 'role' )
    }

    readAll() {
        let roles = this.roleCollection

        return roles.forge().fetch()
    }

    read( id, options = {} ) {
        return this.roleModel.forge({ id }).fetch( options )
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
    get roleModel() {
        return this._roleModel
    }
}
