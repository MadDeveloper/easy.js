/*
 * Skeleton model
 */
function Skeleton( SkeletonFactory ) {
    var BundleManager = SkeletonFactory.getBundleManager();
    
    return SkeletonFactory.getDatabase().Model.extend({
        tableName: 'skeletons'
    });
}

module.exports = Skeleton;
