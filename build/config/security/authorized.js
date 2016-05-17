'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});
exports.default = authorized;
function authorized(response, request, jwt, secret, router) {
    /*
     * Define authorization control middleware
     */
    router.use(function (req, res, next) {
        var token = request.getBodyParameter('token') || request.getRouteParameter('token') || request.scope.headers['x-access-token'];

        if (token) {

            jwt.verify(token, secret, function (error, decoded) {
                if (!error) {
                    request.setBodyParameter('token', decoded);
                    next();
                } else {
                    // wrong token or expired
                    if ('development' == process.env.NODE_ENV) {
                        next();
                    } else {
                        response.unauthorized();
                    }
                }
            });
        } else {
            // No token found
            if ('development' == process.env.NODE_ENV) {
                next();
            } else {
                response.unauthorized();
            }
        }
    });
}