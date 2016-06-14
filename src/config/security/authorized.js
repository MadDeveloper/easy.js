import jwt          from 'jsonwebtoken'
import { indexOf }  from 'lodash'
import publicRoutes from './../routing/public'
import Controller   from '~/vendor/easy/core/Controller'

export default function authorized( container, secret, router ) {
    /*
     * Authorization control middleware
     */
    router.use( ( req, res, next ) => {
        /*
         * public route or dev mode
         */
        if ( -1 !== indexOf( publicRoutes, req.originalUrl ) || 'development' == process.env.NODE_ENV ) {
            next()
        } else {
            /*
             * Prod mode
             */
            const factory       = container.getComponent( 'Factory' )
            const controller    = new Controller( req, res, factory )
            const request       = controller.request
            const response      = controller.response
            const token         = request.getBodyParameter( 'token' ) || request.getRouteParameter( 'token' ) || request.scope.headers[ 'x-access-token' ]

            if ( token ) {
                jwt.verify( token, secret, ( error, decoded ) => {
                    if ( !error ) {
                        request.setBodyParameter( 'token', decoded )
                        next()
                    } else {
                        /*
                         * Wrong token (expired?)
                         */
                        response.unauthorized()
                    }
                })
            } else {
                /*
                 * No token found
                 */
                response.unauthorized()
            }
        }
    })
}
