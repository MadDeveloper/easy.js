import mongoose from 'mongoose'
import config   from './../../app'

const params = config.database

mongoose.connect( `mongodb://${params.connection.host}/${params.connection.database}` )

export default mongoose
