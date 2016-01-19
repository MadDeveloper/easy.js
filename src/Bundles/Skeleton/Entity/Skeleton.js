/*
 * Skeleton model
 */
function Skeleton( SkeletonFactory ) {
    return SkeletonFactory.getDatabase().Model.extend({
        tableName: 'skeletons'
    });
}

module.exports = Skeleton;
