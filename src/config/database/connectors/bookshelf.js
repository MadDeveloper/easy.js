const knex = require( './knex' )
const Bookshelf = require( 'bookshelf' )

module.exports = Bookshelf( knex )
