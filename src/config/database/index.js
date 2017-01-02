const Bookshelf = require( './connectors/bookshelf' )
const config = require( './config' )

module.exports = {
    connector: Bookshelf,
    connection: config
}
