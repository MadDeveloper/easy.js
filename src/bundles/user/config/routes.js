const security = require( './security' )
const middlewares = require( './middlewares' )

module.exports = {
    '/roles/:role_id/users': {
        get: 'user:getUsers',
        post: 'user:createUser',
        security: {
            strategy: 'default',
            rules: security[ '/roles/:role_id/users' ],
            focus: 'role_id'
        }
    },

    '/roles/:role_id/users/:user_id': {
        get: 'user:getUser',
        put: 'user:updateUser',
        patch: 'user:patchUser',
        delete: 'user:deleteUser',
        security: {
            strategy: 'default',
            rules: security[ '/roles/:role_id/users' ],
            focus: 'role_id'
        },
        middlewares
    }
}
