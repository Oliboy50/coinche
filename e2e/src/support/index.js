/// <reference types="Cypress" />
/* eslint-disable cypress/no-unnecessary-waiting */

// Internal
Cypress.Commands.add('clearData', () => {
  if (Cypress.env('E2E_ENV') === 'dev') {
    cy.exec('npm run dev:server:clear');
  }
});

// Lobby
Cypress.Commands.add('connectPlayerAndCreateCoincheRoomAndJoin', (player) => {
  cy.get(`.login [data-testid="input name"]`).type(player);
  cy.get(`.login [data-testid="button submit"]`).click();
  cy.get(`.lobby [data-testid="button createRoom"]`).click();
  cy.get(`.lobby .room:nth-child(1) .topLeftSeat`).should('contain', player);
});
Cypress.Commands.add('connectPlayerAndJoin', (player, seatClassName) => {
  cy.visit('/logout');
  cy.get(`.login [data-testid="input name"]`).type(player);
  cy.get(`.login [data-testid="button submit"]`).click();
  cy.get(`.lobby .${seatClassName} [data-testid="button join"]`).click();
  cy.get(`.lobby .room:nth-child(1) .${seatClassName}`).should('contain', player);
});
Cypress.Commands.add('usingPlayer', (player) => {
  cy.visit('/logout');
  cy.get(`.login [data-testid="input name"]`).type(player);
  cy.get(`.login [data-testid="button submit"]`).click();
  cy.reload();
  cy.get(`.lobby .room:nth-child(1) [data-testid="button go"]`).click();
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
    cy.get(`.playedCard.bottom [data-testid="card ${cardColor}|${cardName}"]`).should('not.exist');
  });
});
