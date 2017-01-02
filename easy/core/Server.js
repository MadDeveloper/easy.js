const https     = require( 'https' )
const http      = require( 'http' )
const net       = require( 'net' )
const pad       = require( 'pad-right' )
const Console   = require( 'easy/core/Console' )

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
        let server      = null
        const port      = this.application.config.server.port
        const protocol  = this.application.config.server.protocol

        if ( 'https' === protocol && false !== this.application.config.credentials.found ) {
            /*
             * If specified or if https credentials are found (keys and cert), an HTTPS server is started
             */
            server = https.createServer( config.credentials, this.application.app )
        } else {
            /*
             * Default, we create an HTTP server
             */
            server = http.createServer( this.application.app )
        }

        let canStartServer = port => {
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

        canStartServer( port )
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
                    exit: 1
                })
            })
    }
}

module.exports = Server
