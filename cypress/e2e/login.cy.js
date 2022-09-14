import {LoginPage} from "./pages/login_page";
import {ClassesPage} from "./pages/classes_page";
import {Alert} from "./Elements/alert";

const loginPage = new LoginPage()

describe('Login Tests', () => {
  beforeEach(function () {
    cy.visit('http://localhost:3000/')
  })
  it('login with valid credentials  admin type', function () {
    loginPage.enterUsername('admin')
    loginPage.enterPassword('1234')
    loginPage.clickLogin()
    cy.get(ClassesPage.addClassroomCard).should('be.visible').and('exist')
  });

  it('login with valid credentials student type', function () {
    loginPage.enterUsername('mhdd')
    loginPage.enterPassword('1234')
    loginPage.clickLogin()
    cy.get(ClassesPage.addClassroomCard).should('not.exist');
  });

  it('login with invalid username', function () {
    loginPage.enterUsername('admin1')
    loginPage.enterPassword('1234')
    loginPage.clickLogin()
    Alert.checkAlertMessage('user not found')

  });

  it('login with invalid password', function () {
    loginPage.enterUsername('admin')
    loginPage.enterPassword('12345')
    loginPage.clickLogin()
    Alert.checkAlertMessage('password incorrect!')
  });

  it('login with inactivated email account', function () {
    loginPage.enterUsername('mhd')
    loginPage.enterPassword('1234')
    loginPage.clickLogin()
    Alert.checkAlertMessage('your email is not activated')
  });
})