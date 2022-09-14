before(function () {
    cy.fixture('example.json').as('test_data')
})

it('Read file using Fixture', function (){
    cy.fixture('example.json').then((data)=>{
        cy.log(data.name)
        cy.log(data.email)
    })

    cy.log(this.test_data.name)
})

it('Read file using ReadFile()', function () {
    cy.readFile('./cypress/fixtures/example.json').then((data)=>{
        cy.log('from read file', data.email)
    })
});

it('write file demo', function () {
    cy.writeFile('./cypress/fixtures/sample.txt',"Hello, I'm mohammed")
    cy.writeFile('./cypress/fixtures/sample.txt',"Hello, I'm learning cypress", {flag: 'a+'})
});