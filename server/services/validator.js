"use strict";

(function()
{
    var _checkContentLength = function(req, res, next)
    {
        var MAX_LENGTH_ACCEPTED = 777;

        var _contentLength = req.headers['content-length'] ? parseInt(req.headers['content-length']) : null;

        if (!_contentLength || (_contentLength > MAX_LENGTH_ACCEPTED))
        {
            res
                .status(400)
                .end();

            return;
        }

        next();
    }

    exports.checkContentLength = _checkContentLength;
}())