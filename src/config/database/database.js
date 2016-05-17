import config from './../config'

export default function database( defaultConnector, clearCache ) {
    let connector = defaultConnector

    if ( !defaultConnector ) {
        const database = config.database
        connector = database.connector
    }

    const connectorPath = __dirname + '/connector/' + connector

    if ( clearCache ) {
        delete require.cache[ require.resolve( connectorPath ) ]
    }

    return ( require( connectorPath ) ).default /* .default is needed to patch babel exports.default build, require doesn't work, import do */
}
