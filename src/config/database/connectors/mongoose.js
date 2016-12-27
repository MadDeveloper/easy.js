const mongoose      = require( 'mongoose' )
const { config }    = require( 'knex' )

mongoose.connect( `mongodb://${config.host}/${config.database}` )

module.exports = mongoose
