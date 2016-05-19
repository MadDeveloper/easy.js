'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _fs = require('fs');

var _fs2 = _interopRequireDefault(_fs);

var _path = require('path');

var _path2 = _interopRequireDefault(_path);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var Connector = function () {
    function Connector(container) {
        _classCallCheck(this, Connector);

        this._defaultConnector = 'bookshelf';
        this._databasePath = container.kernel.path.config + '/database/database';
        this._connection = null;
    }

    _createClass(Connector, [{
        key: 'connect',
        value: function connect(connector) {
            if (!connector) {
                // use default connector
                connector = this.defaultConnector;
            }

            this.connection = require(this.databasePath).default(connector); /* .default is needed to patch babel exports.default build, require doesn't work, import do */
            return this.connection;
        }

        /*
         * Getters and setters
         */

    }, {
        key: 'connection',
        get: function get() {
            return this._connection;
        },
        set: function set(connection) {
            this._connection = connection;
            return this;
        }
    }, {
        key: 'defaultConnector',
        get: function get() {
            return this._defaultConnector;
        }
    }, {
        key: 'databasePath',
        get: function get() {
            return this._databasePath;
        }
    }]);

    return Connector;
}();

exports.default = Connector;