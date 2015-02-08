"use strict";

describe('view', function()
{
    var _viewContainer = "#views-modal-container";
    var _orderContainer = "#order-modal-container";

    browser.get('/#');

    describe('init', function()
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

    describe('options should be visible', function()
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

    describe('view', function() {
        it('should show the type of visualization modal - single or multiple', function () {
            $('#show-other-options')
                .click()
                .then(function () {
                    return $('#type-of-visualization').click();
                })
                .then(function () {
                    browser.sleep(333);

                    expect($$(_viewContainer + ' .modal-body .btn').get(0).getText()).toEqual('Single');
                    expect($$(_viewContainer + ' .modal-body .btn').get(1).getText()).toEqual('Multiple');

                    $('.modal-backdrop').click();
                })
        })
    })

    describe('order', function()
    {
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

                    expect($$(_orderContainer + ' .modal-body .btn').count()).toEqual(3);

                    expect($$(_orderContainer + ' .modal-body .btn').get(0).getText()).toEqual('Author');
                    expect($$(_orderContainer + ' .modal-body .btn').get(1).getText()).toEqual('Best');
                    expect($$(_orderContainer + ' .modal-body .btn').get(2).getText()).toEqual('Quotes');

                    $('.modal-backdrop').click();
                })
        })
    })

    describe('shuffle', function()
    {
        it('should shuffle the quotes', function()
        {
            browser.sleep(333);

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