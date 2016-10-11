import config from './../config'

export default function database( clearCache ) {
    const connector     = config.database.connector
    const connectorPath = `${__dirname}/connectors/${connector}`

    if ( clearCache ) {
        delete require.cache[ require.resolve( connectorPath ) ]
    }

    return require( connectorPath ).default 
}
