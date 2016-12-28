const security      = require( './security' )
const middlewares   = require( './middlewares' )

module.exports.routes = {
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
        patch: 'patchSkeleton',
        delete: 'deleteSkeleton',
        security: {
            strategy: 'default',
            rules: security[ '/skeletons' ],
            focus: 'role_id'
        },
        middlewares
    }
}
