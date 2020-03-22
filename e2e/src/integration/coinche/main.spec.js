/// <reference types="Cypress" />
/* eslint-disable cypress/no-unnecessary-waiting */

describe('coinche', () => {
  beforeEach(() => {
    // @TODO: add tests using different viewports
    cy.viewport(800, 765);

    cy.clearData();
  });

  it('reaches "play cards" phase when 4 players have joined and 1st player took "100 Clubs" and the 3 others said "skip"', () => {
    let currentPlayer = 'Visitor';

    cy.visit('/');

    // connect player 1, create game and join
    cy.get(`input[value=${currentPlayer}]`).clear().type(currentPlayer = '1');
    cy.contains('button', 'Enter').click();
    cy.contains('button', 'Create').click();
    cy.contains('button', 'Join').click();
    cy.wait(500);

    // connect player 2 and join
    cy.showHiddenElements();
    cy.get(`input[value=${currentPlayer}]`).clear().type(currentPlayer = '2');
    cy.contains('button', 'Enter').click();
    cy.contains('button', 'Join').click();
    cy.wait(500);

    // connect player 3 and join
    cy.get(`input[value=${currentPlayer}]`).clear().type(currentPlayer = '3');
    cy.contains('button', 'Enter').click();
    cy.contains('button', 'Join').click();
    cy.wait(500);

    // connect player 4, join and start playing
    cy.get(`input[value=${currentPlayer}]`).clear().type(currentPlayer = '4');
    cy.contains('button', 'Enter').click();
    cy.contains('button', 'Join').click();
    cy.contains('button', 'Play').click();

    // say take 100 Clubs
    cy.get('[data-testid="select sayTakeExpectedPoint"]').select('100');
    cy.get('[data-testid="select sayTakeTrumpMode"]').select('TrumpClub');
    cy.get('[data-testid="button sayTake"]').click();

    // connect player 3 and say skip
    cy.get(`input[value=${currentPlayer}]`).clear().type(currentPlayer = '3');
    cy.contains('button', 'Enter').click();
    cy.contains('button', 'Play').click();
    cy.get('[data-testid="button saySkip"]').click();

    // connect player 2 and say skip
    cy.get(`input[value=${currentPlayer}]`).clear().type(currentPlayer = '2');
    cy.contains('button', 'Enter').click();
    cy.contains('button', 'Play').click();
    cy.get('[data-testid="button saySkip"]').click();

    // connect player 1 and say skip
    cy.get(`input[value=${currentPlayer}]`).clear().type(currentPlayer = '1');
    cy.contains('button', 'Enter').click();
    cy.contains('button', 'Play').click();
    cy.get('[data-testid="button saySkip"]').click();
  });
});
