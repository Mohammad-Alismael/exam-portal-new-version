import { CoursesSelectors } from "../support/CoursesSelectors";
import { EditCourseSelectors } from "../support/EditCourseSelectors";
import { loginWithUserData } from "../plugins/loginPlugin";

describe("Create New Course", () => {
  let coursesData;
  before(() => {
    cy.visit("/logout");
    cy.fixture("coursesData").then((data) => {
      coursesData = data;
    });
    loginWithUserData();
    cy.url().should("include", "/courses");
  });

  beforeEach(function () {
    cy.task("db:seed").then((data) => {
      cy.log(data);
    });
    cy.reload();
  });
  it("edit classroom info", function () {
    cy.wait(3000)
    EditCourseSelectors.getClassroomCard().should("exist").click();
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
      `section ${coursesData["courses"][3]["editCourseData"]["section"].toUpperCase()}`
    );
  });

  it("update classroom background img", function () {
    EditCourseSelectors.getEditBtn().should("exist").click();
    CoursesSelectors.getChooseBackgroundBtn().click();
    cy.get(":nth-child(7) > img").click();
    CoursesSelectors.submitBtn().click();
  });
});
