/*
 * Not working!
 */
import mongoose from 'mongoose'
import config   from './../../config'

const params = config.database

export default mongoose.connect( 'mongodb://' + params.connection.host + '/' + params.connection.database )
