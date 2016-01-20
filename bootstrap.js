var _ = require( 'lodash' );

function bootstrap( config, cliMode ) {
    /*
     * API environement
     */
    var argv = require( 'minimist' )( process.argv.slice( 2 ) );
    if ( 'p' === argv._[ 0 ] || 'production' === argv._[ 0 ] || 'prod' === argv._[ 0 ] || argv.p || argv.prod || argv.production ) {
        process.env.NODE_ENV = 'production';
    } else {
        process.env.NODE_ENV = 'development';
    }

    /*
     * Node modules dependencies
     */
    var express         = require( 'express' );
    var app             = express();
    var bodyParser      = require( 'body-parser' );
    var morgan          = require( 'morgan' );
    var helmet          = require( 'helmet' );
    var cors            = require( 'cors' );
    var compression     = require( 'compression' );
    var numeral         = require( 'numeral' );

    /*
     * Easy.js dependencies
     */
    var Kernel          = require( __dirname + '/vendor/easy/Kernel' )().init( __dirname, config );
    var Message         = Kernel.load( 'Message' )();
    var Database        = Kernel.load( 'Database/Connector' )( Kernel );

    /*
     * Define database connector (default: /config/database/orm)
     */
    Database.connect();

    /*
     * Define bundle easy vendor
     */
    var BundleManager   = Kernel.load( 'BundleManager' )( Kernel, Database, express.Router() );

    /*
     * Defines Polyfills
     */
    Kernel.load( 'Polyfills' );

    if ( !cliMode ) {
        /*
         * In normal mode we define middlewares, routes and bundles into app
         */

        /*
         * Will permit to retrieve remote ip: req.ip || req.connection.remoteAddress || req.headers['x-forwarded-for']
         */
        app.enable( 'trust proxy' );

        /*
         * Enable CORS: https://www.w3.org/TR/cors/
         */
        app.use( cors() );

         /*
          * Just a collection of nine smaller middleware functions that set security-related HTTP headers
          */
        app.use( helmet() );

        /*
         * Gzip compression (can greatly decrease the size of the response body)
         */
        app.use( compression() );

        /*
         * body-parser middleware for handling request variables
         */
        app.use( bodyParser.json() ); // support json encoded bodies
        app.use( bodyParser.urlencoded({ extended: true }) ); // support encoded bodies

        /*
         * Permit to retrieve rawBody into PATCH method
         */
        app.use( function( req, res, next ) {
            var method  = req.method.toLowerCase();
            var data    = '';
            var enableMethods = [ 'patch' ];

            if ( _.indexOf( enableMethods, method ) < 0 ) {
                return next();
            }

            req.setEncoding( 'utf8' );

            req.on( 'data', function( chunk ) {
                data += chunk;
            });

            req.on( 'end', function() {
                req.rawBody = data;
                next();
            });
        });

        /*
         * Displays everything that happens on the server
         */
        app.use( morgan( 'dev' ) );

        /*
         * Register bundles for routing
         */
        require( __dirname + '/config/bundlesRegistered' )( BundleManager );

        /*
         * Loads all the API routes
         */
        require( __dirname + '/config/routing' )( BundleManager );

        /*
         * Auto call to gc
         */
        var warnDisplayed = false;
        app.use( function( req, res, next ) {
            if ( global.gc ) {
                global.gc();
            } else if ( false === warnDisplayed ) {
                Message.warn( "You should launch node server with --expose-gc option." );
                console.log( '\n' );
                warnDisplayed = true;
            }
            next();
        });

        /*
         * See memory usage if specified
         */
        if ( argv.memory ) {
            app.use( function( req, res, next ) {
                var memory = process.memoryUsage();

                Message.info( "---- Memory usage ----" );
                Message.info( "RSS:        " + numeral( memory.rss ).format( 'bytes' ) );
                Message.info( "Heap total: " + numeral( memory.heapTotal ).format( 'bytes' ) );
                Message.info( "Heap used:  " + numeral( memory.heapUsed ).format( 'bytes' ) );
                Message.info( "----------------------" );

                next();
            });
        }

        /*
         * Registration router routes
         */
        app.use( '/', BundleManager.getRouter() );

        /*
         * Returns app
         */
        return app;
    } else {
        /*
         * Returns Kernel and BundlesManager into cliMode
         */
        return {
            Kernel: Kernel,
            BundleManager: BundleManager,
            app: app
        };
    }
}

module.exports = bootstrap;
