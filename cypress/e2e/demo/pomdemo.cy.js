import {LoginPage} from "./pages/login_page";
 const loginPage = new LoginPage()

// cy.on('window:alert',(txt)=>{
//     expect(txt).to.be.equal('message')
// })
describe('All Login Tests', function () {
    beforeEach(function(){
        cy.visit('https://opensource-demo.orangehrmlive.com/')

    })
    it('login with valid credentials', function () {
        loginPage.enterUsername('Admin12')
        loginPage.enterPassword('admin123')
        loginPage.clickLogin()
    });
    it.only('login with invalid credentials', function () {
        loginPage.enterUsername('Admin12')
        loginPage.enterPassword('admin123')
        loginPage.clickLogin()
        cy.get('.oxd-alert').contains('Invalid credentials')
    });
});
