/// <reference types="Cypress" />

describe('Coinche - play', () => {
  beforeEach(() => {
    cy.clearData();
  });

  it('reaches PLAY phase', () => {
    let currentPlayer = 'Visitor';

    cy.visit('/');

    // connect player 1, create game and join
    cy.get(`input[value=${currentPlayer}]`).clear().type(currentPlayer = '1');
    cy.contains('button', 'Enter').click();
    cy.contains('button', 'Create').click();
    cy.contains('button', 'Join').click();

    // connect player 2 and join
    cy.get(`input[value=${currentPlayer}]`).clear().type(currentPlayer = '2');
    cy.contains('button', 'Enter').click();
    cy.contains('button', 'Join').click();

    // connect player 3 and join
    cy.get(`input[value=${currentPlayer}]`).clear().type(currentPlayer = '3');
    cy.contains('button', 'Enter').click();
    cy.contains('button', 'Join').click();

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
