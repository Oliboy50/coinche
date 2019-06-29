import { Context } from 'boardgame.io/core';
import {
  CardColor,
  CardName,
  GameState, getCardColorAssociatedToTrumpMode,
  getCards,
  getTrumpModeAssociatedToCardColor,
  isCardBeatingTheOtherCards,
  isSameCard,
  PhaseID,
  PlayerID,
  TrumpMode,
  validTrumpModes,
} from '../index';
import playCard from './playCard';
import {
  getDefaultContext,
  getDefaultGameState,
} from './__testHelper/__moves';

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

  // single color trump modes
  validTrumpModes
  .filter(trumpMode => [TrumpMode.TrumpSpade, TrumpMode.TrumpDiamond, TrumpMode.TrumpHeart, TrumpMode.TrumpClub].includes(trumpMode))
  .forEach((trumpMode) => {
    describe(`trump mode ${trumpMode}`, () => {
      beforeEach(() => {
        G = {
          ...G,
          trumpMode,
        };
      });

      // no card have been played
      describe(`no card have been played in the current turn`, () => {
        // can play any cards
        getCards()
        .forEach((card) => {
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

      // first card played was not trump
      getCards()
      .filter((card) => getTrumpModeAssociatedToCardColor(card.color) !== trumpMode && card.name === CardName.Ten)
      .forEach((firstCardPlayed) => {
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

          // can play card with same color than first card
          getCards()
          .filter((card) => !isSameCard(card, firstCardPlayed))
          .filter((card) => card.color === firstCardPlayed.color && card.name === CardName.Ace)
          .forEach((card) => {
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

          // if player does not have a card with same color than first card
          // can play card with other color
          getCards()
          .filter((card) => !isSameCard(card, firstCardPlayed))
          .filter((card) => card.color !== firstCardPlayed.color && card.name === CardName.Ace)
          .forEach((card) => {
            it(`can play card with color ${card.color} and name ${card.name} if does not have card with color ${firstCardPlayed.color}`, () => {
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

          // if player has a card with same color than first card
          // can't play card with other color
          getCards()
          .filter((card) => !isSameCard(card, firstCardPlayed))
          .filter((card) => card.color !== firstCardPlayed.color && card.name === CardName.Ace)
          .forEach((card) => {
            it(`can't play card with color ${card.color} and name ${card.name} if has at least 1 card with color ${firstCardPlayed.color}`, () => {
              G = {
                ...G,
                playersCards: {
                  ...G.playersCards,
                  [PlayerID.North]: [
                    card,
                    { color: firstCardPlayed.color, name: CardName.Ace },
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

          // if current winning card is not from partner
          // if player does not have a card with same color than first card
          // if player has a more powerful card
          describe(`if current winning card is not from partner
        if player does not have a card with same color than first card
        if player has a more powerful card`, () => {
            beforeEach(() => {
              G = {
                ...G,
                playersCards: {
                  ...G.playersCards,
                  [PlayerID.North]: [
                    { color: getCardColorAssociatedToTrumpMode(trumpMode)!, name: CardName.Jack },
                  ],
                },
              };
            });

            // can't play a less powerful card
            getCards()
            .filter((card) => !isSameCard(card, firstCardPlayed))
            .filter((card) => card.color !== firstCardPlayed.color)
            .filter((card) => !isCardBeatingTheOtherCards(card, [firstCardPlayed], trumpMode, firstCardPlayed.color))
            .forEach((card) => {
              it(`can't play card with color ${card.color} and name ${card.name}`, () => {
                G = {
                  ...G,
                  playersCards: {
                    ...G.playersCards,
                    [PlayerID.North]: [
                      ...G.playersCards[PlayerID.North],
                      card,
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

      // first card played was trump
      getCards()
      .filter((card) => getTrumpModeAssociatedToCardColor(card.color) === trumpMode)
      .forEach((firstCardPlayed) => {
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

          // can play more powerful card
          getCards()
          .filter((card) => !isSameCard(card, firstCardPlayed))
          .filter((card) => isCardBeatingTheOtherCards(card, [firstCardPlayed], trumpMode, firstCardPlayed.color))
          .forEach((card) => {
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

          // if player does not have a card with same color than first card
          // can play card with other color
          getCards()
          .filter((card) => !isSameCard(card, firstCardPlayed))
          .filter((card) => card.color !== firstCardPlayed.color && card.name === CardName.Ace)
          .forEach((card) => {
            it(`can play card with color ${card.color} and name ${card.name} if does not have card with color ${firstCardPlayed.color}`, () => {
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

          // if player has a card with same color than first card
          // can't play card with other color
          getCards()
          .filter((card) => !isSameCard(card, firstCardPlayed))
          .filter((card) => card.color !== firstCardPlayed.color && card.name === CardName.Ace)
          .forEach((card) => {
            it(`can't play card with color ${card.color} and name ${card.name} if has at least 1 card with color ${firstCardPlayed.color}`, () => {
              G = {
                ...G,
                playersCards: {
                  ...G.playersCards,
                  [PlayerID.North]: [
                    card,
                    { color: firstCardPlayed.color, name: CardName.Ace },
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

          // if player does not have a more powerful card
          // can play less powerful card
          getCards()
          .filter((card) => !isSameCard(card, firstCardPlayed))
          .filter((card) => card.color === firstCardPlayed.color && !isCardBeatingTheOtherCards(card, [firstCardPlayed], trumpMode, firstCardPlayed.color))
          .forEach((card) => {
            it(`can play card with color ${card.color} and name ${card.name} if does not have a more powerful card`, () => {
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

          // if player has a more powerful card
          // can't play less powerful card
          getCards()
          .filter((card) => !isSameCard(card, firstCardPlayed))
          .filter((card) => card.color === firstCardPlayed.color && !isCardBeatingTheOtherCards(card, [firstCardPlayed], trumpMode, firstCardPlayed.color))
          .forEach((card) => {
            it(`can't play card with color ${card.color} and name ${card.name} if has a more powerful card`, () => {
              G = {
                ...G,
                playersCards: {
                  ...G.playersCards,
                  [PlayerID.North]: [
                    card,
                    { color: firstCardPlayed.color, name: CardName.Jack },
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

  // trump mode "NoTrump"
  validTrumpModes
  .filter(trumpMode => trumpMode === TrumpMode.NoTrump)
  .forEach((trumpMode) => {
    describe(`trump mode ${trumpMode}`, () => {
      beforeEach(() => {
        G = {
          ...G,
          trumpMode,
        };
      });

      // no card have been played
      describe(`no card have been played in the current turn`, () => {
        // can play any cards
        getCards()
        .forEach((card) => {
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

      // first card have been played
      getCards()
      .filter((card) => card.name === CardName.Ten)
      .forEach((firstCardPlayed) => {
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

          // can play card with same color than first card
          getCards()
          .filter((card) => !isSameCard(card, firstCardPlayed))
          .filter((card) => card.color === firstCardPlayed.color && card.name === CardName.Ace)
          .forEach((card) => {
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

          // if player does not have a card with same color than first card
          // can play card with other color
          getCards()
          .filter((card) => !isSameCard(card, firstCardPlayed))
          .filter((card) => card.color !== firstCardPlayed.color && card.name === CardName.Ace)
          .forEach((card) => {
            it(`can play card with color ${card.color} and name ${card.name} if does not have card with color ${firstCardPlayed.color}`, () => {
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

          // if player has a card with same color than first card
          // can't play card with other color
          getCards()
          .filter((card) => !isSameCard(card, firstCardPlayed))
          .filter((card) => card.color !== firstCardPlayed.color && card.name === CardName.Ace)
          .forEach((card) => {
            it(`can't play card with color ${card.color} and name ${card.name} if has at least 1 card with color ${firstCardPlayed.color}`, () => {
              G = {
                ...G,
                playersCards: {
                  ...G.playersCards,
                  [PlayerID.North]: [
                    card,
                    { color: firstCardPlayed.color, name: CardName.Ace },
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
