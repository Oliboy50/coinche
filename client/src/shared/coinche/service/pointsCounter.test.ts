import {getNewAttackingAndDefensingTeamsPointsAfterRoundEnd} from './pointsCounter';
import {
  Announce,
  BelotAnnounce,
  Card,
  CardColor,
  CardName,
  getCards,
  PlayerID,
  SayTake,
  TeamID,
  TrumpMode,
} from '../index';

describe('pointsCounter', () => {
  describe('getNewAttackingAndDefensingTeamsPointsAfterRoundEnd', () => {
    const testCases: {
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
      expectedNewAttackingTeamPoints: number,
      expectedNewDefensingTeamPoints: number,
    }[] = [
      {
        currentAttackingTeamPoints: 0,
        attackingTeam: TeamID.NorthSouth,
        attackingTeamWonCards: getCards(),
        currentDefensingTeamPoints: 0,
        defensingTeam: TeamID.EastWest,
        defensingTeamWonCards: [],
        roundSayTake: { playerID: PlayerID.North, sayCoincheLevel: undefined, trumpMode: TrumpMode.TrumpSpade, expectedPoints: 82 },
        roundWinnerTeam: TeamID.NorthSouth,
        northSouthTeamCountableAnnounces: [],
        eastWestTeamCountableAnnounces: [],
        belotAnnounce: undefined,
        expectedNewAttackingTeamPoints: 0 + 152 + 100 + 82,
        expectedNewDefensingTeamPoints: 0,
      },
      {
        currentAttackingTeamPoints: 0,
        attackingTeam: TeamID.NorthSouth,
        attackingTeamWonCards: [],
        currentDefensingTeamPoints: 0,
        defensingTeam: TeamID.EastWest,
        defensingTeamWonCards: getCards(),
        roundSayTake: { playerID: PlayerID.North, sayCoincheLevel: undefined, trumpMode: TrumpMode.TrumpSpade, expectedPoints: 82 },
        roundWinnerTeam: TeamID.EastWest,
        northSouthTeamCountableAnnounces: [],
        eastWestTeamCountableAnnounces: [],
        belotAnnounce: undefined,
        expectedNewAttackingTeamPoints: 0,
        expectedNewDefensingTeamPoints: 0 + 152 + 100 + 82,
      },
      {
        currentAttackingTeamPoints: 0,
        attackingTeam: TeamID.NorthSouth,
        attackingTeamWonCards: getCards(),
        currentDefensingTeamPoints: 0,
        defensingTeam: TeamID.EastWest,
        defensingTeamWonCards: [],
        roundSayTake: { playerID: PlayerID.North, sayCoincheLevel: undefined, trumpMode: TrumpMode.NoTrump, expectedPoints: 82 },
        roundWinnerTeam: TeamID.NorthSouth,
        northSouthTeamCountableAnnounces: [],
        eastWestTeamCountableAnnounces: [],
        belotAnnounce: undefined,
        expectedNewAttackingTeamPoints: 0 + 152 + 100 + (82 * 2),
        expectedNewDefensingTeamPoints: 0,
      },
      {
        currentAttackingTeamPoints: 0,
        attackingTeam: TeamID.NorthSouth,
        attackingTeamWonCards: [],
        currentDefensingTeamPoints: 0,
        defensingTeam: TeamID.EastWest,
        defensingTeamWonCards: getCards(),
        roundSayTake: { playerID: PlayerID.North, sayCoincheLevel: undefined, trumpMode: TrumpMode.NoTrump, expectedPoints: 82 },
        roundWinnerTeam: TeamID.EastWest,
        northSouthTeamCountableAnnounces: [],
        eastWestTeamCountableAnnounces: [],
        belotAnnounce: undefined,
        expectedNewAttackingTeamPoints: 0,
        expectedNewDefensingTeamPoints: 0 + 152 + 100 + (82 * 2),
      },
      {
        currentAttackingTeamPoints: 0,
        attackingTeam: TeamID.NorthSouth,
        attackingTeamWonCards: getCards(),
        currentDefensingTeamPoints: 0,
        defensingTeam: TeamID.EastWest,
        defensingTeamWonCards: [],
        roundSayTake: { playerID: PlayerID.North, sayCoincheLevel: 'coinche', trumpMode: TrumpMode.NoTrump, expectedPoints: 82 },
        roundWinnerTeam: TeamID.NorthSouth,
        northSouthTeamCountableAnnounces: [],
        eastWestTeamCountableAnnounces: [],
        belotAnnounce: undefined,
        expectedNewAttackingTeamPoints: 0 + 152 + 100 + (82 * 4),
        expectedNewDefensingTeamPoints: 0,
      },
      {
        currentAttackingTeamPoints: 0,
        attackingTeam: TeamID.NorthSouth,
        attackingTeamWonCards: [],
        currentDefensingTeamPoints: 0,
        defensingTeam: TeamID.EastWest,
        defensingTeamWonCards: getCards(),
        roundSayTake: { playerID: PlayerID.North, sayCoincheLevel: 'coinche', trumpMode: TrumpMode.NoTrump, expectedPoints: 82 },
        roundWinnerTeam: TeamID.EastWest,
        northSouthTeamCountableAnnounces: [],
        eastWestTeamCountableAnnounces: [],
        belotAnnounce: undefined,
        expectedNewAttackingTeamPoints: 0,
        expectedNewDefensingTeamPoints: 0 + 152 + 100 + (82 * 4),
      },
      {
        currentAttackingTeamPoints: 0,
        attackingTeam: TeamID.NorthSouth,
        attackingTeamWonCards: getCards(),
        currentDefensingTeamPoints: 0,
        defensingTeam: TeamID.EastWest,
        defensingTeamWonCards: [],
        roundSayTake: { playerID: PlayerID.North, sayCoincheLevel: 'surcoinche', trumpMode: TrumpMode.NoTrump, expectedPoints: 82 },
        roundWinnerTeam: TeamID.NorthSouth,
        northSouthTeamCountableAnnounces: [],
        eastWestTeamCountableAnnounces: [],
        belotAnnounce: undefined,
        expectedNewAttackingTeamPoints: 0 + 152 + 100 + (82 * 8),
        expectedNewDefensingTeamPoints: 0,
      },
      {
        currentAttackingTeamPoints: 0,
        attackingTeam: TeamID.NorthSouth,
        attackingTeamWonCards: [],
        currentDefensingTeamPoints: 0,
        defensingTeam: TeamID.EastWest,
        defensingTeamWonCards: getCards(),
        roundSayTake: { playerID: PlayerID.North, sayCoincheLevel: 'surcoinche', trumpMode: TrumpMode.NoTrump, expectedPoints: 82 },
        roundWinnerTeam: TeamID.EastWest,
        northSouthTeamCountableAnnounces: [],
        eastWestTeamCountableAnnounces: [],
        belotAnnounce: undefined,
        expectedNewAttackingTeamPoints: 0,
        expectedNewDefensingTeamPoints: 0 + 152 + 100 + (82 * 8),
      },
      {
        currentAttackingTeamPoints: 1000,
        attackingTeam: TeamID.NorthSouth,
        attackingTeamWonCards: getCards().filter(c => !(
          (c.color === CardColor.Heart && c.name === CardName.Seven)
          || (c.color === CardColor.Spade && c.name === CardName.Seven)
          || (c.color === CardColor.Diamond && c.name === CardName.Seven)
          || (c.color === CardColor.Club && c.name === CardName.Seven)
        )),
        currentDefensingTeamPoints: 1000,
        defensingTeam: TeamID.EastWest,
        defensingTeamWonCards: [
          {color: CardColor.Heart, name: CardName.Seven},
          {color: CardColor.Spade, name: CardName.Seven},
          {color: CardColor.Diamond, name: CardName.Seven},
          {color: CardColor.Club, name: CardName.Seven},
        ],
        roundSayTake: { playerID: PlayerID.North, sayCoincheLevel: undefined, trumpMode: TrumpMode.TrumpDiamond, expectedPoints: 100 },
        roundWinnerTeam: TeamID.NorthSouth,
        northSouthTeamCountableAnnounces: [],
        eastWestTeamCountableAnnounces: [],
        belotAnnounce: undefined,
        expectedNewAttackingTeamPoints: 1000 + 152 + 10 + 100,
        expectedNewDefensingTeamPoints: 1000,
      },
      {
        currentAttackingTeamPoints: 1000,
        attackingTeam: TeamID.NorthSouth,
        attackingTeamWonCards: [
          {color: CardColor.Heart, name: CardName.Seven},
          {color: CardColor.Spade, name: CardName.Seven},
          {color: CardColor.Diamond, name: CardName.Seven},
          {color: CardColor.Club, name: CardName.Seven},
        ],
        currentDefensingTeamPoints: 1000,
        defensingTeam: TeamID.EastWest,
        defensingTeamWonCards: getCards().filter(c => !(
          (c.color === CardColor.Heart && c.name === CardName.Seven)
          || (c.color === CardColor.Spade && c.name === CardName.Seven)
          || (c.color === CardColor.Diamond && c.name === CardName.Seven)
          || (c.color === CardColor.Club && c.name === CardName.Seven)
        )),
        roundSayTake: { playerID: PlayerID.North, sayCoincheLevel: undefined, trumpMode: TrumpMode.TrumpDiamond, expectedPoints: 100 },
        roundWinnerTeam: TeamID.EastWest,
        northSouthTeamCountableAnnounces: [],
        eastWestTeamCountableAnnounces: [],
        belotAnnounce: undefined,
        expectedNewAttackingTeamPoints: 1000,
        expectedNewDefensingTeamPoints: 1000 + 152 + 10 + 100,
      },
    ];

    testCases.forEach(({
      currentAttackingTeamPoints,
      attackingTeam,
      attackingTeamWonCards,
      currentDefensingTeamPoints,
      defensingTeam,
      defensingTeamWonCards,
      roundSayTake,
      roundWinnerTeam,
      northSouthTeamCountableAnnounces,
      eastWestTeamCountableAnnounces,
      belotAnnounce ,
      expectedNewAttackingTeamPoints,
      expectedNewDefensingTeamPoints,
    }, i) => {
      it(`returns [${expectedNewAttackingTeamPoints}, ${expectedNewDefensingTeamPoints}] for test case #${i + 1}`, () => {
        expect(getNewAttackingAndDefensingTeamsPointsAfterRoundEnd(
          currentAttackingTeamPoints,
          attackingTeam,
          attackingTeamWonCards,
          currentDefensingTeamPoints,
          defensingTeam,
          defensingTeamWonCards,
          roundSayTake,
          roundWinnerTeam,
          northSouthTeamCountableAnnounces,
          eastWestTeamCountableAnnounces,
          belotAnnounce,
        )).toEqual([
          expectedNewAttackingTeamPoints,
          expectedNewDefensingTeamPoints,
        ]);
      });
    });
  });
});