import https                        from 'https'
import http                         from 'http'
import net                          from 'net'
import minimist                     from 'minimist'
import { app, config, container }   from './bootstrap'
import Console                      from './vendor/easy/core/Console'

const argv = minimist( process.argv.slice( 2 ) )

let server      = null
let port        = 0
let protocol    = ''

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
        Console.info( `    ${protocol}://${config.server.domain}:${port}` )
        Console.info( "-----------------------------" )
        Console.info( `    Mode:   ${app.get( 'env' )}` )
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
