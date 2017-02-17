const roles = require( 'src/config/roles' )

module.exports = {
	'/roles/:role_id/users': {
		mustBe: [ roles.any ],
		canCreate: [ roles.admin ],
		canRead: [],
		canUpdate: [ roles.admin ],
		canDelete: [ roles.admin ]
	}
}
