class CoursesSelectors {
    static getCreateClassroomBtn(){
        return cy.get('.makeStyles-addClassBtn-13 > .MuiButtonBase-root');
    }

    static getClassNameTextField(){
        return cy.get('#class_name');
    }

    static getSectionTextField(){
        return cy.get('#section');
    }
    static getCancelBtn(){
        return cy.get('.MuiButton-outlined')
    }
    static submitBtn(){
        return cy.get('.MuiDialogActions-root > .MuiButton-contained');
    }

    static getChooseBackgroundBtn(){
        return cy.get('.MuiGrid-root > :nth-child(3) > .MuiButtonBase-root');
    }

    static alert(){
        return cy.get('.Toastify__toast-body > div');
    }
}

module.exports = {
    CoursesSelectors
}