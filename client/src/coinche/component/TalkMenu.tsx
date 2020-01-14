import React, {useContext, useState} from 'react';
import {BoardProps} from 'boardgame.io/react';
import styles from './TalkMenu.module.css';
import {
  GameStatePlayerView, isSayableExpectedPoints,
  Moves,
  PhaseID,
  PlayerID, TrumpMode,
  validExpectedPoints,
  validTrumpModes,
} from '../../shared/coinche';
import {I18nContext} from '../context/i18n';

type ComponentProps = {
  moves: BoardProps<GameStatePlayerView, Moves, PlayerID, PhaseID>['moves'],
  playersSaid: BoardProps<GameStatePlayerView, Moves, PlayerID, PhaseID>['G']['playersSaid'],
};
export const TalkMenuComponent: React.FunctionComponent<ComponentProps> = ({
  moves,
  playersSaid,
}) => {
  const i18n = useContext(I18nContext);
  const [selectedTrumpMode, setTrumpMode] = useState(validTrumpModes[0]);
  const [selectedExpectedPoint, setExpectedPoint] = useState(validExpectedPoints[0]);

  const onChangeTrumpMode = (event: React.ChangeEvent<HTMLSelectElement>) => {
    const newTrumpMode = event.target.value as TrumpMode;
    if (validTrumpModes.includes(newTrumpMode)) {
      setTrumpMode(newTrumpMode);
    }
  };
  const onChangeExpectedPoint = (event: React.ChangeEvent<HTMLSelectElement>) => {
    const newExpectedPoint = parseInt(event.target.value, 10);
    if (validExpectedPoints.includes(newExpectedPoint)) {
      setExpectedPoint(newExpectedPoint);
    }
  };

  const sayableExpectedPoints = validExpectedPoints.filter(expectedPoint => isSayableExpectedPoints(expectedPoint, playersSaid));
  // Force selectedExpectedPoint to be at least the minimum sayable expectedPoints when playersSaid changes
  if (sayableExpectedPoints.length && sayableExpectedPoints[0] > selectedExpectedPoint) {
    setExpectedPoint(sayableExpectedPoints[0]);
  }

  return (
    <div className={styles.menu}>
      <div className={styles.sayTake}>
        <select className={styles.sayTakeExpectedPoint} value={selectedExpectedPoint} onChange={onChangeExpectedPoint} data-testid="select sayTakeExpectedPoint">
          {sayableExpectedPoints.map(expectedPoint => (
            <option value={expectedPoint} key={`expectedPoint_${expectedPoint}`}>
              {expectedPoint}
            </option>
          ))}
        </select>
        <select className={styles.sayTakeTrumpMode} value={selectedTrumpMode} onChange={onChangeTrumpMode} data-testid="select sayTakeTrumpMode">
          {validTrumpModes.map(trumpMode => (
            <option value={trumpMode} key={`trumpMode_${trumpMode}`}>
              {i18n.trumpMode[trumpMode]}
            </option>
          ))}
        </select>
        <button onClick={() => moves.sayTake(selectedExpectedPoint, selectedTrumpMode)} data-testid="button sayTake">{i18n.TalkMenu.takeButton}</button>
      </div>
      <div className={styles.saySkip}>
        <button onClick={() => moves.saySkip()} data-testid="button saySkip">{i18n.TalkMenu.skipButton}</button>
      </div>
    </div>
  );
};
