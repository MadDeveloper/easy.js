'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

/*
 * Skeleton model
 */

var Skeleton = function Skeleton(skeletonFactory) {
    _classCallCheck(this, Skeleton);

    var bundleManager = SkeletonFactory.bundleManager;

    return skeletonFactory.database.Model.extend({
        tableName: 'skeletons'
    });
};

exports.default = Skeleton;