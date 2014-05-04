"use strict";

describe('QuotesController', function()
{
    var _scope, _httpMock;

    beforeEach(module('quotes'));
    beforeEach(inject(function($injector)
    {
        _scope = $injector.get('$rootScope').$new();
        _httpMock = $injector.get('$httpBackend');
    }))

    describe('getQuotes', function()
    {
        it('should fetch request correctly', inject(function($controller)
        {
            _httpMock.expectGET('/api/quotes').respond();
            $controller('QuotesController', {$scope: _scope});
            _httpMock.flush();
        }))

        it('should save the response from the server - empty', inject(function($controller)
        {
            _httpMock.expectGET('/api/quotes').respond()
            $controller('QuotesController', {$scope: _scope});
            _httpMock.flush();
            expect(_scope.quotes).toEqual([]);
        }))

        it('should save the response from the server - no quotes', inject(function($controller)
        {
            _httpMock.expectGET('/api/quotes').respond({quotes: []})
            $controller('QuotesController', {$scope: _scope});
            _httpMock.flush();
            expect(_scope.quotes).toEqual([]);
        }))

        it('should save the response from the server - no quotes', inject(function($controller)
        {
            _httpMock.expectGET('/api/quotes').respond({quotes: [{author: "Eric", quote: "Alo", likes: 0}]})
            $controller('QuotesController', {$scope: _scope});
            _httpMock.flush();
            expect(_scope.quotes.length).toEqual(1);
            expect(_scope.quotes[0]).toEqual({author: "Eric", quote: "Alo", likes: 0});
        }))
    })

    describe('setOrder / getOrder', function()
    {
        it('getOrder should be \'quote\'', inject(function($controller)
        {
            $controller('QuotesController', {$scope: _scope});

            expect(_scope.getOrder).toEqual('author');
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

    describe('favQuote', function()
    {
        it('should throw error - wrong id param', inject(function($controller)
        {
            $controller('QuotesController', {$scope: _scope});
            var _wrongParams = [null, undefined, function(){}, true, false, 1, 0, '  ', {}, []];

            for (var i = 0; i < _wrongParams.length; i++)
            {
                expect(function()
                {
                    _scope.favQuote(_wrongParams[i]);
                }).toThrow(new Error('O id passado não é uma string válida. Não será possível favoritar a mensagem [controller].'));
            }
        }))

        it('should fetch like correctly', inject(function($controller)
        {
            _httpMock.expectGET('/api/quotes').respond();
            _httpMock.expectPUT('/api/quotes/a123').respond();
            $controller('QuotesController', {$scope: _scope});
            var _id = 'a123';

            _scope.favQuote(_id);
            _httpMock.flush();
        }))

        it('should NOT substitute the existing object with the retrieved object from the server - empty response from the server', inject(function($controller)
        {
            var _allQuotesFromServer = {quotes: [{_id: '0123', author: 'algumaPessoa', quote: 'abc', likes: 0},
                {_id: '1123', author: 'outraPessoa', quote: 'abc', likes: 0},
                {_id: 'a123', author: 'eu', quote: 'blablabla', likes: 99}]};

            var _specificQuoteFromServer = {};

            _httpMock.expectGET('/api/quotes').respond(_allQuotesFromServer);
            _httpMock.expectPUT('/api/quotes/a123').respond(_specificQuoteFromServer);

            $controller('QuotesController', {$scope: _scope});

            var _id = 'a123';

            _scope.favQuote(_id);
            _httpMock.flush();

            expect(_scope.quotes[2].likes).toEqual(99);
        }))

        it('should NOT substitute the existing object with the retrieved object from the server - no updated object retrieved', inject(function($controller)
        {
            var _allQuotesFromServer = {quotes: [{_id: '0123', author: 'algumaPessoa', quote: 'abc', likes: 0},
                {_id: '1123', author: 'outraPessoa', quote: 'abc', likes: 0},
                {_id: 'a123', author: 'eu', quote: 'blablabla', likes: 99}]};

            var _specificQuoteFromServer = {updated: {}};

            _httpMock.expectGET('/api/quotes').respond(_allQuotesFromServer);
            _httpMock.expectPUT('/api/quotes/a123').respond(_specificQuoteFromServer);

            $controller('QuotesController', {$scope: _scope});

            var _id = 'a123';

            _scope.favQuote(_id);
            _httpMock.flush();

            expect(_scope.quotes[2].likes).toEqual(99);
        }))

        it('should NOT substitute the existing object with the retrieved object from the server - no id retrieved', inject(function($controller)
        {
            var _allQuotesFromServer = {quotes: [{_id: '0123', author: 'algumaPessoa', quote: 'abc', likes: 0},
                                                 {_id: '1123', author: 'outraPessoa', quote: 'abc', likes: 0},
                                                 {_id: 'a123', author: 'eu', quote: 'blablabla', likes: 99}]};

            var _specificQuoteFromServer = {updated: {author: 'eu', quote: 'blablabla', likes: 100}};

            _httpMock.expectGET('/api/quotes').respond(_allQuotesFromServer);
            _httpMock.expectPUT('/api/quotes/a123').respond(_specificQuoteFromServer);

            $controller('QuotesController', {$scope: _scope});

            var _id = 'a123';

            _scope.favQuote(_id);
            _httpMock.flush();

            expect(_scope.quotes[2].likes).toEqual(99);
        }))

        it('should substitute the existing object with the retrieved object from the server', inject(function($controller)
        {
            var _allQuotesFromServer = {quotes: [{_id: '0123', author: 'algumaPessoa', quote: 'abc', likes: 0},
                                                 {_id: '1123', author: 'outraPessoa', quote: 'abc', likes: 0},
                                                 {_id: 'a123', author: 'eu', quote: 'blablabla', likes: 99}]};

            var _specificQuoteFromServer = {updated: {_id: 'a123', author: 'eu', quote: 'blablabla', likes: 100}};

            _httpMock.expectGET('/api/quotes').respond(_allQuotesFromServer);
            _httpMock.expectPUT('/api/quotes/a123').respond(_specificQuoteFromServer);

            $controller('QuotesController', {$scope: _scope});

            var _id = 'a123';

            _scope.favQuote(_id);
            _httpMock.flush();

            expect(_scope.quotes[2].likes).toEqual(100);
        }))
    })
})