import fs               from 'fs'
import express          from 'express'
import bodyParser       from 'body-parser'
import morgan           from 'morgan'
import helmet           from 'helmet'
import cors             from 'cors'
import compression      from 'compression'
import numeral          from 'numeral'
import { indexOf }      from 'lodash'
import minimist         from 'minimist'
import passport         from 'passport'
import Kernel           from './vendor/easy/core/Kernel'
import Console          from './vendor/easy/core/Console'
import Polyfills        from './vendor/easy/core/Polyfills'
import config           from './config/config'
import bundlesEnabled   from './config/bundles/enabled'

const argv = minimist( process.argv.slice( 2 ) )

/*
 * First, load all polyfills
 */
Polyfills.load()

/*
 * Create easy namespace
 */
global.easy = {
    passport
}

/*
 * We force cwd to be the directory where bootstrap.js is running, usefull for Unix os
 */
process.chdir( __dirname )

/*
 * API environement
 */
if ( config.app.production ) {
    process.env.NODE_ENV = 'production'
} else {
    process.env.NODE_ENV = 'development'
}

const app = express()

/*
 * Easy.js dependencies
 */
const kernel            = new Kernel().init( __dirname, config )
const container         = kernel.container
const database          = container.getComponent( 'Database' )
const router            = container.getComponent( 'Router' )
const bundleManager     = container.getComponent( 'BundleManager' )
const logFileManager    = container.getComponent( 'LogFileManager' )

/*
 * Expose as global the container
 */
global.easy.container = container

/*
 * Define database connector (default: ~/config/database/connectors/bookshelf)
 */
database.connect()

/*
 * Init router
 */
router.scope = express.Router()

/*
 * Load all bundles enabled
 */
bundleManager.loadBundlesEnabled()

/*
 * Will permit to retrieve remote ip: req.ip || req.connection.remoteAddress || req.headers['x-forwarded-for']
 */
app.enable( 'trust proxy' )

/*
 * Enable CORS: https://www.w3.org/TR/cors/
 */
app.use( cors() )

 /*
  * Just a collection of nine smaller middleware functions that set security-related HTTP headers
  */
app.use( helmet() )

/*
 * Gzip compression (can greatly decrease the size of the response body)
 */
app.use( compression() )

/*
 * body-parser middleware for handling request variables
 */
app.use( bodyParser.json() ) // support json encoded bodies
app.use( bodyParser.urlencoded({ extended: true }) ) // support encoded bodies

/*
 * Permit to retrieve rawBody into PATCH method
 */
app.use( ( req, res, next ) => {
    const method        = req.method.toLowerCase()
    const enableMethods = [ 'patch' ]

    let data = ''

    if ( indexOf( enableMethods, method ) < 0 ) {
        return next()
    }

    req.setEncoding( 'utf8' )

    req.on( 'data', chunk => {
        data += chunk
    })

    req.on( 'end', () => {
        req.rawBody = data
        next()
    })
})

/*
 * Trace everything that happens on the server
 */
if ( config.app.log ) {
    logFileManager.openLogFileSync( 'traffic' )
    app.use( morgan( ':date - [:method :url] - [:status, :response-time ms, :res[content-length] B] - [HTTP/:http-version, :remote-addr, :user-agent]', { stream: fs.createWriteStream( `${__dirname}/../logs/traffic.log`, { flags: 'a' } ) } ) )
}

/*
 * Loads all the app routes
 */
router.init( bundleManager )

/*
 * Initialize Passport
 */
app.use( passport.initialize() )


/*
 * Auto call to gc
 */
let warnDisplayed = false

app.use( ( req, res, next ) => {
    if ( global.gc ) {
        global.gc()
    } else if ( false === warnDisplayed ) {
        Console.warn( "You should launch node server with npm start command in order to enable gc.\n" )
        warnDisplayed = true
    }

    next()
})

/*
 * See memory usage if specified
 */
if ( argv.memory ) {
    app.use( ( req, res, next ) => {
        const memory = process.memoryUsage()

        Console.info( "---- Memory usage ----" )
        Console.info( `RSS:        ${numeral( memory.rss ).format( 'bytes' )}` )
        Console.info( `Heap total: ${numeral( memory.heapTotal ).format( 'bytes' )}` )
        Console.info( `Heap used:  ${numeral( memory.heapUsed ).format( 'bytes' )}` )
        Console.info( "----------------------" )

        next()
    })
}

/*
 * Registration router routes
 */
app.use( '/', router.scope )

/*
 * Returns the application elements configured
 */
export { app, kernel, bundleManager, config, container }
