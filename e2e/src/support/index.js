Cypress.Commands.add('clearData', () => {
  if (Cypress.env('E2E_ENV') === 'dev') {
    cy.exec('npm run dev:reset');
  }
});

// Show Lobby hidden elements (in order to be able to switch between players using a single browser)
Cypress.Commands.add('showLobbyHiddenElements', () => {
  cy.get('.hidden')
    .invoke('attr', 'style', 'display: block')
    .should('have.attr', 'style', 'display: block');
});
