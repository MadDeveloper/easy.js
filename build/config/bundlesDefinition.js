'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = bundlesDefinition;
function bundlesDefinition(bundleManager) {
  /*
   * Register bundles to implements routing
   */
  bundleManager.define('role').define('user');
  //.define( 'skeleton' ) // uncomment this line if you want verify Skeleton files syntax
}