"use strict";

describe('RouterController', function()
{
    var _scope, _routerMock;
    var CONTROLLER_NAME = 'RouterController as routerCtrl';

    beforeEach(module('quotes'));

    beforeEach(inject(function($injector)
    {
        _scope = $injector.get('$rootScope').$new();
        _routerMock = $injector.get('$router');
    }));

    describe('init', function()
    {
        it('should init the controller correctly', inject(function($controller)
        {
            $controller(CONTROLLER_NAME, {$scope: _scope});
        }))

        it('should call config with the right params', inject(function($controller)
        {
            spyOn(_routerMock, 'config').and.callFake(angular.noop);

            $controller(CONTROLLER_NAME, {$scope: _scope});

            expect(_routerMock.config).toHaveBeenCalledWith([{path: '/', component: 'quote'}]);
        }))
    })
})