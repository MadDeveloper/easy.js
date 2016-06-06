import Controller from './../../../vendor/easy/core/Controller'

/**
 * @class UserMiddlewaresController
 */
export default class UserMiddlewaresController extends Controller {
    /**
     * @constructor
     * @param  {Factory} factory
     */
    constructor( factory ) {
        super( factory )
    }

    userExists() {
        return new Promise( ( resolve, reject ) => {
            const requireOptions = {
                requireBy: this.request.getRouteParameter( 'idUser' ),
                options: {}
            }

            this.doesRequiredElementExists( 'user', requireOptions )
            .then( user => {
                this.request.define( 'user', user )
                resolve()
            })
            .catch( error => {
                reject( error )
            })
        })
    }
}
