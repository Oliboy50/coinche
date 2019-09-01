import {
  Context,
  Game,
  TurnOrder,
} from 'boardgame.io/core';
import saySkip from './move/saySkip';
import sayTake from './move/sayTake';
import playCard from './move/playCard';

export enum CardColor {
  Spade = 'Spade',
  Diamond = 'Diamond',
  Heart = 'Heart',
  Club = 'Club',
}
export const validCardColor: CardColor[] = Object.values(CardColor);

export enum CardName {
  Ace = 'Ace',
  Seven = 'Seven',
  Eight = 'Eight',
  Nine = 'Nine',
  Ten = 'Ten',
  Jack = 'Jack',
  Queen = 'Queen',
  King = 'King',
}
export const validCardName: CardName[] = Object.values(CardName);

export interface Card {
  color: CardColor;
  name: CardName;
}
export const isSameCard = (card: Card | undefined, otherCard: Card | undefined): boolean => {
  if (!card || !otherCard) {
    return false;
  }

  return card.color === otherCard.color && card.name === otherCard.name;
};

export enum TrumpMode {
  TrumpSpade = 'TrumpSpade',
  TrumpDiamond = 'TrumpDiamond',
  TrumpHeart = 'TrumpHeart',
  TrumpClub = 'TrumpClub',
  NoTrump = 'NoTrump',
}
export const validTrumpModes: TrumpMode[] = Object.values(TrumpMode);

export enum PlayerID {
  North = '0',
  East = '1',
  South = '2',
  West = '3',
}
export const validPlayerIDs: PlayerID[] = Object.values(PlayerID);

export enum PhaseID {
  Deal = 'Deal',
  Talk = 'Talk',
  PlayCards = 'PlayCards',
  CountPoints = 'CountPoints',
}
export enum TeamID {
  NorthSouth = 'NorthSouth',
  EastWest = 'EastWest',
}

export interface GameState {
  // global state
  howManyPlayers: number;
  howManyCards: number;
  howManyPointsATeamMustReachToEndTheGame: number;
  howManyCardsToDealToEachPlayerBeforeTalking: number;
  howManyCardsToDealToEachPlayerAfterTalking: number;
  teamsPoints: Record<TeamID, number>;

  // round state
  availableCards: Card[];
  playersCards: Record<PlayerID, Card[]>;
  wonTeamsCards: Record<TeamID, Card[]>;
  turnOrder: PlayerID[];
  dealer: PlayerID;
  nextDealer: PlayerID;
  attackingTeam: TeamID;
  defensingTeam: TeamID;
  expectedPoints: number;
  trumpMode: TrumpMode;
  numberOfSuccessiveSkipSaid: number;

  // turn state
  firstPlayerInCurrentTurn: PlayerID;
  playersCardsPlayedInCurrentTurn: Record<PlayerID, Card | undefined>;
}
// @TODO retry to use a real GameStatePlayerView (first try was buggy)
// export type GameStatePlayerView = Omit<GameState, 'playersCards'> & {
//   playerCards: Card[];
// }
export type GameStatePlayerView = GameState;

export interface Moves {
  saySkip: () => void;
  sayTake: (expectedPoints: number, mode: TrumpMode) => void;
  playCard: (card: Card) => void;
}

export const getTrumpModeAssociatedToCardColor = (color: CardColor): TrumpMode => {
  switch (color) {
    case CardColor.Spade:
      return TrumpMode.TrumpSpade;
    case CardColor.Diamond:
      return TrumpMode.TrumpDiamond;
    case CardColor.Heart:
      return TrumpMode.TrumpHeart;
    case CardColor.Club:
      return TrumpMode.TrumpClub;
  }
};
export const getCardColorAssociatedToTrumpMode = (trumpMode: TrumpMode): CardColor | undefined => {
  switch (trumpMode) {
    case TrumpMode.TrumpSpade:
      return CardColor.Spade;
    case TrumpMode.TrumpDiamond:
      return CardColor.Diamond;
    case TrumpMode.TrumpHeart:
      return CardColor.Heart;
    case TrumpMode.TrumpClub:
      return CardColor.Club;
  }
};

