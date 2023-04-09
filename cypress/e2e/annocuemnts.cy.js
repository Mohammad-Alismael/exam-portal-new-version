import { loginWithUserData } from "../plugins/loginPlugin";
import { seedDatabase } from "../plugins/seedDatabase";

describe("Announcements", function () {
  let coursesData;
  before(() => {
    cy.visit("/logout");
    cy.fixture("coursesData").then((data) => {
      coursesData = data;
    });
    loginWithUserData();
    cy.url().should("include", "/courses");
    seedDatabase();
    cy.reload();
  });
  beforeEach(function () {});
  describe("create Announcements", function () {
    it("Announcements", function () {
      cy.get(
        ":nth-child(1) > .MuiPaper-root > .MuiCardActionArea-root > .MuiCardMedia-root"
      ).click();
      cy.url().should(
        "include",
        `/courses/${coursesData["courses"][0]["classroom_id"]}`
      );
      cy.get(".makeStyles-templateContainer-16").should("exist").click();
      cy.get(".makeStyles-editor-12").type("this ");
      cy.get('[title="Bold"]').click();
      cy.get(".makeStyles-editor-12").type("test ");
      cy.get('[title="Underline"]').click();
      cy.get(".makeStyles-editor-12").type("is ");
      cy.get(
        ".rdw-block-wrapper > .rdw-dropdown-wrapper > .rdw-dropdown-selectedtext"
      ).click();

      cy.get(".rdw-dropdown-optionwrapper > :nth-child(4)").click();
      cy.get(".makeStyles-editor-12").type("automated ");
      cy.get(".rdw-colorpicker-wrapper > .rdw-option-wrapper").click();
      cy.get(":nth-child(24) > .rdw-colorpicker-cube").click();
      cy.get(".makeStyles-editor-12").type("by ");
      cy.get('[title="Strikethrough"]').click();
      cy.get(".makeStyles-editor-12").type("cypress ");
      cy.get('[title="Center"]').click();
      cy.get(".MuiButton-contained").should("exist").click();
      cy.get('[data-cy="username"] > b').should("contain", "admin");
      cy.get(":nth-child(2) > .MuiPaper-root").should("exist");
      cy.get(".rdw-center-aligned-block").should(
        "contain",
        "this test is automated by cypress"
      );
    });
  });

  describe("modify Announcements", function () {
    it("modify announcement text", function () {
      cy.get("#long-button").click();
      cy.get(
        '#long-menu > .MuiPaper-root > .MuiList-root > [tabindex="0"]'
      ).click();
      cy.get('[title="Left"]').click();
      cy.get('[title="Strikethrough"]').click();
      cy.get(".rdw-colorpicker-wrapper > .rdw-option-wrapper").click();
      cy.get(":nth-child(24) > .rdw-colorpicker-cube").click();
      cy.get(".rdw-left-aligned-block").type(",this is testing content");
      cy.get('[data-cy="post"] > .MuiButtonBase-root').click();
    });
  });

  describe("delete Announcements", function () {
    it(" delete announcement", function () {
      cy.get("#long-button").click();
      cy.get('.MuiList-root > [tabindex="-1"]').click()
    });
  });
});
