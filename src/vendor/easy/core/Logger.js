/**
 * Describes a logger instance
 *
 * The message MUST be a string or object implementing toString().
 *
 * The message MAY contain placeholders in the form: {foo} where foo
 * will be replaced by the context data in key "foo".
 *
 * The context array can contain arbitrary data, the only assumption that
 * can be made by implementors is that if an Exception instance is given
 * to produce a stack trace, it MUST be in a key named "exception".
 *
 * See https://github.com/php-fig/fig-standards/blob/master/accepted/PSR-3-logger-interface.md
 * for the full specification.
 */
import fs   from 'fs'
import path from 'path'

export default class Logger {
    constructor( container ) {
        this._message           = container.getComponent( 'Console' )
        this._string            = container.getLibrary( 'String' )
        this._logDirectoryPath  = __dirname + '/../../../../logs'
    }

    /**
     * System is unusable.
     *
     * @param message
     * @param context
     * @return null
     */
    emergency( message, context ) {

    }

    /**
     * Action must be taken immediately.
     *
     * Example: Entire website down, database unavailable, etc. This should
     * trigger the SMS alerts and wake you up.
     *
     * @param message
     * @param context
     * @return null
     */
    alert( message, context ) {
        this.openLogFile( 'serverErrors' )
        .then( fd => {
            fs.write( fd, this.string.strtr( message, context ), null, 'utf8' )
        })
        .catch( error => {
            this.message.error({
                title: `Impossible to open/create serverErrors.log at: ${this.logDirectoryPath}/serverErrors.log`,
                message: error,
                type: 'error'
            })
        })
    }

    /**
     * Critical conditions.
     *
     * Example: Application component unavailable, unexpected exception.
     *
     * @param message
     * @param context
     * @return null
     */
    critical( message, context ) {
        this.alert( message, context )
    }

    /**
     * Runtime errors that do not require immediate action but should typically
     * be logged and monitored.
     *
     * @param message
     * @param context
     * @return null
     */
    error( message, context ) {

    }

    /**
     * Exceptional occurrences that are not errors.
     *
     * Example: Use of deprecated APIs, poor use of an API, undesirable things
     * that are not necessarily wrong.
     *
     * @param message
     * @param context
     * @return null
     */
    warning( message, context) {

    }

    /**
     * Normal but significant events.
     *
     * @param message
     * @param context
     * @return null
     */
    notice( message, context) {

    }

    /**
     * Interesting events.
     *
     * Example: User logs in, SQL logs.
     *
     * @param message
     * @param context
     * @return null
     */
    info( message, context ) {

    }

    /**
     * Detailed debug information.
     *
     * @param message
     * @param context
     * @return null
     */
    debug( message, context ) {

    }

    /**
     * Logs with an arbitrary level.
     *
     * @param mixed level
     * @param message
     * @param context
     * @return null
     */
    log( level, message, context ) {

    }

    /**
     * Open log file
     *
     * @param string name
     */
    openLogFile( name ) {
        return new Promise( ( resolve, reject ) => {
            fs.open( path.resolve( `${this.logDirectoryPath}/${name}.log` ), 'a+', ( error, fd ) => {
                ( error ) ? reject( error ) : resolve( fd )
            })
        })
    }

    /*
     * Getters and setters
     */
    get message() {
        return this._message
    }

    get string() {
        return this._string
    }

    get logDirectoryPath() {
        return this._logDirectoryPath
    }
}
