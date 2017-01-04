const bookshelf = require( './connectors/bookshelf' )
const config = require( './config' )

module.exports = {
    connector: bookshelf,
    connection: config
}
