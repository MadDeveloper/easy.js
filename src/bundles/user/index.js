const { routes }            = require( './config/routes' )
const { UserController }    = require( './controllers/UserController' )

module.exports.routes = routes
module.exports.controller = UserController
