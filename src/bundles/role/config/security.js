import { roles } from '~/config/roles'

export const security = {
	'/roles': {
		mustBe: [ roles.any ],
		canCreate: [ roles.admin ],
		canRead: [],
		canUpdate: [ roles.admin ],
		canDelete: [ roles.admin ]
	}
}
