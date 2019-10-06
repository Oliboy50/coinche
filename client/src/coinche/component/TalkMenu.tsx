import React, {useState} from 'react';
import {BoardProps} from 'boardgame.io/react';
import styles from './TalkMenu.module.css';
import {
  GameStatePlayerView,
  Moves,
  PhaseID,
  PlayerID, TrumpMode,
  validExpectedPoints,
  validTrumpModes,
} from '../../shared/coinche';

type ComponentProps = {
  moves: BoardProps<GameStatePlayerView, Moves, PlayerID, PhaseID>['moves'],
};
export const TalkMenuComponent: React.FunctionComponent<ComponentProps> = ({
  moves,
}) => {
  const [selectedTrumpMode, setTrumpMode] = useState(validTrumpModes[0]);
  const [selectedExpectedPoint, setExpectedPoint] = useState(validExpectedPoints[0]);

  const onChangeTrumpMode = (event: React.ChangeEvent<HTMLSelectElement>) => {
    const newTrumpMode = event.target.value as TrumpMode;
    if (!validTrumpModes.includes(newTrumpMode)) {
      throw new Error('Invalid trump mode');
    }

    setTrumpMode(newTrumpMode);
  };
  const onChangeExpectedPoint = (event: React.ChangeEvent<HTMLSelectElement>) => {
    const newExpectedPoint = parseInt(event.target.value, 10);
    if (!validExpectedPoints.includes(newExpectedPoint)) {
      throw new Error('Invalid expected point');
    }

    setExpectedPoint(newExpectedPoint);
  };

  return (
    <div className={styles.menu}>
      <div className={styles.sayTake}>
        <select className={styles.sayTakeTrumpMode} value={selectedTrumpMode} onChange={onChangeTrumpMode}>
          {validTrumpModes.map(trumpMode => (
            <option value={trumpMode} key={`trumpMode_${trumpMode}`}>
              {trumpMode}
            </option>
          ))}
        </select>
        <select className={styles.sayTakeExpectedPoint} value={selectedExpectedPoint} onChange={onChangeExpectedPoint}>
          {validExpectedPoints.map(expectedPoint => (
            <option value={expectedPoint} key={`expectedPoint_${expectedPoint}`}>
              {expectedPoint}
            </option>
          ))}
        </select>
        <button onClick={() => moves.sayTake(selectedExpectedPoint, selectedTrumpMode)}>Take</button>
      </div>
      <div className={styles.saySkip}>
        <button onClick={() => moves.saySkip()}>Skip</button>
      </div>
    </div>
  );
};
