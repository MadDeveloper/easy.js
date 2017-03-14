const middlewares = require.resolve( './config/middlewares' )
const routes = require.resolve( './config/routes' )
const RoleController = require( './controllers/role.controller' )

module.exports = {
    name: 'role',
    middlewares,
    routes,
    controllers: {
        RoleController
    }
}
