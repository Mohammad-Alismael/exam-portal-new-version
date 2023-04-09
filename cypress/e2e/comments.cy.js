import CommentSelector from "../support/CommentSelector";
import { seedDatabase } from "../plugins/seedDatabase";

describe("Comments", () => {
  before(() => {
    cy.fixture("userData").as("usersData");
    cy.get("@usersData").then((usersData) => {
      cy.login(
        usersData.student_role.username,
        usersData.student_role.password
      );
    });
    cy.url().should("include", "/courses");
  });
  describe("Create New comment", function () {
    after(() => {
      seedDatabase();
      cy.reload();
    });
    it("Creating new Comment ", function () {
      CommentSelector.getCourseCard().should("exist").click();
      cy.wait(2000);
      CommentSelector.getCommentTag().click();
      CommentSelector.getCommentTextField()
        .clear({ force: true })
        .type("thanks for notifying us");
      CommentSelector.getPostCommentBtn().click({
        multiple: true,
        force: true,
      });
      cy.get(':nth-child(1) > .makeStyles-commentsMetaData-53 > .makeStyles-howManyComments-54').should('contain', '2 comments')
    });

    it("Creating new Comment with the same text", function () {
      CommentSelector.getCommentTextField()
        .clear({ force: true })
        .type("thanks for notifying us");
      CommentSelector.getPostCommentBtn().click({
        multiple: true,
        force: true,
      });
      cy.get(".Toastify__toast-body > :nth-child(2)")
        .should("exist")
        .should("contain", "Comment already exists!");
    });
    it("Deleting Comment", function () {
      cy.get(
        ":nth-child(2) > .makeStyles-dots-77 > div > #long-button"
      ).click();
      cy.get(
        "#long-menu > .MuiPaper-root > .MuiList-root > .MuiButtonBase-root"
      ).click();
    });
  });
});
