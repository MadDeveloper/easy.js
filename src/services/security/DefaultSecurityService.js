import Service  from './../../vendor/easy/core/Service'

export default class DefaultSecurityService extends Service {
    constructor( container ) {
        super( container )
    }

    load() {
        /*
         * Add your defaults policies security
         */
        this.router.use( ( req, res, next ) => {
            next()
        })
    }
}
