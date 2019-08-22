'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});

var _typeof = typeof Symbol === "function" && typeof Symbol.iterator === "symbol" ? function (obj) { return typeof obj; } : function (obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; };

var _hash = require('./hash');

var _hash2 = _interopRequireDefault(_hash);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function data2id(data) {
    var local = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : true;

    var result = void 0;
    if (local && data && data.id) return data.id;
    switch (typeof data === 'undefined' ? 'undefined' : _typeof(data)) {
        case 'number':
        case 'string':
            result = data + '';
            break;

        case 'function':
        case 'boolean':
        case 'undefined':
            result = data + '';
            break;

        default:
            switch (true) {
                case Array.isArray(data):
                    result = '[' + data.map(function (x) {
                        return data2id(x, local);
                    }).join('|') + ']';
                    break;
                case null === data:
                    result = data + '';
                    break;
                default:
                    var list = Object.keys(data);
                    list.sort();
                    result = list.map(function (key) {
                        return key + '=' + data2id(data[key], local);
                    }).join('|');
                    result = '{' + result + '}';
            }
    }

    return (0, _hash2.default)(result);
}

exports.default = data2id;