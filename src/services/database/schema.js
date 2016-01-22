var knex = require( global.app.root + '/config/database/database' );

module.exports = {
    createSchema: function( schemaName ) {
        return knex.raw( 'CREATE DATABASE ' + schemaName + ';' );
    },

    schemaExists: function( schemaName ) {
        try {
            return knex.schema.withSchema( schemaName );
        } catch( error ) {
            return false;
        }
    },

    dropTable: function( tableName ) {
        return knex.schema.dropTableIfExists( tableName );
    },

    tableExists: function( tableName ) {
        knex.schema.hasTable( tableName ).then( function( exists ) {
            return exists;
        });
    },

    createTable: function( tableName ) {
      return knex.schema.createTable(tableName, function (table) {
            var column;
            var columnKeys = _.keys(Schema[tableName]);
            console.log( "Updating table : " + tableName );
            _.each(columnKeys, function (key) {
              if (Schema[tableName][key].type === 'text' && Schema[tableName][key].hasOwnProperty('fieldtype')) {
                column = table[Schema[tableName][key].type](key, Schema[tableName][key].fieldtype);
              }
              else if (Schema[tableName][key].type === 'string' && Schema[tableName][key].hasOwnProperty('maxlength')) {
                column = table[Schema[tableName][key].type](key, Schema[tableName][key].maxlength);
              }
              else if (Schema[tableName][key].type === 'decimal' && Schema[tableName][key].hasOwnProperty('precision')) {
                column = table[Schema[tableName][key].type](key, Schema[tableName][key].precision);
              }
              else {
                column = table[Schema[tableName][key].type](key);
              }
              if (Schema[tableName][key].hasOwnProperty('nullable') && Schema[tableName][key].nullable === true) {
                column.nullable();
              }
              else {
                column.notNullable();
              }
              if (Schema[tableName][key].hasOwnProperty('primary') && Schema[tableName][key].primary === true) {
                column.primary();
              }
              if (Schema[tableName][key].hasOwnProperty('unique') && Schema[tableName][key].unique) {
                column.unique();
              }
              if (Schema[tableName][key].hasOwnProperty('unsigned') && Schema[tableName][key].unsigned) {
                column.unsigned();
              }
              if (Schema[tableName][key].hasOwnProperty('references')) {
                column.references(Schema[tableName][key].references);
              }
              if (Schema[tableName][key].hasOwnProperty('onDelete') && Schema[tableName][key].onDelete.length > 0) {
                column.onDelete(Schema[tableName][key].onDelete);
              }
              if (Schema[tableName][key].hasOwnProperty('onUpdate') && Schema[tableName][key].onUpdate.length > 0) {
                column.onUpdate(Schema[tableName][key].onUpdate);
              }
              if (Schema[tableName][key].hasOwnProperty('defaultTo')) {
                column.defaultTo(Schema[tableName][key].defaultTo);
              }
            });
        });
    }
};
