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
const { padEnd } = require( 'lodash' )
const portfinder = require( 'portfinder' )
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
        this.startHttpServer();

        ( async () => {
            try {
                const canStart = await this.canBeStarted()

                this.canStart()
            } catch ( error ) {
                this.failedToStart( error )
            }
        })()
    }

    /**
     * startHttpServer - start correct http server (HTTP or HTTPS if credentials are found and tls is requested)
     */
    startHttpServer() {
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
    }

    /**
     * canBeStarted - check if a server can be started on specified port
     *
     * @returns {Promise}
     */
    canBeStarted() {
        return new Promise( ( resolve, reject ) => {
            const options = {
                host: '127.0.0.1',
                port: 'string' === typeof this.port && 'random' === this.port.toLowerCase() ? undefined : parseInt( this.port, 10 )
            }

            portfinder.getPort( options, ( error, port ) => {
                this.port = port

                if ( error ) {
                    reject( error )
                } else {
                    resolve( true )
                }
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
            Console.info( `${padEnd( 'State', padRightLength, '.' )}${this.state}` )
            Console.info( `${padEnd( 'Address', padRightLength, '.' )}${this.protocol}://${this.application.config.server.domain}${( 80 !== this.port && 443 !== this.port ) ? `:${this.port}` : ''}` )
            Console.info( `${padEnd( 'Environment', padRightLength, '.' )}${this.application.app.get( 'env' ).capitalizeFirstLetter()}` )
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
            message: `${( 'code' in error ) ? `Error code: ${error.code}\n` : ''}${error.toString()}`,
            exit: 1
        })
    }
}

module.exports = Server
