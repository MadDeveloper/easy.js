module.exports = function( defaultConnector ) {
    var connector = defaultConnector;

    if ( !defaultConnector ) {
        var database = require( __dirname + '/../config' ).database;
        connector = database.connector;
    }

    return require( __dirname + '/connector/' + connector );
};
