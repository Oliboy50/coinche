import {
  Card,
  CardColor,
  PlayerAnnounce,
  PlayerID,
  TeamID,
  TrumpMode,
  isAnnounceIDBeatingTheOtherAnnounceIDs,
  isCardBeatingTheOtherCards,
  isSameCard,
} from '../index';

export const getWinningCard = (
  cards: Card[],
  trumpMode: TrumpMode,
  firstCardColor: CardColor,
): Card => {
  if (!cards.length) {
    throw new Error();
  }

  return cards.reduce((currentWinningCard, card) => {
    if (!currentWinningCard) {
      return card;
    }

    if (isCardBeatingTheOtherCards(card, cards.filter(c => !isSameCard(c, card)), trumpMode, firstCardColor)) {
      return card;
    }

    return currentWinningCard;
  });
};

export const getWinningAnnounces = (playerAnnounces: PlayerAnnounce[], trumpMode: TrumpMode): PlayerAnnounce[] => {
  // 0 or 1 announce
  if (playerAnnounces.length <= 1) {
    return playerAnnounces;
  }

  // if true winning announces, return only them
  const winningAnnounces = playerAnnounces.filter(playerAnnounce =>
    true === isAnnounceIDBeatingTheOtherAnnounceIDs(playerAnnounce.announce.id, playerAnnounces.filter(a => a.announce.id !== playerAnnounce.announce.id).map(a => a.announce.id), trumpMode),
  );
  if (winningAnnounces.length) {
    return winningAnnounces;
  }

  // return null announces (equality)
  return playerAnnounces.filter(playerAnnounce =>
    null === isAnnounceIDBeatingTheOtherAnnounceIDs(playerAnnounce.announce.id, playerAnnounces.filter(a => a.announce.id !== playerAnnounce.announce.id).map(a => a.announce.id), trumpMode),
  );
};

export const getTurnWinner = (
  playersCardPlayedInCurrentTurn: Record<PlayerID, Card | undefined>,
  winningCard: Card,
): PlayerID => {
  const winningPlayerCard = Object.entries(playersCardPlayedInCurrentTurn).find(([_, playerCard]) => isSameCard(winningCard, playerCard));
  if (!winningPlayerCard) {
    throw new Error(`Can't get winner`);
  }

  return winningPlayerCard[0] as PlayerID;
};

export const getGameWinningTeam = (
  teamsPoints: Record<TeamID, number>,
  howManyPointsATeamMustReachToEndTheGame: number,
  wonTeamsCards: Record<TeamID, Card[]>,
): TeamID | null | undefined => {
  const northSouthTeamHasReachTheRequiredNumberOfPoints = teamsPoints[TeamID.NorthSouth] >= howManyPointsATeamMustReachToEndTheGame;
  const eastWestTeamHasReachTheRequiredNumberOfPoints = teamsPoints[TeamID.EastWest] >= howManyPointsATeamMustReachToEndTheGame;
  const northSouthTeamWonAtLeastOneCard = wonTeamsCards[TeamID.NorthSouth].length > 0;
  const eastWestTeamWonAtLeastOneCard = wonTeamsCards[TeamID.EastWest].length > 0;

  // no team has reach the required number of points
  if (!northSouthTeamHasReachTheRequiredNumberOfPoints && !eastWestTeamHasReachTheRequiredNumberOfPoints) {
    return undefined;
  }

  // NorthSouth team only has reach the required number of points
  if (northSouthTeamHasReachTheRequiredNumberOfPoints && !eastWestTeamHasReachTheRequiredNumberOfPoints) {
    return northSouthTeamWonAtLeastOneCard ? TeamID.NorthSouth : undefined;
  }

  // EastWest team only has reach the required number of points
  if (!northSouthTeamHasReachTheRequiredNumberOfPoints && eastWestTeamHasReachTheRequiredNumberOfPoints) {
    return eastWestTeamWonAtLeastOneCard ? TeamID.EastWest : undefined;
  }

  // both team have reach the required number of points and NorthSouth team has more points
  if (teamsPoints[TeamID.NorthSouth] > teamsPoints[TeamID.EastWest]) {
    return northSouthTeamWonAtLeastOneCard ? TeamID.NorthSouth : TeamID.EastWest;
  }

  // both team have reach the required number of points and EastWest team has more points
  if (teamsPoints[TeamID.EastWest] > teamsPoints[TeamID.NorthSouth]) {
    return eastWestTeamWonAtLeastOneCard ? TeamID.EastWest : TeamID.NorthSouth;
  }

  // draw
  return null;
};
