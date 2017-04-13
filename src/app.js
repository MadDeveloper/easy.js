require( 'use-strict' )

const { Application } = require( 'easy/core' )
const role = require( './bundles/role' )
const user = require( './bundles/user' )
const application = new Application()

application.configure({ srcPath: './' })

module.exports = { application }
