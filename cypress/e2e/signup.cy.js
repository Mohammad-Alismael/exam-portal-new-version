import {CreateUserPage} from "./pages/create_user_page";
import {BASE_URL} from "../../src/api/axios";
import {LoginPage} from "./pages/login_page";
import {Alert} from "./Elements/alert";
const createUserPage = new CreateUserPage()
const loginPage = new LoginPage()

describe('Login Tests', () => {
    beforeEach(function () {
        cy.visit('http://localhost:3000/signup')
    })

    it('create new user with empty username and password', function () {
        createUserPage.clickSignUp()
        Alert.checkAlertMessage('you cannot leave username or password field empty!')
    });

    it('create new admin user', function () {
        createUserPage.enterUsername('admin12')
        createUserPage.enterEmailAddress('example@gmail.com')
        createUserPage.enterPassword('Admin123')
        createUserPage.enterUserType(3)
        createUserPage.clickSignUp()
        cy.visit('http://localhost:3000/')

        loginPage.loginUser('admin12','Admin123')
        Alert.checkAlertMessage('your email is not activated')
    });

    it.only('create new admin user', function () {
        createUserPage.enterUsername('anwar')
        createUserPage.enterEmailAddress('answer@gmail.com')
        createUserPage.enterPassword('Anwar123')
        createUserPage.enterUserType(1)
        createUserPage.clickSignUp()
        cy.visit('http://localhost:3000/')

        loginPage.loginUser('anwar','Anwar123')
        Alert.checkAlertMessage('your email is not activated')

    });

    it('create new admin user with the same username', function () {
        createUserPage.enterUsername('admin12')
        createUserPage.enterEmailAddress('example2@gmail.com')
        createUserPage.enterPassword('admin_123')
        createUserPage.enterUserType(3)
        createUserPage.clickSignUp()
        Alert.checkAlertMessage('username already taken!')
    });

    it('create new admin user with the same email address', function () {
        createUserPage.enterUsername('admin_12_clone')
        createUserPage.enterEmailAddress('example@gmail.com')
        createUserPage.enterPassword('admin_123')
        createUserPage.enterUserType(3)
        createUserPage.clickSignUp()
        Alert.checkAlertMessage('email address already taken by another user!')
    });
})