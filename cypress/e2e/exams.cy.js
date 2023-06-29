describe('Exams page', function () {
    before(()=>{
        cy.login({ username: "admin", password: "123" });
        cy.url().should("include", "/courses");
    })
    context("test case without seeding", () => {})
    context("Seeding test case", () => {})
});