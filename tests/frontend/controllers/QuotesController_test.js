"use strict";

describe('QuotesController', function()
{
    var scope, httpMock;

    beforeEach(module('quotes'));
    beforeEach(inject(function($injector)
    {
        scope = $injector.get('$rootScope').$new();
        httpMock = $injector.get('$httpBackend');
    }))

    describe('getQuotes', function()
    {
        it('should fetch request correctly', inject(function($controller)
        {
            httpMock.expectGET('/api/quotes').respond();
            $controller('QuotesController', {$scope: scope});
            httpMock.flush();
        }))

        it('should save the response from the server - empty', inject(function($controller)
        {
            httpMock.expectGET('/api/quotes').respond()
            $controller('QuotesController', {$scope: scope});
            httpMock.flush();
            expect(scope.quotes).toEqual([]);
        }))

        it('should save the response from the server - no quotes', inject(function($controller)
        {
            httpMock.expectGET('/api/quotes').respond({quotes: []})
            $controller('QuotesController', {$scope: scope});
            httpMock.flush();
            expect(scope.quotes).toEqual([]);
        }))

        it('should save the response from the server - no quotes', inject(function($controller)
        {
            httpMock.expectGET('/api/quotes').respond({quotes: [{author: "Eric", quote: "Alo", likes: 0}]})
            $controller('QuotesController', {$scope: scope});
            httpMock.flush();
            expect(scope.quotes.length).toEqual(1);
            expect(scope.quotes[0]).toEqual({author: "Eric", quote: "Alo", likes: 0});
        }))
    })
})