export const getPlayerPartner = (player: PlayerID): PlayerID => {
  switch (player) {
    case PlayerID.North:
      return PlayerID.South;
    case PlayerID.East:
      return PlayerID.West;
    case PlayerID.South:
      return PlayerID.North;
    case PlayerID.West:
      return PlayerID.East;
  }
};
export const getPlayerTeam = (player: PlayerID): TeamID => [PlayerID.North, PlayerID.South].includes(player) ? TeamID.NorthSouth : TeamID.EastWest;

export const getCards = (): Card[] => [
  {
    color: CardColor.Spade,
    name: CardName.Ace,
  },
  {
    color: CardColor.Spade,
    name: CardName.Seven,
  },
  {
    color: CardColor.Spade,
    name: CardName.Eight,
  },
  {
    color: CardColor.Spade,
    name: CardName.Nine,
  },
  {
    color: CardColor.Spade,
    name: CardName.Ten,
  },
  {
    color: CardColor.Spade,
    name: CardName.Jack,
  },
  {
    color: CardColor.Spade,
    name: CardName.Queen,
  },
  {
    color: CardColor.Spade,
    name: CardName.King,
  },
  {
    color: CardColor.Diamond,
    name: CardName.Ace,
  },
  {
    color: CardColor.Diamond,
    name: CardName.Seven,
  },
  {
    color: CardColor.Diamond,
    name: CardName.Eight,
  },
  {
    color: CardColor.Diamond,
    name: CardName.Nine,
  },
  {
    color: CardColor.Diamond,
    name: CardName.Ten,
  },
  {
    color: CardColor.Diamond,
    name: CardName.Jack,
  },
  {
    color: CardColor.Diamond,
    name: CardName.Queen,
  },
  {
    color: CardColor.Diamond,
    name: CardName.King,
  },
  {
    color: CardColor.Heart,
    name: CardName.Ace,
  },
  {
    color: CardColor.Heart,
    name: CardName.Seven,
  },
  {
    color: CardColor.Heart,
    name: CardName.Eight,
  },
  {
    color: CardColor.Heart,
    name: CardName.Nine,
  },
  {
    color: CardColor.Heart,
    name: CardName.Ten,
  },
  {
    color: CardColor.Heart,
    name: CardName.Jack,
  },
  {
    color: CardColor.Heart,
    name: CardName.Queen,
  },
  {
    color: CardColor.Heart,
    name: CardName.King,
  },
  {
    color: CardColor.Club,
    name: CardName.Ace,
  },
  {
    color: CardColor.Club,
    name: CardName.Seven,
  },
  {
    color: CardColor.Club,
    name: CardName.Eight,
  },
  {
    color: CardColor.Club,
    name: CardName.Nine,
  },
  {
    color: CardColor.Club,
    name: CardName.Ten,
  },
  {
    color: CardColor.Club,
    name: CardName.Jack,
  },
  {
    color: CardColor.Club,
    name: CardName.Queen,
  },
  {
    color: CardColor.Club,
    name: CardName.King,
  },
];

