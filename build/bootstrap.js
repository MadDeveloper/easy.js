'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _typeof = typeof Symbol === "function" && typeof Symbol.iterator === "symbol" ? function (obj) { return typeof obj; } : function (obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol ? "symbol" : typeof obj; };

var _express = require('express');

var _express2 = _interopRequireDefault(_express);

var _bodyParser = require('body-parser');

var _bodyParser2 = _interopRequireDefault(_bodyParser);

var _morgan = require('morgan');

var _morgan2 = _interopRequireDefault(_morgan);

var _helmet = require('helmet');

var _helmet2 = _interopRequireDefault(_helmet);

var _cors = require('cors');

var _cors2 = _interopRequireDefault(_cors);

var _compression = require('compression');

var _compression2 = _interopRequireDefault(_compression);

var _numeral = require('numeral');

var _numeral2 = _interopRequireDefault(_numeral);

var _lodash = require('lodash');

var _path = require('path');

var _path2 = _interopRequireDefault(_path);

var _minimist = require('minimist');

var _minimist2 = _interopRequireDefault(_minimist);

var _kernel = require('./vendor/easy/core/kernel');

var _kernel2 = _interopRequireDefault(_kernel);

var _bundlesDefinition = require('./config/bundlesDefinition');

var _bundlesDefinition2 = _interopRequireDefault(_bundlesDefinition);

var _routing = require('./config/routing');

var _routing2 = _interopRequireDefault(_routing);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } } /*
                                                                                                                                                           * Modules Dependencies
                                                                                                                                                           */


var argv = (0, _minimist2.default)(process.argv.slice(2));

var Application =
/**
 * Constructor
 */
function Application(config, cliMode) {
  _classCallCheck(this, Application);

  /*
   * Define root app path
   */
  global.app = global.app || {};
  global.app.root = _path2.default.resolve(__dirname);

  /*
   * API environement
   */

  if ('p' === argv._[0] || 'production' === argv._[0] || 'prod' === argv._[0] || argv.p || argv.prod || argv.production) {
    process.env.NODE_ENV = 'production';
  } else {
    process.env.NODE_ENV = 'development';
  }

  var app = (0, _express2.default)();

  /*
   * Easy.js dependencies
   */
  var kernel = new _kernel2.default().init(__dirname, config);
  var container = kernel.container;
  var message = container.getComponent('Message');
  var database = container.getComponent('Database');

  /*
   * Define database connector (default: ~/config/database/connector/bookshelf)
   */
  database.connect();

  /*
   * Change database into container
   */
  container.changeComponent('Database', database);

  /*
   * Define bundle easy vendor
   */
  var bundleManager = container.getComponent('BundleManager');
  bundleManager.router = _express2.default.Router();

  /*
   * Defines Polyfills
   */
  var polyfills = container.getComponent('Polyfills');

  if (!cliMode) {
    var _ret = function () {
      /*
       * In normal mode we define middlewares, routes and bundles into app
       */

      /*
       * Will permit to retrieve remote ip: req.ip || req.connection.remoteAddress || req.headers['x-forwarded-for']
       */
      app.enable('trust proxy');

      /*
       * Enable CORS: https://www.w3.org/TR/cors/
       */
      app.use((0, _cors2.default)());

      /*
       * Just a collection of nine smaller middleware functions that set security-related HTTP headers
       */
      app.use((0, _helmet2.default)());

      /*
       * Gzip compression (can greatly decrease the size of the response body)
       */
      app.use((0, _compression2.default)());

      /*
       * body-parser middleware for handling request variables
       */
      app.use(_bodyParser2.default.json()); // support json encoded bodies
      app.use(_bodyParser2.default.urlencoded({ extended: true })); // support encoded bodies

      /*
       * Permit to retrieve rawBody into PATCH method
       */
      app.use(function (req, res, next) {
        var method = req.method.toLowerCase();
        var enableMethods = ['patch'];
        var data = '';

        if ((0, _lodash.indexOf)(enableMethods, method) < 0) {
          return next();
        }

        req.setEncoding('utf8');

        req.on('data', function (chunk) {
          data += chunk;
        });

        req.on('end', function () {
          req.rawBody = data;
          next();
        });
      });

      /*
       * Displays everything that happens on the server
       * when dev mode is used
       */
      if (process.env.NODE_ENV === 'development') {
        app.use((0, _morgan2.default)('dev'));
      }

      /*
       * Register bundles for routing
       */
      (0, _bundlesDefinition2.default)(bundleManager);

      /*
       * Loads all the API routes
       */
      (0, _routing2.default)(bundleManager);

      /*
       * Auto call to gc
       */
      var warnDisplayed = false;

      app.use(function (req, res, next) {
        if (global.gc) {
          global.gc();
        } else if (false === warnDisplayed) {
          message.warn("You should launch node server with npm start command in order to enable gc.");
          console.log('\n');
          warnDisplayed = true;
        }

        next();
      });

      /*
       * See memory usage if specified
       */
      if (argv.memory) {
        app.use(function (req, res, next) {
          var memory = process.memoryUsage();

          message.info("---- Memory usage ----");
          message.info("RSS:        " + (0, _numeral2.default)(memory.rss).format('bytes'));
          message.info("Heap total: " + (0, _numeral2.default)(memory.heapTotal).format('bytes'));
          message.info("Heap used:  " + (0, _numeral2.default)(memory.heapUsed).format('bytes'));
          message.info("----------------------");

          next();
        });
      }

      /*
       * Registration router routes
       */
      app.use('/', bundleManager.router);

      /*
       * Returns app
       */
      return {
        v: app
      };
    }();

    if ((typeof _ret === 'undefined' ? 'undefined' : _typeof(_ret)) === "object") return _ret.v;
  } else {
    /*
     * Returns kernel, bundleManager and app in cliMode
     */
    return {
      kernel: kernel,
      bundleManager: bundleManager,
      app: app
    };
  }
};

exports.default = Application;