"use strict";

describe('QuotesModel', function()
{
    var _QuotesModel;

    beforeEach(module('quotes'));

    beforeEach(inject(function($injector)
    {
        _QuotesModel = $injector.get('QuotesModel');
    }))

    describe('creation', function()
    {
        it('should have the right props - empty instance', function()
        {
            var _quote = new _QuotesModel();

            expect(_quote).toBeDefined();
            expect(_quote.author).toBeNull();
            expect(_quote.quote).toBeNull();
            expect(_quote.likes).toBe(0);
        })

        it('should have the right props - filled instance', function()
        {
            var _quote = new _QuotesModel({author: 'eric', quote: 'abcdef'});

            expect(_quote).toBeDefined();
            expect(_quote.author).toEqual('eric');
            expect(_quote.quote).toEqual('abcdef');
            expect(_quote.likes).toBe(0);
        })
    })

    describe('isValid', function()
    {
        it('should return false, empty instance', function()
        {
            var _quote = new _QuotesModel();

            expect(_quote.isValid()).toBeFalsy();
        })

        it('should return false, quote is not specified', function()
        {
            var _quote = new _QuotesModel({author: 'eric'});

            expect(_quote.isValid()).toBeFalsy();
        })

        it('should return false, author is not specified', function()
        {
            var _quote = new _QuotesModel({quote: 'abcde'});

            expect(_quote.isValid()).toBeFalsy();
        })

        it('should return true', function()
        {
            var _quote = new _QuotesModel({author: 'eric', quote: 'abcde'});

            expect(_quote.isValid()).toBeTruthy();
        })
    })

    describe('removeQuotationMarks', function()
    {
        it('should not touch the quote, no quotation marks', function()
        {
            var _quote = new _QuotesModel({author: 'eric', quote: 'abcdedede'});

            expect(_quote.removeQuotationMarks()).toEqual(_quote.quote);
        })

        it('should remove the quotes from the begining of the quote', function()
        {
            var _quote = new _QuotesModel({author: 'eric', quote: '"abcdedede'});

            expect(_quote.removeQuotationMarks()).toEqual(_quote.quote.replace("\"",''));
        })

        it('should remove the quotes from the end of the quote', function()
        {
            var _quote = new _QuotesModel({author: 'eric', quote: 'abcdedede"'});

            expect(_quote.removeQuotationMarks()).toEqual(_quote.quote.replace("\"",''));
        })

        it('should remove the quotes both from the begining and end of the quote', function()
        {
            var _quote = new _QuotesModel({author: 'eric', quote: '"abcdedede"'});

            expect(_quote.removeQuotationMarks()).toEqual(_quote.quote.replace("\"",'').replace("\"", ''));
        })

        it('should remove only quotes from the begining and end, not from the middle', function()
        {
            var _quote = new _QuotesModel({author: 'eric', quote: '"abcd\"edede"'});

            expect(_quote.removeQuotationMarks()).toEqual('abcd"edede');
        })

        it('should remove only quotes from the begining and end, not from the middle - single quotes', function()
        {
            var _quote = new _QuotesModel({author: 'eric', quote: "'abcd\'edede'"});

            expect(_quote.removeQuotationMarks()).toEqual("abcd'edede");
        })
    })
})