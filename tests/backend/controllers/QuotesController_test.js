"use strict";

var expect = require('chai').expect;
var quotes = require('../../../server/api/quotes/controllers/QuotesController');
var helper = require('../helper');
var Quotes = require('../../../server/api/quotes/dao/QuotesDAO');

describe('QuotesController', function()
{
    beforeEach(function(done)
    {
        helper.create('quotes', done);
    })

    afterEach(function(done)
    {
        Quotes.remove(done);
    })
})