// https://docs.cypress.io/api/introduction/api.html

describe('My First Test', () => {
  it('Visits the app root url', () => {
    cy.visit('/')
    cy.url().should('be.equal', 'http://localhost:8081/login')
  })
})
