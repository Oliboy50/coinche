// @TODO: to be able to run tests several times without having to manually shutdown the server
Cypress.Commands.add('clearData', () => {
  const env = Cypress.env('TEST_ENV');
  if (env === 'dev') {
    // remove in-memory data (we could use ts-node-dev to simply restart the server?)
    // cy.exec('npm run server:restart');
  }
});

// Show Lobby hidden elements (in order to be able to switch between players using a single browser)
Cypress.Commands.add('showHiddenElements', () => {
  cy.get('.hidden')
    .invoke('attr', 'style', 'display: block')
    .should('have.attr', 'style', 'display: block');
});
