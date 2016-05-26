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
        this._logWriter = container.getComponent( 'LogWriter' )
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
        this.logWriter.write( 'fatals', message, context )
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
        this.logWriter.write( 'fatals', message, context )
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
        this.logWriter.write( 'errors', message, context )
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
        this.logWriter.write( 'errors', message, context )
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
        this.logWriter.write( 'warn', message, context )
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
        this.logWriter.write( 'events', message, context )
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
        this.logWriter.write( 'debugs', message, context )
    }

    /**
     * Logs message
     * Use std.log
     *
     * @param message
     * @param context
     * @param level
     * @return null
     */
    log( message, context ) {
        this.logWriter.write( 'std', message, context )
    }

    /*
     * Getters and setters
     */
    get logWriter() {
        return this._logWriter
    }
}
