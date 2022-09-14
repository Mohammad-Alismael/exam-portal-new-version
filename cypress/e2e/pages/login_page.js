export class LoginPage {
    loginPage_username_text = '#Username'
    loginPage_password_text = '#password'
    loginPage_button = '.MuiButton-root'
    login_alert = '.Toastify__toast-body > :nth-child(2)'
    enterUsername(username){
        cy.get(this.loginPage_username_text).type(username)

    }

    enterPassword(password){
        cy.get(this.loginPage_password_text).type(password)

    }

    clickLogin(){
        cy.get(this.loginPage_button).click()
    }
}