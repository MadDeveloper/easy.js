'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var ArrayLibrary = function () {
    function ArrayLibrary() {
        _classCallCheck(this, ArrayLibrary);
    }

    _createClass(ArrayLibrary, [{
        key: 'treeView',
        value: function treeView(element, depth) {
            function applyTabWithDepth(depth) {
                var tabs = '';

                for (var i = 0; i <= depth; i++) {
                    tabs += '    ';
                }

                return tabs;
            }

            depth = depth || 0;

            var nextDepth = depth + 1;
            var tree = '';

            if (depth > 0) {
                tree += applyTabWithDepth(depth - 1);
            }

            tree += Array.isArray(element) ? '[\n' : '{\n';

            for (var prop in element) {
                if (element.hasOwnProperty(prop)) {
                    var item = element[prop];

                    if (Array.isArray(item) || item instanceof Object && typeof item !== 'function') {
                        tree += this.treeView(item, nextDepth);
                    } else {
                        tree += applyTabWithDepth(depth);

                        if (!Array.isArray(element) && element instanceof Object) {
                            tree += prop + ': ';
                        }

                        tree += typeof item === 'function' ? '[Function]' : '' + item;
                        tree += ',\n';
                    }
                }
            }

            if (depth > 0) {
                tree += applyTabWithDepth(depth - 1);
            }

            tree += Array.isArray(element) ? ']' : '}';

            if (depth > 0) {
                tree += ',\n';
            }

            return tree;
        }
    }]);

    return ArrayLibrary;
}();

exports.default = ArrayLibrary;