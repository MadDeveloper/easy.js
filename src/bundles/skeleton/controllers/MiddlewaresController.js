import Controller from './../../../vendor/easy/core/Controller'

export default class MiddlewaresController extends Controller {
    constructor( skeletonFactory ) {
        super( skeletonFactory.container )
    }

    skeletonExists() {
        return new Promise( ( resolve, reject ) => {
            const requireOptions = {
                requireBy: this.request.getRouteParameter( 'id' ),
                options: {}
            }

            this.doesRequiredElementExists( 'skeleton', requireOptions, this.bundleManager )
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
