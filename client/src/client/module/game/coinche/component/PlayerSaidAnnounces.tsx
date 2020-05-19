import React, {useContext} from 'react';
import {AnnounceGroup, AnnounceID} from '../../../../../shared/coinche';
import {I18nContext} from '../context/i18n';

type ComponentProps = {
  saidAnnounceGroups: AnnounceGroup[],
  saidAnnounces: { id: AnnounceID | 'Belot' }[],
};
export const PlayerSaidAnnouncesComponent: React.FunctionComponent<ComponentProps> = ({
  saidAnnounceGroups,
  saidAnnounces,
}) => {
  const i18n = useContext(I18nContext);

  if (!saidAnnounceGroups.length && !saidAnnounces.length) {
    return null;
  }

  const allTranslatedAnnounces = [
    ...saidAnnounceGroups.map(announceGroup => i18n.announce.group[announceGroup]),
    ...saidAnnounces.map(announce => i18n.announce.id[announce.id]),
  ];

  return (
    <div className="playerSaidAnnounces">
      {allTranslatedAnnounces.join(', ')}
    </div>
  );
};
