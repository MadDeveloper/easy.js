'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});

exports.default = function (bundleManager) {
    var router = bundleManager.router;
    var container = bundleManager.container;
    var http = container.getComponent('Http');
    var controller = container.getComponent('Controller');
    var access = new (container.getService('security.Access'))();

    /*
     * Add your defaults policies security
     */
    router.use(function (req, res, next) {
        next();
    });
};

var _lodash = require('lodash');

var _lodash2 = _interopRequireDefault(_lodash);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }