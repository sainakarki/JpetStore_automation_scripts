import { selectors } from '../../support/Selector';
describe('Add to Cart', () => {
 beforeEach(() => {

  cy.session('userSession', () => {

    cy.visit('/');

    cy.login(
      Cypress.env('username'),
      Cypress.env('password')
    );

  }, {

    validate() {

      cy.visit('/');
      cy.contains('Welcome').should('be.visible');

    },

    cacheAcrossSpecs: false

  });

  cy.visit('/');

 });
  it('verify user can add items to cart from Dogs category', () => {
    cy.get('body').should('contain.text', 'Dogs');
    cy.xpath(selectors.dogs_ctgry).click();
    cy.xpath(selectors.bulldog_productid).click();
    cy.contains('Add to Cart').should('be.visible');
    cy.xpath(selectors.male_adult_bulldog_cart_btn).click();
    cy.contains('Male Adult Bulldog').should('be.visible');
    //
    cy.xpath(selectors.return_to_main_menu_btn).click();
    cy.xpath(selectors.dogs_ctgry).click();
    cy.xpath(selectors.poodle_productid).click();
    cy.xpath(selectors.poodle_itemid).click();
    cy.contains('Add to Cart').should('be.visible');
    cy.xpath(selectors.poodle_cart_btn).click();
    cy.contains("Male Puppy Poodle").should('be.visible');
    //
    cy.xpath(selectors.return_to_main_menu_btn).click();
    cy.xpath(selectors.dogs_ctgry).click();
    cy.xpath(selectors.dalmation_product_id).click();
    cy.contains('Add to Cart').should('be.visible');
    cy.xpath(selectors.Spotted_Adult_Female_Dalmation_cart_btn).click();
    cy.contains("Adult Female Dalmation").should('be.visible');
    //
    cy.xpath(selectors.return_to_main_menu_btn).click();
    cy.xpath(selectors.dogs_ctgry).click();
    cy.xpath(selectors.golden_retriever_produt_id).click();
    cy.contains('Add to Cart').should('be.visible');
    cy.xpath(selectors.adult_female_golden_retriever_cart_btn).click();
    cy.contains('Adult Female Golden Retriever').should('be.visible');
    //
    cy.xpath(selectors.return_to_main_menu_btn).click();
    cy.xpath(selectors.dogs_ctgry).click();
    cy.xpath(selectors.labrador_retriever_product_id).click();
    cy.contains('Add to Cart').should('be.visible');
    cy.xpath(selectors.adult_male_labrador_retriever_cart_btn).click();
    cy.contains('Adult Male Labrador Retriever').should('be.visible');
    //
    cy.xpath(selectors.return_to_main_menu_btn).click();
    cy.xpath(selectors.dogs_ctgry).click();
    cy.xpath(selectors.chihuahua_productid).click();
    cy.contains('Add to Cart').should('be.visible');
    cy.xpath(selectors.adult_female_chihuahua_cartbtn).click();
    cy.contains('Adult Female Chihuahua').should('be.visible');
    //assertion
    cy.xpath(selectors.cart_body).within(() => {
      cy.contains('Male Adult Bulldog').should('be.visible');
      cy.contains('Male Puppy Poodle').should('be.visible');
      cy.contains('Adult Female Dalmation').should('be.visible');
      cy.contains('Adult Female Golden Retriever').should('be.visible');
      cy.contains('Adult Male Labrador Retriever').should('be.visible');
      cy.contains('Adult Female Chihuahua').should('be.visible');
    });
  });
  it('verify user can increase the item in cart', () => {
    cy.xpath(selectors.cart_btn).click();
    cy.xpath(selectors.quantity).eq(3).clear().type('10');
    cy.xpath(selectors.update_btn).click();
    cy.xpath(selectors.quantity).eq(3).should('have.value', '10');
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

      // FORCE reset quantity properly
    //  cy.xpath(selectors.quantity).eq(1).clear().type('{selectall}{backspace}' + quantity);
    cy.wait(5000)
        cy.xpath(selectors.quantity).eq(1).clear().type(quantity);

      cy.xpath(selectors.update_btn).click();
      cy.wait(6000);
      const expectedTotal = itemPrice * quantity;

      cy.xpath(selectors.total_cost).eq(1).invoke('text').then((totalText) => {

        const uiTotal = parseFloat(totalText.replace('$', ''));

        cy.log('UI Total: ' + uiTotal);
        cy.log('Expected Total: ' + expectedTotal);

        expect(uiTotal).to.equal(expectedTotal);
      });
    });
  });
  it('Verify user can remove an item from cart', () => {
    cy.xpath(selectors.cart_btn).click();
    cy.xpath(selectors.cart_body).should('contain.text', 'Remove');
    cy.xpath(selectors.remove_aitem_btn).eq(2).click();
  });
  it('verify user can remove all items from cart', () => {
    cy.xpath(selectors.cart_btn).click();
    cy.xpath(selectors.cart_body).should('contain.text', 'Remove All');
    cy.xpath(selectors.remove_all_btn).click();
  });
  it('verify user can checkout with valid credentials', () => {
    cy.get('body').should('contain.text', 'Dogs');
    cy.xpath(selectors.dogs_ctgry).click();
    cy.xpath(selectors.bulldog_productid).click();
    cy.contains('Add to Cart').should('be.visible');
    cy.xpath(selectors.male_adult_bulldog_cart_btn).click();
    cy.contains('Male Adult Bulldog').should('be.visible');
    //
    cy.xpath(selectors.return_to_main_menu_btn).click();
    cy.xpath(selectors.dogs_ctgry).click();
    cy.xpath(selectors.poodle_productid).click();
    cy.xpath(selectors.poodle_itemid).click();
    cy.contains('Add to Cart').should('be.visible');
    cy.xpath(selectors.poodle_cart_btn).click();
    cy.contains("Male Puppy Poodle").should('be.visible');
    //
    cy.xpath(selectors.return_to_main_menu_btn).click();
    cy.xpath(selectors.dogs_ctgry).click();
    cy.xpath(selectors.dalmation_product_id).click();
    cy.contains('Add to Cart').should('be.visible');
    cy.xpath(selectors.Spotted_Adult_Female_Dalmation_cart_btn).click();
    cy.contains("Adult Female Dalmation").should('be.visible');
    //
    cy.xpath(selectors.return_to_main_menu_btn).click();
    cy.xpath(selectors.dogs_ctgry).click();
    cy.xpath(selectors.golden_retriever_produt_id).click();
    cy.contains('Add to Cart').should('be.visible');
    cy.xpath(selectors.adult_female_golden_retriever_cart_btn).click();
    cy.contains('Adult Female Golden Retriever').should('be.visible');
    //
    cy.xpath(selectors.return_to_main_menu_btn).click();
    cy.xpath(selectors.dogs_ctgry).click();
    cy.xpath(selectors.labrador_retriever_product_id).click();
    cy.contains('Add to Cart').should('be.visible');
    cy.xpath(selectors.adult_male_labrador_retriever_cart_btn).click();
    cy.contains('Adult Male Labrador Retriever').should('be.visible');
    //
    cy.xpath(selectors.return_to_main_menu_btn).click();
    cy.xpath(selectors.dogs_ctgry).click();
    cy.xpath(selectors.chihuahua_productid).click();
    cy.contains('Add to Cart').should('be.visible');
    cy.xpath(selectors.adult_female_chihuahua_cartbtn).click();
    cy.contains('Adult Female Chihuahua').should('be.visible');
    //assertion
    cy.xpath(selectors.cart_body).within(() => {
      cy.contains('Male Adult Bulldog').should('be.visible');
      cy.contains('Male Puppy Poodle').should('be.visible');
      cy.contains('Adult Female Dalmation').should('be.visible');
      cy.contains('Adult Female Golden Retriever').should('be.visible');
      cy.contains('Adult Male Labrador Retriever').should('be.visible');
      cy.contains('Adult Female Chihuahua').should('be.visible');
    });
    cy.xpath(selectors.cart_btn).click();
    // cy.xpath(selectors.cart_body).should('have.text','Proceed to Checkout' );
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
    cy.contains('Add to Cart').should('be.visible');
    cy.xpath(selectors.adult_female_goldfish_cart_btn).click();
    cy.contains('Adult Female Goldfish').should('be.visible');

    // cy.xpath(selectors.cart_body).should('have.text','Proceed to Checkout' );
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
    cy.contains('Add to Cart').should('be.visible');
    cy.xpath(selectors.small_angelfish_cart_btn).click();
    cy.contains('Small Angelfish').should('be.visible');
    //  cy.xpath(selectors.cart_body).should('have.text','Proceed to Checkout' );
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
    cy.xpath(selectors.delete_btn).click();
    cy.log('Order deleted');
  });
});