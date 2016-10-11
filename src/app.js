import https            from 'https'
import http             from 'http'
import net              from 'net'
import { application }  from './bootstrap'
import Console          from './vendor/easy/core/Console'

let server  = null
let port    = 0

const protocol = application.config.app.protocol

if ( 'https' === protocol && false !== application.config.credentials.found ) {
    /*
     * Start HTTPS server
     */
    port        = application.config.server.port.https
    server      = https.createServer( config.credentials, application.app )
} else {
    /*
     * If specified or if https credentials are not found (keys and cert), we create an HTTP server
     */
    port        = application.config.server.port.http
    server      = http.createServer( application.app )
}

let freePort = ( port ) => {
    return new Promise( (resolve, reject) => {
        const serverTest = net.createServer( socket => {
            socket.write( 'Echo server\r\n' )
            socket.pipe( socket )
        })

        serverTest.listen( port, '127.0.0.1' )

        serverTest.on( 'error', error => {
            reject( error )
        })

        serverTest.on( 'listening', () => {
            serverTest.close()
            resolve()
        })
    })
}

freePort( port )
    .then( () => {
        /*
         * Everything is ok, starting server
         */
        server.listen( port, () => {
            Console.info( "-----------------------------" )
            Console.info( "    Server listening..." )
            Console.info( "-----------------------------" )
            Console.info( `    ${protocol}://${application.config.server.domain}:${port}` )
            Console.info( "-----------------------------" )
            Console.info( `    Mode:   ${application.app.get( 'env' )}` )
            Console.info( "-----------------------------" )
        })
    })
    .catch( () => {
        /*
         * Port ${port} is used
         */
        Console.error({
            title: 'Impossible to start server',
            message: `Port ${port} is already used or you have no rights to launch server (try as root)`,
            exit: 0
        })
    })
