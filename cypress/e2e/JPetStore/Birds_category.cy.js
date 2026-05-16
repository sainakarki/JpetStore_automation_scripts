import { selectors } from '../../support/Selector';

describe('Add to Cart', () => {

    beforeEach(() => {

        cy.session('userSession', () => {

            cy.visit("/");

            cy.login(
                Cypress.env('username'),
                Cypress.env('password')
            );

        }, {

            validate() {

                cy.visit("/");

                cy.contains('Welcome').should('be.visible');

            },

            cacheAcrossSpecs: false
        });

        cy.visit("/");
    });

    it('verify user can add items to cart from cats category ', () => {

        cy.xpath(selectors.birds_ctgry).click();
        cy.xpath(selectors.amazon_parrot_product_id).click();
        cy.xpath(selectors.adult_male_amazonparrot_itemid).click();
        cy.contains('Add to Cart').should('be.visible');
        cy.xpath(selectors.adult_male_amazonparrot_crtbtn).click();
        cy.contains('Adult Male Amazon Parrot').should('be.visible');

        cy.xpath(selectors.return_to_main_menu_btn).click();
        cy.xpath(selectors.birds_ctgry).click();
        cy.xpath(selectors.finch_product_id).click();
        cy.contains('Add to Cart').should('be.visible');
        cy.xpath(selectors.adult_male_finch_crtbtn).click();
        cy.contains('Adult Male Finch').should('be.visible');

        cy.xpath(selectors.cart_body).within(() => {
            cy.contains('Adult Male Amazon Parrot').should('be.visible');
            cy.contains('Adult Male Finch').should('be.visible');
        });
    });

    it('verify user can increase the item in cart', () => {

        cy.xpath(selectors.cart_btn).click();

        cy.xpath(selectors.quantity).eq(1).clear().type('10');

        cy.xpath(selectors.update_btn).click();

        cy.xpath(selectors.quantity).eq(1).should('have.value', '10');
    });

    it('verify user cannot decrease the item in cart below 0', () => {

        cy.xpath(selectors.cart_btn).click();

        cy.xpath(selectors.quantity).eq(0).clear().type('-1');

        cy.xpath(selectors.update_btn).click();

        cy.xpath(selectors.quantity).eq(0).should('have.value', '-1');
    });

    it('verify total price increases with quantity', () => {

        cy.xpath(selectors.cart_btn).click();

        const quantity = 5;

        cy.xpath(selectors.item_price).eq(1).invoke('text').then((priceText) => {

            const itemPrice = parseFloat(priceText.replace('$', ''));

            cy.xpath(selectors.quantity).eq(1)
                .clear()
                .type('{selectall}{backspace}' + quantity);

            cy.xpath(selectors.update_btn).click();
          cy.wait(1000);
            const expectedTotal = itemPrice * quantity;

            cy.xpath(selectors.total_cost).eq(1).invoke('text').then((totalText) => {

                const uiTotal = parseFloat(totalText.replace('$', ''));

                expect(uiTotal).to.equal(expectedTotal);
            });
        });
    });

    it('Verify user can remove an item from cart', () => {

        cy.xpath(selectors.cart_btn).click();

        cy.xpath(selectors.remove_aitem_btn).eq(1).click();
    });

    it('verify user can remove all items from cart', () => {

        cy.xpath(selectors.cart_btn).click();

        cy.xpath(selectors.remove_all_btn).click();
    });

    it('verify user can checkout with valid credentials', () => {

        cy.xpath(selectors.birds_ctgry).click();
        cy.xpath(selectors.amazon_parrot_product_id).click();
        cy.xpath(selectors.adult_male_amazonparrot_itemid).click();
        cy.xpath(selectors.adult_male_amazonparrot_crtbtn).click();

        cy.xpath(selectors.return_to_main_menu_btn).click();
        cy.xpath(selectors.birds_ctgry).click();
        cy.xpath(selectors.finch_product_id).click();
        cy.xpath(selectors.adult_male_finch_crtbtn).click();

        cy.xpath(selectors.cart_btn).click();
        cy.xpath(selectors.checkout_btn).click();

        cy.xpath(selectors.card_type).select('MasterCard');

        cy.xpath(selectors.card_no).clear().type('16714712129838');
        cy.xpath(selectors.expiry_date).clear().type('12/2029');

        cy.xpath(selectors.checkout_firstname).clear().type('Zoya');
        cy.xpath(selectors.checkout_lastname).clear().type('Khan');
        cy.xpath(selectors.checkout_address1).clear().type('Sanga');
        cy.xpath(selectors.checkout_address2).clear().type('Kavre');
        cy.xpath(selectors.checkout_city).clear().type('Bhaktapur');
        cy.xpath(selectors.checkout_state).clear().type('Bagmati');
        cy.xpath(selectors.checkout_zip).clear().type('12345');
        cy.xpath(selectors.checkout_country).clear().type("nepal");

        cy.xpath(selectors.checkout_continue_btn).click();

        cy.contains('Please confirm the information below and then press continue').should('be.visible');

        cy.xpath(selectors.confirm_btn).click();

        cy.contains('Thank you, your order has been submitted.').should('be.visible');
    });

    it('verify user cannot checkout with empty checkout details', () => {

        cy.xpath(selectors.fish_ctgry).click();
        cy.xpath(selectors.goldfish_productid).click();
        cy.xpath(selectors.adult_female_goldfish_cart_btn).click();

        cy.xpath(selectors.checkout_btn).click();

        cy.xpath(selectors.card_no).clear();
        cy.xpath(selectors.expiry_date).clear();

        cy.xpath(selectors.checkout_firstname).clear();
        cy.xpath(selectors.checkout_lastname).clear();
        cy.xpath(selectors.checkout_address1).clear();
        cy.xpath(selectors.checkout_address2).clear();
        cy.xpath(selectors.checkout_city).clear();
        cy.xpath(selectors.checkout_state).clear();
        cy.xpath(selectors.checkout_zip).clear();
        cy.xpath(selectors.checkout_country).clear();

        cy.xpath(selectors.checkout_continue_btn).click();

        cy.contains('must not be blank').should('be.visible');
    });

    it('verify user can delete their order', () => {

        cy.xpath(selectors.fish_ctgry).click();
        cy.xpath(selectors.angelfish_productid).click();
        cy.xpath(selectors.small_angelfish_cart_btn).click();

        cy.xpath(selectors.checkout_btn).click();

        cy.xpath(selectors.card_type).select('MasterCard');

        cy.xpath(selectors.card_no).clear().type('16714712129838');
        cy.xpath(selectors.expiry_date).clear().type('12/2029');

        cy.xpath(selectors.checkout_firstname).clear().type('Zoya');
        cy.xpath(selectors.checkout_lastname).clear().type('Khan');
        cy.xpath(selectors.checkout_address1).clear().type('Sanga');
        cy.xpath(selectors.checkout_address2).clear().type('Kavre');
        cy.xpath(selectors.checkout_city).clear().type('Bhaktapur');
        cy.xpath(selectors.checkout_state).clear().type('Bagmati');
        cy.xpath(selectors.checkout_zip).clear().type('12345');
        cy.xpath(selectors.checkout_country).clear().type("nepal");

        cy.xpath(selectors.checkout_continue_btn).click();
        cy.xpath(selectors.confirm_btn).click();

        cy.xpath(selectors.delete_btn).click();

        cy.log('Order deleted');
    });
});