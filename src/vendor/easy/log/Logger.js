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
export default class Logger {
    constructor( container ) {
        this._logFileManager    = container.getComponent( 'LogFileManager' )
        this._cli               = container.getComponent( 'Console' )
        this._string            = container.getLibrary( 'String' )
    }

    /**
     * System is unusable.
     * Use fatals.log
     *
     * @param message
     * @param context
     * @return null
     */
    emergency( message, context ) {
        this.write( 'fatals', message, context )
    }

    /**
     * Action must be taken immediately.
     *
     * Example: Entire website down, database unavailable, etc. This should
     * trigger the SMS alerts and wake you up.
     * Use fatals.log
     *
     * @param message
     * @param context
     * @return null
     */
    alert( message, context ) {
        this.write( 'fatals', message, context )
    }

    /**
     * Critical conditions.
     *
     * Example: Application component unavailable, unexpected exception.
     * Use errors.log
     *
     * @param message
     * @param context
     * @return null
     */
    critical( message, context ) {
        this.write( 'errors', message, context )
    }

    /**
     * Runtime errors that do not require immediate action but should typically
     * be logged and monitored.
     * Use errors.log
     *
     * @param message
     * @param context
     * @return null
     */
    error( message, context ) {
        this.write( 'errors', message, context )
    }

    /**
     * Exceptional occurrences that are not errors.
     * Use warn.log
     *
     * Example: Use of deprecated APIs, poor use of an API, undesirable things
     * that are not necessarily wrong.
     *
     * @param message
     * @param context
     * @return null
     */
    warning( message, context) {
        this.write( 'warn', message, context )
    }

    /**
     * Normal but significant events.
     * Use events.log
     *
     * @param message
     * @param context
     * @return null
     */
    notice( message, context) {
        this.write( 'events', message, context )
    }

    /**
     * Interesting events.
     * Use events.log
     *
     * Example: User logs in, SQL logs.
     *
     * @param message
     * @param context
     * @return null
     */
    info( message, context ) {
        this.write( 'events', message, context )
    }

    /**
     * Detailed debug information.
     * Use debugs.log
     *
     * @param message
     * @param context
     * @return null
     */
    debug( message, context ) {
        this.write( 'debugs', message, context )
    }

    /**
     * Logs with an arbitrary level.
     * Use std.log
     *
     * @param message
     * @param context
     * @param level
     * @return null
     */
    log( message, context, level = 0 ) {
        this.write( 'std', message, context, level )
    }

    /**
     * General log method
     *
     * @param message
     * @param context
     * @param level
     * @return null
     */
    write( file, message, context, level = null ) {
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

    /*
     * Getters and setters
     */
    get logFileManager() {
        return this._logFileManager
    }

    get cli() {
        return this._cli
    }

    get string() {
        return this._string
    }
}
