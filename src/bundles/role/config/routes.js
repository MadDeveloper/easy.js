const security      = require( './security' )
const middlewares   = require( './middlewares' )

module.exports.routes = {
    '/roles': {
        get: 'getRoles',
        post: 'createRole',
        security: {
            strategy: 'default',
            rules: security[ '/roles' ],
            focus: 'role_id'
        }
    },

    '/roles/:role_id': {
        get: 'getRole',
        put: 'updateRole',
        delete: 'deleteRole',
        security: {
            strategy: 'default',
            rules: security[ '/roles' ],
            focus: 'role_id'
        },
        middlewares
    }
}
