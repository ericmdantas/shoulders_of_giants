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
})