const routes = require( './config/routes' )
const RoleController = require( './controllers/role.controller' )

module.exports = {
    routes,
    controllers: {
        'role': RoleController
    }
}
