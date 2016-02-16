function Connector( Kernel ) {

    var fs                      = require( 'fs' );
    var path                    = require( 'path' );
    var defaultConnector        = 'bookshelf';
    var databasePath            = __dirname + '/../../../config/database/database';
    var connection              = null;
    var Message                 = Kernel.load( 'Message' )();

    return {
        connect: function( connector ) {
            if ( !connector ) {
                // use default connector
                connector = defaultConnector;
            }

            this.setConnection( require( databasePath )( connector ) );
            return this.getConnection();
        },

        // always use fluent setter to allow chained calls
        setConnection: function( newConnection ) {
            connection = newConnection;

            return this;
        },

        getConnection: function() {
            return connection;
        }
    }
}

module.exports = Connector;
