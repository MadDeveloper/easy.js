export default function authentication( bundleManager ) {
    /*
     * retrieve Router
     */
    var router = bundleManager.getRouter();

    /*
     * Configurations
     */
    var config = require( __dirname + '/../config' );

    /*
     * Provide Http helpers
     */
    var Request = bundleManager.getContainer().getDependency( 'Request' );
    var http    = bundleManager.getContainer().getDependency( 'Http' );

    /*
     * JWT
     */
    var jwt = require( 'jsonwebtoken' );

    /*
     * User classes
     */
    var UserFactory     = bundleManager.getFactory( 'User' );
    var UserRepository  = UserFactory.getRepository();

    /*
     * Vendor dependencies
     */
    var Controller = bundleManager.getContainer().getDependency( 'Controller' );

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
                UserRepository.read({ email: Request.getBodyParameter( 'email' ) })
                .then( function( user ) {
                    if ( user ) {

                        if ( Request.getBodyParameter( 'password' ) == user.get('password') ) {

                            var token = jwt.sign( user.toJSON(), config.jwt.secret, { expiresIn: 86400 /* 24 hours */ } );
                            http.ok({ token: token });

                        } else {
                            http.unauthorized();
                        }

                    } else {
                        http.notFound();
                    }
                })
                .catch( function( error ) {
                    http.internalServerError( error );
                });
            } else {
                http.badRequest();
            }
        });

    /*
     * Check token validity
     */
    require( './authorized' )( http, Request, jwt, config.jwt.secret, router );
}
