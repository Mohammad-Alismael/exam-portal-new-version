class EditCourseSelectors {
  static getClassroomCard() {
    return cy.get('[data-cy="course-index-JZX97HFV8WD"] > .MuiCardActionArea-root > .MuiCardMedia-root')
  }
  static getEditBtn() {
    return cy.get(".MuiPaper-elevation5 > .MuiButtonBase-root");
  }

  static getAnnouncementComp() {
    return cy.get(".makeStyles-templateContainer-16");
  }

  static getCourseName() {
    return cy.get("b");
  }

  static getCourseSection() {
    return cy.get('#course-section');
  }
}

module.exports = {
  EditCourseSelectors,
};
