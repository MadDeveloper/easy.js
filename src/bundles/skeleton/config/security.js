import { roles } from '~/config/roles'

export const security {
	'/skeletons': {
		mustBe: [ roles.any ],
		canCreate: [],
		canRead: [],
		canUpdate: [],
		canDelete: []
	}
}
