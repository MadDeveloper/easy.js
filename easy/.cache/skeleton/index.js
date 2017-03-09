const routes = require( './config/routes' )
const SkeletonController = require( './controllers/skeleton.controller' )

module.exports = {
    routes,
    controllers: {
        'skeleton': SkeletonController
    }
}
