"use strict";

describe('QuotesModel', function()
{
    var _httpMock, _quote;

    beforeEach(module('quotes'));
    beforeEach(inject(function($injector)
    {
        _httpMock = $injector.get('$httpBackend');
        _quote = new ($injector.get('QuotesModel'))();
    }))

    describe('getAll', function()
    {
        it('should fetch request correctly', function()
        {
            _httpMock.expectGET('/api/quotes').respond();
            _quote.getAll();
            _httpMock.flush();
        })
    })

    describe('favQuote', function()
    {
        it('should throw and error - wrong id param', function()
        {
            var _wrongParam = [null, undefined, true, false, function(){}, 1, 0, {}, []];

            for (var i = 0; i < _wrongParam.length; i++)
            {
                expect(function()
                {
                    _quote.favQuote(_wrongParam[i]);
                }).toThrow(new Error('O id passado não é uma string válida. Não será possível favoritar a mensagem [service].'));
            }
        })

        it('should fetch like correctly', function()
        {
            _httpMock.expectPUT('/api/quotes/a123').respond();
            var _id = 'a123';

            _quote.favQuote(_id);
            _httpMock.flush();
        })
    })

    describe('getAllOrdered', function()
    {
        it('should throw an error - wrong sort param', function()
        {
            var _wrongParams = [null, undefined, 1, 0, function(){}, [], {}, true, false];

            for (var i = 0; i < _wrongParams.length; i++)
            {
                expect(function()
                {
                    _quote.getOrdered(_wrongParams[i])
                }).toThrow(new Error('A ordem passada não é válida. Não será possível fazer a ordenação.'));
            }
        })

        it('should make the request correctly', function()
        {
            _httpMock.expectGET('/api/quotes/ordered?sort=author').respond();
            var _order = 'author';

            _quote.getOrdered(_order);
            _httpMock.flush();
        })
    })
})