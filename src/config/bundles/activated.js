const role = require( '../../bundles/role' )
const user = require( '../../bundles/user' )

module.exports = application => {
	application
		.use(role)
		.use(user)
}
