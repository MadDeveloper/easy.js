import UserMiddlewaresController from './../controllers/UserMiddlewaresController'

export default function middlewares( router, factory ) {
    /*
     * Dependencies
     */
    let userMiddlewaresController

    /*
     * Register request and response into Controller
     */
    router.use( ( req, res, next ) => {
        userMiddlewaresController = new UserMiddlewaresController( req, res, factory )
        next()
    })

    /*
     * Middlewares
     */
    router.use( '/roles/:idRole/users/:idUser', ( req, res, next ) => {
        userMiddlewaresController.userExists( next )
    })
}
