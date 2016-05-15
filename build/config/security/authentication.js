'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});
exports.default = authentication;

var _jsonwebtoken = require('jsonwebtoken');

var _jsonwebtoken2 = _interopRequireDefault(_jsonwebtoken);

var _config = require('./../config');

var _config2 = _interopRequireDefault(_config);

var _authorized = require('./authorized');

var _authorized2 = _interopRequireDefault(_authorized);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function authentication(bundleManager) {
    /*
     * retrieve Router
     */
    var router = bundleManager.router;

    /*
     * Provide Http helpers
     */
    var request = bundleManager.container.getComponent('Request');
    var http = bundleManager.container.getComponent('Http');

    /*
     * User classes
     */
    var userFactory = bundleManager.getFactory('User');
    var userRepository = userFactory.getRepository();

    /*
     * Vendor dependencies
     */
    var controller = bundleManager.container.getComponent('Controller');

    /*
     * Defining routes with authorization required
     */
    router.route('/authentication').post(function (req, res) {
        var requestValidity = controller.verifyParams([{ property: 'email', typeExpected: 'string' }, { property: 'password', typeExpected: 'string' }], req.body);

        if (requestValidity) {
            userRepository.read({ email: request.getBodyParameter('email') }).then(function (user) {
                if (user) {

                    if (request.getBodyParameter('password') == user.get('password')) {

                        var token = _jsonwebtoken2.default.sign(user.toJSON(), _config2.default.jwt.secret, { expiresIn: 86400 /* 24 hours */ });
                        http.ok({ token: token });
                    } else {
                        http.unauthorized();
                    }
                } else {
                    http.notFound();
                }
            }).catch(function (error) {
                http.internalServerError(error);
            });
        } else {
            http.badRequest();
        }
    });

    /*
     * Check token validity
     */
    (0, _authorized2.default)(http, request, _jsonwebtoken2.default, _config2.default.jwt.secret, router);
}