import React, {useContext, useState} from 'react';
import styles from './SayAnnounceMenu.module.css';
import {
  Announce,
  AnnounceId,
  getAnnounceById,
  Moves,
} from '../../shared/coinche';
import {I18nContext} from '../context/i18n';

type ComponentProps = {
  sayAnnounce: Moves['sayAnnounce'],
  availableAnnounces: Announce[],
};
export const SayAnnounceMenuComponent: React.FunctionComponent<ComponentProps> = ({
  sayAnnounce,
  availableAnnounces,
}) => {
  const i18n = useContext(I18nContext);
  const [selectedAnnounce, setSelectedAnnounce] = useState(availableAnnounces.length ? availableAnnounces[0] : undefined);

  const onChangeAnnounce = (event: React.ChangeEvent<HTMLSelectElement>) => {
    const newAnnounceId = event.target.value as AnnounceId;
    if (availableAnnounces.map(a => a.id).includes(newAnnounceId)) {
      setSelectedAnnounce(getAnnounceById(newAnnounceId));
    }
  };

  // Make sure we can't select an announce if there is no more available announces
  if (!availableAnnounces.length) {
    setSelectedAnnounce(undefined);
  }

  return (
    <div className={styles.menu}>
      <div className={styles.sayAnnounce}>
        <select disabled={!availableAnnounces.length} value={selectedAnnounce && selectedAnnounce.id} onChange={onChangeAnnounce}>
          {availableAnnounces.length
            ? availableAnnounces.map(announce => (
              <option value={announce.id} key={`sayAnnounce_${announce.id}`}>
                {i18n.announce.id[announce.id]}
              </option>
            ))
            : (
              <option>{i18n.SayAnnounceMenu.noAvailableAnnounce}</option>
            )
          }
        </select>
        <button disabled={!selectedAnnounce} onClick={selectedAnnounce ? () => sayAnnounce(selectedAnnounce) : undefined}>{i18n.SayAnnounceMenu.sayAnnounceButton}</button>
      </div>
    </div>
  );
};
