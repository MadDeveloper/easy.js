'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = {
  /*
   * 'namespace.service': 'path relative to services/ directory'
   * 'service': 'path relative to services/ directory'
   */

  /* database */
  'database.schema': 'database/SchemaDatabaseService',

  /* security */
  'security.access': 'security/AccessSecurityService',
  'security.default': 'security/DefaultSecurityService'
};