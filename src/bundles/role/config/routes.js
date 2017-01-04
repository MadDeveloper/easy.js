const security = require( './security' )
const middlewares = require( './middlewares' )

module.exports = {
    '/roles': {
        get: 'role:getRoles',
        post: 'role:createRole',
        security: {
            strategy: 'default',
            rules: security[ '/roles' ],
            focus: 'role_id'
        }
    },

    '/roles/:role_id': {
        get: 'role:getRole',
        put: 'role:updateRole',
        delete: 'role:deleteRole',
        security: {
            strategy: 'default',
            rules: security[ '/roles' ],
            focus: 'role_id'
        },
        middlewares
    }
}
