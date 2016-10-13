import Knex from 'knex'

export const config = {
    client: 'mysql',
    host: 'localhost',
    user: 'root',
    password: 'root',
    database: 'prepapp',
    charset: 'utf8'
}

export const knex = Knex({
    client: config.client,

    connection: {
        host     : config.host,
        user     : config.user,
        password : config.password,
        database : config.database,
        charset  : config.charset
    },

    pool: {
        min: 0, // set pool min to 0 avoid to loose connection after idle time, realy usefull when you use binaries with prompts -> https://github.com/tgriesser/knex/issues/503
        max: 10
    }
})
