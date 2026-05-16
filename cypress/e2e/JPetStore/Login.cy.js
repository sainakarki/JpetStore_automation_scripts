import { selectors } from '../../support/Selector';
describe('Registration', ()=> {
    beforeEach(() => {
  cy.visit('https://jpetstore.aspectran.com/')
  });
  afterEach(() => {
    cy.log("Test completed")
  });
  //login page
it('Verify user logins with valid creds', () => {
   //cy.visit('https://jpetstore.aspectran.com/')
   cy.xpath(selectors.sign_in).click();
   cy.xpath(selectors.username).clear().type("Selinaa");
   cy.xpath(selectors.login_password).clear().type("Pass@123");
   cy.xpath(selectors.login_btn).click();
   cy.contains('Welcome').should('be.visible');
  });
  it('Verify user logins with empty creds. field', () => {
   //cy.visit('https://jpetstore.aspectran.com/')
   cy.xpath(selectors.sign_in).click();
   cy.xpath(selectors.username).clear();
   cy.xpath(selectors.login_password).clear();
   cy.xpath(selectors.login_btn).click();
   cy.contains('Invalid username or password. Signon failed.').should('be.visible');
  });
  it('Verify user logins with empty username field', () => {
   //cy.visit('https://jpetstore.aspectran.com/')
   cy.xpath(selectors.sign_in).click();
   cy.xpath(selectors.login_password).clear().type("Pass@123");
   cy.xpath(selectors.login_btn).click();
   cy.contains('Invalid username or password. Signon failed.').should('be.visible');
  });
  it('Verify user logins with empty password field', () => {
   //cy.visit('https://jpetstore.aspectran.com/')
   cy.xpath(selectors.sign_in).click();
   cy.xpath(selectors.username).clear().type("Selinaa");
   cy.xpath(selectors.login_btn).click();
   cy.contains('Invalid username or password. Signon failed.').should('be.visible');
  });
  it('Verify user logins with unregistered creds', () => {
   //cy.visit('https://jpetstore.aspectran.com/')
   cy.xpath(selectors.sign_in).click();
   cy.xpath(selectors.username).clear().type("Sarita");
   cy.xpath(selectors.login_password).clear().type('123')
   cy.xpath(selectors.login_btn).click();
   cy.contains('Invalid username or password. Signon failed.').should('be.visible');
  });
  
});