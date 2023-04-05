import { CoursesSelectors } from "../support/CoursesSelectors";
import { EditCourseSelectors } from "../support/EditCourseSelectors";

describe("Create New Course", () => {
  let coursesData;
  before(() => {
    cy.viewport(1280, 800);
    cy.visit("/");
    cy.fixture("coursesData").then((data) => {
      coursesData = data;
    });
    cy.fixture("userData").then((data) => {
      cy.get('input[name="username"]').type(
        data["instructor_role"]["username"]
      );
      cy.get('input[name="password"]').type(
        data["instructor_role"]["password"]
      );
    });

    cy.get('button[type="submit"]').click();
    cy.url().should("include", "/courses");
  });

  beforeEach(function () {
    cy.task("db:seed").then((data) => {
      cy.log(data);
    });
    cy.reload();
  });
  it("edit classroom info", function () {
    cy.wait(2000)
    EditCourseSelectors.getClassroomCard().should("exist").click();
    EditCourseSelectors.getAnnouncementComp().should("exist");
    EditCourseSelectors.getEditBtn().should("exist").click();
    CoursesSelectors.getClassNameTextField().clear().type(
      coursesData["courses"][3]["editCourseData"]["class_name"]
    );
    CoursesSelectors.getSectionTextField().clear().type(
      coursesData["courses"][3]["editCourseData"]["section"]
    );
    CoursesSelectors.submitBtn().click();
    EditCourseSelectors.getCourseName()
      .should("exist")
      .should(
        "contain",
        coursesData["courses"][3]["editCourseData"]["class_name"]
      );
    EditCourseSelectors.getCourseSection()
      .should("exist")
        .should('have.prop', 'tagName', 'H3')
      // .should(
      //   "contain",
      //   coursesData["courses"][3]["editCourseData"]["section"]
      // );
  });

  it('update classroom background img', function () {
    cy.wait(2000)
    EditCourseSelectors.getEditBtn().should("exist").click();
    CoursesSelectors.getChooseBackgroundBtn().click()
    cy.get(':nth-child(7) > img').click();
    CoursesSelectors.submitBtn().click();
  });
});
