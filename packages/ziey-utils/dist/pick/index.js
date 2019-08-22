'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});

exports.default = function (content) {
    var options = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : {};
    var map = [],
        openTag = options.ignoreStart,
        closeTag = options.ignoreEnd,
        makeErr = function makeErr(one, index) {
        var err = new Error('closeTag did not match openTag at index ' + index + ' : ' + one);
        err.index = index;
        err.content = one;
        throw err;
    },
        handler_outside = function handler_outside(content, index, one) {
        var _handleTargetRange = handleTargetRange(content, options, index),
            _result = _handleTargetRange.result,
            _map = _handleTargetRange.map;

        map.push(_map);
        return _result.join('');
    };


    var result = void 0;
    if (openTag && closeTag) {
        result = splitMe({ content: content, openTag: openTag, closeTag: closeTag, makeErr: makeErr, handler_outside: handler_outside });
    } else {
        result = [handler_outside(content, 0, content)];
    }
    return {
        result: result,
        map: 1 == map.length ? map[0] : map
    };
};

function inputAdjustDefault(str) {
    return str.trim();
}

function outputAdjustDefault(str) {
    return str;
}

var same = function same(x) {
    return x;
};

function splitMe() {
    var _ref = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {},
        _ref$content = _ref.content,
        content = _ref$content === undefined ? '' : _ref$content,
        openTag = _ref.openTag,
        closeTag = _ref.closeTag,
        makeErr = _ref.makeErr,
        _ref$handler_outside = _ref.handler_outside,
        handler_outside = _ref$handler_outside === undefined ? same : _ref$handler_outside,
        _ref$handler_inside = _ref.handler_inside,
        handler_inside = _ref$handler_inside === undefined ? same : _ref$handler_inside;

    var result = [];
    (content + '').split(openTag).forEach(function (one, index) {
        if (!index) {
            result.push(handler_outside(one, index, one));
            return; // ignore first one
        }
        var rightList = one.split(closeTag);
        if (2 != rightList.length) throw makeErr(one, index);
        result.push(handler_inside(rightList.shift(), index, one));
        result.push(handler_outside(rightList.shift(), index, one));
    });
    return result.filter(function (x) {
        return x;
    });
}

function handleTargetRange(content) {
    var _ref2 = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : {},
        _ref2$openTag = _ref2.openTag,
        openTag = _ref2$openTag === undefined ? '{%' : _ref2$openTag,
        _ref2$closeTag = _ref2.closeTag,
        closeTag = _ref2$closeTag === undefined ? '%}' : _ref2$closeTag,
        _ref2$inputAdjust = _ref2.inputAdjust,
        inputAdjust = _ref2$inputAdjust === undefined ? inputAdjustDefault : _ref2$inputAdjust,
        _ref2$outputAdjust = _ref2.outputAdjust,
        outputAdjust = _ref2$outputAdjust === undefined ? outputAdjustDefault : _ref2$outputAdjust;

    var range_index = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : 0;


    var map = [],
        makeErr = function makeErr(one, index) {
        index = index - 1;
        var err = new Error('closeTag did not match openTag at index ' + range_index + ' - ' + index + ' : ' + one);
        err.range_index = range_index;
        err.index = index;
        err.content = one;
        throw err;
    },
        handler_inside = function handler_inside(content, index, one) {
        index = index - 1;
        var from = inputAdjust(content),
            to = outputAdjust(from);
        map.push({ from: from, to: to });
        return to;
    };

    var result = splitMe({ content: content, openTag: openTag, closeTag: closeTag, makeErr: makeErr, handler_inside: handler_inside });
    return { result: result, map: map };
}