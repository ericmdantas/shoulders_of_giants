"use strict";

var expect = require('chai').expect;
var quotes = require('../../../controllers/QuotesController');
var helper = require('../helper');
var Quotes = require('../../../models/Quotes');

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