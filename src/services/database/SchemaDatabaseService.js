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
        this._knex = database.instance.knex
    }

    /**
     * schemaExists - check if a schema exists
     *
     * @param  {string} schemaName
     * @returns {Object|boolean}
     */
    schemaExists( schemaName ) {
        try {
            return this.knex.schema.withSchema( schemaName )
        } catch( error ) {
            return false
        }
    }

    /**
     * dropTable - description
     *
     * @param  {type} tableName description
     * @returns {type}           description
     */
    dropTable( tableName ) {
        return this.knex.schema.dropTableIfExists( tableName )
    }

    /**
     * tableExists - description
     *
     * @param  {type} tableName description
     * @returns {type}           description
     */
    tableExists( tableName ) {
        return this.knex.schema.hasTable( tableName )
    }

    /**
     * truncateTable - description
     *
     * @param  {type} tableName description
     * @returns {type}           description
     */
    truncateTable( tableName ) {
        return this.knex.raw( `truncate table ${tableName}` )
    }

    /**
     * clearTable - description
     *
     * @param  {type} tableName description
     * @returns {type}           description
     */
    clearTable( tableName ) {
        return this.knex( tableName ).del()
    }

    /**
     * createTable - description
     *
     * @param  {type} tableName   description
     * @param  {type} tableSchema description
     * @returns {type}             description
     */
    createTable( tableName, tableSchema ) {
        return this.knex
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

    /**
     * get - description
     *
     * @returns {type}  description
     */
    get knex() {
        return this._knex
    }
}

module.exports = SchemaDatabaseService
