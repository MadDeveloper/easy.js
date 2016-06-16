import Controller from '~/vendor/easy/core/Controller'

/**
 * @class UserMiddlewaresController
 * @extends Controller
 */
export default class UserMiddlewaresController extends Controller {
    /**
     * @constructor
     * @param  {Factory} factory
     */
    constructor( req, res, factory ) {
        super( req, res, factory )
    }

    /**
     * userExists
     *
     * @param {function} next
     */
    userExists( next ) {
        const requireOptions = {
            requireBy: this.request.getRouteParameter( 'idUser' ),
            options: {}
        }

        this.doesRequiredElementExists( 'user', requireOptions )
        .then( user => {
            this.request.define( 'user', user )
            next()
        })
        .catch( () => this.response.notFound() )
    }
}
