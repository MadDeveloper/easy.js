import _ from 'lodash'

export default function( bundleManager ) {
    const router        = bundleManager.router
    const container     = bundleManager.container
    const http          = container.getComponent( 'Http' )
    const controller    = container.getComponent( 'Controller' )
    const access        = new ( container.getService( 'security.Access' ) )()

    /*
     * Add your defaults policies security
     */
    router.use(( req, res, next ) => {
        next()
    })
}
