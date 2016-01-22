var params = require( __dirname + '/../config' ).database;

var knex = require( 'knex' )({
    client: params.client,
    connection: {
        host     : params.connection.host,
        user     : params.connection.user,
        password : params.connection.password,
        database : null,
        charset  : params.connection.charset
    }
});

module.exports = knex;
