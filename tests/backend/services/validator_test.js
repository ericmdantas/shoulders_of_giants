"use strict";

var _validator = require('../../../server/services/validator');
var expect = require('chai').expect;

describe('validator', function()
{
    it('não deve chamar a função next - content-length não existe', function()
    {
        var _called = false;
        var _endCalled = false;
        var _req = {headers: {}};
        var _res = {status: function(){ expect(arguments[0]).to.equal(400); return {end: function(){_endCalled = true;}}}};
        var _next = function(){_called = true;};

        _validator.checkContentLength(_req, _res, _next);

        expect(_called).to.be.false;
        expect(_endCalled).to.be.true;
    })

    it('não deve chamar a função de next - length maior que o esperado', function()
    {
        var _called = false;
        var _endCalled = false;
        var _req = {headers: {'content-length': '778'}};
        var _res = {status: function(){ expect(arguments[0]).to.equal(400); return {end: function(){_endCalled = true;}}}};
        var _next = function(){_called = true;};

        _validator.checkContentLength(_req, _res, _next);

        expect(_called).to.be.false;
        expect(_endCalled).to.be.true;
    })

    it('não deve chamar a função next - content-length não existe - status correto', function()
    {
        var _called = false;
        var _endCalled = false;
        var _req = {headers: {}};
        var _res = {status: function(){ expect(arguments[0]).to.equal(400); return {end: function(){_endCalled = true;}}}};
        var _next = function(){_called = true;};

        _validator.checkContentLength(_req, _res, _next);

        expect(_called).to.be.false;
        expect(_endCalled).to.be.true;
    })

    it('deve chamar o método de next normalmente', function()
    {
        var _called = false;
        var _endCalled = false;
        var _req = {headers: {'content-length': '776'}};
        var _res = {status: function(){ expect(arguments[0]).to.equal(400); return {end: function(){_endCalled = true;}}}};
        var _next = function(){_called = true;};

        _validator.checkContentLength(_req, _res, _next);

        expect(_called).to.be.true;
        expect(_endCalled).to.be.false;
    })
})