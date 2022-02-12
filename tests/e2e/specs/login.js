// https://docs.cypress.io/api/introduction/api.html

describe('Login page', () => {
    it('Visits the app login url', () => {
      cy.visit('/')
      cy.url().should('be.equal', 'http://localhost:8081/login')
    })

    it('should show email & password inputs', () => {
        cy.visit('/login')
        cy.get('[name="email"]').should('exist')
        cy.get('[name="password"]').should('exist')
    })

    it('submit button should be disabled if there is no email and password', () => {
        cy.visit('/login')
        cy.get('button[type=submit').should('have.attr', 'disabled')
    })

    it('show redirect after login with the right credentials and hit enter', () => {
        const email = 'x@demo.com'
        const password = '123'
        cy.visit('/login')
        cy.get('input[name=email]').type(email)
        cy.get('input[name=password]').type(`${password}{enter}`)
        cy.url().should('eq', 'http://localhost:8081/')
    })

    it('show redirect after login with the right credentials and click on button', () => {
        const email = 'x@demo.com'
        const password = '123'
        cy.visit('/login')
        cy.get('input[name=email]').type(email)
        cy.get('input[name=password]').type(`${password}{enter}`)
        cy.get('button[type=submit]').click()
    })

    it('should show message when email field is not a valid email', () => {
        const email = 'xcom'
        const password = '123'
        cy.visit('/login')
        cy.get('input[name=email]').type(email)
        cy.get('input[name=password]').type(`${password}{enter}`)
        cy.get('button[type=submit]').click()
        cy.get('.v-alert__content').should('contain', 'The email must be a valid email address.')
    })

    it('should show message  after login with the wrong credentials', () => {
        const email = 'x@demo.co'
        const password = '1234'
        cy.visit('/login')
        cy.get('input[name=email]').type(email)
        cy.get('input[name=password]').type(`${password}{enter}`)
        cy.get('button[type=submit]').click()
        cy.get('.v-alert__content').should('contain', 'Incorrect Details')
    })
})
