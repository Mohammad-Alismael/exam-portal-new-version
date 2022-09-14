export class CreateUserPage {
    signupPage_username_text = '#Username'
    signupPage_email_text = '#email'
    signupPage_password_text = '#password'
    signupPage_user_type = '#demo-simple-select'
    signupPage_button = '#sign_up'
    alert = '.Toastify__toast-body > :nth-child(2)'

    enterUsername(username){
        cy.get(this.signupPage_username_text).type(username)
    }

    enterEmailAddress(email){
        cy.get(this.signupPage_email_text).type(email)
    }

    enterPassword(password){
        cy.get(this.signupPage_password_text).type(password)
    }

    enterUserType(userType){
        cy.get(this.signupPage_user_type).click()
        cy.get(`[data-value="${userType}"]`).click()

    }

    clickSignUp(){
        cy.get(this.signupPage_button).click()
    }
}