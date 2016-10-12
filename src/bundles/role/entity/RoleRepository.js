import Repository from '~/vendor/easy/database/Repository'

/**
 * @class RoleRepository
 * @extends Repository
 */
export default class RoleRepository extends Repository {
    /**
     * @constructor
     *
     * @param  {EntityManager} entityManager
     */
    constructor( entityManager ) {
        super( entityManager )

        this._role              = this.entityManager.getModel( 'role' )
        this._roleCollection    = this.entityManager.getCollection( this._role )
    }

    /**
     * findAll - fetch all roles
     *
     * @returns {Promise}
     */
    findAll() {
        return this.roleCollection.forge().fetch()
    }

    /**
     * find - fetch role by id
     *
     * @param  {Number} id
     * @param  {Object} options = {}
     * @returns {Promise}
     */
    find( id, options = {} ) {
        return this.role.forge({ id }).fetch( options )
    }

    /**
     * save - save or update role if already exists
     *
     * @param  {Role} role
     * @param  {String} { params
     * @param  {String} slug }
     * @param  {Object} options = {}
     * @returns {Promise}
     */
    save( role, { name, slug }, options = {} ) {
        return new Promise( ( resolve, reject ) => {
            this.database.transaction( t => {
                options.transacting = t

                role.save({ name, slug }, options )
                    .then( role => {
                        t.commit()
                        resolve( role )
                    })
                    .catch( error => {
                        t.rollback()
                        reject( error )
                    })
            })
        })
    }

    /**
     * delete - delete role
     *
     * @param  {Role} role
     * @param  {Object} options = {}
     * @returns {Promise}
     */
    delete( role, options = {} ) {
        return new Promise( ( resolve, reject ) => {
            this.database.transaction( t => {
                options.transacting = t

                role.destroy( options )
                    .then( () => {
                        t.commit()
                        resolve()
                    })
                    .catch( error => {
                        t.rollback()
                        reject( error )
                    })
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
