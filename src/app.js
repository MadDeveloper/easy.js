/*
 * Start server: npm start
 */

/*
 * App requirements
 */
import config   from './config/config'
import https    from 'https'
import http     from 'http'
import net      from 'net'
import minimist from 'minimist'
import App      from './bootstrap'

const argv      = minimist( process.argv.slice( 2 ) )
let server      = null
let port        = 0
let protocol    = ''
let app         = new App( config )

if ( argv._[ 'http' ] || argv.http || false === config.credentials.found ) {
    /*
     * If specified into options or if https credentials are not found (keys and cert), we create an HTTP server
     */
    port        = config.server.port.http
    server      = http.createServer( app )
    protocol    = config.server.protocol.http
} else {
    /*
     * By default, easy framework create an HTTPS server or if https credentials are not found (keys and cert)
     */
    server      = https.createServer( config.credentials, app )
    port        = config.server.port.https
    protocol    = config.server.protocol.https
}

let portInUse = ( port, callback ) => {
    const serverTest = net.createServer( socket => {
       socket.write( 'Echo server\r\n' )
	   socket.pipe( socket )
    })

    serverTest.listen( port, '127.0.0.1' )
        serverTest.on( 'error', error => {
        callback( true )
    })
    serverTest.on( 'listening', e => {
        serverTest.close()
        callback( false )
    })
}

portInUse( port, used => {
    if ( !used ) {
        /*
         * Everything is ok, starting server
         */
        server.listen( port, () => {
            // Todo: write it with easy/Message
            console.log( "\n" )
            console.log( "-----------------------------" )
            console.log( "    Server listening..." )
            console.log( "-----------------------------" )
            console.log( "    " + protocol + '://' + config.server.domain + ':' + port )
            console.log( "-----------------------------" )
            console.log( "    Mode:   " + app.get( 'env' ) )
            console.log( "-----------------------------" )
        })
    } else {
        /*
         * Port ${port} is used
         */
        console.log( "\nPort " + port + " is already used or you have no rights to launch server (try as root), impossible to start server." )
        process.exit()
    }
})
