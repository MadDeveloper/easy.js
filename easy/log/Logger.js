/*
* This file is part of the easy framework.
*
* (c) Julien Sergent <sergent.julien@icloud.com>
*
* For the full copyright and license information, please view the LICENSE
* file that was distributed with this source code.
*/

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
 */
class Logger {
    /**
     * @constructor
     * @param  {Writer} writer
     */
    constructor( writer ) {
        this._writer = writer
    }

    /**
     * System is unusable.
     * Use fatals.log
     *
     * @param {string} message
     * @param {object} context
     */
    async emergency( message = '', context = {}) {
        await this.writer.write( 'fatals', this._appendDate( message ), context )
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
    async alert( message = '', context = {}) {
        await this.writer.write( 'fatals', this._appendDate( message ), context )
    }

    /**
     * Critical conditions.
     *
     * Example: Application component unavailable, unexpected exception.
     * Use errors.log
     *
     * @param {string} [message='']
     * @param {object} [context={}]
     */
    async critical( message = '', context = {}) {
        await this.writer.write( 'errors', this._appendDate( message ), context )
    }

    /**
     * Runtime errors that do not require immediate action but should typically
     * be logged and monitored.
     * Use errors.log
     *
     * @param {string} [message='']
     * @param {object} [context={}]
     */
    async error( message = '', context = {}) {
        await this.writer.write( 'errors', this._appendDate( message ), context )
    }

    /**
     * Exceptional occurrences that are not errors.
     * Use warn.log
     *
     * Example: Use of deprecated APIs, poor use of an API, undesirable things
     * that are not necessarily wrong.
     *
     * @param {string} [message='']
     * @param {object} [context={}]
     */
    async warning( message = '', context = {}) {
        await this.writer.write( 'warn', this._appendDate( message ), context )
    }

    /**
     * Normal but significant events.
     * Use events.log
     *
     * @param {string} [message='']
     * @param {object} [context={}]
     */
    async notice( message, context ) {
        await this.writer.write( 'events', this._appendDate( message ), context )
    }

    /**
     * Interesting events.
     * Use events.log
     *
     * Example: User logs in, SQL logs.
     *
     * @param {string} [message='']
     * @param {object} [context={}]
     */
    async info( message = '', context = {}) {
        await this.writer.write( 'events', message, context )
    }

    /**
     * Detailed debug informationso.
     * Use debugs.log
     *
     * @param {string} [message='']
     * @param {object} [context={}]
     */
    async debug( message = '', context = {}) {
        await this.writer.write( 'debugs', message, context )
    }

    /**
     * Logs standard message.
     * Use std.log
     *
     * @param {string} [message='']
     * @param {object} [context={}]
     */
    async log( message = '', context = {}) {
        await this.writer.write( 'std', message, context )
    }

    /**
     * Append current date to the message
     *
     * @private
     * @param {string} message
     * @returns {string}
     *
     * @memberOf Logger
     */
    _appendDate( message ) {
        return `[${new Date().toUTCString()}] ${message}`
    }

    /**
     * get - log writer instance
     *
     * @returns {LogWriter}
     */
    get writer() {
        return this._writer
    }
}

module.exports = Logger
