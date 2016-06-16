import Repository from '~/vendor/easy/database/Repository'

/**
 * @class UserRepository
 * @extends Repository
 */
export default class UserRepository extends Repository {
    /**
     * @constructor
     * @param  {EntityManager} entityManager
     */
    constructor( entityManager ) {
        super( entityManager )

        this._user = this.entityManager.getModel( 'user' )
    }

    /**
     * readAll - fetch all users from role
     *
     * @param  {Role} role
     * @returns {Promise}
     */
    readAll( role ) {
        return this.user.where({ role_id: role.get( 'id' ) }).fetchAll()
    }

    /**
     * read - fetch user by id or email
     *
     * @param  {Object} byParam
     * @param  {Object} options = {}
     * @returns {Promise}
     */
    read( byParam, options = {} ) {
        const forgeParam = ( typeof byParam === "number" || ( typeof byParam === 'string' && byParam.isNumber() ) ) ? { id: byParam } : ( ( undefined !== byParam.id ) ? { id: byParam.id } : { email: byParam.email } )

        return this.user.forge( forgeParam ).fetch( options )
    }

    /**
     * save - save or update user if already exists
     *
     * @param  {User} user
     * @param  {String} { username
     * @param  {String} email
     * @param  {String} password
     * @param  {Number} role_id }
     * @param  {Object} options = {}
     * @returns {Promise}
     */
    save( user, { username, email, password, role_id }, options = {} ) {
        return new Promise( ( resolve, reject ) => {
            this.database.transaction( t => {
                options.transacting = t

                user.save({ username, email, password, role_id }, options )
                .then( user => {
                    t.commit()
                    resolve( user )
                })
                .catch( error => {
                    t.rollback()
                    reject( error )
                })
            })
        })
    }

    /**
     * patch - patch user
     *
     * @param  {User} user
     * @param  {Object} patch
     * @param  {Object} options = {}
     * @returns {Promise}
     */
    patch( user, patch, options = {} ) {
        return new Promise( ( resolve, reject ) => {
            let patchToApply = {}
            patchToApply[ patch.path.substring( 1 ) ] = patch.value

            this.database.transaction( t => {
                options.transacting = t
                options.patch = true

                this.save( user, patchToApply, options )
                .then( user => {
                    t.commit()
                    resolve( user )
                })
                .catch( error => {
                    t.rollback()
                    reject( error )
                })
            })
        })
    }

    /**
     * delete - delete user
     *
     * @param  {User} user
     * @param  {Object} options = {}
     * @returns {Promise}
     */
    delete( user, options = {} ) {
        return new Promise( ( resolve, reject ) => {
            this.database.transaction( t => {
                options.transacting = t

                user.destroy( options )
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
     * get - user model
     *
     * @returns {User}
     */
    get user() {
        return this._user
    }
}
