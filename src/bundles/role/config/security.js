import roles from '~/config/roles'

export default {
	'/roles': {
		mustBe: [ roles.any ],
		canCreate: [ roles.admin ],
		canRead: [],
		canUpdate: [ roles.admin ],
		canDelete: [ roles.admin ]
	}
}
