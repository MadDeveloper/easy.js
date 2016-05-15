'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = routing;
function routing(bundleManager) {
  /*
   * Middlewares
   */
  /*
   * Use Request ans Response class as a middleware to manage respectively request and response scope vars
   */
  bundleManager.router.use(function (req, res, next) {
    bundleManager.container.getComponent('Request').scope = req;
    bundleManager.container.getComponent('Response').scope = res;
    next();
  });

  /*
   * Security
   */
  require(__dirname + '/security/authentication')(bundleManager);
  bundleManager.container.getService('security.default')(bundleManager);

  /*
  * bundles routes definitions
  */
  bundleManager.getBundlesDefinitionRouting();

  /*
   * Final middleware: No route found
   */
  bundleManager.router.use(function (req, res) {
    if (!res.headersSent) {
      // if you want strict mode, comment this condition
      bundleManager.container.getComponent('http').notFound();
    }
  });
}