import SignUpSelectors from "../support/SginUpSelectors";
const { loadUserData } = require("../plugins/loadUserData");
const { seedDatabase } = require("../plugins/seedDatabase");

describe("Sign Tests", () => {
  let userData;

  beforeEach(() => {
    loadUserData();
    userData = Cypress.env("userData");
    cy.visit(`/signup`);
  });

  context("my other tests", () => {
    it("create new user with empty username and password", function () {
      SignUpSelectors.getSignUpBtn().click();
      SignUpSelectors.getAlert()
        .should("be.visible")
        .should(
          "contain",
          "you cannot leave username or password field empty!"
        );
    });

    it("create new admin user with the same username", function () {
      SignUpSelectors.getUsernameTextField().type(
        userData["instructor_role"]["username"]
      );
      SignUpSelectors.getEmailAddressTextField().type(
        userData["instructor_role"]["create_user"]["email_id"]
      );
      SignUpSelectors.getPasswordTextField().type(
        userData["instructor_role"]["create_user"]["password"]
      );
      SignUpSelectors.selectUserType(3);
      SignUpSelectors.getSignUpBtn().click();
      SignUpSelectors.getAlert()
        .should("be.visible")
        .should("contain", "username already taken!");
    });

    it("create new admin user with the same email address", function () {
      SignUpSelectors.getUsernameTextField()
        .clear()
        .type(userData["instructor_role"]["create_user"]["username"]);
      SignUpSelectors.getEmailAddressTextField()
        .clear()
        .type(userData["instructor_role"]["email_id"]);
      SignUpSelectors.getPasswordTextField()
        .clear()
        .type(userData["instructor_role"]["create_user"]["password"]);
      SignUpSelectors.selectUserType(3);
      SignUpSelectors.getSignUpBtn().click();
      SignUpSelectors.getAlert()
        .should("be.visible")
        .should("contain", "email address already taken by another user!");
    });
  });

  context("Seeding test case", () => {
    beforeEach(function () {
      seedDatabase();
    });

    it("create new admin user", function () {
      SignUpSelectors.getUsernameTextField()
        .clear()
        .type(userData["instructor_role"]["create_user"]["username"]);
      SignUpSelectors.getEmailAddressTextField()
        .clear()
        .type(userData["instructor_role"]["create_user"]["email_id"]);
      SignUpSelectors.getPasswordTextField()
        .clear()
        .type(userData["instructor_role"]["create_user"]["password"]);
      SignUpSelectors.selectUserType(3);
      SignUpSelectors.getSignUpBtn().click();
      SignUpSelectors.getAlert()
        .should("be.visible")
        .should("contain", "check your email to activate your account!");
    });
  });
});
