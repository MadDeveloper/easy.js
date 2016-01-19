/*
 * Start server: node app
 */

/*
 * App requirements
 */
var config  = require( __dirname + '/config/config' );
var https   = require( 'https' );
var app     = require( './bootstrap' )( config );

/*
 * Creating HTTPS server
 */
https.createServer( config.credentials, app )
    .listen( config.server.port, function() {
        // Todo: write it with easy/Message
        console.log( "\n" );
        console.log( "-----------------------------" );
        console.log( "    Server listening..." );
        console.log( "-----------------------------" );
        console.log( "    " + config.server.protocol + '://' + config.server.domain + ':' + config.server.port );
        console.log( "-----------------------------" );
        console.log( "    Mode:   " + app.get( 'env' ) );
        console.log( "-----------------------------" );
    });
