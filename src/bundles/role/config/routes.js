const middlewares = require( './middlewares' )
const roles = require( '../../../config/roles' )

module.exports = {
    '/roles': {
        get: {
            controller: 'role:getRoles',
            security: {
                strategy: 'default',
                roles: [ roles.any ]
            }
        },
        post: {
            controller: 'role:createRole',
            security: {
                strategy: 'default',
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
