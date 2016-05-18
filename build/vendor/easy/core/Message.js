'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _colors = require('colors');

var _colors2 = _interopRequireDefault(_colors);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var Message = function () {
    function Message(container) {
        _classCallCheck(this, Message);

        this._leftSpaces = '  ';
    }

    _createClass(Message, [{
        key: 'error',
        value: function error(params) {
            if (undefined !== params.title && undefined !== params.message) {

                var consequence = params.consequence ? params.consequence : "";

                console.log('\n');
                console.log(this.leftSpaces + _colors2.default.bgRed(_colors2.default.white("Error: " + params.title)));
                console.log(this.leftSpaces + _colors2.default.bgRed(_colors2.default.white("    -> " + params.message)));
                console.log(this.leftSpaces + _colors2.default.bgRed(_colors2.default.white(consequence)));
                console.log('\n');

                if (typeof params.exit !== "undefined" || !isNaN(params.exit)) {
                    process.exit(params.exit);
                }
            } else {
                this.error({
                    title: "Invalid arguments",
                    message: "Missing arguments to " + _colors2.default.underline.yellow("Message.error()") + " function."
                });
            }
        }
    }, {
        key: 'warn',
        value: function warn(message) {
            console.log(this.leftSpaces + _colors2.default.bgYellow(_colors2.default.black('WARN: ' + message)));
        }
    }, {
        key: 'info',
        value: function info(message) {
            console.log(this.leftSpaces + _colors2.default.cyan(message));
        }
    }, {
        key: 'success',
        value: function success(message, exit) {
            console.log(this.leftSpaces + _colors2.default.green(message));

            if (exit) {
                process.exit();
            }
        }

        /*
         * Getters and setters
         */

    }, {
        key: 'leftSpaces',
        get: function get() {
            return this._leftSpaces;
        },
        set: function set(leftSpaces) {
            this._leftSpaces = leftSpaces;
            return this;
        }
    }]);

    return Message;
}();

exports.default = Message;