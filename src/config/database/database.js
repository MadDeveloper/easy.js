import Bookshelf from './connectors/Bookshelf'
import { config } from './connectors/knex'

export default {
    connector: Bookshelf,
    connection: config
}
