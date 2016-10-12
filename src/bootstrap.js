import Kernel      from './vendor/easy/core/Kernel'
import Application from './vendor/easy/core/Application'

/*
 * We force cwd to be the directory where bootstrap.js is running, usefull for Unix os
 */
process.chdir( __dirname )

/*
 * Easy.js dependencies
 */
const kernel      = new Kernel().init( process.cwd() )
const application = new Application( kernel )

application.configure()
application.start()

/*
 * Returns the application elements configured
 */
export { kernel, application }
