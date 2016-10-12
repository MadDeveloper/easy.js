export default {
    '/skeleton/:skeleton_id': {
        roleExists: {
            param: 'skeleton_id',
            middleware: 'skeletonExists'
        }
    }
}
