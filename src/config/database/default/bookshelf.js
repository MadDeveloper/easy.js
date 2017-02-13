const config = require( './config' )
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

module.exports = {
    instance: bookshelf,
    config,
    verifyConnectionHandler: bookshelf => bookshelf.knex.raw( 'select 1+1 as result' )
}
