require( 'app-module-path' ).addPath( `${__dirname}/../` )

const Kernel        = require( 'easy/core/Kernel' )
const Application   = require( 'easy/core/Application' )

/*
 * We force cwd to be the directory where bootstrap.js is running, usefull for Unix os
 */
process.chdir( __dirname )

/*
 * Easy.js minimal configurations
 */
const kernel = new Kernel()
kernel.init( __dirname )

const application = new Application( kernel )
application.configure()

module.exports = { kernel, application }
