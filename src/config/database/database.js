import config from './../config'

export default function database( defaultConnector = config.database.connector, clearCache ) {
    const connector     = defaultConnector
    const connectorPath = `${__dirname}/connector/${connector}`

    if ( clearCache ) {
        delete require.cache[ require.resolve( connectorPath ) ]
    }

    return require( connectorPath ).default /* .default is needed to patch babel exports.default build, require doesn't work, import does */
}
