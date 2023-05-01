import {
  loginWithUserData,
  loginWithUserDataPassed,
} from "../plugins/loginPlugin";
import { seedDatabase } from "../plugins/seedDatabase";

describe("Invitation Link", function () {
  let coursesData;
  let userData;
  let link;
  before(() => {
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
      cy.get(
        ":nth-child(1) > .MuiPaper-root > .MuiCardActionArea-root > .MuiCardMedia-root > .makeStyles-dots-22 > #long-button"
      ).click(); // Click on the "long button" to open the menu
      cy.get("#long-menu > .MuiPaper-root")
        .find(".MuiButtonBase-root") // Select the first option from the menu
        .click();

      cy.get(".Toastify__toast-body > :nth-child(2)")
        .should("exist")
        .should("contain", "copied to clipboard");

      cy.window()
        .then((win) => win.navigator.clipboard.readText())
        .as("invitationLink"); // Read the invitation link and save it as an alias

      cy.visit("/logout"); // Log out of the admin user
      cy.wait(2000);
      cy.get("@invitationLink").then((invitationLink) => {
        link = invitationLink
        cy.log(invitationLink);
        cy.visit(invitationLink);
        cy.get('.Toastify__toast-body > :nth-child(2)').should('exist')
      });

    });
    it('invitation link for students', function () {
      const student = userData.student_role;
      // cy.visit("/logout");
      loginWithUserDataPassed(student.username,student.password)
      cy.visit(link);
      cy.get("h2").should("contain", userData["instructor_role"]["username"]);
      cy.get(".btn-primary").click();
      cy.get(".MuiGrid-container")
        .find(".MuiCardMedia-root")
        .should("have.length.at.least", 4)
        .its("length")
        .then((num) => {
          cy.wrap(num).should("eq", 4);
        });
    });
  });
});
