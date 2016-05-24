/*
 * Modules Dependencies
 */
import express              from 'express'
import bodyParser           from 'body-parser'
import morgan               from 'morgan'
import helmet               from 'helmet'
import cors                 from 'cors'
import compression          from 'compression'
import numeral              from 'numeral'
import { indexOf }          from 'lodash'
import path                 from 'path'
import minimist             from 'minimist'
import Kernel               from './vendor/easy/core/kernel'
import config               from './config/config'
import bundlesDefinition    from './config/bundlesDefinition'
import routing              from './config/routing'

const argv =  minimist( process.argv.slice( 2 ) )

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
const kernel    = new Kernel().init( __dirname, config )
const container = kernel.container
const message   = container.getComponent( 'Message' )
const database  = container.getComponent( 'Database' )

/*
 * Define database connector (default: ~/config/database/connector/bookshelf)
 */
database.connect()

/*
 * Define bundle easy vendor
 */
const bundleManager     = container.getComponent( 'BundleManager' )
bundleManager.router    = express.Router()

/*
 * Defines Polyfills
 */
const polyfills = container.getComponent( 'Polyfills' )

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
app.use(( req, res, next ) => {
    const method  = req.method.toLowerCase()
    const enableMethods = [ 'patch' ]
    let data    = ''

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
 * when dev mode is used
 */
if ( process.env.NODE_ENV === 'development' ) {
    app.use( morgan( 'dev' ) )
}

/*
 * Register bundles for routing
 */
bundlesDefinition( bundleManager )

/*
 * Loads all the API routes
 */
routing( bundleManager )

/*
 * Auto call to gc
 */
let warnDisplayed = false

app.use(( req, res, next ) => {
    if ( global.gc ) {
        global.gc()
    } else if ( false === warnDisplayed ) {
        message.warn( "You should launch node server with npm start command in order to enable gc." )
        console.log( '\n' )
        warnDisplayed = true
    }

    next()
})

/*
 * See memory usage if specified
 */
if ( argv.memory ) {
    app.use(( req, res, next ) => {
        let memory = process.memoryUsage()

        message.info( "---- Memory usage ----" )
        message.info( "RSS:        " + numeral( memory.rss ).format( 'bytes' ) )
        message.info( "Heap total: " + numeral( memory.heapTotal ).format( 'bytes' ) )
        message.info( "Heap used:  " + numeral( memory.heapUsed ).format( 'bytes' ) )
        message.info( "----------------------" )

        next()
    })
}

/*
 * Registration router routes
 */
app.use( '/', bundleManager.router )

/*
 * Returns the application elements configured
 */
export { app, kernel, bundleManager, config }
