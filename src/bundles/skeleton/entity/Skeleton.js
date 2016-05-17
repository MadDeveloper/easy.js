/*
 * Skeleton model
 */
export default class Skeleton {
    constructor( skeletonFactory ) {
        const bundleManager = skeletonFactory.bundleManager

        return skeletonFactory.database.Model.extend({
            tableName: 'skeletons'
        })
    }
}
