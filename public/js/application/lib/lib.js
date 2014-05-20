"use strict";

var lib = (function()
{
    var _isStringInvalid = function(str)
    {
        return (!str) || ("string" !== typeof str) || (!str.length) || (!str.trim().length);
    }

    var _isObjectInvalid = function(obj)
    {
        return (!obj) || ("object" !== typeof obj) || (!Object.keys(obj).length);
    }

    var _isFunctionInvalid = function(fn)
    {
        return (!fn) || ("function" !== typeof fn);
    }

    return {
                isStringInvalid: _isStringInvalid,
                isObjectInvalid: _isObjectInvalid,
                isFunctionInvalid: _isFunctionInvalid
           }
}())