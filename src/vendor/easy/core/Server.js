const https     = require( 'https' )
const http      = require( 'http' )
const net       = require( 'net' )
const pad       = require( 'pad-right' )
const Console   = require( 'vendor/easy/core/Console' )

/**
 * @class Server
 */
class Server {
    /**
     * constructor
     *
     * @param  {Application} application
     */
    constructor( application ) {
        this.application = application
    }

    /**
     * start - start server
     */
    start() {
        let server  = null
        let port    = 0

        const protocol = this.application.config.server.protocol

        if ( 'https' === protocol && false !== this.application.config.credentials.found ) {
            /*
             * Start HTTPS server
             */
            port        = this.application.config.server.port.https
            server      = https.createServer( config.credentials, this.application.app )
        } else {
            /*
             * If specified or if https credentials are not found (keys and cert), we create an HTTP server
             */
            port        = this.application.config.server.port.http
            server      = http.createServer( this.application.app )
        }

        let freePort = port => {
            return new Promise( ( resolve, reject ) => {
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
                 * Everything is ok, starting server and application
                 */
                this.application.start()

                server.listen( port, () => {
                    Console.line()
                    Console.info( "-----------------------------" )
                    Console.info( `    ${pad( 'State:', 'Environment'.length + 1, ' ')} Listening` )
                    Console.info( "-----------------------------" )
                    Console.info( `    ${pad( 'Address:', 'Environment'.length + 1, ' ')} ${protocol}://${this.application.config.server.domain}${( 80 !== port && 443 !== port ) ? port : ''}` )
                    Console.info( "-----------------------------" )
                    Console.info( `    Environment: ${this.application.app.get( 'env' ).capitalizeFirstLetter()}` )
                    Console.info( "-----------------------------" )
                    Console.line()
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
    }
}

module.exports = Server