export const isCardBeatingTheOtherCards = (card: Card, otherCards: Card[], trumpMode: TrumpMode, firstCardColor: CardColor): boolean => {
  if (!otherCards.length) {
    return true;
  }

  const cardColorAssociatedToTrumpMode = getCardColorAssociatedToTrumpMode(trumpMode);

  if (card.color === cardColorAssociatedToTrumpMode) {
    switch (card.name) {
      case CardName.Ace:
        return otherCards.every(({color, name}) => color !== cardColorAssociatedToTrumpMode || ![CardName.Nine, CardName.Jack].includes(name));
      case CardName.Seven:
        return otherCards.every(({color}) => color !== cardColorAssociatedToTrumpMode);
      case CardName.Eight:
        return otherCards.every(({color, name}) => color !== cardColorAssociatedToTrumpMode || name === CardName.Seven);
      case CardName.Nine:
        return otherCards.every(({color, name}) => color !== cardColorAssociatedToTrumpMode || name !== CardName.Jack);
      case CardName.Ten:
        return otherCards.every(({color, name}) => color !== cardColorAssociatedToTrumpMode || ![CardName.Ace, CardName.Nine, CardName.Jack].includes(name));
      case CardName.Jack:
        return true;
      case CardName.Queen:
        return otherCards.every(({color, name}) => color !== cardColorAssociatedToTrumpMode || [CardName.Seven, CardName.Eight].includes(name));
      case CardName.King:
        return otherCards.every(({color, name}) => color !== cardColorAssociatedToTrumpMode || [CardName.Seven, CardName.Eight, CardName.Queen].includes(name));
    }
  }

  if (card.color !== firstCardColor) {
    return false;
  }

  switch (card.name) {
    case CardName.Ace:
      return otherCards.every(({ color }) => color !== cardColorAssociatedToTrumpMode);
    case CardName.Seven:
      return false;
    case CardName.Eight:
      return otherCards.every(({ color, name }) => color !== cardColorAssociatedToTrumpMode && name === CardName.Seven);
    case CardName.Nine:
      return otherCards.every(({ color, name }) => color !== cardColorAssociatedToTrumpMode && [CardName.Seven, CardName.Eight].includes(name));
    case CardName.Ten:
      return otherCards.every(({ color, name }) => color !== cardColorAssociatedToTrumpMode && name !== CardName.Ace);
    case CardName.Jack:
      return otherCards.every(({ color, name }) => color !== cardColorAssociatedToTrumpMode && [CardName.Seven, CardName.Eight, CardName.Nine].includes(name));
    case CardName.Queen:
      return otherCards.every(({ color, name }) => color !== cardColorAssociatedToTrumpMode && ![CardName.King, CardName.Ten, CardName.Ace].includes(name));
    case CardName.King:
      return otherCards.every(({ color, name }) => color !== cardColorAssociatedToTrumpMode && ![CardName.Ten, CardName.Ace].includes(name));
  }

  throw new Error();
};

export const getWinningCard = (cards: Card[], trumpMode: TrumpMode, firstCardColor: CardColor): Card => {
  if (!cards.length) {
    throw new Error();
  }

  let winningCard: Card;
  cards.forEach((card) => {
    if (isCardBeatingTheOtherCards(card, cards.filter(c => isSameCard(c, card)), trumpMode, firstCardColor)) {
      winningCard = card;
    }
  });

  // @ts-ignore
  return winningCard;
};

export const getWinner = (playersCardsPlayedInCurrentTurn: Record<PlayerID, Card | undefined>, trumpMode: TrumpMode, firstCardColor: CardColor): PlayerID => {
  const winningCard = getWinningCard(
    Object.values(playersCardsPlayedInCurrentTurn).filter(c => c !== undefined) as Card[],
    trumpMode,
    firstCardColor,
  );

  for (const playerID of validPlayerIDs) {
    if (isSameCard(winningCard, playersCardsPlayedInCurrentTurn[playerID])) {
      return playerID;
    }
  }

  throw new Error();
};

export const getGameWinnerTeam = (teamsPoints: Record<TeamID, number>, howManyPointsATeamMustReachToEndTheGame: number): TeamID | null | undefined => {
  if (Object.values(teamsPoints).every(points => points < howManyPointsATeamMustReachToEndTheGame)) {
    return;
  }

  if (teamsPoints[TeamID.NorthSouth] === teamsPoints[TeamID.EastWest]) {
    return null;
  }

  if (teamsPoints[TeamID.NorthSouth] >= howManyPointsATeamMustReachToEndTheGame) {
    return TeamID.NorthSouth;
  }

  return TeamID.EastWest;
};

const getCardPoints = (card: Card, trumpMode: TrumpMode): number => {
  switch (card.name) {
    case CardName.Ace:
      return trumpMode === TrumpMode.NoTrump ? 19 : 11;
    case CardName.Nine:
      return trumpMode === getTrumpModeAssociatedToCardColor(card.color) ? 14 : 0;
    case CardName.Ten:
      return 10;
    case CardName.Jack:
      return trumpMode === getTrumpModeAssociatedToCardColor(card.color) ? 20 : 2;
    case CardName.Queen:
      return 3;
    case CardName.King:
      return 4;
    default:
      return 0;
  }
};

export const validExpectedPoints = [
  82,
  85,
  90,
  95,
  100,
  105,
  110,
  115,
  120,
  125,
  130,
  135,
  140,
  145,
  150,
  155,
  160,
  165,
  170,
  175,
  180,
  185,
  190,
  195,
  200,
  205,
  210,
  215,
  220,
  225,
  230,
  235,
  240,
  245,
  250,
];

