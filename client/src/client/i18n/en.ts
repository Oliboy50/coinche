import type {I18n} from './index';
import {LanguageCode} from '../../shared';
import {AnnounceGroup, AnnounceID, CardColor, CardName, TrumpMode} from '../../shared/coinche';
import {CardDisplay} from '../context/cardDisplay';
import {CardColorDisplay} from '../context/cardColor';

export const en: I18n = {
  common: {
    Options: {
      languageCode: {
        [LanguageCode.EN]: 'English',
        [LanguageCode.FR]: 'French',
      },
      selectLanguageCode: `Language:`,
      cardDisplay: {
        [CardDisplay.UnicodeNativeFont]: 'Native',
        [CardDisplay.UnicodeDejaVuFont]: 'DejaVu',
      },
      selectCardDisplay: `Card display:`,
      cardColorDisplay: {
        [CardColorDisplay.TwoColors]: '2 colors',
        [CardColorDisplay.FourColors]: '4 colors',
      },
      selectCardColorDisplay: `Card color:`,
    },
  },
  game: {
    trumpMode: {
      [TrumpMode.TrumpSpade]: '♠️ Spade',
      [TrumpMode.TrumpDiamond]: '♦️ Diamond',
      [TrumpMode.TrumpClub]: '♣️ Club',
      [TrumpMode.TrumpHeart]: '♥️ Heart',
      [TrumpMode.NoTrump]: 'No trump',
    },
    sayCoincheLevel: {
      coinche: 'doubled',
      surcoinche: 're-doubled',
    },
    card: (card) => {
      const colorName = (() => {
        switch (card.color) {
          case CardColor.Spade:
            return 'spade';
          case CardColor.Diamond:
            return 'diamond';
          case CardColor.Club:
            return 'club';
          case CardColor.Heart:
            return 'heart';
        }
      })();

      switch (card.name) {
        case CardName.Ace:
          return `Ace of ${colorName}`;
        case CardName.Ten:
          return `Ten of ${colorName}`;
        case CardName.King:
          return `King of ${colorName}`;
        case CardName.Queen:
          return `Queen of ${colorName}`;
        case CardName.Jack:
          return `Jack of ${colorName}`;
        case CardName.Nine:
          return `Nine of ${colorName}`;
        case CardName.Eight:
          return `Eight of ${colorName}`;
        case CardName.Seven:
          return `Seven of ${colorName}`;
      }
    },
    announce: {
      id: {
        Belot: 'Belot',
        [AnnounceID.SquareAce]: `Square of ace`,
        [AnnounceID.SquareKing]: `Square of king`,
        [AnnounceID.SquareQueen]: `Square of queen`,
        [AnnounceID.SquareJack]: `Square of jack`,
        [AnnounceID.SquareTen]: `Square of 10`,
        [AnnounceID.SquareNine]: `Square of 9`,
        [AnnounceID.QuinteAceSpade]: `Quinte at the ace of spade`,
        [AnnounceID.QuinteKingSpade]: `Quinte at the king of spade`,
        [AnnounceID.QuinteQueenSpade]: `Quinte at the queen of spade`,
        [AnnounceID.QuinteJackSpade]: `Quinte at the jack of spade`,
        [AnnounceID.QuinteAceDiamond]: `Quinte at the ace of diamond`,
        [AnnounceID.QuinteKingDiamond]: `Quinte at the king of diamond`,
        [AnnounceID.QuinteQueenDiamond]: `Quinte at the queen of diamond`,
        [AnnounceID.QuinteJackDiamond]: `Quinte at the jack of diamond`,
        [AnnounceID.QuinteAceHeart]: `Quinte at the ace of heart`,
        [AnnounceID.QuinteKingHeart]: `Quinte at the king of heart`,
        [AnnounceID.QuinteQueenHeart]: `Quinte at the queen of heart`,
        [AnnounceID.QuinteJackHeart]: `Quinte at the jack of heart`,
        [AnnounceID.QuinteAceClub]: `Quinte at the ace of club`,
        [AnnounceID.QuinteKingClub]: `Quinte at the king of club`,
        [AnnounceID.QuinteQueenClub]: `Quinte at the queen of club`,
        [AnnounceID.QuinteJackClub]: `Quinte at the jack of club`,
        [AnnounceID.QuarteAceSpade]: `Quarte at the ace of spade`,
        [AnnounceID.QuarteKingSpade]: `Quarte at the king of spade`,
        [AnnounceID.QuarteQueenSpade]: `Quarte at the queen of spade`,
        [AnnounceID.QuarteJackSpade]: `Quarte at the jack of spade`,
        [AnnounceID.QuarteTenSpade]: `Quarte at the 10 of spade`,
        [AnnounceID.QuarteAceDiamond]: `Quarte at the ace of diamond`,
        [AnnounceID.QuarteKingDiamond]: `Quarte at the king of diamond`,
        [AnnounceID.QuarteQueenDiamond]: `Quarte at the queen of diamond`,
        [AnnounceID.QuarteJackDiamond]: `Quarte at the jack of diamond`,
        [AnnounceID.QuarteTenDiamond]: `Quarte at the 10 of diamond`,
        [AnnounceID.QuarteAceHeart]: `Quarte at the ace of heart`,
        [AnnounceID.QuarteKingHeart]: `Quarte at the king of heart`,
        [AnnounceID.QuarteQueenHeart]: `Quarte at the queen of heart`,
        [AnnounceID.QuarteJackHeart]: `Quarte at the jack of heart`,
        [AnnounceID.QuarteTenHeart]: `Quarte at the 10 of heart`,
        [AnnounceID.QuarteAceClub]: `Quarte at the ace of club`,
        [AnnounceID.QuarteKingClub]: `Quarte at the king of club`,
        [AnnounceID.QuarteQueenClub]: `Quarte at the queen of club`,
        [AnnounceID.QuarteJackClub]: `Quarte at the jack of club`,
        [AnnounceID.QuarteTenClub]: `Quarte at the 10 of club`,
        [AnnounceID.TierceAceSpade]: `Tierce at the ace of spade`,
        [AnnounceID.TierceKingSpade]: `Tierce at the king of spade`,
        [AnnounceID.TierceQueenSpade]: `Tierce at the queen of spade`,
        [AnnounceID.TierceJackSpade]: `Tierce at the jack of spade`,
        [AnnounceID.TierceTenSpade]: `Tierce at the 10 of spade`,
        [AnnounceID.TierceNineSpade]: `Tierce at the 9 of spade`,
        [AnnounceID.TierceAceDiamond]: `Tierce at the ace of diamond`,
        [AnnounceID.TierceKingDiamond]: `Tierce at the king of diamond`,
        [AnnounceID.TierceQueenDiamond]: `Tierce at the queen of diamond`,
        [AnnounceID.TierceJackDiamond]: `Tierce at the jack of diamond`,
        [AnnounceID.TierceTenDiamond]: `Tierce at the 10 of diamond`,
        [AnnounceID.TierceNineDiamond]: `Tierce at the 9 of diamond`,
        [AnnounceID.TierceAceHeart]: `Tierce at the ace of heart`,
        [AnnounceID.TierceKingHeart]: `Tierce at the king of heart`,
        [AnnounceID.TierceQueenHeart]: `Tierce at the queen of heart`,
        [AnnounceID.TierceJackHeart]: `Tierce at the jack of heart`,
        [AnnounceID.TierceTenHeart]: `Tierce at the 10 of heart`,
        [AnnounceID.TierceNineHeart]: `Tierce at the 9 of heart`,
        [AnnounceID.TierceAceClub]: `Tierce at the ace of club`,
        [AnnounceID.TierceKingClub]: `Tierce at the king of club`,
        [AnnounceID.TierceQueenClub]: `Tierce at the queen of club`,
        [AnnounceID.TierceJackClub]: `Tierce at the jack of club`,
        [AnnounceID.TierceTenClub]: `Tierce at the 10 of club`,
        [AnnounceID.TierceNineClub]: `Tierce at the 9 of club`,
      },
      group: {
        [AnnounceGroup.Square]: 'Square',
        [AnnounceGroup.Quinte]: 'Quinte',
        [AnnounceGroup.Quarte]: 'Quarte',
        [AnnounceGroup.Tierce]: 'Tierce',
      },
    },
    PreviousCardsPlayedMenu: {
      displayPreviousCardsPlayed: 'Show the previous cards played',
      doNotDisplayPreviousCardsPlayed: 'Hide the previous cards played',
    },
    Info: {
      partnerTeam: 'Our points:\u00A0',
      opponentTeam: 'Their points:\u00A0',
      attackingPlayer: 'Attacking player:\u00A0',
      goal: 'Goal:\u00A0',
      announcesOf: (playerName) => `Announces of ${playerName}:\u00A0`,
    },
    TalkMenu: {
      selectTrumpModePlaceholder: `Trump mode…`,
      takeButton: 'Take',
      skipButton: 'Pass',
      coincheButton: 'Double',
      surcoincheButton: 'Re-double',
    },
    PlayerSaid: {
      skip: 'I pass',
      coinche: 'I double',
      surcoinche: 'I re-double',
    },
    SayAnnounceMenu: {
      noAvailableAnnounce: 'No available announce',
      sayAnnounceButton: 'Announce',
    },
    GoBackToLobby: {
      leave: 'Leave',
    },
    WinningTeamCongratulation: {
      congratsTo: (winners) => `🎊 ${winners.join(' and ')} won 🎊`,
      draw: '🤯 Draw! 🤯',
    },
    GameHistory: {
      attackingPlayer: 'Attacking player:',
      goal: 'Goal:',
      team: (teamName) => `Team ${teamName}\u00A0:`,
      score: (points) => `${points} point${points > 1 ? 's' : ''}`,
      roundTitle: (roundNumber) => `Details of round n°${roundNumber}`,
      teamPointsAtTheEndOfRoundTitle: `Score summary at the end of the round`,
      teamPointsAtTheEndOfRoundDetail: (currentTeamPointsAtTheEndOfRound, previousTeamPointsAtTheEndOfRound, currentTeamPointsMinusPreviousTeamPoints) => `${currentTeamPointsAtTheEndOfRound} (${previousTeamPointsAtTheEndOfRound} + ${currentTeamPointsMinusPreviousTeamPoints}) points`,
      roundPointsSummaryTitle: `Round points summary`,
      roundPointsSummaryDetail: (currentPoints, expectedPoints) => `${currentPoints} points${expectedPoints ? ` for ${expectedPoints} expected points` : ''}`,
      roundDetailToggleButtonHide: `Hide the round details`,
      roundDetailToggleButtonShow: `Show the round details`,
      goalPointsTitle: `Goal points`,
      goalPointsDetail: (pointsForExpectedPoints, goal) => `${pointsForExpectedPoints} points (${goal})`,
      cardsPointsTitle: `Cards' points`,
      endOfRoundPointsTitle: `Round end points`,
      endOfRoundPointsDetail: (roundEndPoints) => roundEndPoints === 100 ? `100 points (capot)` : (roundEndPoints === 10 ? `10 points (last trick)` : '0 point'),
      announcesPointsTitle: `Announces' points`,
      turnsDetailTitle: `Tricks' details`,
      playedCards: (cardsName) => `Played cards: ${cardsName.join(', ')}`,
      playedCardsPointsForPlayer: (points, playerName) => `Value: ${points} points for ${playerName}`,
      announcesDetailTitle: `Announces' details`,
      announceDetail: (announceName) => `Announce: ${announceName}`,
      announcePointsForPlayer: (points, playerName) => `Value: ${points} points for ${playerName}`,
    },
  },
  lobby: {
    createRoom: 'Create a new game',
    joinRoom: 'Join',
    leaveRoom: 'Leave',
    goToRoom: 'Play',
  },
  login: {
    playerNamePlaceholder: 'My nickname',
    submit: 'Submit',
  },
};
