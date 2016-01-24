/*
 * Start server: node app
 */

/*
 * App requirements
 */
var config  = require( __dirname + '/config/config' );
var https   = require( 'https' );
var http    = require( 'http' );
var app     = require( './bootstrap' )( config );
var net     = require( 'net' );
var argv    = require( 'minimist' )( process.argv.slice( 2 ) );

/*
 * By default, easy framework create an HTTPS server
 */
var server      = https.createServer( config.credentials, app );
var port        = config.server.port.https;
var protocol    = config.server.protocol.https;

if ( argv._[ 'http' ] || argv.http ) {
    /*
     * If specified into options, we create an HTTP server
     */
    port        = config.server.port.http;
    server      = http.createServer( app );
    protocol    = config.server.protocol.http;
}

var portInUse = function( port, callback ) {
    var serverTest = net.createServer( function( socket ) {
       socket.write( 'Echo server\r\n' );
	   socket.pipe( socket );
    });

    serverTest.listen( port, '127.0.0.1' );
        serverTest.on( 'error', function ( error ) {
        callback( true );
    });
    serverTest.on( 'listening', function ( e ) {
        serverTest.close();
        callback( false );
    });
};

portInUse( port, function( returnValue ) {
    if ( !returnValue ) {
        /*
         * Everything is ok, starting server
         */
        server.listen( port, function() {
            // Todo: write it with easy/Message
            console.log( "\n" );
            console.log( "-----------------------------" );
            console.log( "    Server listening..." );
            console.log( "-----------------------------" );
            console.log( "    " + protocol + '://' + config.server.domain + ':' + port );
            console.log( "-----------------------------" );
            console.log( "    Mode:   " + app.get( 'env' ) );
            console.log( "-----------------------------" );
        });
    } else {
        /*
         * Port ${port} is used
         */
        console.log( "\nPort " + port + " is already used, impossible to start server." );
        process.exit();
    }
});
