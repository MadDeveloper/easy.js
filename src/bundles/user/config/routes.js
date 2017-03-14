const roles = require( '../../../config/roles' )
const { Route } = require( 'easy/routing' )

Route
	.get( '/roles/:role_id/users', 'UserController.all' )
	.security({
		strategy: 'default',
		roles: [ roles.any ]
	})

Route
	.post( '/roles/:role_id/users', 'UserController.create' )
	.security({
		strategy: 'default',
		roles: [ roles.user ]
	})

Route
	.get( '/roles/:role_id/users/:user_id', 'UserController.one' )
	.security({
		strategy: 'default',
		roles: [ roles.any ]
	})
	.middleware( 'user-exists' )

Route
	.put( '/roles/:role_id/users/:user_id', 'UserController.update' )
	.security({
		strategy: 'default',
		roles: [ roles.user ]
	})
	.middleware( 'user-exists' )

Route
	.patch( '/roles/:role_id/users/:user_id', 'UserController.patch' )
	.security({
		strategy: 'default',
		roles: [ roles.user ]
	})
	.middleware( 'user-exists' )

Route
	.delete( '/roles/:role_id/users/:user_id', 'UserController.delete' )
	.security({
		strategy: 'default',
		roles: [ roles.user ]
	})
	.middleware( 'role-exists' )
/*
const middlewares = require( './middlewares' )

module.exports = {
    '/roles/:role_id/users': {
        get: {
            controller: 'user:getUsers',
            security: {
                strategy: 'default',
                roles: [ roles.any ]
            }
        },
        post: {
            controller: 'user:createUser',
            security: {
                strategy: 'default',
                roles: [ roles.admin ]
            }
        }
    },

    '/roles/:role_id/users/:user_id': {
        get: {
            controller: 'user:getUser',
            security: {
                strategy: 'default',
                roles: [ roles.any ]
            }
        },
        put: {
            controller: 'user:updateUser',
            security: {
                strategy: 'default',
                roles: [ roles.user ]
            }
        },
        patch: {
            controller: 'user:patchUser',
            security: {
                strategy: 'default',
                roles: [ roles.user ]
            }
        },
        delete: {
            controller: 'user:deleteUser',
            security: {
                strategy: 'default',
                roles: [ roles.admin ]
            }
        },
        middlewares
    }
}
*/
