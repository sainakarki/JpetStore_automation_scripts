import { selectors } from '../../support/Selector';

describe('Add and Remove items from Cart', () => {

  beforeEach(() => {
    cy.visit('/');

    const username =  Cypress.env('username')
    const password =   Cypress.env('password')

    
    cy.login(username, password);
  });

  it('verify user can add multiple items, remove one, then remove all from cart', () => {

    // ─── ADD FIRST ITEM ───────────────────────────────────────────
    cy.xpath(selectors.dogs_ctgry).click();
    cy.xpath(selectors.bulldog_productid).click();
    cy.contains('Add to Cart').should('be.visible');
    cy.xpath(selectors.male_adult_bulldog_cart_btn).click();
    cy.contains('Male Adult Bulldog').should('be.visible');

    // ─── ADD SECOND ITEM ──────────────────────────────────────────
    cy.xpath(selectors.return_to_main_menu_btn).click();
    cy.xpath(selectors.fish_ctgry).click();
    cy.xpath(selectors.goldfish_productid).click();
    cy.contains('Add to Cart').should('be.visible');
    cy.xpath(selectors.adult_female_goldfish_cart_btn).click();
    cy.contains('Adult Female Goldfish').should('be.visible');

    // ─── ADD THIRD ITEM ───────────────────────────────────────────
    cy.xpath(selectors.return_to_main_menu_btn).click();
    cy.xpath(selectors.fish_ctgry).click();
    cy.xpath(selectors.angelfish_productid).click();
    cy.contains('Add to Cart').should('be.visible');
    cy.xpath(selectors.small_angelfish_cart_btn).click();
    cy.contains('Small Angelfish').should('be.visible');

    // ─── ASSERT ALL 3 ITEMS IN CART ───────────────────────────────
    cy.xpath(selectors.cart_body).within(() => {
      cy.contains('Male Adult Bulldog').should('be.visible');
      cy.contains('Adult Female Goldfish').should('be.visible');
      cy.contains('Small Angelfish').should('be.visible');
    });

    // ─── REMOVE ONE ITEM ──────────────────────────────────────────
    // cy.xpath(selectors.cart_body).should('contain.text', 'Remove');
    cy.xpath(selectors.small_angelfish_remove_btn).click();
    cy.log("Small Angelfish removed");
    // ─── REMOVE ALL ITEMS ─────────────────────────────────────────
    cy.xpath(selectors.cart_body).should('contain.text', 'Remove All');
    cy.xpath(selectors.remove_all_btn).click();
    cy.log("All items removed from cart");
  });

});