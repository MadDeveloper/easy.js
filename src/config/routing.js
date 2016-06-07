import authentication from './security/authentication'

export default function routing( container, bundleManager, router ) {
    /*
     * Middlewares
     */
        /*
         * Use Request ans Response class as a middleware to manage respectively request and response scope vars
         */
        router.use( ( req, res, next ) => {
            container.getComponent( 'Request' ).scope = req
            container.getComponent( 'Response' ).scope = res
            next()
        })

        /*
         * Security
         */
        authentication( container, router )
        container.getService( 'security.default' )

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
