const security      = require( './security' )
const middlewares   = require( './middlewares' )

const routes = {
    '/roles/:role_id/users': {
        get: 'getUsers',
        post: 'createUser',
        security: {
            strategy: 'default',
            rules: security[ '/roles/:role_id/users' ],
            focus: 'role_id'
        }
    },

    '/roles/:role_id/users/:user_id': {
        get: 'getUser',
        put: 'updateUser',
        patch: 'patchUser',
        delete: 'deleteUser',
        security: {
            strategy: 'default',
            rules: security[ '/roles/:role_id/users' ],
            focus: 'role_id'
        },
        middlewares
    }
}

module.exports.routes = routes
