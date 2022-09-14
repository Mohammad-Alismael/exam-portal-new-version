export class Alert {
    static alert = '.Toastify__toast-body > :nth-child(2)'

    static checkAlertMessage(message){
        cy.get(this.alert).contains(message)
    }
}