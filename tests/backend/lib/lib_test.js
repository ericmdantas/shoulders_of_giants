"use strict";

var assert = require('assert');
var lib = require('../../../lib/lib');

describe('lib', function()
{
    describe('isStringInvalid', function()
    {
        it('should return true', function()
        {
            var _wrongParams = ['', null, undefined, function(){}, true, false, 1, 0, {}, [], '   '];

            for (var i = 0; i < _wrongParams.length; i++)
            {
                assert.strictEqual(lib.isStringInvalid(_wrongParams[i]), true);
            }
        })

        it('should return false', function()
        {
            var _correctParams = ['aaaaaaaaaaaaaaaaa', ' a', '123', 'true', 'false'];

            for (var i = 0; i < _correctParams.length; i++)
            {
                assert.strictEqual(lib.isStringInvalid(_correctParams[i]), false);
            }
        })
    })

    describe('isObjectInvalid', function()
    {
        it('should return true', function()
        {
            var _wrongParams = ['', null, undefined, function(){}, true, false, 1, 0, {}, [], '   '];

            for (var i = 0; i < _wrongParams.length; i++)
            {
                assert.strictEqual(lib.isObjectInvalid(_wrongParams[i]), true);
            }
        })

        it('should return false', function()
        {
            var _correctParams = [[1], [{a: 1}], {a: "a"}, [{"a": true}]];

            for (var i = 0; i < _correctParams.length; i++)
            {
                assert.strictEqual(lib.isObjectInvalid(_correctParams[i]), false);
            }
        })
    })

    describe('isFunctionInvalid', function()
    {
        it('should return true', function()
        {
            var _wrongParams = [null, undefined, 1, 0, '', '   ', 'a', {a: 1}, [{}], []];

            for (var i = 0; i < _wrongParams.length; i++)
            {
                assert.strictEqual(lib.isFunctionInvalid(_wrongParams[i]), true);
            }
        })

        it('should return false', function()
        {
            var _correctParams = [function(){}, function abc(){}, function xyz(){console.log()}, function a123(a){console.log(a)}];

            for (var i = 0; i < _correctParams.length; i++)
            {
                assert.strictEqual(lib.isFunctionInvalid(_correctParams[i]), false);
            }
        })
    })
})