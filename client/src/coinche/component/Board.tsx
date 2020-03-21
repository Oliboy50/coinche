import React, {useState} from 'react';
import {BoardProps} from 'boardgame.io/react';
import {
  GameStatePlayerView,
  getPlayerPartner,
  Moves,
  PhaseID,
  PlayerID,
  SecretPlayerAnnounce,
} from '../../shared/coinche';
import {TalkMenuComponent} from './TalkMenu';
import {MyCardsComponent} from './MyCards';
import {OtherPlayerCardsComponent} from './OtherPlayerCards';
import {PlayerSaidComponent} from './PlayerSaid';
import {PreviousCardsPlayedMenuComponent} from './PreviousCardsPlayedMenu';
import {getPlayerIDForPosition, PlayerScreenPosition} from '../service/getPlayerIDForPosition';
import {PlayedCardsComponent} from './PlayedCards';
import {SayAnnounceMenuComponent} from './SayAnnounceMenu';
import {PlayerSaidAnnounceGroupsComponent} from './PlayerSaidAnnounceGroups';

import './Board.css';

export const BoardComponent: React.FunctionComponent<BoardProps<GameStatePlayerView, Moves, PlayerID, PhaseID>> = ({
  G,
  ctx,
  moves,
  playerID,
  gameMetadata,
}) => {
  const bottomPlayerID = playerID;
  const topPlayerID = getPlayerIDForPosition(bottomPlayerID, 'top');
  const leftPlayerID = getPlayerIDForPosition(bottomPlayerID, 'left');
  const rightPlayerID = getPlayerIDForPosition(bottomPlayerID, 'right');

  const topPlayerMetadata = gameMetadata.find(m => (String(m.id) as PlayerID) === topPlayerID);
  const leftPlayerMetadata = gameMetadata.find(m => (String(m.id) as PlayerID) === leftPlayerID);
  const rightPlayerMetadata = gameMetadata.find(m => (String(m.id) as PlayerID) === rightPlayerID);

  const currentPlayerIsTopPlayer = topPlayerID === ctx.currentPlayer;
  const currentPlayerIsLeftPlayer = leftPlayerID === ctx.currentPlayer;
  const currentPlayerIsRightPlayer = rightPlayerID === ctx.currentPlayer;
  const currentPlayerIsBottomPlayer = bottomPlayerID === ctx.currentPlayer;

  const topPlayerSaidAnnounces = (G.playersAnnounces[topPlayerID] as SecretPlayerAnnounce[]).filter(a => a.isSaid);
  const leftPlayerSaidAnnounces = (G.playersAnnounces[leftPlayerID] as SecretPlayerAnnounce[]).filter(a => a.isSaid);
  const rightPlayerSaidAnnounces = (G.playersAnnounces[rightPlayerID] as SecretPlayerAnnounce[]).filter(a => a.isSaid);

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
      <div className="playedCardsArea">
        <PlayedCardsComponent bottomPlayerID={bottomPlayerID} playedCards={playedCards} />
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
