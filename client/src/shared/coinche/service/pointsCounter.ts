import {
  Announce,
  AnnounceID,
  Card,
  CardName,
  SayTake,
  TeamID,
  TrumpMode,
  getPlayerTeam,
  getTrumpModeAssociatedToCardColor, BelotAnnounce,
} from '../index';

export const getPointsForExpectedPoints = (currentSayTake: SayTake): number => {
  const trumpModePoints = currentSayTake.trumpMode === TrumpMode.NoTrump ? (currentSayTake.expectedPoints * 2) : currentSayTake.expectedPoints;

  return currentSayTake.sayCoincheLevel ? (currentSayTake.sayCoincheLevel === 'surcoinche' ? trumpModePoints * 4 : trumpModePoints * 2) : trumpModePoints;
};

export const getPointsForCard = (card: Card, trumpMode: TrumpMode): number => {
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

export const getPointsForAnnounce = (announce: Announce, trumpMode: TrumpMode): number => {
  switch (announce.id) {
    case AnnounceID.SquareAce:
      return trumpMode === TrumpMode.NoTrump ? 200 : 100;
    case AnnounceID.SquareNine:
      return trumpMode === TrumpMode.NoTrump ? 100 : 150;
    case AnnounceID.SquareTen:
      return trumpMode === TrumpMode.NoTrump ? 150 : 100;
    case AnnounceID.SquareJack:
      return trumpMode === TrumpMode.NoTrump ? 100 : 200;
    case AnnounceID.SquareQueen:
      return 100;
    case AnnounceID.SquareKing:
      return 100;
    case AnnounceID.TierceAceSpade:
    case AnnounceID.TierceAceDiamond:
    case AnnounceID.TierceAceHeart:
    case AnnounceID.TierceAceClub:
    case AnnounceID.TierceKingSpade:
    case AnnounceID.TierceKingDiamond:
    case AnnounceID.TierceKingHeart:
    case AnnounceID.TierceKingClub:
    case AnnounceID.TierceQueenSpade:
    case AnnounceID.TierceQueenDiamond:
    case AnnounceID.TierceQueenHeart:
    case AnnounceID.TierceQueenClub:
    case AnnounceID.TierceJackSpade:
    case AnnounceID.TierceJackDiamond:
    case AnnounceID.TierceJackHeart:
    case AnnounceID.TierceJackClub:
    case AnnounceID.TierceTenSpade:
    case AnnounceID.TierceTenDiamond:
    case AnnounceID.TierceTenHeart:
    case AnnounceID.TierceTenClub:
    case AnnounceID.TierceNineSpade:
    case AnnounceID.TierceNineDiamond:
    case AnnounceID.TierceNineHeart:
    case AnnounceID.TierceNineClub:
      return 20;
    case AnnounceID.QuarteAceSpade:
    case AnnounceID.QuarteAceDiamond:
    case AnnounceID.QuarteAceHeart:
    case AnnounceID.QuarteAceClub:
    case AnnounceID.QuarteKingSpade:
    case AnnounceID.QuarteKingDiamond:
    case AnnounceID.QuarteKingHeart:
    case AnnounceID.QuarteKingClub:
    case AnnounceID.QuarteQueenSpade:
    case AnnounceID.QuarteQueenDiamond:
    case AnnounceID.QuarteQueenHeart:
    case AnnounceID.QuarteQueenClub:
    case AnnounceID.QuarteJackSpade:
    case AnnounceID.QuarteJackDiamond:
    case AnnounceID.QuarteJackHeart:
    case AnnounceID.QuarteJackClub:
    case AnnounceID.QuarteTenSpade:
    case AnnounceID.QuarteTenDiamond:
    case AnnounceID.QuarteTenHeart:
    case AnnounceID.QuarteTenClub:
      return 50;
    case AnnounceID.QuinteAceSpade:
    case AnnounceID.QuinteAceDiamond:
    case AnnounceID.QuinteAceHeart:
    case AnnounceID.QuinteAceClub:
    case AnnounceID.QuinteKingSpade:
    case AnnounceID.QuinteKingDiamond:
    case AnnounceID.QuinteKingHeart:
    case AnnounceID.QuinteKingClub:
    case AnnounceID.QuinteQueenSpade:
    case AnnounceID.QuinteQueenDiamond:
    case AnnounceID.QuinteQueenHeart:
    case AnnounceID.QuinteQueenClub:
    case AnnounceID.QuinteJackSpade:
    case AnnounceID.QuinteJackDiamond:
    case AnnounceID.QuinteJackHeart:
    case AnnounceID.QuinteJackClub:
      return 100;
  }
};

export const getNewAttackingAndDefensingTeamsPointsAfterRoundEnd = (
  currentAttackingTeamPoints: number,
  attackingTeam: TeamID,
  attackingTeamWonCards: Card[],
  currentDefensingTeamPoints: number,
  defensingTeam: TeamID,
  defensingTeamWonCards: Card[],
  roundSayTake: SayTake,
  roundWinnerTeam: TeamID,
  northSouthTeamCountableAnnounces: Announce[],
  eastWestTeamCountableAnnounces: Announce[],
  belotAnnounce: BelotAnnounce | undefined,
): [number, number] => {
  // compute Talk phase points
  const talkPhasePoints = getPointsForExpectedPoints(roundSayTake);

  // compute capot (100) or last turn (10) extra points
  const attackingTeamExtraPoints = attackingTeam === roundWinnerTeam ? (!defensingTeamWonCards.length ? 100 : 10) : 0;
  const defensingTeamExtraPoints = defensingTeam === roundWinnerTeam ? (!attackingTeamWonCards.length ? 100 : 10) : 0;

  // compute cards points
  const attackingTeamCardsPoints = attackingTeamWonCards.reduce((acc, card) => acc + getPointsForCard(card, roundSayTake.trumpMode), 0);
  const defensingTeamCardsPoints = defensingTeamWonCards.reduce((acc, card) => acc + getPointsForCard(card, roundSayTake.trumpMode), 0);

  // compute belot announce points
  const attackingTeamBelotAnnouncePoints = (belotAnnounce && belotAnnounce.isSaid && getPlayerTeam(belotAnnounce.owner) === attackingTeam) ? 20 : 0;
  const defensingTeamBelotAnnouncePoints = (belotAnnounce && belotAnnounce.isSaid && getPlayerTeam(belotAnnounce.owner) === defensingTeam) ? 20 : 0;

  // compute announces points
  const northSouthTeamAnnouncesPoints = northSouthTeamCountableAnnounces.reduce((acc, a) => acc + getPointsForAnnounce(a, roundSayTake.trumpMode), 0);
  const eastWestTeamAnnouncesPoints = eastWestTeamCountableAnnounces.reduce((acc, a) => acc + getPointsForAnnounce(a, roundSayTake.trumpMode), 0);
  const attackingTeamAnnouncesPoints = attackingTeam === TeamID.NorthSouth ? northSouthTeamAnnouncesPoints : eastWestTeamAnnouncesPoints;
  const defensingTeamAnnouncesPoints = defensingTeam === TeamID.NorthSouth ? northSouthTeamAnnouncesPoints : eastWestTeamAnnouncesPoints;

  // check which team won the round then assign their points accordingly
  const attackingTeamTotalPoints = (attackingTeamExtraPoints + attackingTeamCardsPoints + attackingTeamBelotAnnouncePoints + attackingTeamAnnouncesPoints);
  const defensingTeamTotalPoints = (defensingTeamExtraPoints + defensingTeamCardsPoints + defensingTeamBelotAnnouncePoints + defensingTeamAnnouncesPoints);
  if (attackingTeamTotalPoints >= roundSayTake.expectedPoints && attackingTeamTotalPoints >= defensingTeamTotalPoints) {
    return [
      currentAttackingTeamPoints + (attackingTeamTotalPoints + talkPhasePoints),
      currentDefensingTeamPoints + defensingTeamTotalPoints,
    ];
  }

  return [
    currentAttackingTeamPoints,
    currentDefensingTeamPoints + (attackingTeamTotalPoints + defensingTeamTotalPoints + talkPhasePoints),
  ];
};
