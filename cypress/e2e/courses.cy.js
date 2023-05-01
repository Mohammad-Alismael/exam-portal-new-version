import { loginWithUserData } from "../plugins/loginPlugin";
import { CoursesSelectors } from "../support/CoursesSelectors";
import { seedDatabase } from "../plugins/seedDatabase";
import { EditCourseSelectors } from "../support/EditCourseSelectors";

describe("Courses", function () {
  let coursesData;
  before(() => {
    cy.fixture("coursesData").then((data) => {
      coursesData = data;
    });
    // loginWithUserData();
    cy.login({ username: "admin", password: "123" });
    cy.url().should("include", "/courses");
  });
  beforeEach(() => {
    cy.visit("/courses");
    cy.login({ username: "admin", password: "123" });
  });
  describe("Create new Course", function () {
    beforeEach(() => {
      CoursesSelectors.getCreateClassroomBtn().should("exist").click();
    });
    context("testing with no seeding", () => {
      it("displays create new course form", () => {
        CoursesSelectors.getClassNameTextField().should("exist");
        CoursesSelectors.getCancelBtn().should("exist");
        CoursesSelectors.getSectionTextField().should("exist");
        cy.get(".MuiGrid-root > :nth-child(3) > .MuiButtonBase-root").should(
          "exist"
        );
        cy.get(".MuiFormGroup-root > :nth-child(1)").should("exist");
        cy.get(".MuiFormGroup-root > :nth-child(2)").should("exist");
      });

      it("invalid course name", () => {
        CoursesSelectors.getClassNameTextField()
          .clear()
          .type(coursesData["courses"][1]["class_name"]);
        CoursesSelectors.getSectionTextField()
          .clear()
          .type(coursesData["courses"][1]["section"]);
        CoursesSelectors.submitBtn().click();
        CoursesSelectors.alert()
          .should("be.visible")
          .should("contain", "you already have classroom named CS101");
      });
    });
    context("Seeding test case", () => {
      beforeEach(function () {
        seedDatabase();
        cy.reload();
      });
      it("create new class room with random background image", function () {
        cy.get(".makeStyles-addClassBtn-3 > .MuiButtonBase-root")
          .should("exist")
          .click();
        CoursesSelectors.getClassNameTextField()
          .clear()
          .type(coursesData["testCourseData"]["courseName"]);
        CoursesSelectors.getSectionTextField()
          .clear()
          .type(coursesData["testCourseData"]["section"]);
        cy.get(
          ".css-3t0fe1-MuiButtonBase-root-MuiSwitch-switchBase .MuiSwitch-input"
        )
          .should("exist")
          .check();
        CoursesSelectors.submitBtn().click();
        CoursesSelectors.alert()
          .should("be.visible")
          .should("contain", "classroom created successfully!");
        cy.reload();
        cy.get(".MuiGrid-container")
          .find(".MuiCardMedia-root")
          .should("have.length.at.least", coursesData["courses"].length)
          .its("length")
          .then((num) => {
            cy.wrap(num).should("eq", coursesData["courses"].length + 1);
          });
      });

      it("create new class room with selected background image", function () {
        cy.get(".makeStyles-addClassBtn-3 > .MuiButtonBase-root")
          .should("exist")
          .click();
        CoursesSelectors.getClassNameTextField()
          .clear()
          .type(coursesData["testCourseData"]["courseName"]);
        CoursesSelectors.getSectionTextField()
          .clear()
          .type(coursesData["testCourseData"]["section"]);
        CoursesSelectors.getChooseBackgroundBtn().click();
        cy.get(":nth-child(9) > img").click();
        cy.get(
          ".css-3t0fe1-MuiButtonBase-root-MuiSwitch-switchBase .MuiSwitch-input"
        )
          .should("exist")
          .check();
        cy.get(".MuiDialogActions-root > .MuiButton-contained").click();
        cy.wait(2000);
        cy.get(".Toastify__toast-body > div")
          .should("be.visible")
          .should("contain", "classroom created successfully!");
        cy.get(".MuiGrid-container")
          .find(".MuiCardMedia-root")
          .should("have.length.at.least", coursesData["courses"].length)
          .its("length")
          .then((num) => {
            cy.wrap(num).should("eq", coursesData["courses"].length + 1);
          });
      });
    });
  });
  describe("modify Course Details", function () {
    it("edit classroom info", function () {
      EditCourseSelectors.getClassroomCard()
        .should("exist")
        .click({ force: true });
      cy.wait(3000)
      EditCourseSelectors.getAnnouncementComp().should("exist");
      EditCourseSelectors.getEditBtn().should("exist").click();
      CoursesSelectors.getClassNameTextField()
        .clear()
        .type(coursesData["courses"][3]["editCourseData"]["class_name"]);
      CoursesSelectors.getSectionTextField()
        .clear()
        .type(coursesData["courses"][3]["editCourseData"]["section"]);
      CoursesSelectors.submitBtn().click();
      EditCourseSelectors.getCourseName()
        .should("exist")
        .should(
          "contain",
          coursesData["courses"][3]["editCourseData"]["class_name"]
        );
      EditCourseSelectors.getCourseSection()
        .should("exist")
        .should("have.prop", "tagName", "H3")
        .should(
          "contain",
          `section ${coursesData["courses"][3]["editCourseData"][
            "section"
          ].toUpperCase()}`
        );
    });

    it("update classroom background img", function () {
      cy.url().should("include", "/courses");
      EditCourseSelectors.getClassroomCard()
        .should("exist")
        .click({ force: true });
      cy.wait(1000)
      EditCourseSelectors.getEditBtn().should("exist").click();
      CoursesSelectors.getChooseBackgroundBtn().click();
      cy.get(":nth-child(7) > img").click();
      CoursesSelectors.submitBtn().click();
    });
  });
});
