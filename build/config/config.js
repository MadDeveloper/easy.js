'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});

var _fs = require('fs');

var _fs2 = _interopRequireDefault(_fs);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function getCredentials() {
    var credentials = { key: null, cert: null, found: false };

    try {
        credentials.key = _fs2.default.readFileSync(__dirname + '/keys/myapp-privkey.pem');
        credentials.cert = _fs2.default.readFileSync(__dirname + '/keys/myapp-cert.pem');
        credentials.found = true;
    } finally {
        return credentials;
    }
}

exports.default = {
    /*
     * App configurations
     */
    app: {
        name: 'myapp'
    },

    /*
     * Server configurations
     */
    server: {
        protocol: {
            http: 'http',
            https: 'https'
        },
        domain: 'localhost',
        port: {
            http: 80,
            https: 443
        }
    },

    /*
     * Database credentials
     */
    database: {
        client: 'mysql',
        connector: 'knex',
        connection: {
            host: 'localhost',
            user: 'root',
            password: 'root',
            database: 'prepapp',
            charset: 'utf8'
        }
    },

    /*
     * SSL/TLS security keys
     */
    credentials: getCredentials(),

    /*
     * Json Web Token (JWT) configurations
     * CHANGE IT
     */
    jwt: {
        secret: ':p19E}1%&gX1O*K2u8=36#9Jk7I9{f' // http://randomkeygen.com/ -> Ft. Knox Passwords
    }
};