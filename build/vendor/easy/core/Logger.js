'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }(); /**
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


var _fs = require('fs');

var _fs2 = _interopRequireDefault(_fs);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var Logger = function () {
    function Logger(container) {
        _classCallCheck(this, Logger);

        this._message = container.getComponent('Message');
        this._library = container.getComponent('Library');
    }

    /**
     * System is unusable.
     *
     * @param message
     * @param context
     * @return null
     */


    _createClass(Logger, [{
        key: 'emergency',
        value: function emergency(message, context) {}

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

    }, {
        key: 'alert',
        value: function alert(message, context) {
            var _this = this;

            _fs2.default.open(__dirname + '/../../../../logs/serverErrors.log', 'a+', function (error, fd) {
                if (!error) {

                    _fs2.default.write(fd, _this.library.strtr(message, context), null, 'utf8');
                } else {
                    _this.message.error({
                        title: "serverErrors.log file not found at: ~/logs/serverErrors.log",
                        message: "",
                        type: 'error'
                    });
                }
            });
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

    }, {
        key: 'critical',
        value: function critical(message, context) {
            var _this2 = this;

            _fs2.default.open(__dirname + '/../../../../logs/serverErrors.log', 'a+', function (error, fd) {
                if (!error) {

                    _fs2.default.write(fd, _this2.library.strtr(message, context), null, 'utf8');
                } else {
                    _this2.message.error({
                        title: "serverErrors.log file not found at: ~/logs/serverErrors.log",
                        message: "",
                        type: 'error'
                    });
                }
            });
        }

        /**
         * Runtime errors that do not require immediate action but should typically
         * be logged and monitored.
         *
         * @param message
         * @param context
         * @return null
         */

    }, {
        key: 'error',
        value: function error(message, context) {}

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

    }, {
        key: 'warning',
        value: function warning(message, context) {}

        /**
         * Normal but significant events.
         *
         * @param message
         * @param context
         * @return null
         */

    }, {
        key: 'notice',
        value: function notice(message, context) {}

        /**
         * Interesting events.
         *
         * Example: User logs in, SQL logs.
         *
         * @param message
         * @param context
         * @return null
         */

    }, {
        key: 'info',
        value: function info(message, context) {}

        /**
         * Detailed debug information.
         *
         * @param message
         * @param context
         * @return null
         */

    }, {
        key: 'debug',
        value: function debug(message, context) {}

        /**
         * Logs with an arbitrary level.
         *
         * @param mixed level
         * @param message
         * @param context
         * @return null
         */

    }, {
        key: 'log',
        value: function log(level, message, context) {}

        /*
         * Getters and setters
         */

    }, {
        key: 'message',
        get: function get() {
            return this._message;
        }
    }, {
        key: 'library',
        get: function get() {
            return this._library;
        }
    }]);

    return Logger;
}();

exports.default = Logger;