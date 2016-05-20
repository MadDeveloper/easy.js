"use strict";

Object.defineProperty(exports, "__esModule", {
    value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var Entity = function () {
    function Entity(bundleFactory) {
        _classCallCheck(this, Entity);

        this._bundleManager = bundleFactory.bundleManager;
        this._database = this._bundleManager.database;
    }

    /*
     * Getters and setters
     */


    _createClass(Entity, [{
        key: "bundleManager",
        get: function get() {
            return this._bundleManager;
        }
    }, {
        key: "database",
        get: function get() {
            return this._database;
        }
    }]);

    return Entity;
}();

exports.default = Entity;