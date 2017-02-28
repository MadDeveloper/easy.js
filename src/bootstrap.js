require( 'use-strict' )

/*
 * Import and configure main Easy class
 */
const { Application } = require( 'easy/core' )
const appRootPath = `${__dirname}/../`
const application = new Application()

application.configure( appRootPath )

module.exports = { application }
