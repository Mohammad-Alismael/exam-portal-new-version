export class ForgotPasswordPage {
    forgotPasswordPage_email = ''
    forgotPasswordPage_submit_button = ''

    setEmail(email){
        cy.get(this.forgotPasswordPage_email).type(email)
    }

    submit(email){
        cy.get(this.forgotPasswordPage_email).type(email)
        cy.get(this.forgotPasswordPage_submit_button).click()
    }

}