import jwt          from 'jsonwebtoken'
import config       from './../config'
import authorized   from './authorized'
import Controller   from './../../vendor/easy/core/Controller'

export default function authentication( container, req, res, router ) {
    const factory       = container.getComponent( 'Factory' )
    const controller    = new Controller( req, res, factory )
    const request       = controller.request
    const response      = controller.response

    /*
     * Defining routes with authorization required
     */
    router.route( '/authentication' )
        .post( () => {
            /*
             * User classes
             */
            const userRepository = factory.entityManager.getRepository( 'user' )

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
                            response.ok({ user, token })

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
    authorized({
        request,
        response,
        secret: config.jwt.secret,
        router
    })
}
