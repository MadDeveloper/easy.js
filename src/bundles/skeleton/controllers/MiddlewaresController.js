import Controller from './../../../vendor/easy/core/Controller'

export default class MiddlewaresController extends Controller {
    constructor( factory ) {
        super( factory )
    }

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

    /*
     * Getters and setters
     */
}
