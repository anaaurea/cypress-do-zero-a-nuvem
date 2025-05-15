Cypress.Commands.add('fillMandatoryFieldsAndSubmit',(data ={
    fistname: 'Ana',
    lastName: 'Medeiros',
    email: 'annamds21@teste.com',
    text: 'tesxt'
}) => {

    cy.get('#firstName').type(data.fistname)
    cy.get('#lastName').type(data.lastName )
    cy.get('#email').type(data.email)
    cy.get('#open-text-area').type(data.text)
    cy.contains('button', 'Enviar').click()
})