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
        .catch( error => {
            this.response.notFound()
        })
    }
}
