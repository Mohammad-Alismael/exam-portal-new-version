import {
  loginWithUserData,
  loginWithUserDataPassed,
} from "../plugins/loginPlugin";
import { seedDatabase } from "../plugins/seedDatabase";

describe("Invitation Link", function () {
  let coursesData;
  let userData;
  before(() => {
    cy.viewport(1280, 800);
    cy.fixture("coursesData").then((data) => {
      coursesData = data;
    });
    cy.fixture("userData").then((data) => {
      userData = data;
    });
    loginWithUserData();
    cy.url().should("include", "/courses");
  });

  context("Seeding test case", () => {
    beforeEach(function () {
      seedDatabase();
    });
    it("should copy initiation link and log in with it as student", function () {
      cy.get(":nth-child(1) > .MuiPaper-root")
        .find(".makeStyles-dots-17 > #long-button")
        .click(); // Click on the "long button" to open the menu
      cy.get("#long-menu > .MuiPaper-root")
        .find(".MuiButtonBase-root") // Select the first option from the menu
        .click();

      cy.window()
        .then((win) => win.navigator.clipboard.readText())
        .as("invitationLink"); // Read the invitation link and save it as an alias

      cy.visit("/logout"); // Log out of the admin user

      cy.get("@invitationLink").then((invitationLink) => {
        cy.log(invitationLink);
        cy.visit(invitationLink);
        const student = userData.student_role;
        loginWithUserDataPassed(student.username, student.password);
      });
      cy.get("h2").should("contain", userData["instructor_role"]["username"]);
      cy.get(".btn-primary").click();
      cy.get(".MuiGrid-container")
        .find(".MuiCardMedia-root")
        .should("have.length.at.least", 1)
        .its("length")
        .then((num) => {
          cy.wrap(num).should("eq",  1);
        });
    });
  });
});
