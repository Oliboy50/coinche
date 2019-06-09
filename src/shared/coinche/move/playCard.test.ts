import { Context } from 'boardgame.io/core';
import {
  CardName,
  GameState,
  getCards,
  getTrumpModeAssociatedToCardColor,
  PhaseID,
  PlayerID,
  validTrumpModes,
} from '../index';
import playCard from './playCard';
import { getDefaultContext, getDefaultGameState } from './__testHelper/__moves';

describe(`move/playCard`, () => {
  let G: GameState;
  let ctx: Context<PlayerID, PhaseID>;

  beforeEach(() => {
    G = getDefaultGameState();
    ctx = {
      ...getDefaultContext(),
      currentPlayer: PlayerID.North,
    };
  });

  validTrumpModes.forEach((trumpMode) => {
    describe(`trump mode ${trumpMode}`, () => {
      beforeEach(() => {
        G = {
          ...G,
          trumpMode,
        };
      });

      describe(`no card have been played in the current turn`, () => {
        getCards().forEach((card) => {
          it(`can play card with color ${card.color} and name ${card.name}`, () => {
            G = {
              ...G,
              playersCardsPlayedInCurrentTurn: {
                [PlayerID.North]: undefined,
                [PlayerID.East]: undefined,
                [PlayerID.South]: undefined,
                [PlayerID.West]: undefined,
              },
              playersCards: {
                ...G.playersCards,
                [PlayerID.North]: [
                  card,
                ],
              },
            };

            const endTurn = jest.spyOn(ctx.events, 'endTurn');

            playCard(G, ctx, card);

            expect(endTurn).toHaveBeenCalledTimes(1);
            expect(G.playersCardsPlayedInCurrentTurn).toEqual({
              [PlayerID.North]: card,
              [PlayerID.East]: undefined,
              [PlayerID.South]: undefined,
              [PlayerID.West]: undefined,
            });
          });
        });
      });

      getCards().filter(({ color }) => getTrumpModeAssociatedToCardColor(color) !== trumpMode).forEach((firstCardPlayed) => {
        describe(`1 card with color ${firstCardPlayed.color} and name ${firstCardPlayed.name} has already been played in the current turn`, () => {
          beforeEach(() => {
            G = {
              ...G,
              firstPlayerInCurrentTurn: PlayerID.West,
              playersCardsPlayedInCurrentTurn: {
                [PlayerID.North]: undefined,
                [PlayerID.East]: undefined,
                [PlayerID.South]: undefined,
                [PlayerID.West]: firstCardPlayed,
              },
            };
          });

          getCards().filter(({ color }) => color === firstCardPlayed.color).forEach((card) => {
            it(`can play card with color ${card.color} and name ${card.name}`, () => {
              G = {
                ...G,
                playersCards: {
                  ...G.playersCards,
                  [PlayerID.North]: [
                    card,
                  ],
                },
              };
              const endTurn = jest.spyOn(ctx.events, 'endTurn');

              playCard(G, ctx, card);

              expect(endTurn).toHaveBeenCalledTimes(1);
              expect(G.playersCardsPlayedInCurrentTurn).toEqual({
                [PlayerID.North]: card,
                [PlayerID.East]: undefined,
                [PlayerID.South]: undefined,
                [PlayerID.West]: firstCardPlayed,
              });
            });
          });

          getCards().filter(({ color }) => color !== firstCardPlayed.color).forEach((card) => {
            it(`can't play card with color ${card.color} and name ${card.name} if has at least 1 card with color ${firstCardPlayed.color}`, () => {
              G = {
                ...G,
                playersCards: {
                  ...G.playersCards,
                  [PlayerID.North]: [
                    card,
                    { color: firstCardPlayed.color, name: CardName.Seven },
                  ],
                },
              };
              const endTurn = jest.spyOn(ctx.events, 'endTurn');

              expect(() => {
                playCard(G, ctx, card);
              }).toThrow();

              expect(endTurn).toHaveBeenCalledTimes(0);
            });
          });
        });
      });

      getCards().filter(({ color }) => getTrumpModeAssociatedToCardColor(color) === trumpMode).forEach((firstCardPlayed) => {
        describe(`1 card with color ${firstCardPlayed.color} and name ${firstCardPlayed.name} has already been played in the current turn`, () => {
          beforeEach(() => {
            G = {
              ...G,
              firstPlayerInCurrentTurn: PlayerID.West,
              playersCardsPlayedInCurrentTurn: {
                [PlayerID.North]: undefined,
                [PlayerID.East]: undefined,
                [PlayerID.South]: undefined,
                [PlayerID.West]: firstCardPlayed,
              },
            };
          });

          // @TODO use isCardBeatingTheOtherCards to filter tests
          getCards().filter(({ color }) => color === firstCardPlayed.color).forEach((card) => {
            it(`can play card with color ${card.color} and name ${card.name}`, () => {
              G = {
                ...G,
                playersCards: {
                  ...G.playersCards,
                  [PlayerID.North]: [
                    card,
                  ],
                },
              };
              const endTurn = jest.spyOn(ctx.events, 'endTurn');

              playCard(G, ctx, card);

              expect(endTurn).toHaveBeenCalledTimes(1);
              expect(G.playersCardsPlayedInCurrentTurn).toEqual({
                [PlayerID.North]: card,
                [PlayerID.East]: undefined,
                [PlayerID.South]: undefined,
                [PlayerID.West]: firstCardPlayed,
              });
            });
          });

          getCards().filter(({ color }) => color !== firstCardPlayed.color).forEach((card) => {
            it(`can't play card with color ${card.color} and name ${card.name} if has at least 1 card with color ${firstCardPlayed.color}`, () => {
              G = {
                ...G,
                playersCards: {
                  ...G.playersCards,
                  [PlayerID.North]: [
                    card,
                    { color: firstCardPlayed.color, name: CardName.Seven },
                  ],
                },
              };
              const endTurn = jest.spyOn(ctx.events, 'endTurn');

              expect(() => {
                playCard(G, ctx, card);
              }).toThrow();

              expect(endTurn).toHaveBeenCalledTimes(0);
            });
          });
        });
      });
    });
  });
});
