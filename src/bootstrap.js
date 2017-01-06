const appRootPath = `${__dirname}/../`

require( 'app-module-path' ).addPath( appRootPath )

const Kernel = require( 'easy/core/Kernel' )
const Application = require( 'easy/core/Application' )

/*
 * Easy.js minimal configurations
 */
const kernel = new Kernel()
kernel.init( appRootPath )

const application = new Application( kernel )
application.configure()

module.exports = { kernel, application }
