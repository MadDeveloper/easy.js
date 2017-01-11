require( 'use-strict' )

/*
 * Permit to require from application root path
 */
const appModulePath = require( 'app-module-path' )
const appRootPath = `${__dirname}/../`

appModulePath.addPath( appRootPath )

/*
 * Import and configure main Easy classes
 */
const { Kernel, Application } = require( 'easy/core' )

const kernel = new Kernel()
kernel.init( appRootPath )

const application = new Application( kernel )
application.configure()

module.exports = { kernel, application }
