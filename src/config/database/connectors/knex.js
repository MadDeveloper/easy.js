const Knex = require( 'knex' )
const config = require( '../config' )

module.exports = Knex({
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
})
