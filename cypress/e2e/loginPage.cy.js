
describe('Login Page', () => {
    let userData;
    beforeEach(() => {
        cy.fixture("userData").then((data)=>{
            userData = data;
        })
        cy.visit(`/`)
    })

    it('displays login form', () => {
        cy.get('input[name=username]').should('exist')
        cy.get('input[name="password"]').should('exist')
        cy.get('button[type=submit]').should('exist')
        cy.get('.makeStyles-title-5 > .MuiTypography-root').should('exist')
    })

    it('requires username and password', () => {
        cy.get('button[type="submit"]').click()
        cy.get('.Toastify__toast-body > div').should('be.visible').should('contain', 'username or password field is missing!');

    })

    it('rejects invalid credentials', () => {
        cy.get('input[name="username"]').type(userData['instructor_role']['username']);
        cy.get('input[name="password"]').type(userData['instructor_role']['invalid_password']);
        cy.get('button[type="submit"]').click();
        cy.get('.Toastify__toast-body > :nth-child(2)').should('be.visible').should('contain', 'password incorrect!');

    })

    it('allows valid credentials', () => {
        cy.get('input[name="username"]').type(userData['instructor_role']['username']);
        cy.get('input[name="password"]').type(userData['instructor_role']['password']);
        cy.get('button[type="submit"]').click()
        cy.url().should('include', '/courses')
        cy.get('.MuiTypography-subtitle2').should('contain',userData['instructor_role']['username'])
    })
})
