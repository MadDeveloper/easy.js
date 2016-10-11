import security from './security'

export const routes = {
    '/roles': {
        get: 'getRoles',
        post: 'createRole',
        security: security[ '/roles' ]
    },

    '/roles/:role_id': {
        get: 'getRole',
        put: 'updateRole',
        delete: 'deleteRole',
        security: security[ '/roles' ]
    }
}
