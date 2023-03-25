import utils from "../../../suppport/utils.json";

describe('Create New Course', () => {

    before(() => {
        cy.visit(`/`);
        cy.fixture("userData").then((data)=>{
            cy.get('input[name="username"]').type(data['instructor_role']['username']);
            cy.get('input[name="password"]').type(data['instructor_role']['password']);
        });
        cy.get('button[type="submit"]').click();
        cy.url().should('include', '/courses');
    });

    beforeEach(function () {
        cy.task('db:seed').then((data)=>{
            cy.log(data)
        })

    })

    it('displays create new course form', () => {
        cy.get('.makeStyles-addClassBtn-17 > .MuiButtonBase-root').should('exist').click();
        cy.get('#class_name').should('exist');
        cy.get('.MuiButton-outlined').should('exist');
        cy.get('#section').should('exist')
        cy.get('.MuiGrid-root > :nth-child(3) > .MuiButtonBase-root').should('exist')
        cy.get('.MuiFormGroup-root > :nth-child(1)').should('exist')
        cy.get('.MuiFormGroup-root > :nth-child(2)').should('exist')

    })

    it('invalid course name', () => {
        cy.get('#class_name').type("CS101");
        cy.get('#section').type("a");
        cy.get('.MuiDialogActions-root > .MuiButton-contained').click();
        cy.get('.Toastify__toast-body > div').should('be.visible').should('contain', 'you already have classroom named CS101');

    })

    it('create new class room with random background image', function () {
        cy.get('#class_name').clear().type("CS112");
        cy.get('#section').clear().type("A");
        cy.get('.MuiDialogActions-root > .MuiButton-contained').click();
        cy.get('.Toastify__toast-body > div').should('be.visible').should('contain', 'classroom created successfully!');
        const num = cy.get('.MuiGrid-container')
            .find('.MuiCardMedia-root')
            .its('length') .then(num => {
                cy.wrap(num).should('eq', num);
            });
    });
    //
    // it('create new class room with selected background image', function () {
    //     cy.get('.MuiGrid-container')
    //         .find('.MuiCardMedia-root')
    //         .its('length')
    //         .should('eq', 12)
    // });
})