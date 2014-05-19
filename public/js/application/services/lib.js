"use strict";

var lib = (function()
{
    var _isStringInvalid = function(str)
    {
        return (!str) || ("string" !== typeof str) || (str.length === 0) || (str.trim().length === 0);
    }

    var _isObjectInvalid = function(obj)
    {
        return (!obj) || ("object" !== typeof obj) || (!Object.keys(obj).length);
    }

    return {
                isStringInvalid: _isStringInvalid,
                isObjectInvalid: _isObjectInvalid
           }
}())