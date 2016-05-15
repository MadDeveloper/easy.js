'use strict';

var routing = function routing(BundleManager) {
  /*
   * Middlewares
   */
  /*
   * Use Request ans Response class as a middleware to manage respectively request and response scope vars
   */
  BundleManager.getRouter().use(function (req, res, next) {
    BundleManager.getContainer().getDependency('Request').registerRequestScope(req);
    BundleManager.getContainer().getDependency('Response').registerResponseScope(res);
    next();
  });

  /*
   * Security
   */
  require(__dirname + '/security/authentication')(BundleManager);
  BundleManager.getContainer().getService('security.default')(BundleManager);

  /*
  * bundles routes definitions
  */
  BundleManager.getBundlesRegisteredRouting();

  /*
   * Final middleware: No route found
   */
  BundleManager.getRouter().use(function (req, res) {
    if (!res.headersSent) {
      // if you want strict mode, comment this condition
      BundleManager.getContainer().getDependency('Http').notFound();
    }
  });
};

module.exports = routing;