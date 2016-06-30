export default function security( router, factory ) {
    /*
     * Dependencies
     */
    let skeletonController
    let access

    /*
     * Retrieve skeletonController
     */
    router.use( ( req, res, next ) => {
        skeletonController = req.tmp.skeletonController
        access = skeletonController.access
        next()
    })

    /*
     * Security middlewares
     */
    router.use( '/skeletons', ( req, res, next ) => {
        skeletonController.authorize({
            restrictions: {
                mustBe: [ access.any ],
                canCreate: [],
                canRead: [],
                canUpdate: [],
                canDelete: []
            },
            focus: 'role_id',
            next
        })
    })
}
