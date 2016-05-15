export default class MiddlewaresController {
    constructor( skeletonFactory ) {
        this._skeletonFactory   = skeletonFactory
        this._bundleManager     = this._skeletonFactory.bundleManager
        this._container         = this._bundleManager.container
        this._http              = this._container.getComponent( 'Http' )
        this._controller        = this._container.getComponent( 'Controller' )
        this._request           = this._container.getComponent( 'Request' )
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
    get skeletonFactory() {
        return this._skeletonFactory
    }

    get bundleManager() {
        return this._bundleManager
    }

    get container() {
        return this._container
    }

    get http() {
        return this._http
    }

    get controller() {
        return this._controller
    }

    get request() {
        return this._request
    }
}
