const Knex = require( 'knex' )

const config = {
    client: 'mysql',
    host: 'localhost',
    user: 'root',
    password: 'root',
    database: 'prepapp',
    charset: 'utf8'
}

module.exports.config = config

module.exports.knex = Knex({
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
