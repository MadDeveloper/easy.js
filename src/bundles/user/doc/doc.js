/**
 * getUsers - get all users from specific role
 *
 * @api {get} /roles/:idRole/users Get all users from specific role
 * @apiName GetUsers
 * @apiGroup User
 *
 *
 * @apiSuccess {Array[User]} raw Return table of users
 * @apiSuccessExample {json} Success-Response:
 *     HTTP/1.1 200 OK
 *     [
 *       {
 *         "id": 3,
 *         "username": "John",
 *         "email": "john@example.com",
 *         "password": "encrypted",
 *         "role_id": 1
 *       }
 *     ]
 *
 * @apiUse InternalServerError
 */

/**
 * createUser - create new user with specific role id
 *
 * @api {post} /roles/:idRole/users Create a user
 * @apiName CreateUser
 * @apiGroup User
 * @apiPermission user
 *
 * @apiParam {String} username Username of new user
 * @apiParam {String} email Email of new user
 * @apiParam {String} password Password of new user
 *
 * @apiSuccess (Created 201) {Number} id Id of new user
 * @apiSuccess (Created 201) {String} username Username of new user
 * @apiSuccess (Created 201) {String} email Email of new user
 * @apiSuccess (Created 201) {String} password Password of new user
 * @apiSuccess (Created 201) {Number} role_id Role id of new user
 * @apiSuccessExample {json} Success-Response:
 *     HTTP/1.1 201 Created
 *     {
 *       "id": 3,
 *       "username": "John",
 *       "email": "john@example.com",
 *       "password": "encrypted",
 *       "role_id": 2
 *     }
 *
 * @apiUse BadRequest
 * @apiUse InternalServerError
 */

/**
 * getUser - get user by id
 *
 * @api {get} /roles/:idRole/users/:idUser Get user by id
 * @apiName GetUser
 * @apiGroup User
 *
 * @apiSuccess {Number} id Id of user
 * @apiSuccess {String} username Username of user
 * @apiSuccess {String} email Email of user
 * @apiSuccess {String} password Password of user
 * @apiSuccess {Number} role_id Role id of user
 * @apiSuccessExample {json} Success-Response:
 *     HTTP/1.1 200 OK
 *     {
 *       "id": 3,
 *       "username": "John",
 *       "email": "john@example.com",
 *       "password": "encrypted",
 *       "role_id": 2
 *     }
 *
 * @apiUse NotFound
 * @apiUse InternalServerError
 */

/**
 * updateUser - update user
 *
 * @api {put} /roles/:idRole/users/:idUser Update user from id
 * @apiName UpdateUser
 * @apiGroup User
 * @apiPermission user
 *
 *
 * @apiParam {String} username New user name
 * @apiParam {String} email New user email
 * @apiParam {String} password New user password
 * @apiParam {Number} [role_id] New userrole_id
 *
 * @apiSuccess {Number} id Id of user
 * @apiSuccess {String} username Username of user
 * @apiSuccess {String} email Email of user
 * @apiSuccess {String} password Password of user
 * @apiSuccess {Number} role_id Role id of user
 * @apiSuccessExample {json} Success-Response:
 *     HTTP/1.1 200 OK
 *     {
 *       "id": 3,
 *       "username": "Johnny",
 *       "email": "johnny@example.com",
 *       "password": "secured",
 *       "role_id": 2
 *     }
 *
 * @apiUse NotFound
 * @apiUse BadRequest
 * @apiUse InternalServerError
 */

/**
 * deleteUser - delete user
 * @apiPermission user
 *
 * @api {delete} /roles/:idRole/users/:idUser Delete user from id
 * @apiName DeleteUser
 * @apiGroup User
 *
 *
 * @apiSuccessExample Success-Response:
 *     HTTP/1.1 204 No Content
 *
 * @apiUse NotFound
 * @apiUse BadRequest
 * @apiUse InternalServerError
 */
