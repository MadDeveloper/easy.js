'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _typeof = typeof Symbol === "function" && typeof Symbol.iterator === "symbol" ? function (obj) { return typeof obj; } : function (obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol ? "symbol" : typeof obj; };

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var String = function () {
  function String() {
    _classCallCheck(this, String);
  }

  _createClass(String, [{
    key: 'asSnakeCase',
    value: function asSnakeCase(originalName) {
      var formatedName = originalName;

      formatedName = formatedName.trim();
      formatedName = this.cleanAccents(formatedName);
      formatedName = formatedName.replace(/[-!#$€£¤§<>%&~=+'"°%`.,:/@\(\)\\\{\[\]\}]/gi, '');
      formatedName = formatedName.replace(/ /g, '_');
      formatedName = formatedName.toLowerCase();

      return formatedName;
    }
  }, {
    key: 'cleanAccents',
    value: function cleanAccents(string) {
      return string.replace(/[^\w ]/gi, '');
    }
  }, {
    key: 'strtr',
    value: function strtr(str, fromObj, to) {
      var fr = '',
          i = 0,
          j = 0,
          lenStr = 0,
          lenFrom = 0,
          tmpStrictForIn = false,
          fromTypeStr = '',
          toTypeStr = '',
          istr = '';
      var tmpFrom = [];
      var tmpTo = [];
      var ret = '';
      var match = false;

      // Received replace_pairs?
      // Convert to normal from->to chars
      if ((typeof fromObj === 'undefined' ? 'undefined' : _typeof(fromObj)) === 'object') {
        for (fr in fromObj) {
          if (fromObj.hasOwnProperty(fr)) {
            tmpFrom.push(fr);
            tmpTo.push(fromObj[fr]);
          }
        }

        fromObj = tmpFrom;
        to = tmpTo;
      }

      // Walk through subject and replace chars when needed
      lenStr = str.length;
      lenFrom = fromObj.length;
      fromTypeStr = typeof fromObj === 'string';
      toTypeStr = typeof to === 'string';

      for (i = 0; i < lenStr; i++) {
        match = false;
        if (fromTypeStr) {
          istr = str.charAt(i);
          for (j = 0; j < lenFrom; j++) {
            if (istr == fromObj.charAt(j)) {
              match = true;
              break;
            }
          }
        } else {
          for (j = 0; j < lenFrom; j++) {
            if (str.substr(i, fromObj[j].length) == fromObj[j]) {
              match = true;
              // Fast forward
              i = i + fromObj[j].length - 1;
              break;
            }
          }
        }
        if (match) {
          ret += toTypeStr ? to.charAt(j) : to[j];
        } else {
          ret += str.charAt(i);
        }
      }

      return ret;
    }
  }]);

  return String;
}();

exports.default = String;