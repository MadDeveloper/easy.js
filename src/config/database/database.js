import config from './../config'

export default function database( clearCache ) {
    const connector     = config.database.connector
    const connectorPath = `${__dirname}/connectors/${connector}`

    if ( clearCache ) {
        delete require.cache[ require.resolve( connectorPath ) ]
    }

    return require( connectorPath ).default /* .default is needed to patch babel exports.default build, require doesn't work, import does */
}
