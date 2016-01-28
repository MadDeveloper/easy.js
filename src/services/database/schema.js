var database    = require( global.app.root + '/config/database/database' );
var _           = require( 'lodash' );

module.exports = {
    createSchema: function( schemaName ) {
        return database.raw( 'CREATE DATABASE ' + schemaName + ';' );
    },

    schemaExists: function( schemaName ) {
        try {
            return database.schema.withSchema( schemaName );
        } catch( error ) {
            return false;
        }
    },

    dropTable: function( tableName ) {
        return database.schema.dropTableIfExists( tableName );
    },

    tableExists: function( tableName ) {
        database.schema.hasTable( tableName ).then( function( exists ) {
            return exists;
        });
    },

    createTable: function( tableName, tableSchema ) {
        return database.schema.createTable( tableName, function ( table ) {
            var column;
            var columnKeys = _.keys( tableSchema );

            _.each( columnKeys, function ( key ) {
              if (tableSchema[ key ].type === 'text' && tableSchema[ key ].hasOwnProperty('fieldtype')) {
                column = table[tableSchema[ key ].type](key, tableSchema[ key ].fieldtype);
              }
              else if (tableSchema[ key ].type === 'string' && tableSchema[ key ].hasOwnProperty('maxlength')) {
                column = table[tableSchema[ key ].type](key, tableSchema[ key ].maxlength);
              }
              else if ( ( tableSchema[ key ].type === 'float' || tableSchema[ key ].type === 'decimal' ) && tableSchema[ key ].hasOwnProperty('precision')) {
                column = table[tableSchema[ key ].type](key, tableSchema[ key ].precision);
              }
              else {
                column = table[tableSchema[ key ].type](key);
              }
              if (tableSchema[ key ].hasOwnProperty('nullable') && tableSchema[ key ].nullable === true) {
                column.nullable();
              }
              else {
                column.notNullable();
              }
              if (tableSchema[ key ].hasOwnProperty('primary') && tableSchema[ key ].primary === true) {
                column.primary();
              }
              if (tableSchema[ key ].hasOwnProperty('unique') && tableSchema[ key ].unique) {
                column.unique();
              }
              if (tableSchema[ key ].hasOwnProperty('unsigned') && tableSchema[ key ].unsigned) {
                column.unsigned();
              }
              if (tableSchema[ key ].hasOwnProperty('references')) {
                column.references(tableSchema[ key ].references);
              }
              if (tableSchema[ key ].hasOwnProperty('onDelete') && tableSchema[ key ].onDelete.length > 0) {
                column.onDelete(tableSchema[ key ].onDelete);
              }
              if (tableSchema[ key ].hasOwnProperty('onUpdate') && tableSchema[ key ].onUpdate.length > 0) {
                column.onUpdate(tableSchema[ key ].onUpdate);
              }
              if (tableSchema[ key ].hasOwnProperty('defaultTo')) {
                column.defaultTo(tableSchema[ key ].defaultTo);
              }
            });
        });
    }
};
