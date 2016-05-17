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
import fs from 'fs'

export default class Logger {
    constructor( container ) {
        this._container     = container
        this._message       = this._container.getComponent( 'Message' )
        this._stringService = this._container.getService( 'string' )
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
        fs.open( __dirname + '/../../../../logs/serverErrors.log', 'a+', ( error, fd ) => {
            if ( !error ) {

                fs.write( fd, this.stringService.strtr( message, context ), null, 'utf8' )

            } else {
                this.message.error({
                    title: "serverErrors.log file not found at: ~/logs/serverErrors.log",
                    message: "",
                    type: 'error'
                })
            }
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
        fs.open( __dirname + '/../../../../logs/serverErrors.log', 'a+', ( error, fd )  => {
            if ( !error ) {

                fs.write( fd, this.stringService.strtr( message, context ), null, 'utf8' )

            } else {
                this.message.error({
                    title: "serverErrors.log file not found at: ~/logs/serverErrors.log",
                    message: "",
                    type: 'error'
                })
            }
        })
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

    /*
     * Getters and setters
     */
    get container() {
        return this._container
    }

    get message() {
        return this._message
    }

    get stringService() {
        return this._stringService
    }
}
