# Gestor de turmas - Test Suite

## Descrição

Este projeto contém uma suíte de teste automatizado utilizando Cypress e JavaScript, destinada à validação de funcionalidades web.

## Estrutura do Projeto

- **cypress/e2e/**: Contém os testes end-to-end (E2E) organizados por contexto.
- **cypress/support/**: Contém comandos customizados e configurações de suporte para os testes.
- **cypress.env.json**: Contém variáveis de ambiente utilizadas nos testes, como credenciais de login.
- **yarn.lock**: Gerenciamento de dependências com Yarn.

## Pré-requisitos
 Para rodar o projeto é necessário que tenha as seguintes versões:

- Node.js v16.x ou superior
- Yarn v1.x ou superior
- Cypress v13.13.3 ou superior

## Instalação

1. Clone o repositório:

   git clone  https://github.com/anaaurea/cypress-do-zero-a-nuvem

2. Instalando as Dependências
    `yarn install cypress`
    
3. Executando os testes

    Executando pela interface
    `yarn cy:open`

    Executando pelo terminal em moddo headles
    `yarn test`


## Contribuição

1. Faça um fork do projeto.

2. Crie uma branch para sua feature ou correção de bug
    git checkout -b minha-feature

3. Commit suas alterações
    git commit -m "Descrição da minha feature"

4. Envie para o Github:
    git push origin minha-feature
   

Este projeto foi criado por Ana Áurea 

