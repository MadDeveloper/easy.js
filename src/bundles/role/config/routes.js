import security     from './security'
import middlewares  from './middlewares'

export const routes = {
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
