describe('My First Test Suite', () => {
  it('My first test case', () => {
    
    cy.visit('https://jpetstore.aspectran.com/')
   cy.get('#jpetstore-content > div:nth-child(1) > div > div.me-lg-3.mb-lg-0 > a.btn.btn-outline-light.me-2').should('have.text','Sign In')
   cy.xpath('/html/body/section/div[2]/div[1]/div/div[1]/ul/li[1]/a').should('have.text','Fish')
   cy.wait(4000)
   cy.xpath('/html/body/section/div[2]/div[1]/div/div[2]/a[2]').click();
  //  cy.xpath('/html/body/section/div[2]/div[1]/div/div[2]/a[2]').should('have.text', 'Login')
   cy.xpath('/html/body/section/div[2]/div[2]/div/div/div[1]/div/form/div[1]/input').clear().type("saina");
   cy.xpath('/html/body/section/div[2]/div[2]/div/div/div[1]/div/form/div[2]/input').clear().type("Password");
   cy.wait(4000);
   cy.xpath('/html/body/section/div[2]/div[1]/div/div[2]/a[2]').click();
  })


})