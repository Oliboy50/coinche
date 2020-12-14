import React, {useContext, useState} from 'react';
import {
  ExpectedPoints,
  TrumpMode,
  validExpectedPoints,
  validTrumpModes,
} from '../../../../../shared/coinche';
import {I18nContext} from '../../../../context/i18n';

type ComponentProps = {
  saySkip: () => void,
  canSayTake: boolean,
  sayTake: (selectedExpectedPoints: ExpectedPoints, selectedTrumpMode: TrumpMode) => void,
  canSayCoinche: boolean,
  canSaySurcoinche: boolean,
  sayCoinche: () => void,
  selectedTrumpModeDefaultValue: TrumpMode | undefined,
  sayableExpectedPoints: ExpectedPoints[],
};
export const TalkMenuComponent: React.FunctionComponent<ComponentProps> = ({
  saySkip,
  canSayTake,
  sayTake,
  sayCoinche,
  canSayCoinche,
  canSaySurcoinche,
  selectedTrumpModeDefaultValue,
  sayableExpectedPoints,
}) => {
  const { game: i18n } = useContext(I18nContext);
  const [selectedTrumpMode, setSelectedTrumpMode] = useState(selectedTrumpModeDefaultValue);
  const [selectedExpectedPoint, setSelectedExpectedPoint] = useState(sayableExpectedPoints.length ? sayableExpectedPoints[0] : undefined);

  const onChangeTrumpMode = (event: React.ChangeEvent<HTMLSelectElement>) => {
    const newTrumpMode = event.target.value as TrumpMode;
    if (validTrumpModes.includes(newTrumpMode)) {
      setSelectedTrumpMode(newTrumpMode);
    } else {
      setSelectedTrumpMode(undefined);
    }
  };
  const onChangeExpectedPoint = (event: React.ChangeEvent<HTMLSelectElement>) => {
    const newExpectedPoint = parseInt(event.target.value, 10) as ExpectedPoints;
    if (validExpectedPoints.includes(newExpectedPoint)) {
      setSelectedExpectedPoint(newExpectedPoint);
    }
  };

  return (
    <div className="talk">
      {canSayTake && sayableExpectedPoints.length > 0 && (
        <React.Fragment>
          <select value={selectedExpectedPoint} onChange={onChangeExpectedPoint} data-testid="select sayTakeExpectedPoint">
            {sayableExpectedPoints.map(expectedPoint => (
              <option value={expectedPoint} key={`expectedPoint_${expectedPoint}`}>
                {expectedPoint}
              </option>
            ))}
          </select>
          <select value={selectedTrumpMode} onChange={onChangeTrumpMode} data-testid="select sayTakeTrumpMode">
            <option value="">{i18n.TalkMenu.selectTrumpModePlaceholder}</option>
            {validTrumpModes.map(trumpMode => (
              <option value={trumpMode} key={`trumpMode_${trumpMode}`}>
                {i18n.trumpMode[trumpMode]}
              </option>
            ))}
          </select>
          <button type="button" disabled={!selectedTrumpMode} onClick={(selectedExpectedPoint && selectedTrumpMode) ? () => sayTake(selectedExpectedPoint, selectedTrumpMode) : undefined} data-testid="button sayTake">{i18n.TalkMenu.takeButton}</button>
        </React.Fragment>
      )}
      {(canSayCoinche || canSaySurcoinche) && (
        <button type="button" className="sayCoincheButton" onClick={() => sayCoinche()} data-testid="button sayCoinche">{canSaySurcoinche ? i18n.TalkMenu.surcoincheButton : i18n.TalkMenu.coincheButton}</button>
      )}
      <button type="button" className="saySkipButton" onClick={() => saySkip()} data-testid="button saySkip">{i18n.TalkMenu.skipButton}</button>
    </div>
  );
};
