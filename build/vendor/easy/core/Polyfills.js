"use strict";

Object.defineProperty(exports, "__esModule", {
    value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

/*
 * Not recommended to change this file if you do not know the consequences.
 * Some classes in easy vendor use these functions.
 * /!\ Never add a polyfill on Object (can cause problems with ORM or librairies which are based on objects).
 */

var Polyfills = function () {
    function Polyfills(container) {
        _classCallCheck(this, Polyfills);

        this.stringPolyfills();
    }

    _createClass(Polyfills, [{
        key: "stringPolyfills",
        value: function stringPolyfills() {
            if (!String.prototype.isEmpty) {
                String.prototype.isEmpty = function () {
                    return this.valueOf().length === 0;
                };
            }

            if (!String.prototype.isNumber) {
                String.prototype.isNumber = function () {
                    return !isNaN(this.valueOf());
                };
            }

            if (!String.prototype.capitalizeFirstLetter) {
                String.prototype.capitalizeFirstLetter = function () {
                    return this.charAt(0).toUpperCase() + this.slice(1);
                };
            }

            if (!String.prototype.decapitalizeFirstLetter) {
                String.prototype.decapitalizeFirstLetter = function () {
                    return this.charAt(0).toLowerCase() + this.slice(1);
                };
            }
        }
    }]);

    return Polyfills;
}();

exports.default = Polyfills;