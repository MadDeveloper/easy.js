import Controller from './../../../vendor/easy/core/Controller'

/**
 * @class SkeletonMiddlewaresController
 */
export default class SkeletonMiddlewaresController extends Controller {
    /**
     * @constructor
     * @param  {Factory} factory
     */
    constructor( factory ) {
        super( 'skeleton', factory )
    }

    /**
     * skeletonExists - check if skeleton exists (with id)
     *
     * @returns {Promise}
     */
    skeletonExists() {
        return new Promise( ( resolve, reject ) => {
            const requireOptions = {
                requireBy: this.request.getRouteParameter( 'id' ),
                options: {}
            }

            this.doesRequiredElementExists( 'skeleton', requireOptions )
            .then( skeleton => {
                this.request.define( 'skeleton', skeleton )
                resolve()
            })
            .catch( error => {
                reject( error )
            })
        })
    }
}
