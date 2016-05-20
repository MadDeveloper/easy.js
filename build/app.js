'use strict';

var _config = require('./config/config');

var _config2 = _interopRequireDefault(_config);

var _https = require('https');

var _https2 = _interopRequireDefault(_https);

var _http = require('http');

var _http2 = _interopRequireDefault(_http);

var _net = require('net');

var _net2 = _interopRequireDefault(_net);

var _minimist = require('minimist');

var _minimist2 = _interopRequireDefault(_minimist);

var _bootstrap = require('./bootstrap');

var _bootstrap2 = _interopRequireDefault(_bootstrap);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

/*
 * Start server: npm start
 */

/*
 * App requirements
 */


var argv = (0, _minimist2.default)(process.argv.slice(2));
var server = null;
var port = 0;
var protocol = '';
var app = new _bootstrap2.default(_config2.default);

if (argv._['http'] || argv.http || false === _config2.default.credentials.found) {
    /*
     * If specified into options or if https credentials are not found (keys and cert), we create an HTTP server
     */
    port = _config2.default.server.port.http;
    server = _http2.default.createServer(app);
    protocol = _config2.default.server.protocol.http;
} else {
    /*
     * By default, easy framework create an HTTPS server or if https credentials are not found (keys and cert)
     */
    server = _https2.default.createServer(_config2.default.credentials, app);
    port = _config2.default.server.port.https;
    protocol = _config2.default.server.protocol.https;
}

var portInUse = function portInUse(port) {
    return new Promise(function (resolve, reject) {
        var serverTest = _net2.default.createServer(function (socket) {
            socket.write('Echo server\r\n');
            socket.pipe(socket);
        });

        serverTest.listen(port, '127.0.0.1');

        serverTest.on('error', function (error) {
            reject();
        });

        serverTest.on('listening', function (e) {
            serverTest.close();
            resolve();
        });
    });
};

portInUse(port).then(function () {
    /*
     * Everything is ok, starting server
     */
    server.listen(port, function () {
        // Todo: write it with easy/Message
        console.log("\n");
        console.log("-----------------------------");
        console.log("    Server listening...");
        console.log("-----------------------------");
        console.log("    " + protocol + '://' + _config2.default.server.domain + ':' + port);
        console.log("-----------------------------");
        console.log("    Mode:   " + app.get('env'));
        console.log("-----------------------------");
    });
}).catch(function () {
    /*
     * Port ${port} is used
     */
    console.log("\nPort " + port + " is already used or you have no rights to launch server (try as root), impossible to start server.");
    process.exit();
});