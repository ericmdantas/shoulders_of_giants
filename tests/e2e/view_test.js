"use strict";

describe('view', function()
{
    browser.get('/#');

    describe('elements', function()
    {
        it('should have the right title', function()
        {
            expect(browser.getTitle()).toEqual('shoulders of giants');
        })

        it('should have the right header title', function()
        {
            expect($('#logo').isPresent()).toBeTruthy();
        })

        it('the options should exist', function()
        {
            expect($('#type-of-visualization').isDisplayed()).toBeTruthy();
        })

        it('the options should exist', function()
        {
            expect($('#order-by').isDisplayed()).toBeTruthy();
        })

        it('the options should exist', function()
        {
            expect($('#shuffle').isDisplayed()).toBeTruthy();
        })
    })

    describe('filter', function()
    {
        afterEach(function()
        {
            $('.filter').clear();
        })

        it('start to filter something - zero results', function()
        {
            $('.filter').sendKeys('abcdefasdasdasdasdasd');

            expect($$('.cards').count()).toEqual(1); // nothing found card
        })

        it('start to filter something', function()
        {
            $('.filter').sendKeys('courage');

            expect($$('.cards').count()).toBeGreaterThan(0);
        })
    })

    describe('createPost', function()
    {
        afterEach(function()
        {

        })
    })
})