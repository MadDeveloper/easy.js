'use strict';

function authorized(http, Request, jwt, secret, router) {
    /*
     * Define authorization control middleware
     */
    router.use(function (req, res, next) {
        var token = Request.getBodyParameter('token') || Request.getRouteParameter('token') || Request.getScope().headers['x-access-token'];

        if (token) {

            jwt.verify(token, secret, function (error, decoded) {
                if (!error) {
                    Request.setBodyParameter('token', decoded);
                    next();
                } else {
                    // wrong token or expired
                    if ('development' == process.env.NODE_ENV) {
                        next();
                    } else {
                        http.unauthorized();
                    }
                }
            });
        } else {
            // No token found
            if ('development' == process.env.NODE_ENV) {
                next();
            } else {
                http.unauthorized();
            }
        }
    });
}

module.exports = authorized;