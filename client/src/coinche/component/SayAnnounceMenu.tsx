import React, {useContext, useState} from 'react';
import styles from './SayAnnounceMenu.module.css';
import {
  Moves,
  validTrumpModes,
} from '../../shared/coinche';
import {I18nContext} from '../context/i18n';

type ComponentProps = {
  sayAnnounce: Moves['sayAnnounce'],
};
export const SayAnnonunceMenuComponent: React.FunctionComponent<ComponentProps> = ({
  moves,
}) => {
  const i18n = useContext(I18nContext);
  // const [selectedTrumpMode, setSelectedTrumpMode] = useState(validTrumpModes[0]);
  //
  // const onChangeTrumpMode = (event: React.ChangeEvent<HTMLSelectElement>) => {
  //   const newTrumpMode = event.target.value as TrumpMode;
  //   if (validTrumpModes.includes(newTrumpMode)) {
  //     setSelectedTrumpMode(newTrumpMode);
  //   }
  // };

  return (
    <div className={styles.menu}>
      <div className={styles.sayTake}>
        <select className={styles.sayTakeTrumpMode} value={selectedTrumpMode} onChange={onChangeTrumpMode}>
          {validTrumpModes.map(trumpMode => (
            <option value={trumpMode} key={`trumpMode_${trumpMode}`}>
              {i18n.trumpMode[trumpMode]}
            </option>
          ))}
        </select>
        <button onClick={() => sayAnnounce(selectedAnnounce)}>{i18n.TalkMenu.takeButton}</button>
      </div>
    </div>
  );
};
