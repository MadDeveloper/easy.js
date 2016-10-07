import roles from '~/config/roles'

export default {
	'/skeletons': {
		mustBe: [ roles.any ],
		canCreate: [],
		canRead: [],
		canUpdate: [],
		canDelete: []
	}
}
