'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});
exports.default = hashCode;
var CACHE = {};
var MAX = 10000,
    cid = 0;

function getCache(str) {
    return CACHE[str];
}
function setCache(key, str) {
    if (cid > MAX) {
        cid = 0;
        CACHE = {};
    }
    cid++;

    return CACHE[key] = str;
}

function hashCode(str) {
    var hash = 0,
        i,
        chr,
        len;
    str = 'string' == typeof str ? str : '';
    if (str.length === 0) return hash;

    // hit cache
    var result = void 0;
    if (result = getCache(str)) return result;

    // http://stackoverflow.com/questions/7616461/generate-a-hash-from-string-in-javascript-jquery
    // --> http://werxltd.com/wp/2010/05/13/javascript-implementation-of-javas-string-hashcode-method/
    for (i = 0, len = str.length; i < len; i++) {
        chr = str.charCodeAt(i);
        hash = (hash << 5) - hash + chr;
        hash |= 0; // Convert to 32bit integer
    }
    return setCache(str, hash);
};