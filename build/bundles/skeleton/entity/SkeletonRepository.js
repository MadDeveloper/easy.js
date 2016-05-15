"use strict";

Object.defineProperty(exports, "__esModule", {
    value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var SkeletonRepository = function () {
    function SkeletonRepository(skeletonFactory) {
        _classCallCheck(this, SkeletonRepository);

        this._skeletonFactory = skeletonFactory;
    }

    _createClass(SkeletonRepository, [{
        key: "readAll",
        value: function readAll(options) {
            var skeletons = this.skeletonFactory.getCollection();
            return skeletons.forge().fetch(options);
        }
    }, {
        key: "read",
        value: function read(id, options) {
            return this.skeletonFactory.getModel().forge({ id: id }).fetch(options);
        }
    }, {
        key: "save",
        value: function save(skeleton, params, options) {
            return skeleton.save({}, options);
        }
    }, {
        key: "patch",
        value: function patch(skeleton, _patch, options) {
            var patchToApply = {};

            patchToApply[_patch.path.substring(1)] = _patch.value;

            return skeleton.save(patchToApply, options);
        }
    }, {
        key: "delete",
        value: function _delete(skeleton, options) {
            return skeleton.destroy(options);
        }

        /*
         * Getters and setters
         */

    }, {
        key: "skeletonFactory",
        get: function get() {
            return this._skeletonFactory;
        }
    }]);

    return SkeletonRepository;
}();

exports.default = SkeletonRepository;