const config = require( '../config-driver' )
const Bookshelf = require( 'bookshelf' )
const Knex = require( 'knex' )

const bookshelf = Bookshelf( Knex({
    client: config.client,
    connection: {
        host     : config.host,
        user     : config.user,
        password : config.password,
        database : config.database,
        charset  : config.charset
    },
    pool: {
        min: 0,
        max: 10
    }
}) )

module.exports = bookshelf
