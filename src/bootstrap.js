require( 'use-strict' )

/*
 * Permit to require from application root path
 */
const appModulePath = require( 'app-module-path' )
const appRootPath = `${__dirname}/../`

appModulePath.addPath( appRootPath )

/*
 * Import and configure main Easy class
 */
const { Application } = require( 'easy/core' )

const application = new Application()
application.configure( appRootPath )

module.exports = { kernel: application.kernel, application }