const getTurnOrder = (dealer: PlayerID): PlayerID[] => {
  switch (dealer) {
    case PlayerID.North:
      return [PlayerID.North, PlayerID.West, PlayerID.South, PlayerID.East];
    case PlayerID.East:
      return [PlayerID.East, PlayerID.North, PlayerID.West, PlayerID.South];
    case PlayerID.South:
      return [PlayerID.South, PlayerID.East, PlayerID.North, PlayerID.West];
    case PlayerID.West:
      return [PlayerID.West, PlayerID.South, PlayerID.East, PlayerID.North];
  }
};

const getDefaultPlayersCards = () => ({
  [PlayerID.North]: [],
  [PlayerID.East]: [],
  [PlayerID.South]: [],
  [PlayerID.West]: [],
});

const getDefaultWonTeamsCards = () => ({
  [TeamID.NorthSouth]: [],
  [TeamID.EastWest]: [],
});

const getDefaultPlayersCardsPlayedInCurrentTurn = () => ({
  [PlayerID.North]: undefined,
  [PlayerID.East]: undefined,
  [PlayerID.South]: undefined,
  [PlayerID.West]: undefined,
});

export const getSetupGameState = (ctx: Context<PlayerID, PhaseID>, setupData: object): GameState => {
  const howManyPlayers = Object.keys(PlayerID).length;
  const dealer = PlayerID.North;
  const availableCards = getCards();
  const howManyCards = availableCards.length;
  const howManyCardsToDealToEachPlayerBeforeTalking = 6;
  const howManyCardsToDealToEachPlayerAfterTalking = Math.floor(howManyCards / howManyPlayers) - howManyCardsToDealToEachPlayerBeforeTalking;

  return {
    howManyPlayers,
    howManyCards,
    availableCards,
    playersCards: getDefaultPlayersCards(),
    wonTeamsCards: getDefaultWonTeamsCards(),
    teamsPoints: {
      [TeamID.NorthSouth]: 0,
      [TeamID.EastWest]: 0,
    },
    dealer,
    nextDealer: dealer,
    turnOrder: getTurnOrder(dealer),
    firstPlayerInCurrentTurn: dealer,
    trumpMode: TrumpMode.NoTrump,
    attackingTeam: TeamID.NorthSouth,
    defensingTeam: TeamID.EastWest,
    expectedPoints: 0,
    howManyCardsToDealToEachPlayerBeforeTalking,
    howManyCardsToDealToEachPlayerAfterTalking,
    howManyPointsATeamMustReachToEndTheGame: 2000,
    numberOfSuccessiveSkipSaid: 0,
    playersCardsPlayedInCurrentTurn: getDefaultPlayersCardsPlayedInCurrentTurn(),
  };
};

