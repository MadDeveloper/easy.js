const roles = require( 'src/config/roles' )

module.exports = {
	'/roles/:role_id/users': {
		mustBe: [ roles.any ],
		canCreate: [ roles.user ],
		canRead: [],
		canUpdate: [ roles.user ],
		canDelete: [ roles.user ]
	}
}
