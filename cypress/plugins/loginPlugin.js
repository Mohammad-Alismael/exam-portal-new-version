/// <reference types="cypress" />
function loginWithUserData() {
    cy.visit('/')
    cy.fixture("userData").then(data => {
        cy.get('input[name="username"]').type(data['instructor_role']['username']);
        cy.get('input[name="password"]').type(data['instructor_role']['password']);
    });

    cy.get('button[type="submit"]').click();
}

module.exports = {
    loginWithUserData
}

