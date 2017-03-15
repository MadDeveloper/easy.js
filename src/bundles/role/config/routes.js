const roles = require( '../../../config/roles' )
const { Route } = require( 'easy/routing' )

Route
	.get( '/roles', 'RoleController.all' )
	.security({
		strategy: 'default',
		roles: [ roles.any ]
	})

Route
	.post( '/roles', 'RoleController.create' )
	.security({
		strategy: 'default',
		roles: [ roles.admin ]
	})

Route
	.get( '/roles/:role_id', 'RoleController.one' )
	.security({
		strategy: 'default',
		roles: [ roles.any ]
	})
	.middleware( 'role-exists', { deep: true })

Route
	.put( '/roles/:role_id', 'RoleController.update' )
	.security({
		strategy: 'default',
		roles: [ roles.admin ]
	})
	.middleware( 'role-exists', { deep: true })

Route
	.delete( '/roles/:role_id', 'RoleController.delete' )
	.security({
		strategy: 'default',
		roles: [ roles.admin ]
	})
	.middleware( 'role-exists', { deep: true })
/*
Route
	.group( 'change-role', () => {

	})
	.middleware( 'role-exists' )
*/
