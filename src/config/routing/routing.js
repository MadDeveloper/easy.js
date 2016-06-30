import authentication from './../security/authentication'

export default function routing( container, bundleManager, router ) {
    /*
     * Create tmp object into request to permit transit object without Request class, use it carefully
     */
    router.all( '*', ( req, res, next ) => {
        req.tmp = {}
        next()
    })

    /*
     * Security
     */
    router.use( ( req, res, next ) => {
        container.getService( 'security.default' )
        next()
    })

    authentication( container, router )

    /*
     * Bundles routes definitions
     */
    bundleManager.getBundlesDefinitionRouting()

    /*
     * Final middleware: No route found
     */
    router.use( ( req, res ) => {
        if ( !res.headersSent ) { // if you want strict mode, comment this condition
            res.status( 404 ).end()
        }
    })
}
