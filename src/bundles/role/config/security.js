const roles = require( 'src/config/roles' )

module.exports = {
	'/roles': {
		mustBe: [ roles.any ],
		canCreate: [ roles.admin ],
		canRead: [],
		canUpdate: [ roles.admin ],
		canDelete: [ roles.admin ]
	}
}
