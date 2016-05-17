'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _typeof = typeof Symbol === "function" && typeof Symbol.iterator === "symbol" ? function (obj) { return typeof obj; } : function (obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol ? "symbol" : typeof obj; };

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _Service2 = require('./../../vendor/easy/core/Service');

var _Service3 = _interopRequireDefault(_Service2);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var StringService = function (_Service) {
  _inherits(StringService, _Service);

  function StringService(container) {
    _classCallCheck(this, StringService);

    return _possibleConstructorReturn(this, Object.getPrototypeOf(StringService).call(this, container));
  }

  _createClass(StringService, [{
    key: 'load',
    value: function load() {}
  }, {
    key: 'strtr',
    value: function strtr(str, from, to) {
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
      if ((typeof from === 'undefined' ? 'undefined' : _typeof(from)) === 'object') {
        for (fr in from) {
          if (from.hasOwnProperty(fr)) {
            tmpFrom.push(fr);
            tmpTo.push(from[fr]);
          }
        }

        from = tmpFrom;
        to = tmpTo;
      }

      // Walk through subject and replace chars when needed
      lenStr = str.length;
      lenFrom = from.length;
      fromTypeStr = typeof from === 'string';
      toTypeStr = typeof to === 'string';

      for (i = 0; i < lenStr; i++) {
        match = false;
        if (fromTypeStr) {
          istr = str.charAt(i);
          for (j = 0; j < lenFrom; j++) {
            if (istr == from.charAt(j)) {
              match = true;
              break;
            }
          }
        } else {
          for (j = 0; j < lenFrom; j++) {
            if (str.substr(i, from[j].length) == from[j]) {
              match = true;
              // Fast forward
              i = i + from[j].length - 1;
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
  }, {
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
  }]);

  return StringService;
}(_Service3.default);

exports.default = StringService;