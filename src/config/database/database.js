const Bookshelf     = require( './connectors/Bookshelf' )
const { config }    = require( './connectors/knex' )

module.exports = {
    connector: Bookshelf,
    connection: config
}
