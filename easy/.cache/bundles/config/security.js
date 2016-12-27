const roles = require( 'src/config/roles' )

module.exports = {
	'/skeletons': {
		mustBe: [ roles.any ],
		canCreate: [],
		canRead: [],
		canUpdate: [],
		canDelete: []
	}
}
