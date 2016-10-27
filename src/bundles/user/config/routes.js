import security     from './security'
import middlewares  from './middlewares'

export const routes = {
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
