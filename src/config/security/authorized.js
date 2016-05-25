import jwt from 'jsonwebtoken'

export default function authorized( response, request, secret, router ) {
    /*
     * Define authorization control middleware
     */
    router.use( ( req, res, next ) => {
        const token = request.getBodyParameter( 'token' ) || request.getRouteParameter( 'token' ) || request.scope.headers[ 'x-access-token' ]

        if ( token ) {

            jwt.verify( token, secret, ( error, decoded ) => {
                if ( !error ) {
                    request.setBodyParameter( 'token', decoded )
                    next()
                } else {
                    // wrong token or expired
                    if ( 'development' == process.env.NODE_ENV ) {
                        next()
                    } else {
                        response.unauthorized()
                    }
                }
            })

        } else {
            // No token found
            if ( 'development' == process.env.NODE_ENV ) {
                next()
            } else {
                response.unauthorized()
            }
        }
    })
}
