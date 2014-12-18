"use strict";

var expect = require('chai').expect;
var quotes = require('../../../server/controllers/QuotesController');
var helper = require('../helper');
var Quotes = require('../../../server/models/Quotes');

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