module.exports = function( defaultConnector ) {
    var connector = defaultConnector;

    if ( !defaultConnector ) {
        var params = require( __dirname + '/../config' ).database;
        connector = params.database.connector;
    }

    return require( __dirname + '/connector/' + connector );
};
