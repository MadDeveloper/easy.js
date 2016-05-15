import jwt          from 'jsonwebtoken'
import config       from './../config'
import authorized   from './authorized'

export default function authentication( bundleManager ) {
    /*
     * retrieve Router
     */
    const router = bundleManager.router

    /*
     * Provide Http helpers
     */
    const request = bundleManager.container.getComponent( 'Request' )
    const http    = bundleManager.container.getComponent( 'Http' )

    /*
     * User classes
     */
    const userFactory     = bundleManager.getFactory( 'User' )
    const userRepository  = userFactory.getRepository()

    /*
     * Vendor dependencies
     */
    const controller = bundleManager.container.getComponent( 'Controller' )

    /*
     * Defining routes with authorization required
     */
    router.route( '/authentication' )
        .post(( req, res ) => {
            const requestValidity = controller.verifyParams(
                [
                    { property: 'email', typeExpected: 'string' },
                    { property: 'password', typeExpected: 'string' }
                ],
                req.body
            )

            if ( requestValidity ) {
                userRepository.read({ email: request.getBodyParameter( 'email' ) })
                .then( user => {
                    if ( user ) {

                        if ( request.getBodyParameter( 'password' ) == user.get('password') ) {

                            const token = jwt.sign( user.toJSON(), config.jwt.secret, { expiresIn: 86400 /* 24 hours */ } )
                            http.ok({ token: token })

                        } else {
                            http.unauthorized()
                        }

                    } else {
                        http.notFound()
                    }
                })
                .catch( error => {
                    http.internalServerError( error )
                })
            } else {
                http.badRequest()
            }
        })

    /*
     * Check token validity
     */
    authorized( http, request, jwt, config.jwt.secret, router )
}
