'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});
exports.default = database;

var _config = require('./../config');

var _config2 = _interopRequireDefault(_config);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function database(defaultConnector, clearCache) {
    var connector = defaultConnector;

    if (!defaultConnector) {
        var _database = _config2.default.database;
        connector = _database.connector;
    }

    var connectorPath = __dirname + '/connector/' + connector;

    if (clearCache) {
        delete require.cache[require.resolve(connectorPath)];
    }

    return require(connectorPath).default; /* .default is needed to patch babel exports.default build, require doesn't work, import do */
}