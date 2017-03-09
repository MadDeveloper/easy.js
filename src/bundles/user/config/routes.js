const roles = require( '../../../config/roles' )
const middlewares = require( './middlewares' )

module.exports = {
    '/roles/:role_id/users': {
        get: {
            controller: 'user:getUsers',
            security: {
                strategy: 'default',
                roles: [ roles.any ]
            }
        },
        post: {
            controller: 'user:createUser',
            security: {
                strategy: 'default',
                roles: [ roles.admin ]
            }
        }
    },

    '/roles/:role_id/users/:user_id': {
        get: {
            controller: 'user:getUser',
            security: {
                strategy: 'default',
                roles: [ roles.any ]
            }
        },
        put: {
            controller: 'user:updateUser',
            security: {
                strategy: 'default',
                roles: [ roles.user ]
            }
        },
        patch: {
            controller: 'user:patchUser',
            security: {
                strategy: 'default',
                roles: [ roles.user ]
            }
        },
        delete: {
            controller: 'user:deleteUser',
            security: {
                strategy: 'default',
                roles: [ roles.admin ]
            }
        },
        middlewares
    }
}
