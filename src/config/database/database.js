import config from __dirname + '/../config'

export default function( defaultConnector, clearCache ) {
    let connector = defaultConnector;

    if ( !defaultConnector ) {
        const database = config.database;
        connector = database.connector;
    }

    const connectorPath = __dirname + '/connector/' + connector;

    if ( clearCache ) {
        delete require.cache[ require.resolve( connectorPath ) ];
    }

    return require( connectorPath );
};
