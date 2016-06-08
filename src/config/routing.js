import authentication from './security/authentication'

export default function routing( container, bundleManager, router ) {
    /*
     * Middlewares
     */

        /*
         * Security
         */
        router.use( ( req, res, next ) => {
            authentication( container, req, res, router )
            container.getService( 'security.default' )
            next()
        })

    /*
    * bundles routes definitions
    */
    bundleManager.getBundlesDefinitionRouting()

    /*
     * Final middleware: No route found
     */
    router.use( ( req, res ) => {
        if ( !res.headersSent ) { // if you want strict mode, comment this condition
            container.getComponent( 'Response' ).notFound()
        }
    })
}
