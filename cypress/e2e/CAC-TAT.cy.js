describe('Central de Atendimento ao Cliente TAT', () => {
  beforeEach(() => {
    cy.visit('./src/index.html')
  })

  it('verifica o título da aplicação', () => {
    cy.title().should('be.equal', 'Central de Atendimento ao Cliente TAT')
  })

  it('preenche os campos obrigatórios e envia o formulário', ()=>{
    const longText = Cypress._.repeat('uhasudhuahsudhaushdausdhsadh', 10) // variavel para digitar texto longo
    cy.get('#firstName').type('Ana Aurea')
    cy.get('#lastName').type('Medeiros')
    cy.get('#email').type('annamds@teste.com.br')
    cy.get('#open-text-area').type(longText)
    cy.contains('button', 'Enviar').click()

    cy.get('.success').should('be.visible')
  })

  it('exibe mensagem de erro ao submeter o formulário com um email com formatação inválida' ,() => {
    cy.get('#firstName').type('Ana Aurea')
    cy.get('#lastName').type('Medeiros')
    cy.get('#email').type('annamds@t')
    cy.get('#open-text-area').type('shuhauhduhasuhdusahduhsaudhusahdushaud')
    cy.contains('button', 'Enviar').click()

    cy.get('.error').should('be.visible')
  })

  it('Campo telefone continua vazio quando preenchido com o valor vazio' ,() => {
    cy.get('#phone')
      .type('abcd')
      .should('have.value', '')
  })

  it('exibe mensagem de erro quando o telefone se torna obrigatório mas não é preenchido antes do envio do formulário',() => {
    cy.get('#firstName').type('Ana Aurea')
    cy.get('#lastName').type('Medeiros')
    cy.get('#email').type('annamds@teste.com.br')
    cy.get('#open-text-area').type('shuhauhduhasuhdusahduhsaudhusahdushaud')
    cy.get('#phone-checkbox').click()
    cy.contains('button', 'Enviar').click()

    cy.get('.error').should('be.visible')
  })

  it('preenche e limpa os campos nome, sobrenome, email e telefon', () => {
    cy.get('#firstName')
    .type('Ana Aurea')
    .should('have.value','Ana Aurea') // confere se o nome foi preechido no campo
    .clear() // limpa o campo
    .should('have.value', '') // valida se o campo está limpo
  })

  it('exibe mensagem de erro ao submeter o formulário sem preencher os campos obrigatórios', () =>{
    cy.contains('button', 'Enviar').click()
    cy.get('.error').should('be.visible') // valida se tá visivel o error
  })

  it('envia o formulário com sucesso usando um comando customizado',() => {
    cy.fillMandatoryFieldsAndSubmit()
    cy.get('.success').should('be.visible')

  })
  it('seleciona um produto (YouTube) por seu texto',() => {
    cy.get('#product')
    .select('YouTube')
    .should('have.value', 'youtube') // should verifica se tem o valor you tube
  })

  it('seleciona um produto (Mentoria) por seu valor (value)',() => {
    cy.get('#product')
    .select('mentoria')
    .should('have.value', 'mentoria')

  })
  it('seleciona um produto (Blog) por seu índice',() => {
    cy.get('#product')
    .select(1) // foi selecionado pelo indice [0] [1]
    .should('have.value', 'blog')
  })  

  // Utilizando o check para marcado checkbox e radio
  it('marca o tipo de atendimento "Feedback"',() => {
    cy.get('input[type="radio"][value="feedback"]') // pega o campo e ver se ele foi marcado
    .check() // marca o campo 
    .should("be.checked") // verifica se o campo foi marcado
    //.should('not.be.checked') verifica se o campo não está marcado
  })
  it('marca cada tipo de atendimento',() => {
    cy.get('input[type="radio"]')
    .each(typeOfService =>{  // each (pega) , pega cada elemento, o each é uma função que recebe como argumento uma função.
      cy.wrap(typeOfService) // wrap(empacotar) , empacota todos os elementos que serão marcado.
      .check()
      .should('be.checked')
    }) 
  })

  it('marca ambos checkboxes, depois desmarca o último',() => {
    cy.get('input[type="checkbox"]')
    .check() // adicionando elemento genérico para marcar todos os checkbox existente
    .should('be.checked') // verifica se foi marcado
    .last() // pega o ultimo marcado
    .uncheck() // desmarca o checkbox
    .should('not.be.checked') // verifica se foi desmarcado
  })

  it('exibe mensagem de erro quando o telefone se torna obrigatório mas não é preenchido antes do envio do formulário',() => {
    cy.get('#firstName').type('Ana Aurea')
    cy.get('#lastName').type('Medeiros')
    cy.get('#email').type('annamds@teste.com.br')
    cy.get('#open-text-area').type('shuhauhduhasuhdusahduhsaudhusahdushaud')
    cy.get('#phone-checkbox').check() 
    cy.contains('button', 'Enviar').click() // utilização do cantains é na espera de encontrar por textos

    cy.get('.error').should('be.visible')
  })

it('seleciona um arquivo da pasta fixtures',() => {
  cy.get('#file-upload')
    .selectFile('cypress/fixtures/example.json') // importa o arquivo usando path com barras normais
    .should(input => {  // o should também pode encadear os comandos
      expect(input[0].files[0].name).to.equal('example.json')  
    })
})

it('seleciona um arquivo simulando um drag-and-drop',() => {
  cy.get('#file-upload')
    .selectFile('cypress/fixtures/example.json' , {action: 'drag-drop'}) // ação de arrastar uma pasta para dentro de um input tipo arquivo.
    .should(input => {  // o should também pode encadear os comandos
      expect(input[0].files[0].name).to.equal('example.json')  
    })
})

it('seleciona um arquivo utilizando uma fixture para a qual foi dada um alias',() => {
 cy.fixture('example.json').as('sampleFile') // outra maneira de chamar o arquivo de dentro de uma pasta utilizando o alias(as)
  cy.get('#file-upload')
    .selectFile('@sampleFile') // chamao alias (as) dentro do selectFile
    .should(input => { 
      expect(input[0].files[0].name).to.equal('example.json')  
    })
})
  it('verifica que a política de privacidade abre em outra aba sem a necessidade de um clique',() => {
    cy.contains('a', 'Política de Privacidade')
      .should('have.attr', 'href', 'privacy.html') // verifica se o atributo target é igual a blank
      .and('have.attr','target','_blank')
  })  

   it('acessa a página da política de privacidade removendo o target e então clicando no link',() => {
    cy.contains('a', 'Política de Privacidade')
      .invoke('removeAttr', 'target') // remove o atributo target
      .click() // clica no link
      
      cy.contains('CAC TAT - Política de Privacidade').should('be.visible') // verifica se o texto está visivel
  })  

})