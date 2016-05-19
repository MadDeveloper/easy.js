'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _lodash = require('lodash');

var _Service2 = require('./../../vendor/easy/core/Service');

var _Service3 = _interopRequireDefault(_Service2);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var SchemaDatabaseService = function (_Service) {
    _inherits(SchemaDatabaseService, _Service);

    function SchemaDatabaseService(container) {
        _classCallCheck(this, SchemaDatabaseService);

        var _this = _possibleConstructorReturn(this, Object.getPrototypeOf(SchemaDatabaseService).call(this, container));

        _this._knex = _this.database.knex;
        return _this;
    }

    _createClass(SchemaDatabaseService, [{
        key: 'load',
        value: function load() {}
    }, {
        key: 'createSchema',
        value: function createSchema(schemaName) {
            return this.knex.raw('CREATE DATABASE ' + schemaName + '');
        }
    }, {
        key: 'schemaExists',
        value: function schemaExists(schemaName) {
            try {
                return this.knex.schema.withSchema(schemaName);
            } catch (error) {
                return false;
            }
        }
    }, {
        key: 'dropTable',
        value: function dropTable(tableName) {
            return this.knex.schema.dropTableIfExists(tableName);
        }
    }, {
        key: 'tableExists',
        value: function tableExists(tableName) {
            return this.knex.schema.hasTable(tableName);
        }
    }, {
        key: 'truncateTable',
        value: function truncateTable(tableName) {
            return this.knex.raw('truncate table ' + tableName);
        }
    }, {
        key: 'clearTable',
        value: function clearTable(tableName) {
            return this.knex(tableName).del();
        }
    }, {
        key: 'createTable',
        value: function createTable(tableName, tableSchema) {
            return this.knex.schema.createTable(tableName, function (table) {
                var column = void 0;
                var columnKeys = (0, _lodash.keys)(tableSchema);

                (0, _lodash.each)(columnKeys, function (key) {
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

        /*
         * Getters and setters
         */

    }, {
        key: 'knex',
        get: function get() {
            return this._knex;
        }
    }]);

    return SchemaDatabaseService;
}(_Service3.default);

exports.default = SchemaDatabaseService;