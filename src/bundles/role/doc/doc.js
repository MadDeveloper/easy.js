/**
 * getRoles - get all roles
 *
 * @api {get} /roles Get all roles
 * @apiName GetRoles
 * @apiGroup Role
 *
 *
 * @apiSuccess {Array[Role]} raw Return table of roles
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
 * @apiUse InternalServerError
 */

/**
 * createRole - create new role
 *
 * @api {post} /roles Create a role
 * @apiName CreateRole
 * @apiGroup Role
 * @apiPermission admin
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
 * @apiUse BadRequest
 * @apiUse InternalServerError
 */

/**
 * getRole - get role by id
 *
 * @api {get} /roles/:id Get role by id
 * @apiName GetRole
 * @apiGroup Role
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
 * @apiUse NotFound
 * @apiUse InternalServerError
 */

/**
 * updateRole - update role
 *
 * @api {put} /roles/:id Update role from id
 * @apiName UpdateRole
 * @apiGroup Role
 * @apiPermission admin
 *
 *
 * @apiParam {String} name New role name
 * @apiParam {String} slug New role slug
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
 * @apiUse NotFound
 * @apiUse BadRequest
 * @apiUse InternalServerError
 */

/**
 * deleteRole - delete role
 *
 * @api {delete} /roles/:id Delete role from id
 * @apiName DeleteRole
 * @apiGroup Role
 * @apiPermission admin
 *
 *
 * @apiSuccessExample Success-Response:
 *     HTTP/1.1 204 No Content
 *
 * @apiUse NotFound
 * @apiUse BadRequest
 * @apiUse InternalServerError
 */
