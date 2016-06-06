import Controller from './../../../vendor/easy/core/Controller'

export default class RoleMiddlewaresController extends Controller {
    /**
     * @constructor
     * @param  {Factory} factory
     */
    constructor( factory ) {
        super( factory )
    }

    roleExists() {
        return new Promise( ( resolve, reject ) => {
            const requireOptions = {
                requireBy: this.request.getRouteParameter( 'id' ),
                options: {}
            }

            this.doesRequiredElementExists( 'role', requireOptions )
            .then( role => {
                this.request.define( 'role', role )
                resolve()
            })
            .catch( error => {
                reject( error )
            })
        })
    }
}
