import React, {useContext, useState} from 'react';
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
import {I18nContext} from '../context/i18n';

type ComponentProps = {
  moves: BoardProps<GameStatePlayerView, Moves, PlayerID, PhaseID>['moves'],
};
export const TalkMenuComponent: React.FunctionComponent<ComponentProps> = ({
  moves,
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

  return (
    <div className={styles.menu}>
      <div className={styles.sayTake}>
        <select className={styles.sayTakeExpectedPoint} value={selectedExpectedPoint} onChange={onChangeExpectedPoint}>
          {validExpectedPoints.map(expectedPoint => (
            <option value={expectedPoint} key={`expectedPoint_${expectedPoint}`}>
              {expectedPoint}
            </option>
          ))}
        </select>
        <select className={styles.sayTakeTrumpMode} value={selectedTrumpMode} onChange={onChangeTrumpMode}>
          {validTrumpModes.map(trumpMode => (
            <option value={trumpMode} key={`trumpMode_${trumpMode}`}>
              {i18n.trumpMode[trumpMode]}
            </option>
          ))}
        </select>
        <button onClick={() => moves.sayTake(selectedExpectedPoint, selectedTrumpMode)}>{i18n.TalkMenu.takeButton}</button>
      </div>
      <div className={styles.saySkip}>
        <button onClick={() => moves.saySkip()}>{i18n.TalkMenu.skipButton}</button>
      </div>
    </div>
  );
};
