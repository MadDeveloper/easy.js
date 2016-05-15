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
function Logger( Container ) {
    /*
     * Dependencies
     */
    var fs      = require( 'fs' ),
        Message = Container.getDependency( 'Message' ),
        strtr   = Container.getService( 'string.strtr' );

    return {

        /**
         * System is unusable.
         *
         * @param message
         * @param context
         * @return null
         */
        emergency: function( message, context ) {

        },

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
        alert: function( message, context ) {
            fs.open( __dirname + '/../../logs/serverErrors.log', 'a+', function( error, fd ) {
                if ( !error ) {

                    fs.write( fd, strtr( message, context ), null, 'utf8' );

                } else {
                    Message.error({
                        title: "serverErrors.log file not found at: ~/logs/serverErrors.log",
                        message: "",
                        type: 'error'
                    });
                }
            });
        },

        /**
         * Critical conditions.
         *
         * Example: Application component unavailable, unexpected exception.
         *
         * @param message
         * @param context
         * @return null
         */
        critical: function( message, context ) {
            fs.open( __dirname + '/../../logs/serverErrors.log', 'a+', function( error, fd ) {
                if ( !error ) {

                    fs.write( fd, strtr( message, context ), null, 'utf8' );

                } else {
                    Message.error({
                        title: "serverErrors.log file not found at: ~/logs/serverErrors.log",
                        message: "",
                        type: 'error'
                    });
                }
            });
        },

        /**
         * Runtime errors that do not require immediate action but should typically
         * be logged and monitored.
         *
         * @param message
         * @param context
         * @return null
         */
        error: function( message, context ) {

        },

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
        warning: function( message, context) {

        },

        /**
         * Normal but significant events.
         *
         * @param message
         * @param context
         * @return null
         */
        notice: function( message, context) {

        },

        /**
         * Interesting events.
         *
         * Example: User logs in, SQL logs.
         *
         * @param message
         * @param context
         * @return null
         */
        info: function( message, context ) {

        },

        /**
         * Detailed debug information.
         *
         * @param message
         * @param context
         * @return null
         */
        debug: function( message, context ) {

        },

        /**
         * Logs with an arbitrary level.
         *
         * @param mixed level
         * @param message
         * @param context
         * @return null
         */
        log: function(level, message, context ) {

        }
    }
}

module.exports = Logger;
