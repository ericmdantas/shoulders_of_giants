"use strict";

describe('QuotesController', function()
{
    var _rootScope, _scope, _httpMock, _timeoutMock, _SocketService, _QuotesDAO, _SocketService, _QuotesModel, _xtorage, Randomizer;
    var CONTROLLER_NAME = 'QuotesController';

    beforeEach(module('quotes'));

    beforeEach(inject(function($injector)
    {
        _rootScope = $injector.get('$rootScope');
        _scope = _rootScope.$new();
        _httpMock = $injector.get('$httpBackend');
        _timeoutMock = $injector.get('$timeout');
        _SocketService = $injector.get('SocketService');
        _xtorage = $injector.get('$xtorage');

        _QuotesDAO = $injector.get('QuotesDAO');
        _QuotesModel = $injector.get('QuotesModel');
        Randomizer = $injector.get('Randomizer');

        spyOn(_xtorage, 'save').and.callFake(angular.noop);
        spyOn(_xtorage, 'get').and.returnValue(null);
    }))

    describe('creation', function()
    {
        it('should create the controller with the right props on scope', inject(function($controller)
        {
            $controller(CONTROLLER_NAME, {$scope: _scope});

            expect(angular.equals(_scope.quotes, [])).toBeTruthy();
            expect(angular.equals(_scope.quotesKeeper, [])).toBeTruthy();
            expect(_scope.quoteInstance instanceof _QuotesModel).toBeTruthy();
            expect(_scope.errorQuoteCreation).toBeNull();
        }))
    })

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

        it('should call that the quotes are ready', inject(function($controller)
        {
            spyOn(_rootScope, '$broadcast').and.callThrough();

            _httpMock.expectGET('/api/quotes').respond([]);

            $controller(CONTROLLER_NAME, {$scope: _scope});

            _httpMock.flush();
            _timeoutMock.flush(2001);

            expect(_rootScope.$broadcast).toHaveBeenCalledWith('quotes-ready');
        }));
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
            spyOn(_QuotesDAO, 'favQuote').and.callFake(angular.noop);
            spyOn(_SocketService, 'emit').and.callFake(angular.noop);

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

            spyOn(_SocketService, 'emit').and.callFake(angular.noop);

            $controller(CONTROLLER_NAME, {$scope: _scope});

            var _id = 'a123';

            _scope.favQuote(_id);

            expect(_SocketService.emit).toHaveBeenCalledWith('fav:quote', _id);
        }))

        it('should NOT substitute the existing object with the retrieved object from the server - empty response from the server', inject(function($controller)
        {
            spyOn(_SocketService, 'emit').and.callThrough();
            spyOn(_SocketService, 'on').and.callThrough();

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
            spyOn(_SocketService, 'emit').and.callFake(angular.noop);

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
            spyOn(_SocketService, 'emit').and.callFake(angular.noop);

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
            spyOn(_SocketService, 'emit').and.callFake(angular.noop);

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

    describe('createQuote', function()
    {
        it('should call the right method from the DAO', inject(function($controller)
        {
            spyOn(_QuotesDAO, 'createQuote').and.callFake(function(){return {then: angular.noop}});

            var _quote = {author: 'eric', quote: 'abcdef'};

            $controller(CONTROLLER_NAME, {$scope: _scope});

            _scope.createQuote(_quote);

            expect(_QuotesDAO.createQuote).toHaveBeenCalledWith(_quote);
        }))

        it('should call the right method, promise rejected with error', inject(function($controller)
        {
            var _quote = new _QuotesModel({author: 'eric', quote: 'abcdef'});

            _httpMock.expectGET('/api/quotes').respond(200, []);
            _httpMock.expectPOST('/api/quotes', _quote).respond(400, {error: 'error here'});

            $controller(CONTROLLER_NAME, {$scope: _scope});

            _scope.createQuote(_quote);

            _httpMock.flush();

            expect(_scope.errorQuoteCreation).toEqual('error here');
        }))

        it('should call the right method, promise resolved correctly', inject(function($controller)
        {
            var _responseGET = [{author: 'a', quote: 'b', likes: 1}];
            var _responsePOST = {_id: "abc123", author: 'eric', quote: 'abcdef', likes: 0};

            var _quote = new _QuotesModel({author: 'eric', quote: 'abcdef'});

            _httpMock.expectGET('/api/quotes').respond(200, _responseGET);
            _httpMock.expectPOST('/api/quotes', _quote).respond(_responsePOST);

            $controller(CONTROLLER_NAME, {$scope: _scope});

            _scope.createQuote(_quote);

            _httpMock.flush();

            expect(_scope.errorQuoteCreation).toBeNull();
            expect(_scope.quotes.length).toBe(2);

            expect(angular.equals(_scope.quotes[0], _responseGET[0])).toBeTruthy();
            expect(angular.equals(_scope.quotes[1], _responsePOST)).toBeTruthy();

            expect(_scope.quoteInstance.author).toBeNull();
            expect(_scope.quoteInstance.quote).toBeNull();
            expect(_scope.quoteInstance.likes).toBe(0);
        }))
    })

    describe('randomize', function()
    {
        it('should call the right service/method', inject(function($controller)
        {
            var _responseGET = [{author: 'a', quote: 'b', likes: 1}];
            spyOn(Randomizer, 'shuffleSingle').and.callFake(angular.noop);

            _httpMock.expectGET('/api/quotes').respond(200, _responseGET);

            $controller(CONTROLLER_NAME, {$scope: _scope});

            _httpMock.flush();

            _scope.randomize();

            expect(Randomizer.shuffleSingle).toHaveBeenCalledWith(_responseGET);
        }))
    })

    xdescribe('quotes:faved', function()
    {
        it('should call the right method', inject(function($controller)
        {
            spyOn(_SocketService, 'on').and.callThrough();

            var _responseGET = [{author: 'a', quote: 'b', likes: 1, _id: '1'}];

            _httpMock.expectGET('/api/quotes').respond(200, _responseGET);

            $controller(CONTROLLER_NAME, {$scope: _scope});

            _SocketService.emit('quote:faved', '1');

            expect(_SocketService.on).toHaveBeenCalled();
        }))
    })
})