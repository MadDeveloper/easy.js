const Injectable = require( '../interfaces/Injectable' )

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
 *
 * @class Logger
 * @extends Injectable
 */
class Logger extends Injectable {
    /**
     * @constructor
     * @param  {LogWriter} logWriter
     */
    constructor( logWriter ) {
        super()

        this._logWriter = logWriter
    }

    /**
     * System is unusable.
     * Use fatals.log
     *
     * @param {string} message
     * @param {object} context
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
     * @param {string} message
     * @param {object} context
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
     * @param {string} message
     * @param {object} context
     */
    critical( message, context ) {
        this.logWriter.write( 'errors', message, context )
    }

    /**
     * Runtime errors that do not require immediate action but should typically
     * be logged and monitored.
     * Use errors.log
     *
     * @param {string} message
     * @param {object} context
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
     * @param {string} message
     * @param {object} context
     */
    warning( message, context ) {
        this.logWriter.write( 'warn', message, context )
    }

    /**
     * Normal but significant events.
     * Use events.log
     *
     * @param {string} message
     * @param {object} context
     */
    notice( message, context ) {
        this.logWriter.write( 'events', message, context )
    }

    /**
     * Interesting events.
     * Use events.log
     *
     * Example: User logs in, SQL logs.
     *
     * @param {string} message
     * @param {object} context
     */
    info( message, context ) {
        this.logWriter.write( 'events', message, context )
    }

    /**
     * Detailed debug informationso.
     * Use debugs.log
     *
     * @param {string} message
     * @param {object} context
     */
    debug( message, context ) {
        this.logWriter.write( 'debugs', message, context )
    }

    /**
     * Logs standard message.
     * Use std.log
     *
     * @param {string} message
     * @param {object} context
     */
    log( message, context ) {
        this.logWriter.write( 'std', message, context )
    }

    /**
     * get - log writer instance
     *
     * @returns {LogWriter}
     */
    get logWriter() {
        return this._logWriter
    }
}

module.exports = Logger
