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
const Table = require( 'cli-table2' )
const { upperFirst } = require( 'lodash' )
const state = {
    stopped: 'Stopped',
    started: 'Started'
}

/**
 * @class Server
 */
class Server {
    /**
     * @constructor
     * @param {Application} application
     */
    constructor( application ) {
        this._application = application
        this._port = this.application.config.server.port
        this._protocol = this.application.config.server.protocol
        this._server = null
        this._state = state.stopped
    }

    /**
     * Start server
     */
    async start() {
        try {
            this._startHttpServer()

            const canBeStarted = await this._canBeStarted()

            if ( canBeStarted ) {
                await this._canStart()
            } else {
                throw new Error( 'Server cannot be started' )
            }
        } catch ( error ) {
            Console.error({ title: 'Server cannot be started', message: error.stack })
        }
    }

    /**
     * Start correct http server (HTTP or HTTPS if credentials are found and tls is requested)
	 *
	 * @private
     */
    _startHttpServer() {
        if ( 'https' === this.protocol && this.application.config.credentials.key && this.application.config.credentials.cert ) {
            /*
             * If specified or if https credentials are found (keys and cert), an HTTPS server is started
             */
            this._server = https.createServer( this.application.config.credentials, this.application.app )
        } else {
            /*
             * Default, we create an HTTP server
             */
            this._server = http.createServer( this.application.app )
        }
    }

    /**
     * Check if a server can be started on specified port
     *
     * @returns {Promise}
	 *
	 * @private
     */
    _canBeStarted() {
        return new Promise( ( resolve, reject ) => {
            const options = {
                host: '127.0.0.1',
                port: 'string' === typeof this.port && 'random' === this.port.toLowerCase() ? undefined : parseInt( this.port, 10 )
            }

            portfinder.getPort( options, ( error, port ) => {
                this._port = port

                if ( error ) {
                    resolve( false )
                } else {
                    resolve( true )
                }
            })
        })
    }

    /**
     * Server can be started safely
     *
     * @private
     */
    async _canStart() {
        /*
         * Everything is ok, starting server and application
         */
        const padLength = 20

        await this.application.start()

        this._state = state.started
        this.server.listen( this.port, () => this.displayInformations() )
    }

    /**
     * Display application and server informations
     *
     * @memberOf Server
     */
    displayInformations() {
        const serverInfos = new Table()

        serverInfos.push(
            [ 'Address', `${this.protocol}://${this.application.config.server.domain}${[ 80, 443 ].includes( this.port ) ? '' : `:${this.port}`}` ],
            [ 'Environment', `${upperFirst( this.application.app.get( 'env' ) )}` ]
        )

        Console.info( `\n${serverInfos}\n` )
    }

	/**
	 * Get server state
	 *
	 * @readonly
	 *
	 * @return {string}
	 *
	 * @memberOf Server
	 */
	get state() {
		return this._state
	}

	/**
	 * Get the application
	 *
	 * @readonly
	 *
	 * @returns {Application}
	 *
	 * @memberOf Server
	 */
	get application() {
		return this._application
	}

	/**
	 * Get which port the server is using
	 *
	 * @readonly
	 *
	 * @return {number}
	 *
	 * @memberOf Server
	 */
	get port() {
		return this._port
	}

	/**
	 * Get which protocol the server is using
	 *
	 * @readonly
	 *
	 * @returns {string}
	 *
	 * @memberOf Server
	 */
	get protocol() {
		return this._protocol
	}

	/**
	 * Get node http server instance
	 *
	 * @readonly
	 *
	 * @returns {Node.Server}
	 *
	 * @memberOf Server
	 */
	get server() {
		return this._server
	}
}

module.exports = Server
