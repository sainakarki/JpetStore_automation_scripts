import { selectors } from '../../support/Selector';

describe('Add to items to Cart and remove from cart', () => {

  beforeEach(() => {
    cy.session('userSession', () => {
      cy.visit('https://jpetstore.aspectran.com/');
      cy.login('Selinaa', 'Pass@123');
    }, {
      // Validate session is still alive before restoring
      validate() {
        cy.visit('https://jpetstore.aspectran.com/');
        cy.contains('Welcome').should('be.visible'); // adjust to any element visible only when logged in
      },
      cacheAcrossSpecs: false
    });
    cy.visit('https://jpetstore.aspectran.com/');
  });


  it('verify user can add multiple items to cart', () => {

    // add first item to cart
    cy.xpath(selectors.dogs_ctgry).click();
    cy.xpath(selectors.bulldog_productid).click();
    cy.contains('Add to Cart').should('be.visible');
    cy.xpath(selectors.male_adult_bulldog_cart_btn).click();
    cy.contains('Male Adult Bulldog').should('be.visible');

    // add second item to cart
    cy.xpath(selectors.return_to_main_menu_btn).click();
    cy.xpath(selectors.fish_ctgry).click();
    cy.xpath(selectors.goldfish_productid).click();
    cy.contains('Add to Cart').should('be.visible');
    cy.xpath(selectors.adult_female_goldfish_cart_btn).click();
    cy.contains('Adult Female Goldfish').should('be.visible');

    // add third item to cart
    cy.xpath(selectors.return_to_main_menu_btn).click();
    cy.xpath(selectors.fish_ctgry).click();
    cy.xpath(selectors.angelfish_productid).click();
    cy.contains('Add to Cart').should('be.visible');
    cy.xpath(selectors.small_angelfish_cart_btn).click();
    cy.contains('Small Angelfish').should('be.visible');

    // assert all three items are in cart
    cy.xpath(selectors.cart_body).within(() => {
      cy.contains('Male Adult Bulldog').should('be.visible');
      cy.contains('Adult Female Goldfish').should('be.visible');
      cy.contains('Small Angelfish').should('be.visible');
    });
  });

  it('Verify user can remove an item from cart', () => {

    // Navigate to cart — session is restored, server cart is still alive
   // cy.visit('https://jpetstore.aspectran.com/cart/viewCart');
    cy.xpath(selectors.cart_btn).click();
    cy.xpath(selectors.cart_body).should('contain.text', 'Remove');
    cy.xpath(selectors.remove_aitem_btn).eq(2).click();


    cy.xpath(selectors.cart_body).within(() => {
      cy.contains('Small Angelfish').should('not.exist');

     // cy.contains('Adult Female Goldfish').should('be.visible');
    });

        cy.xpath("/html/body/section/div[2]/div[2]/form/table/tbody/tr[1]/td[3]").within(() => {
      // cy.contains('Male Adult Bulldog').should('be.visible');


    });
      cy.xpath('/html/body/section/div[2]/div[2]/form/table/tbody/tr/td[3]').should('contain.text', );

  });


  it('verify user can remove all items from cart', () => {

    // Navigate to cart — remaining 2 items still in server cart
  //  cy.visit('https://jpetstore.aspectran.com/cart/viewCart');
    cy.xpath(selectors.cart_btn).click();
    cy.xpath(selectors.cart_body).should('contain.text', 'Remove All');
    cy.xpath(selectors.remove_all_btn).click();

    cy.xpath(selectors.cart_body).within(() => {
      cy.contains('Male Adult Bulldog').should('not.exist');
      cy.contains('Adult Female Goldfish').should('not.exist');
    });
  });

});