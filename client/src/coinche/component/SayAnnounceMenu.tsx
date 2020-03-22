import React, {useContext, useState} from 'react';
import {
  Announce,
  AnnounceID,
  getAnnounceByID,
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
    const newAnnounceID = event.target.value as AnnounceID;
    if (availableAnnounces.map(a => a.id).includes(newAnnounceID)) {
      setSelectedAnnounce(getAnnounceByID(newAnnounceID));
    }
  };
  const saySelectedAnnounce = (selectedAnnounce: Announce) => {
    const remainingAvailableAnnounces = availableAnnounces.filter(a => a.id !== selectedAnnounce.id);
    sayAnnounce(selectedAnnounce);
    setSelectedAnnounce(remainingAvailableAnnounces.length ? remainingAvailableAnnounces[0] : undefined);
  };

  return (
    <div className="sayAnnounce">
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
      <button disabled={!selectedAnnounce} onClick={selectedAnnounce ? () => saySelectedAnnounce(selectedAnnounce) : undefined}>{i18n.SayAnnounceMenu.sayAnnounceButton}</button>
    </div>
  );
};
