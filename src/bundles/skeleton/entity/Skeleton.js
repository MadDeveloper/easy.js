/*
 * Skeleton model
 */
export default class Skeleton {
    constructor( skeletonFactory ) {
        const bundleManager = SkeletonFactory.bundleManager

        return skeletonFactory.database.Model.extend({
            tableName: 'skeletons'
        })
    }
}
