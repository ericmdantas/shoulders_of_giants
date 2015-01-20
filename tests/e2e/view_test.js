"use strict";

describe('view', function()
{
    browser.get('/#');

    describe('inicialization', function()
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
            expect($('#type-of-visualization').isDisplayed()).toBeFalsy();
        })

        it('the options should exist', function()
        {
            expect($('#order-by').isDisplayed()).toBeFalsy();
        })

        it('the options should exist', function()
        {
            expect($('#shuffle').isDisplayed()).toBeFalsy();
        })

        it('the plus should exist', function()
        {
            expect($('#show-other-options').isDisplayed()).toBeTruthy();
        })
    })

    describe('click on #show-other-options', function()
    {
        it('should reveal the hidden options', function()
        {
            $('#show-other-options')
                .click()
                .then(function()
                {
                    expect($('#type-of-visualization').isDisplayed()).toBeTruthy();
                    expect($('#order-by').isDisplayed()).toBeTruthy();
                    expect($('#shuffle').isDisplayed()).toBeTruthy();
                    expect($('#show-other-options').isDisplayed()).toBeTruthy();
                });
        })
    })

    describe('click on each option', function()
    {
        it('should show the type of visualization modal - single or multiple', function()
        {
            $('#show-other-options')
                .click()
                .then(function()
                {
                    return $('#type-of-visualization').click();
                })
                .then(function()
                {
                    browser.sleep(333);

                    expect($$('.modal-body .btn').count()).toEqual(2);

                    expect($$('.modal-body .btn').get(0).getText()).toEqual('Single');
                    expect($$('.modal-body .btn').get(1).getText()).toEqual('Multiple');

                    $('.modal-backdrop').click();
                })
        })

        it('should show the order by - author, quote or most liked', function()
        {
            $('#show-other-options')
                .click()
                .then(function()
                {
                    return $('#order-by').click();
                })
                .then(function()
                {
                    browser.sleep(333);

                    expect($$('.modal-body .btn').count()).toEqual(3);

                    expect($$('.modal-body .btn').get(0).getText()).toEqual('Quote');
                    expect($$('.modal-body .btn').get(1).getText()).toEqual('Author');
                    expect($$('.modal-body .btn').get(2).getText()).toEqual('Most liked');

                    $('.modal-backdrop').click();
                })
        })

        it('should shuffle the quotes', function()
        {
            var _primeiraFrase = $$('.quote').get(0).getText();

            $('#shuffle')
                .click()
                .then(function()
                {
                    var _shuffled = $$('.quote').get(0).getText();

                    expect(_shuffled).not.toEqual(_primeiraFrase);
                });
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
})