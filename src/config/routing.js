import authentication from './security/authentication'

export default function routing( container, bundleManager, router ) {
    /*
     * Middlewares
     */
        /*
         * Security
         */
        authentication( container, router )

        router.use( ( req, res, next ) => {
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
