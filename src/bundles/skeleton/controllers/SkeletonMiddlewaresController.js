import Controller from './../../../vendor/easy/core/Controller'

/**
 * @class SkeletonMiddlewaresController
 */
export default class SkeletonMiddlewaresController extends Controller {
    /**
     * @constructor
     * @param  {Factory} factory
     */
    constructor( req, res, factory ) {
        super( req, res, factory )
    }

    /**
     * skeletonExists - check if skeleton exists (with id)
     *
     * @param {function} next
     */
    skeletonExists( next ) {
        const requireOptions = {
            requireBy: this.request.getRouteParameter( 'id' ),
            options: {}
        }

        this.doesRequiredElementExists( 'skeleton', requireOptions )
        .then( skeleton => {
            this.request.define( 'skeleton', skeleton )
            next()
        })
        .catch( error => {
            this.response.notFound()
        })
    }
}
