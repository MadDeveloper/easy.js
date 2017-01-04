const security = require( './security' )
const middlewares = require( './middlewares' )

module.exports = {
    '/skeletons': {
        get: 'skeleton:getSkeletons',
        post: 'skeleton:createSkeletons',
        security: {
            strategy: 'default',
            rules: security[ '/skeletons' ],
            focus: 'role_id'
        }
    },

    '/skeletons/:skeleton_id': {
        get: 'skeleton:getSkeleton',
        put: 'skeleton:updateSkeleton',
        patch: 'skeleton:patchSkeleton',
        delete: 'skeleton:deleteSkeleton',
        security: {
            strategy: 'default',
            rules: security[ '/skeletons' ],
            focus: 'role_id'
        },
        middlewares
    }
}
