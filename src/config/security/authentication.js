import jwt          from 'jsonwebtoken'
import config       from './../config'
import authorized   from './authorized'
import Controller   from './../../vendor/easy/core/Controller'

export default function authentication( container, bundleManager, router ) {
    /*
     * Special case, use easy Controller to use specifics methods
     */
    const controller = new Controller( container )

    /*
     * Provide Http helpers
     */
    const request   = container.getComponent( 'Request' )
    const response  = container.getComponent( 'Response' )

    /*
     * User classes
     */
    const userFactory     = bundleManager.getFactory( 'user' )
    const userRepository  = userFactory.getRepository()

    /*
     * Defining routes with authorization required
     */
    router.route( '/authentication' )
        .post( () => {
            const requestValidity = controller.verifyParams(
                [
                    { property: 'email', typeExpected: 'string' },
                    { property: 'password', typeExpected: 'string' }
                ],
                request.getBody()
            )

            if ( requestValidity ) {
                userRepository.read({ email: request.getBodyParameter( 'email' ) })
                .then( user => {
                    if ( user ) {

                        if ( request.getBodyParameter( 'password' ) == user.get('password') ) {

                            const token = jwt.sign( user.toJSON(), config.jwt.secret, { expiresIn: 86400 /* 24 hours */ } )
                            response.ok({ token: token })

                        } else {
                            response.unauthorized()
                        }

                    } else {
                        response.notFound()
                    }
                })
                .catch( error => {
                    response.internalServerError( error )
                })
            } else {
                response.badRequest()
            }
        })

    /*
     * Check token validity
     */
    authorized( response, request, config.jwt.secret, router )
}
