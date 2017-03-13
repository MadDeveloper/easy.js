const roles = require( '../../../config/roles' )
const { Route } = require( 'easy/routing' )

/*
Route
	.get( '/roles', 'RoleController.all'})
	.security({
		strategy: 'default',
		roles: [ roles.any ]
	})

Route
	.post( '/roles', 'RoleController.create'})
	.security({
		strategy: 'default',
		roles: [ roles.admin ]
	})

Route
	.group( 'change-role', () => {
		Route
			.get( '/roles/:role_id', 'RoleController.one'})
			.security({
				strategy: 'default',
				roles: [ roles.any ]
			})
		Route
			.put( '/roles/:role_id', 'RoleController.update'})
			.security({
				strategy: 'default',
				roles: [ roles.admin ]
			})
		Route
			.delete( '/roles/:role_id', 'RoleController.delete'})
			.security({
				strategy: 'default',
				roles: [ roles.admin ]
			})
	})
	.middleware( 'role-exists' )

*/
module.exports = {
    '/roles': {
        get: {
            controller: 'role:getRoles',
            security: {
                strategy: 'default',
                roles: [ roles.any ]
            }
        },
        post: {
            controller: 'role:createRole',
            security: {
                strategy: 'default',
                roles: [ roles.admin ]
            }
        }
    },

    '/roles/:role_id': {
        get: {
            controller: 'role:getRole',
            security: {
                strategy: 'default',
                roles: [ roles.any ]
            }
        },
        put: {
            controller: 'role:updateRole',
            security: {
                strategy: 'default',
                roles: [ roles.admin ]
            }
        },
        delete: {
            controller: 'role:deleteRole',
            security: {
                strategy: 'default',
                roles: [ roles.admin ]
            }
        },
        // middlewares
    }
}
