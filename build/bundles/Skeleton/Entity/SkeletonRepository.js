"use strict";

function SkeletonRepository(SkeletonFactory) {
    return {
        readAll: function readAll(options) {
            var Skeletons = SkeletonFactory.getCollection();
            return Skeletons.forge().fetch(options);
        },

        read: function read(id, options) {
            return SkeletonFactory.getModel().forge({ id: id }).fetch(options);
        },

        save: function save(skeleton, params, options) {
            return skeleton.save({}, options);
        },

        patch: function patch(skeleton, _patch, options) {
            var patchToApply = {};

            patchToApply[_patch.path.substring(1)] = _patch.value;

            return skeleton.save(patchToApply, options);
        },

        delete: function _delete(skeleton, options) {
            return skeleton.destroy(options);
        }
    };
}

module.exports = SkeletonRepository;