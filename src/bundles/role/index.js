const routes = require( './config/routes' )
const middlewares = require( './config/middlewares' )
const RoleController = require( './controllers/role.controller' )

module.exports = {
    routes,
    middlewares,
    controllers: {
        RoleController
    }
}
