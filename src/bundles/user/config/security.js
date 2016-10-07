import roles from '~/config/roles'

export default {
	'/roles/:role_id/users': {
		mustBe: [ roles.any ],
		canCreate: [ roles.user ],
		canRead: [],
		canUpdate: [ roles.user ],
		canDelete: [ roles.user ]
	}
}
