'use strict';

function bundlesDefinition(BundleManager) {
  /*
   * Register bundles to implements routing
   */
  BundleManager.register('Role').register('User')
  // .register( 'Skeleton' ) // uncomment this line if you want verify Skeleton files syntax
  ;
}

module.exports = bundlesDefinition;