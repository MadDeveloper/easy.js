/*
 * Modules Dependencies
 */
import fs                   from 'fs'
import express              from 'express'
import bodyParser           from 'body-parser'
import morgan               from 'morgan'
import helmet               from 'helmet'
import cors                 from 'cors'
import compression          from 'compression'
import numeral              from 'numeral'
import { indexOf }          from 'lodash'
import minimist             from 'minimist'
import Kernel               from './vendor/easy/core/kernel'
import config               from './config/config'
import bundlesDefinition    from './config/bundlesDefinition'
import routing              from './config/routing'

const argv = minimist( process.argv.slice( 2 ) )

/*
 * Define root app path
 *
 * global.app      = global.app || {}
 * global.app.root = path.resolve( __dirname )
 */

/*
 * API environement
 */
if ( 'p' === argv._[ 0 ] || 'production' === argv._[ 0 ] || 'prod' === argv._[ 0 ] || argv.p || argv.prod || argv.production ) {
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
const cli               = container.getComponent( 'Console' )
const database          = container.getComponent( 'Database' )
const router            = container.getComponent( 'Router' )
const bundleManager     = container.getComponent( 'BundleManager' )
const logFileManager    = container.getComponent( 'LogFileManager' )

/*
 * Define database connector (default: ~/config/database/connector/bookshelf)
 */
database.connect()

/*
 * Init router
 */
router.scope = express.Router()

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
 * Displays everything that happens on the server
 */
if ( 'l' === argv._[ 0 ] || 'log' === argv._[ 0 ] || argv.log ) {
    logFileManager.openLogFileSync( 'traffic' )
    app.use( morgan( ':date - [:method :url] - [:status, :response-time ms, :res[content-length] B] - [HTTP/:http-version, :remote-addr, :user-agent]', { stream: fs.createWriteStream( `${__dirname}/../logs/traffic.log`, { flags: 'a' } ) } ) )
}

/*
 * Register bundles for routing
 */
bundlesDefinition( bundleManager )

/*
 * Loads all the API routes
 */
routing( container, bundleManager, router.scope )

/*
 * Auto call to gc
 */
let warnDisplayed = false

app.use( ( req, res, next ) => {
    if ( global.gc ) {
        global.gc()
    } else if ( false === warnDisplayed ) {
        cli.warn( "You should launch node server with npm start command in order to enable gc.\n" )
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

        cli.info( "---- Memory usage ----" )
        cli.info( `RSS:        ${numeral( memory.rss ).format( 'bytes' )}` )
        cli.info( `Heap total: ${numeral( memory.heapTotal ).format( 'bytes' )}` )
        cli.info( `Heap used:  ${numeral( memory.heapUsed ).format( 'bytes' )}` )
        cli.info( "----------------------" )

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


/*
 * Show routes
 *
    const routesStack = router.scope.stack
    for ( let stack in routesStack ) {
        if ( routesStack.hasOwnProperty( stack ) ) {
            const route = routesStack[ stack ].route
            if ( route ) {
                cli.log( route.path )
            }
        }
    }
 */
