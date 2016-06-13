/**
 * @class DefaultSecurityService
 */
export default class DefaultSecurityService {
    /**
     * @constructor
     * @param  {Router} { router }
     */
    constructor({ router }) {
        /*
         * Refer to express router
         */
        router = router.scope

        /*
         * Add your defaults policies security
         */
        router.use( ( req, res, next ) => {
            next()
        })
    }
}
