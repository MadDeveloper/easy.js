const { keys, each } = require( 'lodash' )

/**
 * @class SchemaDatabaseService
 */
class SchemaDatabaseService {
    /**
     * constructor
     *
     * @param  {Database} database
     */
    constructor( database ) {
        this.database = database.instance
    }

    /**
     * schemaExists - check if a schema exists
     *
     * @param  {string} schemaName
     * @returns {Object|boolean}
     */
    schemaExists( schemaName ) {
        try {
            return this.database.knex.schema.withSchema( schemaName )
        } catch( error ) {
            return false
        }
    }

    /**
     * dropTable - remove table
     *
     * @param  {string} tableName
     * @returns {Promise}
     */
    dropTable( tableName ) {
        return this.database.knex.schema.dropTableIfExists( tableName )
    }

    /**
     * tableExists - check if table exists
     *
     * @param  {string} tableName
     * @returns {Promise}
     */
    tableExists( tableName ) {
        return this.database.knex.schema.hasTable( tableName )
    }

    /**
     * truncateTable - remove all rows from a table
     *
     * @param  {string} tableName
     * @returns {Promise}
     */
    truncateTable( tableName ) {
        return this.database.knex.raw( `truncate table ${tableName}` )
    }

    /**
     * clearTable - delete table
     *
     * @param  {string} tableName
     * @returns {Promise}
     */
    clearTable( tableName ) {
        return this.database.knex( tableName ).del()
    }

    /**
     * createTable - create new table
     *
     * @param  {string} tableName
     * @param  {Object} tableSchema
     * @returns {Promise}
     */
    createTable( tableName, tableSchema ) {
        return this
            .database
            .knex
            .schema
            .createTable( tableName, table => {
                let column
                let columnKeys = keys( tableSchema )

                each( columnKeys, key => {
                    if ( tableSchema[ key ].type === 'text' && tableSchema[ key ].hasOwnProperty( 'fieldtype' ) ) {
                        column = table[ tableSchema[ key ].type ]( key, tableSchema[ key ].fieldtype )
                    } else if (tableSchema[ key ].type === 'string' && tableSchema[ key ].hasOwnProperty( 'maxlength' ) ) {
                        column = table[ tableSchema[ key ].type ]( key, tableSchema[ key ].maxlength )
                    } else if ( ( tableSchema[ key ].type === 'float' || tableSchema[ key ].type === 'decimal' ) ) {
                        const defaultPrecision  = 8
                        const precision         = ( tableSchema[ key ].hasOwnProperty( 'precision' ) ) ? tableSchema[ key ].precision : defaultPrecision

                        if ( 'decimal' === tableSchema[ key ].type ) {
                            const defaultScale  = 2
                            const scale         = ( tableSchema[ key ].hasOwnProperty( 'scale' ) ) ? tableSchema[ key ].scale : defaultScale

                            table[ tableSchema[ key ].type ]( key, precision, scale )
                        } else {
                            table[ tableSchema[ key ].type ]( key, precision )
                        }
                    } else {
                        column = table[ tableSchema[ key ].type ]( key )
                    }

                    if ( tableSchema[ key ].hasOwnProperty( 'nullable' ) && tableSchema[ key ].nullable === true ) {
                        column.nullable()
                    } else {
                        column.notNullable()
                    }

                    if ( tableSchema[ key ].hasOwnProperty( 'primary' ) && tableSchema[ key ].primary === true ) {
                        column.primary()
                    }

                    if ( tableSchema[ key ].hasOwnProperty( 'unique' ) && tableSchema[ key ].unique ) {
                        column.unique()
                    }

                    if ( tableSchema[ key ].hasOwnProperty( 'unsigned' ) && tableSchema[ key ].unsigned ) {
                        column.unsigned()
                    }

                    if ( tableSchema[ key ].hasOwnProperty( 'references' ) ) {
                        column.references( tableSchema[ key ].references )
                    }

                    if ( tableSchema[ key ].hasOwnProperty( 'onDelete' ) && tableSchema[ key ].onDelete.length > 0 ) {
                        column.onDelete( tableSchema[ key ].onDelete )
                    }

                    if ( tableSchema[ key ].hasOwnProperty( 'onUpdate' ) && tableSchema[ key ].onUpdate.length > 0 ) {
                        column.onUpdate( tableSchema[ key ].onUpdate )
                    }

                    if ( tableSchema[ key ].hasOwnProperty( 'defaultTo' ) ) {
                        column.defaultTo( tableSchema[ key ].defaultTo )
                    }
                })
            })
    }
}

module.exports = SchemaDatabaseService
