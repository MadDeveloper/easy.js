/*
 * Database
 */
var database = require( './database' );

/*
 * ORM (Bookshelf)
 */
module.exports = require( 'bookshelf' )( database );
