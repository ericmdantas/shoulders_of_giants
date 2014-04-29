"use strict";

var lib = (function()
{
    function _isStringInvalid(str)
    {
        return (!str) || ("string" !== typeof str) || (str.length === 0) || (str.trim().length === 0);
    }

    return {
                isStringInvalid: _isStringInvalid
           }
}())