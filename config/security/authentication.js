function authentication( BundleManager ) {
    /*
     * retrieve Router
     */
    var router = BundleManager.getRouter();

    /*
     * Configurations
     */
    var config = require( __dirname + '/../config' );

    /*
     * Provide Http helpers
     */
    var http = BundleManager.getDependencyInjector().getDependency( 'Http' );

    /*
     * JWT
     */
    var jwt = require( 'jsonwebtoken' );

    /*
     * User classes
     */
    var UserFactory     = BundleManager.getFactory( 'User' );
    var UserRepository  = UserFactory.getRepository();

    /*
     * Vendor dependencies
     */
    var Controller = BundleManager.getDependencyInjector().getDependency( 'Controller' );

    /*
     * Defining routes with authorization required
     */
    router.route( '/authentication' )
        .post( function( req, res ) {
            var requestValidity = Controller.verifyParams(
                [
                    { property: 'email', typeExpected: 'string' },
                    { property: 'password', typeExpected: 'string' }
                ],
                req.body
            );

            if ( requestValidity ) {
                UserRepository.read({ email: req.body.email })
                .then( function( user ) {
                    if ( user ) {

                        if ( req.body.password == user.get('password') ) {

                            var token = jwt.sign( user.toJSON(), config.jwt.secret, { expiresIn: 86400 /* 24 hours */ } );
                            http.ok( res, { token: token } );

                        } else {
                            http.unauthorized( res );
                        }

                    } else {
                        http.notFound( res );
                    }
                })
                .catch( function( error ) {
                    http.internalServerError( req, res, error );
                });
            } else {
                http.badRequest( res );
            }
        });

    /*
     * Check token validity
     */
    require( './authorized' )( http, jwt, config.jwt.secret, router );
}

module.exports = authentication;
