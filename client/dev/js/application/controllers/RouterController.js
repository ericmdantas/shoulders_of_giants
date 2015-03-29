"use strict";

quotesApp
    .controller('RouterController', ['$router', function($router)
    {
        var _paths = [];

        _paths.push({path: '/', component: 'quote'});

        $router.config(_paths);
    }]);