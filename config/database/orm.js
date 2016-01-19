/*
 * Database (Knex SQL query builder)
 */
knex = require( './database' );

/*
 * ORM (Bookshelf)
 */
module.exports = require( 'bookshelf' )( knex );
