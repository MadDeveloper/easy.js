'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});

var _knex = require('knex');

var _knex2 = _interopRequireDefault(_knex);

var _config = require('./../../config');

var _config2 = _interopRequireDefault(_config);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var params = _config2.default.database;

exports.default = (0, _knex2.default)({
    client: params.client,

    connection: {
        host: params.connection.host,
        user: params.connection.user,
        password: params.connection.password,
        database: params.connection.database,
        charset: params.connection.charset
    },

    pool: {
        min: 0, // set pool min to 0 avoid to loose connection after idle time, realy usefull when you use binaries with prompts -> https://github.com/tgriesser/knex/issues/503
        max: 10
    }
});