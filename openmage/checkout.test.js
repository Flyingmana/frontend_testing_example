const website = require("./website.config.js");

describe('checkout', () => {

    it('add Product to Cart', async () => {
        await page.goto(website.base_url+'/accessories/jewelry/blue-horizons-bracelets.html');
        await expect(page.title()).resolves.toMatch('Blue Horizons Bracelets');
        await expect(page.title()).resolves.toMatch('Jewelry');
        // Assert that a button containing text "Home" will be clicked
        await expect(page).toClick('.add-to-cart-buttons .btn-cart', { text: 'Add to Cart' });
        await page.waitForSelector('html');
        const pathname = await page.evaluate(() => document.location.pathname);
        expect(pathname).toBe('/checkout/cart/');
        await expect(page.title()).resolves.toMatch('Shopping Cart');
    });

    it('check Product to Cart', async () => {
        await page.goto(website.base_url+'/checkout/cart/');
        await expect(page).toMatchElement('#shopping-cart-table .product-name', { text: 'Blue Horizons Bracelets' });
        await expect(page).toMatchElement('#shopping-cart-table .product-name', { text: 'Blue Horizons Bracelets' });
    });

    it('Go through Checkout', async () => {
        await page.goto(website.base_url+'/checkout/cart/');
        await expect(page).toClick('.btn-proceed-checkout', { text: 'Proceed to Checkout' });
        await page.waitForSelector('html');
        await expect(page.title()).resolves.toMatch('Checkout');
        await expect(page).toClick('#checkout-step-login [value=guest]');
        await expect(page).toClick('#onepage-guest-register-button');
        console.log("billing Step");

        await expect(page).toFill('#billing-new-address-form [name="billing[firstname]"]', 'Jamy');
        await expect(page).toFill('#billing-new-address-form [name="billing[lastname]"]', 'Jones');
        await expect(page).toFill('#billing-new-address-form [name="billing[email]"]', 'test@example.com');
        await expect(page).toFill('#billing-new-address-form [name="billing[street][]"]', 'Nowhere Street 42');
        await expect(page).toFill('#billing-new-address-form [name="billing[city]"]', 'somewhere');
        await expect(page).toSelect('#billing-new-address-form [name="billing[region_id]"]', 'Alaska');
        await expect(page).toFill('#billing-new-address-form [name="billing[postcode]"]', '12345');
        await expect(page).toFill('#billing-new-address-form [name="billing[telephone]"]', '0123456789');

        await expect(page).toClick('#opc-billing #billing-buttons-container button');
        await page.waitForSelector('#opc-shipping_method.active');
        console.log("shipping Step");
        await page.waitForSelector('#s_method_flatrate_flatrate');

        await expect(page).toClick('#shipping-method-buttons-container button');
        await page.waitForSelector('#opc-payment.active');
        console.log("payment Step");

        await expect(page).toClick('#payment-buttons-container button');
        await page.waitForSelector('#opc-review.active');
        console.log("review Step");

        await expect(page).toClick('#review-buttons-container .btn-checkout');
        await page.screenshot({path: 'checkout_click.png'});
        await page.waitFor(2000);
        await page.waitForSelector('html');
        await page.screenshot({path: 'checkout_after.png'});
        await expect(page.title()).resolves.toMatch('Magento Commerce');
    }, 50000);

});
