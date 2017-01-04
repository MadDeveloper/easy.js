const bookshelf = require( './connectors/bookshelf' )
const config = require( './config-driver' )

module.exports = {
    connector: bookshelf,
    config,
    intervalToTryingReconnect: 5000,
    intervalToCheckConnection: 15000,
    maxAttempsReconnect: Infinity
}
