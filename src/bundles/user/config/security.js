import { roles } from '~/config/roles'

export const security = {
	'/roles/:role_id/users': {
		mustBe: [ roles.any ],
		canCreate: [ roles.user ],
		canRead: [],
		canUpdate: [ roles.user ],
		canDelete: [ roles.user ]
	}
}
