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
const portfinder = require( 'portfinder' )
const Console = require( './Console' )
const Table = require( 'cli-table' )

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
    async start() {
        try {
            this.startHttpServer()

            const canBeStarted = await this.canBeStarted()

            if ( canBeStarted ) {
                await this.canStart()
            } else {
                throw new Error( 'Serveur cannot be started' )
            }
        } catch ( error ) {
            this.failedToStart( error )
        }
    }

    /**
     * startHttpServer - start correct http server (HTTP or HTTPS if credentials are found and tls is requested)
     */
    startHttpServer() {
        if ( 'https' === this.protocol && this.application.config.credentials.key && this.application.config.credentials.cert ) {
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
                    resolve( false )
                } else {
                    resolve( true )
                }
            })
        })
    }

    /**
     * canStart - server can be started safely
     *
     * @private
     */
    async canStart() {
        /*
         * Everything is ok, starting server and application
         */
        const padLength = 20

        await this.application.start()

        this.state = state.started
        this.server.listen( this.port, () => this.displayStartedInformations() )
    }

    displayStartedInformations() {
        Console.line()

        const table = new Table()
        table.push(
            [ 'Address', `${this.protocol}://${this.application.config.server.domain}${[ 80, 443 ].includes( this.port ) ? '' : `:${this.port}`}` ],
            [ 'Environment', `${this.application.app.get( 'env' ).capitalizeFirstLetter()}` ]
        )

        Console.info( table )
        Console.line()
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
