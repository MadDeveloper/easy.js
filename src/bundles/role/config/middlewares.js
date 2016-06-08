import RoleMiddlewaresController from './../controllers/RoleMiddlewaresController'

export default function middlewares( router, factory ) {
    /*
     * Dependencies
     */
    let roleMiddlewaresController

    /*
     * Register request and response into Controller
     */
    router.use( ( req, res, next ) => {
        roleMiddlewaresController = new RoleMiddlewaresController( req, res, factory )
        next()
    })

    /*
     * Middlewares
     */
    router.use( '/roles/:id', ( req, res, next ) => {
        roleMiddlewaresController.roleExists( next )
    })
}
