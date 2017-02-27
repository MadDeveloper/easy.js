const security = require( './security' )
const middlewares = require( './middlewares' )
const roles = require( 'src/config/roles' )

module.exports = {
    '/roles': {
        get: {
            controller: 'role:getRoles',
            security: {
                strategy: 'default',
                validateToken: true,
                roles: [ roles.any ]
            }
        },
        post: {
            controller: 'role:createRole',
            security: {
                strategy: 'default',
                validateToken: true,
                roles: [ roles.admin ]
            }
        }
    },

    '/roles/:role_id': {
        get: {
            controller: 'role:getRole',
            security: {
                strategy: 'default',
                roles: [ roles.any ]
            }
        },
        put: {
            controller: 'role:updateRole',
            security: {
                strategy: 'default',
                roles: [ roles.admin ]
            }
        },
        delete: {
            controller: 'role:deleteRole',
            security: {
                strategy: 'default',
                roles: [ roles.admin ]
            }
        },
        middlewares
    }
}
