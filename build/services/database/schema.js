'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _lodash = require('lodash');

var _lodash2 = _interopRequireDefault(_lodash);

var _database = require('./../../config/database/database');

var _database2 = _interopRequireDefault(_database);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var database = (0, _database2.default)(null, true);
var clearCache = true;

exports.default = {
  createSchema: function createSchema(schemaName) {
    return database.raw('CREATE DATABASE ' + schemaName + '');
  },
  schemaExists: function schemaExists(schemaName) {
    try {
      return database.schema.withSchema(schemaName);
    } catch (error) {
      return false;
    }
  },
  dropTable: function dropTable(tableName) {
    return database.schema.dropTableIfExists(tableName);
  },
  tableExists: function tableExists(tableName) {
    return database.schema.hasTable(tableName);
  },
  truncateTable: function truncateTable(tableName) {
    return database.raw('truncate table ' + tableName);
  },
  clearTable: function clearTable(tableName) {
    return database(tableName).del();
  },
  createTable: function createTable(tableName, tableSchema) {
    return database.schema.createTable(tableName, function (table) {
      var column = void 0;
      var columnKeys = _lodash2.default.keys(tableSchema);

      _lodash2.default.each(columnKeys, function (key) {
        if (tableSchema[key].type === 'text' && tableSchema[key].hasOwnProperty('fieldtype')) {
          column = table[tableSchema[key].type](key, tableSchema[key].fieldtype);
        } else if (tableSchema[key].type === 'string' && tableSchema[key].hasOwnProperty('maxlength')) {
          column = table[tableSchema[key].type](key, tableSchema[key].maxlength);
        } else if (tableSchema[key].type === 'float' || tableSchema[key].type === 'decimal') {
          var defaultPrecision = 8;
          var precision = tableSchema[key].hasOwnProperty('precision') ? tableSchema[key].precision : defaultPrecision;

          if ('decimal' === tableSchema[key].type) {
            var defaultScale = 2;
            var scale = tableSchema[key].hasOwnProperty('scale') ? tableSchema[key].scale : defaultScale;

            table[tableSchema[key].type](key, tableSchema[key].precision, tableSchema[key].scale);
          } else {
            table[tableSchema[key].type](key, tableSchema[key].precision);
          }
        } else {
          column = table[tableSchema[key].type](key);
        }
        if (tableSchema[key].hasOwnProperty('nullable') && tableSchema[key].nullable === true) {
          column.nullable();
        } else {
          column.notNullable();
        }
        if (tableSchema[key].hasOwnProperty('primary') && tableSchema[key].primary === true) {
          column.primary();
        }
        if (tableSchema[key].hasOwnProperty('unique') && tableSchema[key].unique) {
          column.unique();
        }
        if (tableSchema[key].hasOwnProperty('unsigned') && tableSchema[key].unsigned) {
          column.unsigned();
        }
        if (tableSchema[key].hasOwnProperty('references')) {
          column.references(tableSchema[key].references);
        }
        if (tableSchema[key].hasOwnProperty('onDelete') && tableSchema[key].onDelete.length > 0) {
          column.onDelete(tableSchema[key].onDelete);
        }
        if (tableSchema[key].hasOwnProperty('onUpdate') && tableSchema[key].onUpdate.length > 0) {
          column.onUpdate(tableSchema[key].onUpdate);
        }
        if (tableSchema[key].hasOwnProperty('defaultTo')) {
          column.defaultTo(tableSchema[key].defaultTo);
        }
      });
    });
  }
};