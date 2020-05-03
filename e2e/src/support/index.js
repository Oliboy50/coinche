/// <reference types="Cypress" />
/* eslint-disable cypress/no-unnecessary-waiting */

const showLobby = () => cy.get('.hidden')
  .invoke('attr', 'style', 'display: block')
  .should('have.attr', 'style', 'display: block');
const hideLobby = () => cy.get('.hidden')
  .invoke('attr', 'style', 'display: none')
  .should('have.attr', 'style', 'display: none');

// Internal
Cypress.Commands.add('clearData', () => {
  if (Cypress.env('E2E_ENV') === 'dev') {
    cy.exec('npm run dev:server:clear');
  }
});

// Lobby
Cypress.Commands.add('connectPlayerAndCreateCoincheRoomAndJoin', (player) => {
  cy.get(`input[value="Visitor"]`).clear().type(player);
  cy.contains('button', 'Enter').click();
  cy.contains('button', 'Create').click();
  cy.contains('button', 'Join').click();
  cy.wait(500);
  cy.get('#instances td:nth-child(3)').should('contain', player);
});
Cypress.Commands.add('connectPlayerAndJoin', (player) => {
  showLobby();
  cy.get(`.hidden input[type="text"]`).clear().type(player);
  cy.contains('button', 'Enter').click();
  cy.contains('button', 'Join').click();
  cy.wait(500);
  cy.get('#instances td:nth-child(3)').should('contain', player);
  hideLobby();
});
Cypress.Commands.add('usingPlayer', (player) => {
  showLobby();
  cy.get(`.hidden input[type="text"]`).clear().type(player);
  cy.contains('button', 'Enter').click();
  cy.contains('button', 'Play').click();
  hideLobby();
});

// Game
Cypress.Commands.add('playCard', (cardColor, cardName, sayBelot = '') => {
  // click (and say or don't say belot if needed)
  if (!sayBelot) {
    cy.get(`[data-testid="card ${cardColor}|${cardName}"]`).click();
  }
  if (sayBelot === 'say belot') {
    cy.get('[data-testid="button sayBelot"]').click({ force: true, multiple: true });
    cy.get('.myPlayer .playerSaidAnnounces').should('contain', 'Belote');
  }
  if (sayBelot === 'dont say belot') {
    cy.get('[data-testid="button dontSayBelot"]').click({ force: true, multiple: true });
    cy.get('.myPlayer .playerSaidAnnounces').should('not.contain', 'Belote');
  }

  // assert card is played
  cy.get(`.playedCard.bottom [data-testid="card ${cardColor}|${cardName}"]`).should('be.visible');

  // wait if last player
  cy.get('.playedCard.right').then(($el) => {
    if (!$el.text()) {
      return;
    }
    cy.wait(2500);
    cy.get(`.playedCard.bottom [data-testid="card ${cardColor}|${cardName}"]`).should('not.be.visible');
  });
});
