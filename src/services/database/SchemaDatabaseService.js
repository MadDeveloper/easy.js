import { keys, each }   from 'lodash'
import Service          from './../../vendor/easy/core/Service'

export default class SchemaDatabaseService extends Service {
    constructor( container ) {
        super( container )
    }

    load() {}

    createSchema( schemaName ) {
        return this.database.raw( 'CREATE DATABASE ' + schemaName + '' )
    }

    schemaExists( schemaName ) {
        try {
            return this.database.schema.withSchema( schemaName )
        } catch( error ) {
            return false
        }
    }

    dropTable( tableName ) {
        return this.database.schema.dropTableIfExists( tableName )
    }

    tableExists( tableName ) {
        return this.database.schema.hasTable( tableName )
    }

    truncateTable( tableName ) {
        return this.database.raw( 'truncate table ' + tableName )
    }

    clearTable( tableName ) {
        return this.database( tableName ).del()
    }

    createTable( tableName, tableSchema ) {
        return database.schema.createTable( tableName, table => {
            let column
            let columnKeys = keys( tableSchema )

            each( columnKeys, key => {
              if (tableSchema[ key ].type === 'text' && tableSchema[ key ].hasOwnProperty('fieldtype')) {
                column = table[tableSchema[ key ].type](key, tableSchema[ key ].fieldtype)
              }
              else if (tableSchema[ key ].type === 'string' && tableSchema[ key ].hasOwnProperty('maxlength')) {
                column = table[tableSchema[ key ].type](key, tableSchema[ key ].maxlength)
              }
              else if ( ( tableSchema[ key ].type === 'float' || tableSchema[ key ].type === 'decimal' ) ) {
                var defaultPrecision = 8
                var precision = ( tableSchema[ key ].hasOwnProperty('precision') ) ? tableSchema[ key ].precision : defaultPrecision

                if ( 'decimal' === tableSchema[ key ].type ) {
                    const defaultScale = 2
                    const scale = ( tableSchema[ key ].hasOwnProperty( 'scale' ) ) ? tableSchema[ key ].scale : defaultScale

                    table[ tableSchema[ key ].type ]( key, tableSchema[ key ].precision, tableSchema[ key ].scale )
                } else {
                    table[ tableSchema[ key ].type ]( key, tableSchema[ key ].precision )
                }
              }
              else {
                column = table[tableSchema[ key ].type](key)
              }
              if (tableSchema[ key ].hasOwnProperty('nullable') && tableSchema[ key ].nullable === true) {
                column.nullable()
              }
              else {
                column.notNullable()
              }
              if (tableSchema[ key ].hasOwnProperty('primary') && tableSchema[ key ].primary === true) {
                column.primary()
              }
              if (tableSchema[ key ].hasOwnProperty('unique') && tableSchema[ key ].unique) {
                column.unique()
              }
              if (tableSchema[ key ].hasOwnProperty('unsigned') && tableSchema[ key ].unsigned) {
                column.unsigned()
              }
              if (tableSchema[ key ].hasOwnProperty('references')) {
                column.references(tableSchema[ key ].references)
              }
              if (tableSchema[ key ].hasOwnProperty('onDelete') && tableSchema[ key ].onDelete.length > 0) {
                column.onDelete(tableSchema[ key ].onDelete)
              }
              if (tableSchema[ key ].hasOwnProperty('onUpdate') && tableSchema[ key ].onUpdate.length > 0) {
                column.onUpdate(tableSchema[ key ].onUpdate)
              }
              if (tableSchema[ key ].hasOwnProperty('defaultTo')) {
                column.defaultTo(tableSchema[ key ].defaultTo)
              }
            })
        })
    }
}