export const buildGame = () => Game<GameState, GameStatePlayerView, Moves, PlayerID, PhaseID>({
  setup: getSetupGameState,

  moves: {
    saySkip,
    sayTake,
    playCard,
  },

  flow: {
    endTurn: false,
    endPhase: false,
    endGame: false,
    turnOrder: TurnOrder.CUSTOM_FROM<GameState>('turnOrder'),
    startingPhase: PhaseID.Deal,
    phases: {
      [PhaseID.Deal]: {
        onPhaseBegin: (G, ctx) => {
          const newDealer = G.nextDealer;
          const newNextDealer = getTurnOrder(newDealer)[1];

          G.expectedPoints = 0;
          G.trumpMode = TrumpMode.NoTrump;
          G.playersCards = getDefaultPlayersCards();
          G.dealer = newDealer;
          G.nextDealer = newNextDealer;
          G.firstPlayerInCurrentTurn = newNextDealer;
          G.availableCards = ctx.random.Shuffle(getCards());
          G.turnOrder.forEach(playerID => {
            for (let i = 0; i < G.howManyCardsToDealToEachPlayerBeforeTalking; i++) {
              const card = G.availableCards.pop();
              G.playersCards[playerID].push(card!);
            }
          });

          ctx.events.endTurn({ next: newNextDealer });
          ctx.events.endPhase({ next: PhaseID.Talk });
        },
        allowedMoves: [],
      },
      [PhaseID.Talk]: {
        // @TODO sayCoinche and saySurcoinche
        allowedMoves: ['saySkip', 'sayTake'] as (keyof Moves)[],
        endPhaseIf: (G, ctx) => {
          if (G.numberOfSuccessiveSkipSaid >= G.howManyPlayers) {
            return { next: PhaseID.Deal };
          }

          if (G.expectedPoints && G.numberOfSuccessiveSkipSaid >= (G.howManyPlayers - 1)) {
            G.turnOrder.forEach(playerID => {
              for (let i = 0; i < G.howManyCardsToDealToEachPlayerAfterTalking; i++) {
                const card = G.availableCards.pop();
                G.playersCards[playerID].push(card!);
              }
            });

            return { next: PhaseID.PlayCards };
          }

          return false;
        },
        onPhaseEnd: (G, ctx) => ({
          ...G,
          numberOfSuccessiveSkipSaid: 0,
        }),
      },
      [PhaseID.PlayCards]: {
        onPhaseBegin: (G, ctx) => {
          ctx.events.endTurn({ next: G.firstPlayerInCurrentTurn });
        },
        // @TODO sayAnnonce
        allowedMoves: ['playCard'],
        endPhaseIf: (G, ctx) => {
          if (Object.values(G.playersCardsPlayedInCurrentTurn).every( card => card !== undefined)) {
            return { next: PhaseID.CountPoints };
          }

          return false;
        },
      },
      [PhaseID.CountPoints]: {
        allowedMoves: [],
        onPhaseBegin: (G, ctx) => {
          const winner = getWinner(G.playersCardsPlayedInCurrentTurn, G.trumpMode, G.playersCardsPlayedInCurrentTurn[G.firstPlayerInCurrentTurn]!.color);
          const winnerTeam = getPlayerTeam(winner);

          // move played cards to winner team cards
          (Object.values(G.playersCardsPlayedInCurrentTurn).filter(c => c !== undefined) as Card[]).forEach(card => G.wonTeamsCards[winnerTeam].push(card));
          G.playersCardsPlayedInCurrentTurn = getDefaultPlayersCardsPlayedInCurrentTurn();

          // winner becomes next first player
          G.firstPlayerInCurrentTurn = winner;

          // go to PlayCards phase if not all cards have been played
          if (Object.values(G.wonTeamsCards).reduce((acc, cards) => acc.concat(cards), []).length < G.howManyCards) {
            ctx.events.endPhase({ next: PhaseID.PlayCards });
            return;
          }

          // winning team of the last turn get extra points
          let defensingTeamPoints = G.wonTeamsCards[G.defensingTeam].reduce((acc, card) => acc + getCardPoints(card, G.trumpMode), 0);
          let attackingTeamPoints = G.wonTeamsCards[G.attackingTeam].reduce((acc, card) => acc + getCardPoints(card, G.trumpMode), 0);
          if (winnerTeam === G.attackingTeam) {
            attackingTeamPoints += (!G.wonTeamsCards[G.defensingTeam].length) ? 100 : 10;
          } else {
            defensingTeamPoints += (!G.wonTeamsCards[G.attackingTeam].length) ? 100 : 10;
          }

          // check which team won the round
          // @TODO add said annonce points
          if (attackingTeamPoints >= G.expectedPoints && attackingTeamPoints >= defensingTeamPoints) {
            G.teamsPoints[G.attackingTeam] += attackingTeamPoints;
            G.teamsPoints[G.defensingTeam] += defensingTeamPoints;
          } else {
            // @TODO add attacking team annonces to defensing team points
            G.teamsPoints[G.defensingTeam] += defensingTeamPoints;
          }

          // check if the end of the game has been reached
          const gameWinnerTeam = getGameWinnerTeam(G.teamsPoints, G.howManyPointsATeamMustReachToEndTheGame);
          if (gameWinnerTeam === undefined) {
            ctx.events.endPhase({ next: PhaseID.Deal });
            return;
          }

          // @TODO congrats winning team
          console.log(`The winner is... ${gameWinnerTeam || 'both'}!`);
          ctx.events.endGame();
        },
      },
    },
  },

  playerView: (G, ctx, playerID): GameStatePlayerView => G,
});