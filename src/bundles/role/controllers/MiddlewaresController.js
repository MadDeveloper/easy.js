import Controller from './../../../vendor/easy/core/Controller'

export default class MiddlewaresController extends Controller {
    constructor( roleFactory ) {
        super( roleFactory.container )
    }

    roleExists() {
        return new Promise( ( resolve, reject ) => {
            const requireOptions = {
                requireBy: this.request.getRouteParameter( 'id' ),
                options: {}
            }

            this.doesRequiredElementExists( 'Role', requireOptions, this.bundleManager, role => {
                this.request.define( 'role', role )
                resolve()
            })
        })
    }

    /*
     * Getters and setters
     */
}
