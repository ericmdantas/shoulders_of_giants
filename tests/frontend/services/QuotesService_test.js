"use strict";

describe('QuotesService', function()
{
    var _httpMock, QuotesService;

    beforeEach(module('quotes'));
    beforeEach(inject(function($injector)
    {
        _httpMock = $injector.get('$httpBackend');
        QuotesService = $injector.get('QuotesService');
    }))

    describe('getQuotes', function()
    {
        it('should fetch request correctly', function()
        {
            _httpMock.expectGET('/api/quotes').respond();
            QuotesService.getQuotes();
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
                    QuotesService.favQuote(_wrongParam[i]);
                }).toThrow(new Error('O id passado não é uma string válida. Não será possível favoritar a mensagem [service].'));
            }
        })

        it('should fetch like correctly', function()
        {
            _httpMock.expectPUT('/api/quotes/a123').respond();
            var _id = 'a123';

            QuotesService.favQuote(_id);
            _httpMock.flush();
        })
    })

    describe('getQuotesOrdered', function()
    {
        it('should throw an error - wrong sort param', function()
        {
            var _wrongParams = [null, undefined, 1, 0, function(){}, [], {}, true, false];

            for (var i = 0; i < _wrongParams.length; i++)
            {
                expect(function()
                {
                    QuotesService.getQuotesOrdered(_wrongParams[i])
                }).toThrow(new Error('A ordem passada não é válida. Não será possível fazer a ordenação.'));
            }
        })

        it('should make the request correctly', function()
        {
            _httpMock.expectGET('/api/quotes/ordered/?sort=author').respond();
            var _order = 'author';

            QuotesService.getQuotesOrdered(_order);
            _httpMock.flush();
        })
    })
})