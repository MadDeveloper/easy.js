export default function security( router, factory ) {
    /*
     * Dependencies
     */
    let userController
    let access

    /*
     * Retrieve userController
     */
    router.use( ( req, res, next ) => {
        userController = req.tmp.userController
        access = userController.access
        next()
    })

    /*
     * Security middlewares
     */
    router.use( '/roles/:role_id/users', ( req, res, next ) => {
        userController.authorize({
            restrictions: {
                mustBe: [ access.any ],
                canCreate: [ access.user ],
                canRead: [],
                canUpdate: [ access.user ],
                canDelete: [ access.user ]
            },
            focus: 'role_id',
            next
        })
    })
}
