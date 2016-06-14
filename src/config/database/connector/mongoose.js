import mongoose from 'mongoose'
import config   from './../../config'

const params = config.database

mongoose.connect( `mongodb://${params.connection.host}/${params.connection.database}` )

export default mongoose
