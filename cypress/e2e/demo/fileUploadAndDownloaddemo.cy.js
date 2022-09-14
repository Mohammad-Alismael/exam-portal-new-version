// <reference types="cypress />
it('file upload Test', function () {
    cy.visit('https://trytestingthis.netlify.app/')
    cy.get('#myfile').attachFile('example.json')
});

it('File Download Test', function () {
    cy.downloadFile('https://upload.wikimedia.org/wikipedia/en/a/a9/Example.jpg','./cypress/fixtures/myDownloads','example.jpg')

});