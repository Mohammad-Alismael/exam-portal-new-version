class CoursesSelectors {
    static getCreateClassroomBtn(){
        return cy.get('.makeStyles-addClassBtn-3 > .MuiButtonBase-root');
    }

    static getClassNameTextField(){
        return cy.get('#class_name');
    }

    static getSectionTextField(){
        return cy.get('#section');
    }

    static submitBtn(){
        return cy.get('.MuiDialogActions-root > .MuiButton-contained');
    }

    static alert(){
        return cy.get('.Toastify__toast-body > div');
    }
}

module.exports = {
    CoursesSelectors
}