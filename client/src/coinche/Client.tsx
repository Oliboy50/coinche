import './Client.css';
import React, {useState} from 'react';
import {BoardProps} from 'boardgame.io/react';
import {
  Announce,
  BelotAnnounce,
  GameStatePlayerView,
  Moves,
  PhaseID,
  PlayerID,
  SecretPlayerAnnounce,
  TeamID,
  getPlayerPartner,
  getPlayerTeam,
} from '../shared/coinche';
import {PlayerScreenPosition, getPlayerIDForPosition} from './service/getPlayerIDForPosition';
import {getPlayerNameByID} from './service/getPlayerNameByID';
import {TalkMenuComponent} from './component/TalkMenu';
import {MyCardsComponent} from './component/MyCards';
import {OtherPlayerCardsComponent} from './component/OtherPlayerCards';
import {PlayerSaidComponent} from './component/PlayerSaid';
import {PreviousCardsPlayedMenuComponent} from './component/PreviousCardsPlayedMenu';
import {PlayedCardsComponent} from './component/PlayedCards';
import {SayAnnounceMenuComponent} from './component/SayAnnounceMenu';
import {PlayerSaidAnnounceGroupsComponent} from './component/PlayerSaidAnnounceGroups';
import {InfoComponent} from './component/Info';

const getTurnIndicatorClassForPosition = (
  position: PlayerScreenPosition,
  currentPhaseNeedsToWaitForAPlayerMove: boolean,
  currentPlayerIsTopPlayer: boolean,
  currentPlayerIsLeftPlayer: boolean,
  currentPlayerIsRightPlayer: boolean,
  currentPlayerIsBottomPlayer: boolean,
): string => {
  if (!currentPhaseNeedsToWaitForAPlayerMove) {
    return '';
  }

  if ((currentPlayerIsTopPlayer && position === 'top')
    || (currentPlayerIsLeftPlayer && position === 'left')
    || (currentPlayerIsRightPlayer && position === 'right')
    || (currentPlayerIsBottomPlayer && position === 'bottom')) {
    return 'currentPlayer';
  }

  return '';
};

