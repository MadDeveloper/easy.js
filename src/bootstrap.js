require( 'app-module-path' ).addPath( `${__dirname}/../` )

const Kernel        = require( 'vendor/easy/core/Kernel' )
const Application   = require( 'vendor/easy/core/Application' )

/*
 * We force cwd to be the directory where bootstrap.js is running, usefull for Unix os
 */
process.chdir( __dirname )

/*
 * Easy.js dependencies
 */
const kernel      = new Kernel().init()
const application = new Application( kernel )

application.configure()


/*
 * Returns the application elements configured
 */
module.exports = { kernel, application }
