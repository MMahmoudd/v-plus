// // https://docs.cypress.io/api/introduction/api.html

// // login just once using API
// let user

// before(function fetchUser () {
//   cy.request('POST', 'https://development.millennium.sa/api/v1/login', {
//     email: Cypress.env('login').email,
//     password: Cypress.env('login').password,
//   })
//   .its('body')
//   .then((res) => {
//     user = res.token
//   })
// })

// beforeEach(function setUser () {
//     cy.visit('/', {
//       onBeforeLoad (win) {
//         // and before the page finishes loading
//         // set the user object in local storage
//         win.localStorage.setItem('token', JSON.stringify(user))
//       },
//     })
//     // the page should be opened and the user should be logged in
// })

// describe('the root url', () => {
//     cy.request('')
//     it('Visits the app root url', () => {
//       cy.visit('/')
//       cy.url().should('be.equal', 'http://localhost:8080/')
//     })
// })
