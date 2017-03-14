const middlewares = require.resolve( './config/middlewares' )
const routes = require.resolve( './config/routes' )
const UserController = require( './controllers/user.controller' )

module.exports = {
    name: 'user',
    middlewares,
    routes,
    controllers: {
        UserController
    }
}
