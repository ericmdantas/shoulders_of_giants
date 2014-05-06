"use strict";

describe('like-directive', function()
{
    var _scope, _element, _compile;

    beforeEach(module('quotes'));

    beforeEach(inject(function($injector)
    {
        _scope = $injector.get('$rootScope').$new();
        _compile = $injector.get('$compile');

        var _html = '<like>'+
                        '<div class="like-container transition">' +
                            '<span class="number-likes transition">{{numberlikes}}</span>' +
                            '<img src="../img/star.png" class="like transition" ng-click="liked(id)" title="click to like! :D"/>';
                        '</div>'+
                    '</like>';

        _element = angular.element(_html);

        _compile(_element)(_scope);
    }))

    describe('checks elements creation', function()
    {
        it('should check if element was created', function()
        {
            expect(_element).toBeDefined();
        })
    })
})