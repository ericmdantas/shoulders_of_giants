"use strict";

describe('QuotesController', function()
{
    var _scope, httpMock;

    beforeEach(module('quotes'));
    beforeEach(inject(function($injector)
    {
        _scope = $injector.get('$rootScope').$new();
        httpMock = $injector.get('$httpBackend');
    }))

    describe('getQuotes', function()
    {
        it('should fetch request correctly', inject(function($controller)
        {
            httpMock.expectGET('/api/quotes').respond();
            $controller('QuotesController', {$scope: _scope});
            httpMock.flush();
        }))

        it('should save the response from the server - empty', inject(function($controller)
        {
            httpMock.expectGET('/api/quotes').respond()
            $controller('QuotesController', {$scope: _scope});
            httpMock.flush();
            expect(_scope.quotes).toEqual([]);
        }))

        it('should save the response from the server - no quotes', inject(function($controller)
        {
            httpMock.expectGET('/api/quotes').respond({quotes: []})
            $controller('QuotesController', {$scope: _scope});
            httpMock.flush();
            expect(_scope.quotes).toEqual([]);
        }))

        it('should save the response from the server - no quotes', inject(function($controller)
        {
            httpMock.expectGET('/api/quotes').respond({quotes: [{author: "Eric", quote: "Alo", likes: 0}]})
            $controller('QuotesController', {$scope: _scope});
            httpMock.flush();
            expect(_scope.quotes.length).toEqual(1);
            expect(_scope.quotes[0]).toEqual({author: "Eric", quote: "Alo", likes: 0});
        }))
    })

    describe('setOrder / getOrder', function()
    {
        it('getOrder should be \'quote\'', inject(function($controller)
        {
            $controller('QuotesController', {$scope: _scope});

            expect(_scope.getOrder).toEqual('quote');
        }))

        it('should throw error - wrong order param', inject(function($controller)
        {
            $controller('QuotesController', {$scope: _scope});

            var _wrongParams = [null, undefined, true, false, function(){}, 1, 0, {}, [], '  '];

            for (var i = 0; i < _wrongParams.length; i++)
            {
                expect(function()
                {
                    _scope.setOrder(_wrongParams[i]);
                }).toThrow(new Error('Ordenação incorreta. O tipo do parâmetro deve ser uma string.'));
            }
        }))

        it('should change getOrder', inject(function($controller)
        {
            $controller('QuotesController', {$scope: _scope});

            _scope.setOrder('someKindOfOrder');

            expect(_scope.getOrder).toEqual('someKindOfOrder');
        }))
    })
})