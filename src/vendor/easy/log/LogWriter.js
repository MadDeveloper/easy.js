import fs           from 'fs'
import Component    from './../core/Component'

/**
 * @class LogWriter
 * @extends Component
 */
export default class LogWriter extends Component {
    /**
     * @constructor
     * @param  {Container} container
     */
    constructor( container ) {
        super()

        this._logFileManager    = container.getComponent( 'LogFileManager' )
        this._cli               = container.getComponent( 'Console' )
        this._string            = container.getLibrary( 'string' )
    }

    /**
     * General log method
     *
     * @param {string} file
     * @param {string} message
     * @param {string} context
     */
    write( file, message, context ) {
        this.logFileManager.openLogFile( file )
        .then( fd => {
            fs.write( fd, this.string.strtr( message, context ), null, 'utf8' )
        })
        .catch( error => {
            this.cli.error({
                title: `Impossible to open/create ${file}.log at: ${this.logDirectoryPath}/${file}.log`,
                message: error,
                type: 'error'
            })
        })
    }

    /**
     * get logFileManager instance
     *
     * @returns {LogFileManager}
     */
    get logFileManager() {
        return this._logFileManager
    }

    /**
     * get console instance
     *
     * @returns {Console}
     */
    get cli() {
        return this._cli
    }

    /**
     * get string vendor library
     *
     * @returns {object}
     */
    get string() {
        return this._string
    }
}
