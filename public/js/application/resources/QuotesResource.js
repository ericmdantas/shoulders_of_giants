"use strict";

quotesApp.factory('QuotesResource', ['$resource', function($resource)
{
    var _url = '/api/quotes/:type/:id';
    var _params = {id: '@id'};
    var _methods = {update: {method: 'PUT'}};

    return $resource(_url, _params, _methods);
}])