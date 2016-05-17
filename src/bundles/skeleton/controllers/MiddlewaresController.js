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

            this.controller.doesRequiredElementExists( 'Skeleton', requireOptions, this.bundleManager, skeleton => {
                this.request.define( 'skeleton', skeleton )
                resolve()
            })
        })
    }

    /*
     * Getters and setters
     */
}
