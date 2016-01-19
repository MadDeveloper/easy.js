var fs = require( 'fs' );

function Connector( Kernel ) {
    return {
        connection: null,

        defaultConnectorPath: __dirname + '/../../../config/database/orm',

        connect: function( connectorPath ) {
            var Message = Kernel.load( 'Message' )();

            if ( typeof connectorPath === 'undefined' ) {

                // use default connector path
                connectorPath = this.getDefaultConnectorPath();

            } else {
                var stats = fs.statSync( connectorPath );
                if ( !stats || !stats.isFile() ) {
                    Message.error({
                        title: "Impossible to find database connector",
                        message: "The connector path doesn't exists"
                    });
                }
            }

            this.setConnection( require( connectorPath ) );
            return this.getConnection();
        },

        // always use fluent setter to allow chained calls
        setConnection: function( newConnection ) {
            this.connection = newConnection;

            return this;
        },

        getConnection: function() {
            return this.connection;
        },

        getDefaultConnectorPath: function() {
            return this.defaultConnectorPath;
        }
    }
}

module.exports = Connector;
