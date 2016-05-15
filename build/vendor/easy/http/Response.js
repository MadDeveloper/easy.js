"use strict";

Object.defineProperty(exports, "__esModule", {
    value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var Response = function () {
    function Response() {
        _classCallCheck(this, Response);

        this._scope = null;
    }

    /*
     * Getters and setters
     */


    _createClass(Response, [{
        key: "scope",
        get: function get() {
            return this._scope;
        },
        set: function set(scope) {
            this._scope = scope;
            return this;
        }
    }]);

    return Response;
}();

exports.default = Response;