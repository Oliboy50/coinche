/// <reference types="Cypress" />
/* eslint-disable cypress/no-unnecessary-waiting */

const PLAYER_1 = 'p1';
const PLAYER_2 = 'p2';
const PLAYER_3 = 'p3';
const PLAYER_4 = '♥️4♣️';

describe('coinche', () => {
  beforeEach(() => {
    cy.viewport(800, 765);
    cy.clearData();
  });

  it('creates a 4 players game and plays until the game is over', () => {
    cy.visit('/');

    // Language option
    cy.get('[data-testid="button options"]').click();
    cy.get('[data-testid="select languageCode"]').select('Anglais');
    cy.get('[data-testid="button submit"]').should('contain', 'Submit');
    cy.get('[data-testid="select languageCode"]').select('French');
    cy.get('[data-testid="button submit"]').should('contain', 'Valider');
    cy.get('[data-testid="button options"]').click();

    cy.connectPlayerAndCreateCoincheRoomAndJoin(PLAYER_1);
    cy.connectPlayerAndJoin(PLAYER_2, 'topRightSeat');
    cy.connectPlayerAndJoin(PLAYER_3, 'bottomLeftSeat');
    cy.connectPlayerAndJoin(PLAYER_4, 'bottomRightSeat');

    cy.usingPlayer(PLAYER_4);

    // Card display and color options
    cy.get('[data-testid="button options"]').click();
    cy.get('[data-testid="select cardDisplay"]').select('DejaVu');
    cy.get('.coincheBoard .DejaVuFont .card').should('be.visible');
    cy.get('[data-testid="select cardDisplay"]').select('Natif');
    cy.get('.coincheBoard .DejaVuFont .card').should('not.exist');
    cy.get('[data-testid="select cardColorDisplay"]').select('4 couleurs');
    cy.get('.coincheBoard .card.club').should('exist');
    cy.get('[data-testid="select cardColorDisplay"]').select('2 couleurs');
    cy.get('.coincheBoard .DejaVuFont .card.club').should('not.exist');
    cy.get('[data-testid="button options"]').click();

    // GameHistory before starting first round
    cy.get('[data-testid="button gameHistory"]').should('not.exist');

    cy.get('[data-testid="select sayTakeExpectedPoint"]').select('100');
    cy.get('[data-testid="select sayTakeTrumpMode"]').select('TrumpClub');
    cy.get('[data-testid="button sayTake"]').click();
    cy.get('.myPlayer .playerSaid').should('contain', '100 \u2663 Trèfle');

    cy.usingPlayer(PLAYER_3);
    cy.get('.otherPlayer.left .playerSaid').should('contain', '100 \u2663 Trèfle');
    cy.get('[data-testid="button saySkip"]').click();
    cy.get('.myPlayer .playerSaid').should('contain', 'Je passe');

    cy.usingPlayer(PLAYER_2);
    cy.get('.otherPlayer.top .playerSaid').should('contain', '100 \u2663 Trèfle');
    cy.get('.otherPlayer.left .playerSaid').should('contain', 'Je passe');
    cy.get('[data-testid="button saySkip"]').click();
    cy.get('.myPlayer .playerSaid').should('contain', 'Je passe');

    cy.usingPlayer(PLAYER_1);
    cy.get('.otherPlayer.right .playerSaid').should('contain', '100 \u2663 Trèfle');
    cy.get('.otherPlayer.top .playerSaid').should('contain', 'Je passe');
    cy.get('.otherPlayer.left .playerSaid').should('contain', 'Je passe');
    cy.get('[data-testid="button saySkip"]').click();
    cy.get('.myPlayer .playerSaid').should('contain', 'Je passe');
    cy.wait(1500);
    cy.get('.myPlayer .playerSaid').should('not.exist');

    // GameHistory after starting first round
    cy.get('[data-testid="button gameHistory"]').should('be.visible');
    cy.get('.gameHistory').should('not.exist');
    cy.get('[data-testid="button gameHistory"]').click();
    cy.get('.gameHistory').should('be.visible');
    cy.get('.gameHistory .round:nth-child(1)').should('contain', 'Détail de la jetée n°1');
    cy.get('.gameHistory .round:nth-child(1)').should('contain', `Attaquant\u00A0: ${PLAYER_4}`);
    cy.get('.gameHistory .round:nth-child(1)').should('contain', 'Objectif\u00A0: 100 \u2663 Trèfle');
    cy.get('[data-testid="button gameHistory"]').click();

    cy.usingPlayer(PLAYER_4);
    // say announce Cent
    cy.get('[data-testid="select sayAnnounce"]').select('Cent au roi de trèfle');
    cy.get('[data-testid="button sayAnnounce"]').click();
    cy.get('.myPlayer .playerSaidAnnounces').should('contain', 'Cent');
    cy.playCard('Club', 'Jack');

    cy.usingPlayer(PLAYER_3);
    cy.get('.otherPlayer.left .playerSaidAnnounces').should('contain', 'Cent');
    cy.get('.playedCard.left [data-testid="card Club|Jack"]').should('be.visible');
    // say announce Cinquante
    cy.get('[data-testid="select sayAnnounce"]').select('Cinquante au roi de coeur');
    cy.get('[data-testid="button sayAnnounce"]').click();
    cy.get('.myPlayer .playerSaidAnnounces').should('contain', 'Cinquante');
    cy.playCard('Club', 'Ace');

    cy.usingPlayer(PLAYER_2);
    cy.get('.otherPlayer.top .playerSaidAnnounces').should('contain', 'Cent');
    cy.get('.playedCard.top [data-testid="card Club|Jack"]').should('be.visible');
    cy.get('.otherPlayer.left .playerSaidAnnounces').should('contain', 'Cinquante');
    cy.get('.playedCard.left [data-testid="card Club|Ace"]').should('be.visible');
    // say announce Tierce
    cy.get('[data-testid="select sayAnnounce"]').select('Tierce au 9 de coeur');
    cy.get('[data-testid="button sayAnnounce"]').click();
    cy.get('.myPlayer .playerSaidAnnounces').should('contain', 'Tierce');
    cy.playCard('Heart', 'Ace');

    cy.usingPlayer(PLAYER_1);
    cy.get('.otherPlayer.right .playerSaidAnnounces').should('contain', 'Cent');
    cy.get('.playedCard.right [data-testid="card Club|Jack"]').should('be.visible');
    cy.get('.otherPlayer.top .playerSaidAnnounces').should('contain', 'Cinquante');
    cy.get('.playedCard.top [data-testid="card Club|Ace"]').should('be.visible');
    cy.get('.otherPlayer.left .playerSaidAnnounces').should('contain', 'Tierce');
    cy.get('.playedCard.left [data-testid="card Heart|Ace"]').should('be.visible');
    // dont say announce
    cy.get('[data-testid="select sayAnnounce"]').should('contain', 'Cent au valet de carreau');
    cy.get('.myPlayer .playerSaidAnnounces').should('not.exist');
    cy.playCard('Diamond', 'Ace');

    cy.usingPlayer(PLAYER_4);
    // display previous played cards
    cy.get('[data-testid="button toggleIsDisplayedPreviousCardsPlayed"]').click();
    cy.get('.playedCard.bottom [data-testid="card Club|Jack"]').should('be.visible');
    cy.get('.playedCard.right [data-testid="card Club|Ace"]').should('be.visible');
    cy.get('.playedCard.top [data-testid="card Heart|Ace"]').should('be.visible');
    cy.get('.playedCard.left [data-testid="card Diamond|Ace"]').should('be.visible');
    cy.get('[data-testid="button toggleIsDisplayedPreviousCardsPlayed"]').click();
    cy.playCard('Club', 'Nine');
    cy.get('.myPlayer .playerSaidAnnounces').should('contain', 'Cent au roi de trèfle');
    cy.get('.otherPlayer.top .playerSaidAnnounces').should('contain', 'Tierce au 9 de coeur');

    cy.usingPlayer(PLAYER_3);
    cy.get('.otherPlayer.left .playerSaidAnnounces').should('contain', 'Cent au roi de trèfle');
    cy.get('.otherPlayer.right .playerSaidAnnounces').should('contain', 'Tierce au 9 de coeur');
    cy.playCard('Club', 'Seven');

    cy.usingPlayer(PLAYER_2);
    cy.get('.myPlayer .playerSaidAnnounces').should('contain', 'Tierce au 9 de coeur');
    cy.get('.otherPlayer.top .playerSaidAnnounces').should('contain', 'Cent au roi de trèfle');
    cy.playCard('Spade', 'Nine');

    cy.usingPlayer(PLAYER_1);
    cy.get('.otherPlayer.left .playerSaidAnnounces').should('contain', 'Tierce au 9 de coeur');
    cy.get('.otherPlayer.right .playerSaidAnnounces').should('contain', 'Cent au roi de trèfle');
    cy.playCard('Spade', 'Ace');
    cy.get('.otherPlayer.left .playerSaidAnnounces').should('not.exist');
    cy.get('.otherPlayer.right .playerSaidAnnounces').should('not.exist');

    cy.usingPlayer(PLAYER_4);
    cy.playCard('Club', 'King', 'say belot');

    cy.usingPlayer(PLAYER_3);
    cy.playCard('Spade', 'Ten');

    cy.usingPlayer(PLAYER_2);
    cy.playCard('Spade', 'Eight');

    cy.usingPlayer(PLAYER_1);
    cy.playCard('Spade', 'Seven');

    cy.usingPlayer(PLAYER_4);
    cy.playCard('Club', 'Ten');

    cy.usingPlayer(PLAYER_3);
    cy.playCard('Spade', 'Jack');

    cy.usingPlayer(PLAYER_2);
    cy.playCard('Diamond', 'King');

    cy.usingPlayer(PLAYER_1);
    cy.playCard('Diamond', 'Seven');

    cy.usingPlayer(PLAYER_4);
    cy.playCard('Club', 'Queen');

    cy.usingPlayer(PLAYER_3);
    cy.playCard('Heart', 'Ten');

    cy.usingPlayer(PLAYER_2);
    cy.playCard('Diamond', 'Queen');

    cy.usingPlayer(PLAYER_1);
    cy.playCard('Diamond', 'Jack');

    cy.usingPlayer(PLAYER_4);
    cy.playCard('Club', 'Eight');

    cy.usingPlayer(PLAYER_3);
    cy.playCard('Heart', 'King');

    cy.usingPlayer(PLAYER_2);
    cy.playCard('Heart', 'Nine');

    cy.usingPlayer(PLAYER_1);
    cy.playCard('Diamond', 'Ten');

    cy.usingPlayer(PLAYER_4);
    cy.playCard('Spade', 'Queen');

    cy.usingPlayer(PLAYER_3);
    cy.playCard('Heart', 'Queen');

    cy.usingPlayer(PLAYER_2);
    cy.playCard('Heart', 'Eight');

    cy.usingPlayer(PLAYER_1);
    cy.playCard('Diamond', 'Nine');

    cy.usingPlayer(PLAYER_4);
    cy.playCard('Spade', 'King');

    cy.usingPlayer(PLAYER_3);
    cy.playCard('Heart', 'Jack');

    cy.usingPlayer(PLAYER_2);
    cy.playCard('Heart', 'Seven');

    cy.usingPlayer(PLAYER_1);
    cy.playCard('Diamond', 'Eight');

    // WinnersCongratulation
    cy.get('.winnersTeamCongratulation').should('contain', `${PLAYER_2} et ${PLAYER_4} ont gagné`);

    // GameHistory after playing last round card
    cy.get('[data-testid="button gameHistory"]').click();
    cy.get('.gameHistory .round:nth-child(1)').should('contain', 'Récapitulatif des scores à la fin de la jetée');
    cy.get('.gameHistory .round:nth-child(1)').should('contain', `Equipe [${PLAYER_1}|${PLAYER_3}]\u00A0: 0 (0 + 0) points`);
    cy.get('.gameHistory .round:nth-child(1)').should('contain', `Equipe [${PLAYER_2}|${PLAYER_4}]\u00A0: 492 (0 + 492) points`);
    cy.get('.gameHistory .round:nth-child(1)').should('contain', 'Résumé des points de la jetée');
    cy.get('.gameHistory .round:nth-child(1)').should('contain', `Equipe [${PLAYER_1}|${PLAYER_3}]\u00A0: 0 points`);
    cy.get('.gameHistory .round:nth-child(1)').should('contain', `Equipe [${PLAYER_2}|${PLAYER_4}]\u00A0: 392 points pour 100 points demandés`);
    cy.get('.gameHistory .round:nth-child(1) [data-testid="button showRoundDetail"]').click();
    cy.get('.gameHistory .round:nth-child(1)').should('contain', 'Points des enchères');
    cy.get('.gameHistory .round:nth-child(1)').should('contain', `Equipe [${PLAYER_1}|${PLAYER_3}]\u00A0: 0 points`);
    cy.get('.gameHistory .round:nth-child(1)').should('contain', `Equipe [${PLAYER_2}|${PLAYER_4}]\u00A0: 100 points (100 \u2663 Trèfle)`);
    cy.get('.gameHistory .round:nth-child(1)').should('contain', 'Points des cartes');
    cy.get('.gameHistory .round:nth-child(1)').should('contain', `Equipe [${PLAYER_1}|${PLAYER_3}]\u00A0: 0 points`);
    cy.get('.gameHistory .round:nth-child(1)').should('contain', `Equipe [${PLAYER_2}|${PLAYER_4}]\u00A0: 152 points`);
    cy.get('.gameHistory .round:nth-child(1)').should('contain', 'Points de fin de jetée');
    cy.get('.gameHistory .round:nth-child(1)').should('contain', `Equipe [${PLAYER_1}|${PLAYER_3}]\u00A0: 0 points`);
    cy.get('.gameHistory .round:nth-child(1)').should('contain', `Equipe [${PLAYER_2}|${PLAYER_4}]\u00A0: 100 points (capot)`);
    cy.get('.gameHistory .round:nth-child(1)').should('contain', 'Points des annonces');
    cy.get('.gameHistory .round:nth-child(1)').should('contain', `Equipe [${PLAYER_1}|${PLAYER_3}]\u00A0: 0 points`);
    cy.get('.gameHistory .round:nth-child(1)').should('contain', `Equipe [${PLAYER_2}|${PLAYER_4}]\u00A0: 140 points`);
    cy.get('.gameHistory .round:nth-child(1)').should('contain', 'Détail des plis');
    cy.get('.gameHistory .round:nth-child(1)').should('contain', `Cartes jouées\u00A0: As de carreau, As de coeur, As de trèfle, Valet de trèfle`);
    cy.get('.gameHistory .round:nth-child(1)').should('contain', `Valeur\u00A0: 53 points pour ${PLAYER_4}`);
    cy.get('.gameHistory .round:nth-child(1)').should('contain', 'Détail des annonces');
    cy.get('.gameHistory .round:nth-child(1)').should('contain', `Annonce\u00A0: Tierce au 9 de coeur`);
    cy.get('.gameHistory .round:nth-child(1)').should('contain', `Valeur\u00A0: 20 points pour ${PLAYER_2}`);
    cy.get('.gameHistory .round:nth-child(1)').should('contain', `Annonce\u00A0: Cent au roi de trèfle`);
    cy.get('.gameHistory .round:nth-child(1)').should('contain', `Valeur\u00A0: 100 points pour ${PLAYER_4}`);
    cy.get('.gameHistory .round:nth-child(1)').should('contain', `Annonce\u00A0: Belote`);
    cy.get('.gameHistory .round:nth-child(1)').should('contain', `Valeur\u00A0: 20 points pour ${PLAYER_4}`);
    cy.get('[data-testid="button gameHistory"]').click();

    // GoBackToLobby
    cy.get('.goBackToLobby [data-testid="button leave"]').click();
    cy.wait(1000);
    cy.get('.lobby .room:nth-child(1) .topLeftSeat').should('not.contain', PLAYER_1);
    cy.get('[data-testid="button gameHistory"]').should('not.exist');
  });
});