export const BoardComponent: React.FunctionComponent<BoardProps<GameStatePlayerView, Moves, PlayerID, PhaseID>> = ({
  G,
  ctx,
  moves,
  playerID,
  gameMetadata,
}) => {
  const bottomPlayerID = playerID !== null ? playerID : PlayerID.South;
  const topPlayerID = getPlayerIDForPosition(bottomPlayerID, 'top');
  const leftPlayerID = getPlayerIDForPosition(bottomPlayerID, 'left');
  const rightPlayerID = getPlayerIDForPosition(bottomPlayerID, 'right');

  const topPlayerSaidAnnounces = (G.playersAnnounces[topPlayerID] as SecretPlayerAnnounce[]).filter(a => a.isSaid);
  const leftPlayerSaidAnnounces = (G.playersAnnounces[leftPlayerID] as SecretPlayerAnnounce[]).filter(a => a.isSaid);
  const rightPlayerSaidAnnounces = (G.playersAnnounces[rightPlayerID] as SecretPlayerAnnounce[]).filter(a => a.isSaid);

  const partnerTeamID = getPlayerTeam(bottomPlayerID);
  const opponentTeamID = partnerTeamID === TeamID.NorthSouth ? TeamID.EastWest : TeamID.NorthSouth;

  const currentPlayerIsTopPlayer = topPlayerID === ctx.currentPlayer;
  const currentPlayerIsLeftPlayer = leftPlayerID === ctx.currentPlayer;
  const currentPlayerIsRightPlayer = rightPlayerID === ctx.currentPlayer;
  const currentPlayerIsBottomPlayer = bottomPlayerID === ctx.currentPlayer;

  const currentPhaseIsTalk = ctx.phase === PhaseID.Talk;
  const currentPhaseIsPlayCards = ctx.phase === PhaseID.PlayCards;
  const currentPhaseNeedsToWaitForAPlayerMove = currentPhaseIsTalk || currentPhaseIsPlayCards;

  const isNotFirstPlayCardTurn = G.playersCardPlayedInPreviousTurn !== undefined;

  const [isDisplayedPreviousCardsPlayed, setIsDisplayedPreviousCardsPlayed] = useState(false);

  const playedCards = isDisplayedPreviousCardsPlayed ? G.playersCardPlayedInPreviousTurn : G.playersCardPlayedInCurrentTurn;

  const displayableAnnouncesByPlayerID: Record<PlayerID, { playerName: string; announces: (Announce | BelotAnnounce)[] }> = {
    [PlayerID.North]: {
      playerName: getPlayerNameByID(gameMetadata, PlayerID.North),
      announces: G.playersAnnounces[PlayerID.North].filter(pa => pa.isCardsDisplayable).map(pa => pa.announce!),
    },
    [PlayerID.East]: {
      playerName: getPlayerNameByID(gameMetadata, PlayerID.East),
      announces: G.playersAnnounces[PlayerID.East].filter(pa => pa.isCardsDisplayable).map(pa => pa.announce!),
    },
    [PlayerID.South]: {
      playerName: getPlayerNameByID(gameMetadata, PlayerID.South),
      announces: G.playersAnnounces[PlayerID.South].filter(pa => pa.isCardsDisplayable).map(pa => pa.announce!),
    },
    [PlayerID.West]: {
      playerName: getPlayerNameByID(gameMetadata, PlayerID.West),
      announces: G.playersAnnounces[PlayerID.West].filter(pa => pa.isCardsDisplayable).map(pa => pa.announce!),
    },
  };
  if (G.belotAnnounce && G.belotAnnounce.isSaid) {
    displayableAnnouncesByPlayerID[G.belotAnnounce.owner].announces.push(G.belotAnnounce);
  }

  return (
    <div className="board">
      <div className="info">
        <InfoComponent
          partnerTeamID={partnerTeamID}
          partnerTeamPoints={G.teamsPoints[partnerTeamID]}
          opponentTeamPoints={G.teamsPoints[opponentTeamID]}
          howManyPointsATeamMustReachToEndTheGame={G.howManyPointsATeamMustReachToEndTheGame}
          attackingTeamID={currentPhaseIsPlayCards ? G.attackingTeam : undefined}
          trumpMode={currentPhaseIsPlayCards ? G.trumpMode : undefined}
          expectedPoints={currentPhaseIsPlayCards ? G.expectedPoints : undefined}
          displayablePlayersAnnounces={displayableAnnouncesByPlayerID}
        />
      </div>

      <div className={`player top ${getTurnIndicatorClassForPosition('top', currentPhaseNeedsToWaitForAPlayerMove, currentPlayerIsTopPlayer, currentPlayerIsLeftPlayer, currentPlayerIsRightPlayer, currentPlayerIsBottomPlayer)} otherPlayer`}>
        <OtherPlayerCardsComponent cards={G.playersCards[topPlayerID]} />
        <div className="playerName">{getPlayerNameByID(gameMetadata, topPlayerID)}</div>
        <div className="playerTalks">
          {currentPhaseIsTalk && !currentPlayerIsTopPlayer && G.playersSaid[topPlayerID] && (
            <PlayerSaidComponent playerSaid={G.playersSaid[topPlayerID]}/>
          )}
          {currentPhaseIsPlayCards && !isNotFirstPlayCardTurn && topPlayerSaidAnnounces.length > 0 && (
            <PlayerSaidAnnounceGroupsComponent saidAnnounceGroups={topPlayerSaidAnnounces.map(a => a.announceGroup!)}/>
          )}
        </div>
      </div>

      <div className={`player left ${getTurnIndicatorClassForPosition('left', currentPhaseNeedsToWaitForAPlayerMove, currentPlayerIsTopPlayer, currentPlayerIsLeftPlayer, currentPlayerIsRightPlayer, currentPlayerIsBottomPlayer)} otherPlayer`}>
        <OtherPlayerCardsComponent cards={G.playersCards[leftPlayerID]} />
        <div className="playerName">{getPlayerNameByID(gameMetadata, leftPlayerID)}</div>
        <div className="playerTalks">
          {currentPhaseIsTalk && !currentPlayerIsLeftPlayer && G.playersSaid[leftPlayerID] && (
            <PlayerSaidComponent playerSaid={G.playersSaid[leftPlayerID]}/>
          )}
          {currentPhaseIsPlayCards && !isNotFirstPlayCardTurn && leftPlayerSaidAnnounces.length > 0 && (
            <PlayerSaidAnnounceGroupsComponent saidAnnounceGroups={leftPlayerSaidAnnounces.map(a => a.announceGroup!)}/>
          )}
        </div>
      </div>

      <div className="playedCardsArea">
        <PlayedCardsComponent bottomPlayerID={bottomPlayerID} playedCards={playedCards} />
      </div>

      <div className={`player right ${getTurnIndicatorClassForPosition('right', currentPhaseNeedsToWaitForAPlayerMove, currentPlayerIsTopPlayer, currentPlayerIsLeftPlayer, currentPlayerIsRightPlayer, currentPlayerIsBottomPlayer)} otherPlayer`}>
        <OtherPlayerCardsComponent cards={G.playersCards[rightPlayerID]} />
        <div className="playerName">{getPlayerNameByID(gameMetadata, rightPlayerID)}</div>
        <div className="playerTalks">
          {currentPhaseIsTalk && !currentPlayerIsRightPlayer && G.playersSaid[rightPlayerID] && (
            <PlayerSaidComponent playerSaid={G.playersSaid[rightPlayerID]}/>
          )}
          {currentPhaseIsPlayCards && !isNotFirstPlayCardTurn && rightPlayerSaidAnnounces.length > 0 && (
            <PlayerSaidAnnounceGroupsComponent saidAnnounceGroups={rightPlayerSaidAnnounces.map(a => a.announceGroup!)}/>
          )}
        </div>
      </div>

      <div className="menu">
        {currentPhaseIsPlayCards && isNotFirstPlayCardTurn && (
          <PreviousCardsPlayedMenuComponent isDisplayedPreviousCardsPlayed={isDisplayedPreviousCardsPlayed} toggleIsDisplayedPreviousCardsPlayed={() => setIsDisplayedPreviousCardsPlayed(!isDisplayedPreviousCardsPlayed)} />
        )}
        {!isDisplayedPreviousCardsPlayed && currentPhaseIsPlayCards && !isNotFirstPlayCardTurn && currentPlayerIsBottomPlayer && (
          <SayAnnounceMenuComponent sayAnnounce={moves.sayAnnounce} availableAnnounces={G.playerAnnounces.filter(a => !a.isSaid).map(a => a.announce)} />
        )}
        {!isDisplayedPreviousCardsPlayed && currentPhaseIsTalk && currentPlayerIsBottomPlayer && (
          <TalkMenuComponent saySkip={moves.saySkip} sayTake={moves.sayTake} playersSaid={G.playersSaid} />
        )}
      </div>

      <div className={`player bottom ${getTurnIndicatorClassForPosition('bottom', currentPhaseNeedsToWaitForAPlayerMove, currentPlayerIsTopPlayer, currentPlayerIsLeftPlayer, currentPlayerIsRightPlayer, currentPlayerIsBottomPlayer)} myPlayer`}>
        {!isDisplayedPreviousCardsPlayed && (
          <MyCardsComponent
            cards={G.playerCards}
            isMyTurnToPlayACard={currentPhaseIsPlayCards && currentPlayerIsBottomPlayer}
            playCard={moves.playCard}
            trumpMode={G.trumpMode}
            playersCardPlayedInCurrentTurn={G.playersCardPlayedInCurrentTurn}
            firstPlayerInCurrentTurn={G.firstPlayerInCurrentTurn}
            playerPartner={getPlayerPartner(bottomPlayerID)}
          />
        )}
      </div>
    </div>
  );
};
