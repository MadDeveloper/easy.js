/*
 * Skeleton model
 */
export default class Skeleton {
    constructor( skeletonFactory ) {
        const bundleManager = skeletonFactory.bundleManager
        const database      = bundleManager.container.getComponent( 'Database' ).connection

        return database.Model.extend({
            tableName: 'skeletons'
        })
    }
}
