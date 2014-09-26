"use strict";

quotesApp.directive('emdOptions', ['$rootScope', function($rootScope)
{
    var _template = '<div id="emd-options">' +
                        '<h4 class="title-options">{{title}}</h4>'+
                        '<button ng-repeat="exec in execs" ' +
                                'class="btn-options hand" ' +
                                'ng-click="exec.action(); removeBlanket();">{{exec.name}}</button>'+
                    '</div>';

    var _link = function(scope, element, attrs)
    {
        $rootScope.$on('emd:build-options', function(event, obj)
        {
            $rootScope.$apply(function()
            {
                scope.title = obj.title;
                scope.content = obj.content[0].name;
                scope.execs = obj.content;
            })

            element.fadeIn();
            $('#emd-blanket').fadeIn();
        })

        scope.removeBlanket = function()
        {
            element.fadeOut('fast');
            $('#emd-blanket').fadeOut('fast');
        }
    }

    return {
                restrict: 'E',
                template: _template,
                link: _link
           }
}])