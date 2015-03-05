"use strict";

var expect = require('chai').expect;
var mongoose = require('mongoose');
var Quotes = require('../../../server/DAL/QuotesDAO');
var db = require('../config/db.json');
var helper = require('../helper');

describe('quotes', function()
{
    var _quote;

    before(function()
    {
        mongoose.models = {};
        mongoose.connect(db.db.test.url);
        mongoose.connection.on('error', function() {});
    })

    beforeEach(function(done)
    {
        helper.create('quotes', done);
        _quote = new Quotes();
    })

    afterEach(function(done)
    {
        Quotes.remove(done);
    })

    describe('getQuotes', function()
    {
        it('should be no errors', function(done)
        {
            Quotes
                .getQuotes()
                .then(function(quotes)
                     {
                         expect(quotes).to.have.length(11);
                         done();
                     })
        })

        it('should return the object correctly', function(done)
        {
            Quotes
                .getQuotes()
                .then(function(quotes)
                      {
                            expect(quotes[0]).to.have.property('author').and.to.equal("eric0");
                            expect(quotes[0]).to.have.property('quote').and.to.equal("mensagem0");
                            expect(quotes[0]).to.have.property('likes').and.to.equal(0);
                            done();
                      });
        })
    })

    describe('favoriteSpecificQuote', function()
    {
        it('should throw error - wrong id param', function(done)
        {
            var _wrongParams = [null, undefined, function(){}, true, false, 1, 0, {}, []];

            var _errorCallback = function(err)
            {
                expect(err).to.be.defined;
                expect(err instanceof Error).to.be.true;
            }

            for (var i = 0; i < _wrongParams.length; i++)
            {
                Quotes
                    .favSpecificQuote(_wrongParams[i])
                    .then(undefined, _errorCallback);
            }

            done();
        })

        it('should increment by one the first quote correctly', function(done)
        {
            var _id = '535d85946ab81777bf583d26';

            var _resolvedCallback = function(updated)
            {
                expect(updated).to.be.defined;
                expect(updated).to.have.property('likes').and.to.equal(1);
                expect(updated).to.have.property('lastLiked').and.to.be.below(Date.now());

                done();
            }

            Quotes
                .favSpecificQuote(_id)
                .then(_resolvedCallback);
        })

        it('should increment by one the third quote correctly', function(done)
        {
            var _id = '535d85946ab81777bf583d28';

            var _successCallback = function(updated)
            {
                expect(updated).to.have.property('likes').and.to.equal(4);
                expect(updated).to.have.property('lastLiked').and.to.be.below(Date.now());

                done();
            }

            Quotes
                .favSpecificQuote(_id)
                .then(_successCallback);
        })
    })

    describe('getQuotesOrderedBy', function()
    {
        it('should throw an error, no order specified', function(done)
        {
            var _rejectCallback = function(err)
            {
                expect(err).to.be.defined;
                expect(err).to.be.an.instanceof(Error);
                expect(err).to.match(/Não é possível ordenar .+ Parâmetro order errado./);
            }

            var _wrongParams = [null, undefined, 1, 0, {}, [], function(){}];

            for (var i = 0; i < _wrongParams.length; i++)
            {
                Quotes
                    .getQuotesOrderedBy(_wrongParams[i])
                    .then(undefined, _rejectCallback)
            }

            done();
        })

        it('should return ordered by author asc', function(done)
        {
            var _order = 'author';

            var _successCallback = function(quotes)
            {
                expect(quotes).to.be.defined;
                expect(quotes).to.have.length(11);
                expect(quotes[0].author).to.equal('eric0');
                expect(quotes[0].quote).to.equal('mensagem0');
                expect(quotes[0].likes).to.equal(0);
                done();
            }

            Quotes
                .getQuotesOrderedBy(_order)
                .then(_successCallback);
        })

        it('should return ordered by author desc', function(done)
        {
            var _order = '-author';

            var _successCallback = function(quotes)
            {
                expect(quotes).to.be.defined;
                expect(quotes).to.have.length(11);
                expect(quotes[0].author).to.equal('eric9');
                expect(quotes[0].quote).to.equal('mensagem9');
                expect(quotes[0].likes).to.equal(9);
                done();
            }

            Quotes
                .getQuotesOrderedBy(_order)
                .then(_successCallback);
        })

        it('should return ordered by quote asc', function(done)
        {
            var _order = 'quote';

            var _successCallback = function(quotes)
            {
                expect(quotes).to.be.defined;
                expect(quotes).to.have.length(11);
                expect(quotes[0].author).to.equal('eric0');
                expect(quotes[0].quote).to.equal('mensagem0');
                expect(quotes[0].likes).to.equal(0);
                done();
            }

            Quotes
                .getQuotesOrderedBy(_order)
                .then(_successCallback);
        })

        it('should return ordered by quote desc', function(done)
        {
            var _order = '-quote';

            var _successCallback = function(quotes)
            {
                expect(quotes).to.be.defined;
                expect(quotes).to.have.length(11);
                expect(quotes[0].author).to.equal('eric9');
                expect(quotes[0].quote).to.equal('mensagem9');
                expect(quotes[0].likes).to.equal(9);
                done();
            }

            Quotes
                .getQuotesOrderedBy(_order)
                .then(_successCallback);
        })

        it('should return ordered by likes asc', function(done)
        {
            var _order = 'likes';

            var _successCallback = function(quotes)
            {
                expect(quotes).to.be.defined;
                expect(quotes).to.have.length(11);
                expect(quotes[0].author).to.equal('eric0');
                expect(quotes[0].quote).to.equal('mensagem0');
                expect(quotes[0].likes).to.equal(0);
                done();
            }

            Quotes
                .getQuotesOrderedBy(_order)
                .then(_successCallback);
        })

        it('should return ordered by likes desc', function(done)
        {
            var _order = '-likes';

            var _successCallback = function(quotes)
            {
                expect(quotes).to.be.defined;
                expect(quotes).to.have.length(11);
                expect(quotes[0].author).to.equal('eric9');
                expect(quotes[0].quote).to.equal('mensagem9');
                expect(quotes[0].likes).to.equal(9);
                done();
            }

            Quotes
                .getQuotesOrderedBy(_order)
                .then(_successCallback);
        })

        it('should return ordered by likes desc - ALL ON CAPS', function(done)
        {
            var _order = '-LIKES';

            var _successCallback = function(quotes)
            {
                expect(quotes).to.be.defined;
                expect(quotes).to.have.length(11);
                expect(quotes[0].author).to.equal('eric9');
                expect(quotes[0].quote).to.equal('mensagem9');
                expect(quotes[0].likes).to.equal(9);
                done();
            }

            Quotes
                .getQuotesOrderedBy(_order)
                .then(_successCallback);
        })
    })

    describe('createQuote', function()
    {
        it('should not create a quote, empty object', function(done)
        {
            var _invalidObjects = [null, undefined, '', 1, 0, false, true, [], {}];

            var _onSuccess = function()
            {
                expect(true).to.be.false;
            }

            var _onError = function(error)
            {
                expect(error).to.be.defined;
                expect(error).to.be.an.instanceof(Error);
            }

            for (var i = 0; i < _invalidObjects.length; i++)
            {
                Quotes
                    .createQuote(_invalidObjects[i])
                    .then(_onSuccess, _onError);
            }

            done();
        })

        it('should not create a quote, no author', function(done)
        {
            var _quote = {author: null, quote: 'abcdef12'};

            var _onSuccess = function()
            {
                expect(true).to.be.false;
            }

            var _onError = function(error)
            {
                expect(error).to.be.defined;
                expect(error).to.be.an.instanceof(Error);

                done();
            }

            Quotes
                .createQuote(_quote)
                .then(_onSuccess, _onError);
        })

        it('should not create a quote, no quote', function(done)
        {
            var _quote = {author: 'ericmdantas', quote: null};

            var _onSuccess = function()
            {
                expect(true).to.be.false;
            }

            var _onError = function(error)
            {
                expect(error).to.be.defined;
                expect(error).to.be.an.instanceof(Error);

                done();
            }

            Quotes
                .createQuote(_quote)
                .then(_onSuccess, _onError);
        })

        it('should create a quote correctly', function(done)
        {
            var _quote = {author: 'ericmdantas', quote: 'wawaweewa'};

            var _onSuccess = function(saved)
            {
                expect(saved).to.be.defined;
                expect(saved).to.an.instanceof(Quotes);
                expect(saved).to.have.property('author');
                expect(saved).to.have.property('quote');
                expect(saved).to.have.property('likes');
                expect(saved).to.have.property('createdAt');

                expect(saved.author).to.equal(_quote.author);
                expect(saved.quote).to.equal(_quote.quote);
                expect(saved.likes).to.equal(0);
                //expect(saved.createdAt).to.be.below(Date.now());

                done();
            }

            var _onError = function(error)
            {
                expect(true).to.be.false;
            }

            Quotes
                .createQuote(_quote)
                .then(_onSuccess, _onError);
        })
    })
})