"use strict";

describe('QuotesController', function()
{
    var _scope, _httpMock, _SocketService, _QuotesDAO, _SocketService;
    var CONTROLLER_NAME = 'QuotesController';

    beforeEach(module('quotes'));
    beforeEach(inject(function($injector)
    {
        _scope = $injector.get('$rootScope').$new();
        _httpMock = $injector.get('$httpBackend');
        _SocketService = $injector.get('SocketService');
        _QuotesDAO = $injector.get('QuotesDAO');
        _SocketService = $injector.get('SocketService');
    }))

    describe('getQuotes', function()
    {
        it('should fetch request correctly', inject(function($controller)
        {
            _httpMock.expectGET('/api/quotes').respond();
            $controller(CONTROLLER_NAME, {$scope: _scope});
            _httpMock.flush();
        }))

        it('should save the response from the server - empty', inject(function($controller)
        {
            _httpMock.expectGET('/api/quotes').respond()
            $controller(CONTROLLER_NAME, {$scope: _scope});
            _httpMock.flush();
            expect(_scope.quotes.length).toEqual(0);
            expect(_scope.quotesKeeper.length).toEqual(0);
        }))

        it('should save the response from the server - no quotes', inject(function($controller)
        {
            _httpMock.expectGET('/api/quotes').respond([])
            $controller(CONTROLLER_NAME, {$scope: _scope});
            _httpMock.flush();
            expect(_scope.quotes.length).toEqual(0);
            expect(_scope.quotesKeeper.length).toEqual(0);
        }))

        it('should save the response from the server', inject(function($controller)
        {
            _httpMock.expectGET('/api/quotes').respond([{author: "Eric", quote: "Alo", likes: 0}]);
            $controller(CONTROLLER_NAME, {$scope: _scope});

            _httpMock.flush();

            expect(_scope.quotes.length).toEqual(1);
            expect(_scope.quotesKeeper.length).toEqual(1);
            expect(_scope.quotes[0].author).toEqual("Eric");
            expect(_scope.quotes[0].quote).toEqual("Alo");
            expect(_scope.quotes[0].likes).toEqual(0);

            expect(_scope.quotesKeeper[0].author).toEqual("Eric");
            expect(_scope.quotesKeeper[0].quote).toEqual("Alo");
            expect(_scope.quotesKeeper[0].likes).toEqual(0);
        }))
    })

    describe('setOrder / getOrder', function()
    {
        it('getOrder should be \'quote\'', inject(function($controller)
        {
            $controller(CONTROLLER_NAME, {$scope: _scope});

            expect(_scope.getOrder).toEqual('author');
        }))

        it('should throw error - wrong order param', inject(function($controller)
        {
            $controller(CONTROLLER_NAME, {$scope: _scope});

            var _wrongParams = [null, undefined, true, false, function(){}, 1, 0, {}, []];

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
            $controller(CONTROLLER_NAME, {$scope: _scope});

            _scope.setOrder('someKindOfOrder');

            expect(_scope.getOrder).toEqual('someKindOfOrder');
        }))
    })

    describe('favQuote', function()
    {
        it('should throw error - wrong id param', inject(function($controller)
        {
            spyOn(_QuotesDAO, 'favQuote').andCallFake(angular.noop);
            spyOn(_SocketService, 'emit').andCallFake(angular.noop);

            $controller(CONTROLLER_NAME, {$scope: _scope});
            var _wrongParams = [null, undefined, function(){}, true, false, 1, 0, '  ', {}, []];

            for (var i = 0; i < _wrongParams.length; i++)
            {
                _scope.favQuote(_wrongParams[i]);

                expect(_QuotesDAO.favQuote).toHaveBeenCalledWith(_wrongParams[i]);
                expect(_SocketService.emit).not.toHaveBeenCalled();
            }
        }))

        it('should fetch like correctly', inject(function($controller)
        {
            _httpMock.expectGET('/api/quotes').respond();

            spyOn(_SocketService, 'emit').andCallFake(angular.noop);

            $controller(CONTROLLER_NAME, {$scope: _scope});

            var _id = 'a123';

            _scope.favQuote(_id);

            expect(_SocketService.emit).toHaveBeenCalledWith('fav:quote', _id);
        }))

        it('should NOT substitute the existing object with the retrieved object from the server - empty response from the server', inject(function($controller)
        {
            spyOn(_SocketService, 'emit').andCallThrough();
            spyOn(_SocketService, 'on').andCallThrough();

            var _allQuotesFromServer = [{_id: '0123', author: 'algumaPessoa', quote: 'abc', likes: 0},
                                        {_id: '1123', author: 'outraPessoa', quote: 'abc', likes: 0},
                                        {_id: 'a123', author: 'eu', quote: 'blablabla', likes: 99}];


            _httpMock.expectGET('/api/quotes').respond(_allQuotesFromServer);

            $controller(CONTROLLER_NAME, {$scope: _scope});

            var _id = 'a123';

            _scope.favQuote(_id);

            expect(_SocketService.emit).toHaveBeenCalledWith('fav:quote', _id);
        }))

        it('should NOT substitute the existing object with the retrieved object from the server - no updated object retrieved', inject(function($controller)
        {
            spyOn(_SocketService, 'emit').andCallFake(angular.noop);

            var _allQuotesFromServer = [{_id: '0123', author: 'algumaPessoa', quote: 'abc', likes: 0},
                                        {_id: '1123', author: 'outraPessoa', quote: 'abc', likes: 0},
                                        {_id: 'a123', author: 'eu', quote: 'blablabla', likes: 99}];

            _httpMock.expectGET('/api/quotes').respond(_allQuotesFromServer);

            $controller(CONTROLLER_NAME, {$scope: _scope});

            var _id = 'a123';

            _scope.favQuote(_id);

            expect(_SocketService.emit).toHaveBeenCalledWith('fav:quote', _id);
        }))

        it('should NOT substitute the existing object with the retrieved object from the server - no id retrieved', inject(function($controller)
        {
            spyOn(_SocketService, 'emit').andCallFake(angular.noop);

            var _allQuotesFromServer = [{_id: '0123', author: 'algumaPessoa', quote: 'abc', likes: 0},
                                        {_id: '1123', author: 'outraPessoa', quote: 'abc', likes: 0},
                                        {_id: 'a123', author: 'eu', quote: 'blablabla', likes: 99}];

            _httpMock.expectGET('/api/quotes').respond(_allQuotesFromServer);

            $controller(CONTROLLER_NAME, {$scope: _scope});

            var _id = 'a123';

            _scope.favQuote(_id);

            expect(_SocketService.emit).toHaveBeenCalledWith('fav:quote', _id);
        }))

        it('should substitute the existing object with the retrieved object from the server', inject(function($controller)
        {
            spyOn(_SocketService, 'emit').andCallFake(angular.noop);

            var _allQuotesFromServer = [{_id: '0123', author: 'algumaPessoa', quote: 'abc', likes: 0},
                                        {_id: '1123', author: 'outraPessoa', quote: 'abc', likes: 0},
                                        {_id: 'a123', author: 'eu', quote: 'blablabla', likes: 99}];

            var _specificQuoteFromServer = {_id: 'a123', author: 'eu', quote: 'blablabla', likes: 100};

            _httpMock.expectGET('/api/quotes').respond(_allQuotesFromServer);

            $controller(CONTROLLER_NAME, {$scope: _scope});

            var _id = 'a123';

            _scope.favQuote(_id);

            expect(_SocketService.emit).toHaveBeenCalledWith('fav:quote', _id);
        }))
    })

    describe('setSingle', function()
    {
        it('should throw error - wrong quotes param', inject(function($controller)
        {
            $controller(CONTROLLER_NAME, {$scope: _scope});

            var _wrongParams = [null, undefined, function(){}, true, false, 1, 0, '  '];

            for (var i = 0; i < _wrongParams.length; i++)
            {
                expect(function()
                {
                    _scope.setSingle(_wrongParams[i]);
                }).toThrow(new Error('Houve um erro ao randomizar as mensagens. O objeto passado não é um objeto ou array válido.'));
            }
        }))

        it('should set the full quotes to single quotes correctly', inject(function($controller)
        {
            $controller(CONTROLLER_NAME, {$scope: _scope});

            var _quotes = [];

            for (var i = 0; i < 1000; i++)
            {
                _quotes.push({author: 'Eric'+i,
                              quote: 'Alguma Coisa'+i,
                              likes: i});
            }

            _scope.setSingle(_quotes);

            expect(_scope.quotes).toBeDefined();
            expect(_scope.quotes.length).toBe(1);
            expect(_scope.quotes[0].author).toBeDefined();
            expect(_scope.quotes[0].quote).toBeDefined();
            expect(_scope.quotes[0].likes).toBeDefined();
        }))
    })

    describe('multiple-view', function()
    {
        it('should set the quotes back to normal', inject(function($controller)
        {
            $controller(CONTROLLER_NAME, {$scope: _scope});

            _scope.quotes = [];

            for (var i = 0; i < 1000; i++)
            {
                _scope.quotes.push({author: 'Eric'+i,
                                    quote: 'Alguma Coisa'+i,
                                    likes: i});
            }

            _scope.quotesKeeper = _scope.quotes;
            _scope.setSingle(_scope.quotes);
            _scope.setMultiple();

            expect(_scope.quotes.length).toBe(1000);
            expect(_scope.singleView).toBeFalsy();
        }))
    })
})