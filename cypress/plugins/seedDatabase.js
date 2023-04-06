const seedDatabase = () => {
    cy.task('db:seed').then(data => {
        cy.log(data)
    })
}

module.exports = { seedDatabase }
