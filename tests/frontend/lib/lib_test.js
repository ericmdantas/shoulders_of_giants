"use strict";

describe('lib', function()
{
    describe('isStringInvalid', function()
    {
        it('should return false', function()
        {
            var _wrongParams = ['', null, undefined, function(){}, true, false, 1, 0, {}, [], '   '];

            for (var i = 0; i < _wrongParams.length; i++)
            {
                expect(lib.isStringInvalid(_wrongParams[i])).toBeTruthy();
            }
        })

        it('should return true', function()
        {
            var _correctParams = ['aaaaaaaaaaaaaaaaa', ' a', '123', 'true', 'false'];

            for (var i = 0; i < _correctParams.length; i++)
            {
                expect(lib.isStringInvalid(_correctParams[i])).toBeFalsy();
            }
        })
    })
})