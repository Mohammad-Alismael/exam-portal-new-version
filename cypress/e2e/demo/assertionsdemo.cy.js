/// <reference types="cypress" />

describe('Assertions Demo', () => {
    it('passes', () => {
        cy.visit('https://example.cypress.io')
        cy.contains('get').click()
        cy.get('#query-btn')
            .should('contain', 'Button')
            .and('have.class', 'query-btn')
            .and('be.visible')
            .and('be.enabled')
        let name = 'cypress'
        expect(name).to.be.equal('cypress')

        assert.equal(4,'4', 'NOT EQUAL')
        assert.strictEqual('4','4', 'NOT EQUAL')
    })
})