import Knex from 'knex'
import config from __dirname + '/../../config'

const params = config.database

export default Knex({
    client: params.client,

    connection: {
        host     : params.connection.host,
        user     : params.connection.user,
        password : params.connection.password,
        database : null,
        charset  : params.connection.charset
    },

    pool: {
        min: 0, // set pool min to 0 avoid to loose connection after idle time, realy usefull when you use binaries with prompts -> https://github.com/tgriesser/knex/issues/503
        max: 10
    }
})
