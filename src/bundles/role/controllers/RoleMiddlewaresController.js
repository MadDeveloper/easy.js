import Controller from './../../../vendor/easy/core/Controller'

export default class RoleMiddlewaresController extends Controller {
    /**
     * @constructor
     * @param  {Factory} factory
     */
    constructor( req, res, factory ) {
        super( req, res, factory )
    }

    /**
     * roleExists
     *
     * @param {function} next
     */
    roleExists( next ) {
        const requireOptions = {
            requireBy: this.request.getRouteParameter( 'id' ),
            options: {}
        }

        this.doesRequiredElementExists( 'role', requireOptions )
        .then( role => {
            this.request.define( 'role', role )
            next()
        })
        .catch( error => this.response.notFound() )
    }
}
