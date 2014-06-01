"use strict";

describe('session-manager-directive', function()
{
    var _scope, _element, _compile, _windowMock, _httpMock;

    beforeEach(module('quotes'));

    beforeEach(inject(function($injector)
    {
        _scope = $injector.get('$rootScope').$new();
        _compile = $injector.get('$compile');
        _windowMock = $injector.get('$window');
        _httpMock = $injector.get('$httpBackend');

        _httpMock.when('GET', '/api/quotes').respond({quotes: [{quote: 'A', author: 'B', likes: 0},
                                                               {quote: 'C', author: 'D', likes: 0}]});

        var _html = '<div ng-controller="QuotesController">' +
                        '<ul>' +
                            '<li session-manager="single"></li>' +
                            '<li session-manager="multiple"></li>'+
                            '<li session-manager="author"></li>'+
                            '<li session-manager="quote"></li>'+
                            '<li session-manager="best"></li>'+
                            '<li session-manager="filter"></li>'+
                        '</ul>' +
                    '</div>';

        _element = angular.element(_html);

        _compile(_element)(_scope);
        _scope.$digest();
    }))

    describe('checks elements creation', function()
    {
        it('check if element was created correctly', function()
        {
            expect(_element).toBeDefined();
            expect(typeof _element).toEqual('object');
        })
    })

    describe('checks if the click event is working', function()
    {
        it('clicks all the possible links', function()
        {
            var _numClickables = _element.find('li').length;

            for (var i = 0; i < _numClickables; i++)
            {
                _element.find('li').eq(i).click();
            }
        })

        it('checks if the click is setting the storage correctly - visualization', function()
        {
            _element.find('li').eq(0).click();
            expect(_windowMock.localStorage.getItem('visualization')).toEqual('single');

            _element.find('li').eq(1).click();
            expect(_windowMock.localStorage.getItem('visualization')).toEqual('multiple');
        })

        it('checks if the click is setting the storage correctly - order', function()
        {
            _element.find('li').eq(2).click();
            expect(_windowMock.localStorage.getItem('order')).toEqual('author');

            _element.find('li').eq(3).click();
            expect(_windowMock.localStorage.getItem('order')).toEqual('quote');

            _element.find('li').eq(4).click();
            expect(_windowMock.localStorage.getItem('order')).toEqual('best');
        })

        it('checks if the click is setting the storage correctly - visualization', function()
        {
            _element.find('li').eq(5).click();
            expect(_windowMock.localStorage.getItem('filter')).toEqual('filter');
        })
    })

    describe('checks if the QuotesReady event is working', function()
    {
        it('should emmit the event correctly', function()
        {
            _scope.$broadcast('QuotesReady');
            expect(_scope.singleView).toBeFalsy();
        })

        //TODO: FIX THE FOLLOWING ERROR: Error: Houve um erro ao randomizar as mensagens. O objeto passado não é um objeto ou array válido.

        /*it('should emmit the event correctly and the event should change the singleView', function()
        {
            _windowMock.localStorage.setItem('visualization', 'single');
            _scope.$broadcast('QuotesReady');

            expect(_scope.singleView).toBeTruthy();
        })*/
    })
})