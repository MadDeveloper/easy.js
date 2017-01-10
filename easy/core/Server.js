/*
* This file is part of the easy framework.
*
* (c) Julien Sergent <sergent.julien@icloud.com>
*
* For the full copyright and license information, please view the LICENSE
* file that was distributed with this source code.
*/

const https = require( 'https' )
const http = require( 'http' )
const net = require( 'net' )
const pad = require( 'pad-right' )
const Console = require( './Console' )

const state = {
    stopped: 'Stopped',
    started: 'Started'
}

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
        this.port = this.application.config.server.port
        this.protocol = this.application.config.server.protocol
        this.server = null
        this.state = state.stopped
    }

    /**
     * start - start server
     */
    start() {
        Console.log( 'Starting server...' )

        if ( 'https' === this.protocol && false !== this.application.config.credentials.found ) {
            /*
             * If specified or if https credentials are found (keys and cert), an HTTPS server is started
             */
            this.server = https.createServer( this.application.config.credentials, this.application.app )
        } else {
            /*
             * Default, we create an HTTP server
             */
            this.server = http.createServer( this.application.app )
        }


        this.canBeStarted()
            .then( () => this.canStart() )
            .catch( error => this.failedToStart( error ) )
    }

    /**
     * canBeStarted - check if a server can be started on specified port
     *
     * @returns {Promise}
     */
    canBeStarted() {
        return new Promise( ( resolve, reject ) => {
            const serverTest = net.createServer( socket => {
                socket.write( 'Echo server\r\n' )
                socket.pipe( socket )
            })

            serverTest.listen( this.port, '127.0.0.1' )
            serverTest.on( 'error', error => {
                reject( error )
            })
            serverTest.on( 'listening', () => {
                serverTest.close()
                resolve()
            })
        })
    }

    /**
     * canStart - server can be started safely
     */
    canStart() {
        /*
         * Everything is ok, starting server and application
         */
        const padRightLength = 30

        this.application.start()
        this.state = state.started
        this.server.listen( this.port, () => {
            Console.line()
            Console.info( `${pad( 'State', padRightLength, '.' )}${this.state}` )
            Console.info( `${pad( 'Address', padRightLength, '.' )}${this.protocol}://${this.application.config.server.domain}${( 80 !== this.port && 443 !== this.port ) ? `:${this.port}` : ''}` )
            Console.info( `${pad( 'Environment', padRightLength, '.' )}${this.application.app.get( 'env' ).capitalizeFirstLetter()}` )
            Console.line()
        })
    }

    /**
     * failedToStart - cannot start server, display the error
     *
     * @param {object} error
     */
    failedToStart( error ) {
        Console.error({
            title: 'Impossible to start server',
            message: `${error.hasOwnProperty( 'code' ) ? `Error code: ${error.code}\n` : ''}${error.toString()}`,
            exit: 1
        })
    }
}

module.exports = Server
