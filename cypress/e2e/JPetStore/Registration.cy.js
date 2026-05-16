import { selectors } from '../../support/Selector';
describe('Registration', ()=> {
  const User = 'Selinaa' + Math.floor(1000 + Math.random() * 9000);
  const email = 'saina' + Math.floor(1000 + Math.random() * 9000)+'@gmail.com';
  const phone_nbr = Math.floor(10000000 + Math.random() * 90000000);
  beforeEach(() => {
  cy.visit('https://jpetstore.aspectran.com/')
  });
  afterEach(() => {
    cy.log("Test completed")
  });

  //Registration with valid creds
  it('User can Sign Up With valid credentials', ()=> {
  //cy.visit('https://jpetstore.aspectran.com/')
   cy.xpath(selectors.Sign_up).should('have.text','Sign Up');
   cy.xpath(selectors.Sign_up).click();
   cy.xpath(selectors.User_id).should('be.visible').type(User);
   cy.xpath(selectors.password).type('Pass@123');
   cy.xpath(selectors.confirm_password).type('Pass@123');
   cy.xpath(selectors.firstname).type('Saina');
   cy.xpath(selectors.lastname).type('abc');
   cy.xpath(selectors.email_field).type(email);
   cy.xpath(selectors.phone).type(phone_nbr);            
   cy.xpath(selectors.address1).type('Jadibuti');
   cy.xpath(selectors.address2).type('Kathamdu');
   cy.xpath(selectors.city).type('Kathmandu');
   cy.xpath(selectors.state).type('Bagmati');
   cy.xpath(selectors.zip).type('12345');
   cy.xpath(selectors.country).type('Nepal');
   cy.xpath(selectors.language).select('German');
   cy.xpath(selectors.fav_category).select('Dogs');
  //cy.get('body').should('have.value','japanese').click();
   cy.xpath(selectors.mylist).check();
   cy.xpath(selectors.mybanner).check();
   cy.xpath(selectors.saveinfo).should('have.text', 'Save Account Information').click();
//   cy.xpath('/html/body/section/div[2]/div[2]/div/div/form/div/button').click();
   cy.contains('Your account has been created').should('be.visible')
  })
//registration page invalid case empty fields
 it('User can Sign Up With empty fields', ()=> {
   //cy.visit('https://jpetstore.aspectran.com/')
   cy.xpath(selectors.Sign_up).should('have.text','Sign Up');
   cy.xpath(selectors.Sign_up).click();
   cy.xpath(selectors.saveinfo).should('have.text', 'Save Account Information').click();
   cy.contains('Your account has been created').should('not.exist');
   cy.url().should('include', 'account');
 })

 //registration page invalid case partially empty fields
it('User can Sign Up with partially empty fields', ()=>{ 
  //cy.visit('https://jpetstore.aspectran.com/')
   cy.xpath(selectors.Sign_up).should('have.text','Sign Up');
   cy.xpath(selectors.Sign_up).click();
   cy.xpath(selectors.password).type('Pass@123');
   cy.xpath(selectors.confirm_password).type('Pass@123');
   cy.xpath(selectors.firstname).type('Saina');
   cy.xpath(selectors.lastname).type('abc');
   cy.xpath(selectors.email_field).type(email);
   cy.xpath(selectors.address1).type('Jadibuti');
   cy.xpath(selectors.address2).type('Kathamdu');
   cy.xpath(selectors.city).type('Kathmandu');
   cy.xpath(selectors.state).type('Bagmati');
   cy.xpath(selectors.zip).type('12345');
   cy.xpath(selectors.country).type('Nepal');
   cy.xpath(selectors.language).select('German');
   cy.xpath(selectors.mylist).check();
   cy.xpath(selectors.mybanner).check();
   cy.xpath(selectors.saveinfo).should('have.text', 'Save Account Information').click();
   cy.contains('Your account has been created').should('not.exist');
   cy.url().should('include', 'account');
  })
})
