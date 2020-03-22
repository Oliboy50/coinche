import {I18n} from './index';
import {AnnounceGroup, AnnounceID, TrumpMode} from '../../shared/coinche';

const translatedTrumpMode = {
  [TrumpMode.TrumpSpade]: 'Pique',
  [TrumpMode.TrumpDiamond]: 'Carreau',
  [TrumpMode.TrumpClub]: 'Trèfle',
  [TrumpMode.TrumpHeart]: 'Coeur',
  [TrumpMode.NoTrump]: 'Sans Atout',
};
const translatedTeamType = {
  partner: 'Nous',
  opponent: 'Eux',
};

export const fr: I18n = {
  teamType: translatedTeamType,
  trumpMode: translatedTrumpMode,
  announce: {
    id: {
      Belot: 'Belote',
      [AnnounceID.SquareAce]: `Carré d'as`,
      [AnnounceID.SquareKing]: `Carré de roi`,
      [AnnounceID.SquareQueen]: `Carré de dame`,
      [AnnounceID.SquareJack]: `Carré de valet`,
      [AnnounceID.SquareTen]: `Carré de 10`,
      [AnnounceID.SquareNine]: `Carré de 9`,
      [AnnounceID.QuinteAceSpade]: `Cent à l'as de pique`,
      [AnnounceID.QuinteKingSpade]: `Cent au roi de pique`,
      [AnnounceID.QuinteQueenSpade]: `Cent à la dame de pique`,
      [AnnounceID.QuinteJackSpade]: `Cent au valet de pique`,
      [AnnounceID.QuinteAceDiamond]: `Cent à l'as de carreau`,
      [AnnounceID.QuinteKingDiamond]: `Cent au roi de carreau`,
      [AnnounceID.QuinteQueenDiamond]: `Cent à la dame de carreau`,
      [AnnounceID.QuinteJackDiamond]: `Cent au valet de carreau`,
      [AnnounceID.QuinteAceHeart]: `Cent à l'as de coeur`,
      [AnnounceID.QuinteKingHeart]: `Cent au roi de coeur`,
      [AnnounceID.QuinteQueenHeart]: `Cent à la dame de coeur`,
      [AnnounceID.QuinteJackHeart]: `Cent au valet de coeur`,
      [AnnounceID.QuinteAceClub]: `Cent à l'as de trèfle`,
      [AnnounceID.QuinteKingClub]: `Cent au roi de trèfle`,
      [AnnounceID.QuinteQueenClub]: `Cent à la dame de trèfle`,
      [AnnounceID.QuinteJackClub]: `Cent au valet de trèfle`,
      [AnnounceID.QuarteAceSpade]: `Cinquante à l'as de pique`,
      [AnnounceID.QuarteKingSpade]: `Cinquante au roi de pique`,
      [AnnounceID.QuarteQueenSpade]: `Cinquante à la dame de pique`,
      [AnnounceID.QuarteJackSpade]: `Cinquante au valet de pique`,
      [AnnounceID.QuarteTenSpade]: `Cinquante au 10 de pique`,
      [AnnounceID.QuarteAceDiamond]: `Cinquante à l'as de carreau`,
      [AnnounceID.QuarteKingDiamond]: `Cinquante au roi de carreau`,
      [AnnounceID.QuarteQueenDiamond]: `Cinquante à la dame de carreau`,
      [AnnounceID.QuarteJackDiamond]: `Cinquante au valet de carreau`,
      [AnnounceID.QuarteTenDiamond]: `Cinquante au 10 de carreau`,
      [AnnounceID.QuarteAceHeart]: `Cinquante à l'as de coeur`,
      [AnnounceID.QuarteKingHeart]: `Cinquante au roi de coeur`,
      [AnnounceID.QuarteQueenHeart]: `Cinquante à la dame de coeur`,
      [AnnounceID.QuarteJackHeart]: `Cinquante au valet de coeur`,
      [AnnounceID.QuarteTenHeart]: `Cinquante au 10 de coeur`,
      [AnnounceID.QuarteAceClub]: `Cinquante à l'as de trèfle`,
      [AnnounceID.QuarteKingClub]: `Cinquante au roi de trèfle`,
      [AnnounceID.QuarteQueenClub]: `Cinquante à la dame de trèfle`,
      [AnnounceID.QuarteJackClub]: `Cinquante au valet de trèfle`,
      [AnnounceID.QuarteTenClub]: `Cinquante au 10 de trèfle`,
      [AnnounceID.TierceAceSpade]: `Tierce à l'as de pique`,
      [AnnounceID.TierceKingSpade]: `Tierce au roi de pique`,
      [AnnounceID.TierceQueenSpade]: `Tierce à la dame de pique`,
      [AnnounceID.TierceJackSpade]: `Tierce au valet de pique`,
      [AnnounceID.TierceTenSpade]: `Tierce au 10 de pique`,
      [AnnounceID.TierceNineSpade]: `Tierce au 9 de pique`,
      [AnnounceID.TierceAceDiamond]: `Tierce à l'as de carreau`,
      [AnnounceID.TierceKingDiamond]: `Tierce au roi de carreau`,
      [AnnounceID.TierceQueenDiamond]: `Tierce à la dame de carreau`,
      [AnnounceID.TierceJackDiamond]: `Tierce au valet de carreau`,
      [AnnounceID.TierceTenDiamond]: `Tierce au 10 de carreau`,
      [AnnounceID.TierceNineDiamond]: `Tierce au 9 de carreau`,
      [AnnounceID.TierceAceHeart]: `Tierce à l'as de coeur`,
      [AnnounceID.TierceKingHeart]: `Tierce au roi de coeur`,
      [AnnounceID.TierceQueenHeart]: `Tierce à la dame de coeur`,
      [AnnounceID.TierceJackHeart]: `Tierce au valet de coeur`,
      [AnnounceID.TierceTenHeart]: `Tierce au 10 de coeur`,
      [AnnounceID.TierceNineHeart]: `Tierce au 9 de coeur`,
      [AnnounceID.TierceAceClub]: `Tierce à l'as de trèfle`,
      [AnnounceID.TierceKingClub]: `Tierce au roi de trèfle`,
      [AnnounceID.TierceQueenClub]: `Tierce à la dame de trèfle`,
      [AnnounceID.TierceJackClub]: `Tierce au valet de trèfle`,
      [AnnounceID.TierceTenClub]: `Tierce au 10 de trèfle`,
      [AnnounceID.TierceNineClub]: `Tierce au 9 de trèfle`,
    },
    group: {
      [AnnounceGroup.Square]: 'Carré',
      [AnnounceGroup.Quinte]: 'Cent',
      [AnnounceGroup.Quarte]: 'Cinquante',
      [AnnounceGroup.Tierce]: 'Tierce',
    },
  },
  PreviousCardsPlayedMenu: {
    displayPreviousCardsPlayed: 'Voir les cartes jouées au tour précédent',
    doNotDisplayPreviousCardsPlayed: 'Ne plus voir les cartes jouées au tour précédent',
  },
  Info: {
    currentTeamScore: (teamType, teamPoints, howManyPointsATeamMustReachToEndTheGame) => `${translatedTeamType[teamType]} : ${teamPoints}/${howManyPointsATeamMustReachToEndTheGame}`,
    currentAttackingTeam: (teamType) => `Attaquant : ${translatedTeamType[teamType]}`,
    currentGoal: (trumpMode, expectedPoints) => `Objectif : ${expectedPoints} ${translatedTrumpMode[trumpMode]}`,
    announcesOf: (playerName) => `Annonces de ${playerName} :`,
  },
  TalkMenu: {
    takeButton: 'Prendre',
    skipButton: 'Passer',
  },
  PlayerSaid: {
    skip: 'Je passe',
  },
  SayAnnounceMenu: {
    noAvailableAnnounce: 'Aucune annonce disponible',
    sayAnnounceButton: 'Annoncer',
  },
};
