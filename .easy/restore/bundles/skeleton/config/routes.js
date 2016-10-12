import security from './security'

export const routes = {
    '/skeletons': {
        get: 'getSkeletons',
        post: 'createSkeletons',
        security: {
            strategy: 'default',
            rules: security[ '/skeletons' ],
            focus: 'role_id'
        }
    },

    '/skeletons/:skeleton_id': {
        get: 'getSkeleton',
        put: 'updateSkeleton',
        delete: 'deleteSkeleton',
        security: {
            strategy: 'default',
            rules: security[ '/skeletons' ],
            focus: 'role_id'
        }
    }
}
