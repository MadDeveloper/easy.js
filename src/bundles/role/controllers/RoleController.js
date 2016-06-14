import Controller from '~/vendor/easy/core/Controller'

/**
 * @class RoleController
 */
export default class RoleController extends Controller {
    /**
     * @constructor
     * @param {express.Request} req
     * @param {express.Response} res
     * @param {Factory} factory
     */
    constructor( req, res, factory ) {
        super( req, res, factory )

        this._roleRepository    = this.entityManager.getRepository( 'role' )
        this._roleModel         = this.entityManager.getModel( 'role' )
    }

    /**
     * isRequestWellParameterized - verify if request is contains valid params
     *
     * @returns {bool}
     */
    isRequestWellParameterized() {
        return this.verifyParams([
            { property: 'name', typeExpected: 'string' },
            { property: 'slug', typeExpected: 'string' }
        ])
    }

    /**
     * @api {get} /roles Get all roles
     * @apiName GetRoles
     * @apiGroup Role
     *
     *
     * @apiSuccess {Array[]} roles Return table of roles
     * @apiSuccessExample {json} Success-Response:
     *     HTTP/1.1 200 OK
     *     [
     *       {
     *         "id": 1,
     *         "name": "Administrator",
     *         "slug": "administrator"
     *       }
     *     ]
     *
     * @apiError (Error 5xx) InternalServerError The server has encountered an internal error
     *
     * @apiErrorExample Error-Response:
     *     HTTP/1.1 500 Internal Server Error
     */
    getRoles() {
        this.roleRepository.readAll()
        .then( roles => this.response.ok( roles ) )
        .catch( error => this.response.internalServerError( error ) )
    }

    /**
     * @api {post} /roles Create a role
     * @apiName CreateRole
     * @apiGroup Role
     *
     * @apiParam {String} name Name of new role
     * @apiParam {String} slug Slug from name of new role
     *
     * @apiSuccess (Created 201) {Number} id Id of new role
     * @apiSuccess (Created 201) {String} name Name of new role
     * @apiSuccess (Created 201) {String} slug Slug of new role
     * @apiSuccessExample {json} Success-Response:
     *     HTTP/1.1 201 Created
     *     {
     *       "id": 3,
     *       "name": "Custom",
     *       "slug": "custom"
     *     }
     *
     * @apiError BadRequest Wrong parameters
     *
     * @apiErrorExample Error-Client:
     *     HTTP/1.1 400 Bad Request
     *
     * @apiError (Error 5xx) InternalServerError The server has encountered an internal error
     *
     * @apiErrorExample Error-Server:
     *     HTTP/1.1 500 Internal Server Error
     */
    createRole() {
        if ( this.isRequestWellParameterized() ) {
            this.roleRepository.save( new this.roleModel, this.request.getBody() )
            .then( role => {
                this.response.created( role )
            })
            .catch( error => this.response.internalServerError( error ) )
        } else {
            this.response.badRequest()
        }
    }

    /**
     * @api {get} /roles/:id Get role by id
     * @apiName GetRole
     * @apiGroup Role
     *
     *
     * @apiSuccess {Number} id Id of role
     * @apiSuccess {String} name Name of role
     * @apiSuccess {String} slug Slug of role
     * @apiSuccessExample {json} Success-Response:
     *     HTTP/1.1 200 OK
     *     {
     *       "id": 2,
     *       "name": "User",
     *       "slug": "user"
     *     }
     *
     * @apiError NotFound Role's id doesn't exist
     *
     * @apiErrorExample Error-Client:
     *     HTTP/1.1 404 Not Found
     *
     * @apiError (Error 5xx) InternalServerError The server has encountered an internal error
     *
     * @apiErrorExample Error-Server:
     *     HTTP/1.1 500 Internal Server Error
     */
    getRole() {
        this.response.ok( this.request.find( 'role' ) )
    }

    /**
     * @api {put} /roles/:id Update role from id
     * @apiName UpdateRole
     * @apiGroup Role
     *
     *
     * @apiParam {String} name New name of role
     * @apiParam {String} slug New slug from new name of role
     *
     * @apiSuccess {Number} id Id of role
     * @apiSuccess {String} name Name of role
     * @apiSuccess {String} slug Slug of role
     * @apiSuccessExample {json} Success-Response:
     *     HTTP/1.1 200 OK
     *     {
     *       "id": 3,
     *       "name": "Customer",
     *       "slug": "customer"
     *     }
     *
     * @apiError BadRequest Wrong parameters
     *
     * @apiErrorExample Error-Client (400):
     *     HTTP/1.1 400 Bad Request
     *
     * @apiError NotFound Role's id doesn't exist
     *
     * @apiErrorExample Error-Client (404):
     *     HTTP/1.1 404 Not Found
     *
     * @apiError (Error 5xx) InternalServerError The server has encountered an internal error
     *
     * @apiErrorExample Error-Server:
     *     HTTP/1.1 500 Internal Server Error
     */
    updateRole() {
        if ( this.isRequestWellParameterized() ) {
            this.roleRepository.save( this.request.find( 'role' ), this.request.getBody() )
            .then( role => this.response.ok( role ) )
            .catch( error => this.response.internalServerError( error ) )
        } else {
            this.response.badRequest()
        }
    }

    /**
     * @api {delete} /roles/:id Delete role from id
     * @apiName DeleteRole
     * @apiGroup Role
     *
     *
     * @apiSuccessExample Success-Response:
     *     HTTP/1.1 204 No Content
     *
     * @apiError NotFound Role's id doesn't exist
     *
     * @apiErrorExample Error-Client:
     *     HTTP/1.1 404 Not Found
     *
     * @apiError (Error 5xx) InternalServerError The server has encountered an internal error
     *
     * @apiErrorExample Error-Server:
     *     HTTP/1.1 500 Internal Server Error
     */
    deleteRole() {
        this.roleRepository.delete( this.request.find( 'role' ) )
        .then( () => this.response.noContent() )
        .catch( error => this.response.internalServerError( error ) )
    }

    /**
     * get - role repository
     *
     * @returns {RoleRepository}
     */
    get roleRepository() {
        return this._roleRepository
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
