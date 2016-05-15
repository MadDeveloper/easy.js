'use strict';

module.exports = function (defaultConnector, clearCache) {
    var connector = defaultConnector;

    if (!defaultConnector) {
        var database = require(__dirname + '/../config').database;
        connector = database.connector;
    }

    var connectorPath = __dirname + '/connector/' + connector;

    if (clearCache) {
        delete require.cache[require.resolve(connectorPath)];
    }

    return require(connectorPath);
};