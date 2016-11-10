const roles = require( 'config/roles' )

module.exports = {
	'/skeletons': {
		mustBe: [ roles.any ],
		canCreate: [],
		canRead: [],
		canUpdate: [],
		canDelete: []
	}
}
