export default class SignUpSelectors {
    static getUsernameTextField(){
        return cy.get('#Username')
    }

    static getEmailAddressTextField(){
        return cy.get('#email')
    }

    static getPasswordTextField(){
        return cy.get('#password')
    }

    static selectUserType(type){
        cy.get('#select-user-type').click()
        if (type === 1){
            cy.get('.MuiList-root > [tabindex="0"]').click()
        }
        if (type === 2){
            cy.get('[data-value="2"]').click()
        }if (type === 3){
            cy.get('[data-value="3"]').click()
        }
    }

    static getSignUpBtn(){
        return cy.get('#sign_up')
    }

    static getAlert(){
        return cy.get('.Toastify__toast-body > :nth-child(2)')
    }
}