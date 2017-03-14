/*
module.exports = {
    userExists: {
        param: 'user_id',
        controller: 'user:userExists'
    }
}
*/

const { Middleware } = require( 'easy/middleware' )

Middleware.register( 'user-exists', 'UserController.exists' )
