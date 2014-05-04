"use strict";

describe('QuotesService', function()
{
    var httpMock, QuotesService;

    beforeEach(module('quotes'));
    beforeEach(inject(function($injector)
    {
        httpMock = $injector.get('$httpBackend');
        QuotesService = $injector.get('QuotesService');
    }))

    describe('getQuotes', function()
    {
        it('should fetch request correctly', function()
        {
            httpMock.expectGET('/api/quotes').respond();
            QuotesService.getQuotes();
            httpMock.flush();
        })
    })

    describe('getBestQuotes', function()
    {
        it('should fetch request correctly', function()
        {
            httpMock.expectGET('/api/quotes/most_liked').respond();
            QuotesService.getBestQuotes();
            httpMock.flush();
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
            httpMock.expectPUT('/api/quotes/a123').respond();
            var _id = 'a123';

            QuotesService.favQuote(_id);
            httpMock.flush();
        })
    })
})