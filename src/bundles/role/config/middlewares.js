module.exports = {
    roleExists: {
        param: 'role_id',
        controller: 'role:roleExists'
    }
}

/*
const { Middleware } = require( 'easy/middleware' )

Middleware.register( 'role-exists', 'RoleController.exists' )
*/
