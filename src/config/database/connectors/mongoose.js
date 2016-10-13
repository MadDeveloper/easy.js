import mongoose     from 'mongoose'
import { config }   from 'knex'

mongoose.connect( `mongodb://${config.host}/${config.database}` )

export default mongoose
