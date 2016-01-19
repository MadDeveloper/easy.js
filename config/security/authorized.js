function authorized( http, jwt, secret, router ) {
    /*
     * Define authorization control middleware
     */
    router.use( function( req, res, next ) {
        var token = req.body.token || req.params.token || req.headers[ 'x-access-token' ];

        if ( token ) {

            jwt.verify( token, secret, function( error, decoded ) {
                if ( !error ) {
                    req.token = decoded;
                    next();
                } else {
                    // wrong token or expired
                    if ( 'development' == process.env.NODE_ENV ) {
                        next();
                    } else {
                        http.unauthorized( res );
                    }
                }
            });

        } else {
            // No token found
            if ( 'development' == process.env.NODE_ENV ) {
                next();
            } else {
                http.unauthorized( res );
            }
        }
    });
}

module.exports = authorized;
