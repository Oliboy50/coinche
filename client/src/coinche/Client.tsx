import './Client.css';
import React, {useState} from 'react';
import {BoardProps} from 'boardgame.io/react';
import {
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
import {TalkMenuComponent} from './component/TalkMenu';
import {MyCardsComponent} from './component/MyCards';
import {OtherPlayerCardsComponent} from './component/OtherPlayerCards';
import {PlayerSaidComponent} from './component/PlayerSaid';
import {PreviousCardsPlayedMenuComponent} from './component/PreviousCardsPlayedMenu';
import {PlayedCardsComponent} from './component/PlayedCards';
import {SayAnnounceMenuComponent} from './component/SayAnnounceMenu';
import {PlayerSaidAnnounceGroupsComponent} from './component/PlayerSaidAnnounceGroups';
import {InfoComponent} from './component/Info';

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

  const topPlayerMetadata = gameMetadata.find(m => (String(m.id) as PlayerID) === topPlayerID);
  const leftPlayerMetadata = gameMetadata.find(m => (String(m.id) as PlayerID) === leftPlayerID);
  const rightPlayerMetadata = gameMetadata.find(m => (String(m.id) as PlayerID) === rightPlayerID);

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

  const getTurnIndicatorClassForPosition = (position: PlayerScreenPosition): string => {
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
        />
      </div>

      <div className={`player top ${getTurnIndicatorClassForPosition('top')} otherPlayer`}>
        <OtherPlayerCardsComponent cards={G.playersCards[topPlayerID]} />
        <div className="playerName">{topPlayerMetadata ? topPlayerMetadata.name : ''}</div>
        <div className="playerTalks">
          {currentPhaseIsTalk && !currentPlayerIsTopPlayer && G.playersSaid[topPlayerID] && (
            <PlayerSaidComponent playerSaid={G.playersSaid[topPlayerID]}/>
          )}
          {currentPhaseIsPlayCards && !isNotFirstPlayCardTurn && topPlayerSaidAnnounces.length > 0 && (
            <PlayerSaidAnnounceGroupsComponent saidAnnounceGroups={topPlayerSaidAnnounces.map(a => a.announceGroup!)}/>
          )}
        </div>
      </div>

      <div className={`player left ${getTurnIndicatorClassForPosition('left')} otherPlayer`}>
        <OtherPlayerCardsComponent cards={G.playersCards[leftPlayerID]} />
        <div className="playerName">{leftPlayerMetadata ? leftPlayerMetadata.name : ''}</div>
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

      <div className={`player right ${getTurnIndicatorClassForPosition('right')} otherPlayer`}>
        <OtherPlayerCardsComponent cards={G.playersCards[rightPlayerID]} />
        <div className="playerName">{rightPlayerMetadata ? rightPlayerMetadata.name : ''}</div>
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

      <div className={`player bottom ${getTurnIndicatorClassForPosition('bottom')} myPlayer`}>
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
