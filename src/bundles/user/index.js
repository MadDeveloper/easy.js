const routes = require( './config/routes' )
const UserController = require( './controllers/user.controller' )

module.exports = {
    routes,
    controllers: {
        'user': UserController
    }
}
