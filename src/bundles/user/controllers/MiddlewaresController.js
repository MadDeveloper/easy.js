import Controller from './../../../vendor/easy/core/Controller'

export default class MiddlewaresController extends Controller {
    constructor( userFactory ) {
        super( userFactory.container )
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

    /*
     * Getters and setters
     */
}
