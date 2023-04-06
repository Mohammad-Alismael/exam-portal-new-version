const loadUserData = () => {
    cy.fixture('userData').then(userData => {
        Cypress.env('userData', userData)
    })
}

module.exports = { loadUserData }
