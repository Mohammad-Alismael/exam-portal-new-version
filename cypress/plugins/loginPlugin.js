function loginWithUserData() {
    cy.visit('/')
    cy.fixture("userData").then(data => {
        cy.get('input[name="username"]').type(data['instructor_role']['username']);
        cy.get('input[name="password"]').type(data['instructor_role']['password']);
    });

    cy.get('button[type="submit"]').click();
}

function loginWithUserDataPassed(username,password) {
    cy.fixture("userData").then(data => {
        cy.get('input[name="username"]').type(username);
        cy.get('input[name="password"]').type(password);
    });
    cy.get('button[type="submit"]').click();
}

module.exports = {
    loginWithUserData,
    loginWithUserDataPassed
}

