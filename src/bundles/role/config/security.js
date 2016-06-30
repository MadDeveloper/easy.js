export default function security( router, factory ) {
    /*
     * Dependencies
     */
    let roleController
    let access

    /*
     * Retrieve roleController
     */
    router.use( ( req, res, next ) => {
        roleController = req.tmp.roleController
        access = roleController.access
        next()
    })

    /*
     * Security middlewares
     */
    router.use( '/roles', ( req, res, next ) => {
        roleController.authorize({
            restrictions: {
                mustBe: [ access.any ],
                canCreate: [ access.admin ],
                canRead: [],
                canUpdate: [ access.admin ],
                canDelete: [ access.admin ]
            },
            focus: 'role_id',
            next
        })
    })
}
