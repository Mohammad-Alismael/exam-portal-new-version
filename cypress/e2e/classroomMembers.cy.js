describe("Classroom members", function () {
  beforeEach(() => {
    cy.fixture("userData").as("usersData");
    cy.get("@usersData").then((usersData) => {
      cy.login(
          usersData.student_role
      );
    });
    cy.url().should("include", "/courses");
  });
  describe("List classroom members", function () {
    it("should ", function () {
      // cy.get('.sc-csuSiG').invoke('mouseover')
      cy.visit("/courses/LSZ54NUK5SX/people");

      cy.get(".MuiGrid-root")
        .should("exist")
        .children()
        .should("have.length.at.least", 5);
      cy.get(".makeStyles-searchbar-5").type("smith");
      cy.get(".MuiGrid-root")
        .should("exist")
        .children()
        .should("have.length.at.least", 2);
    });
  });
  describe("Search through classroom members", function () {});
});
