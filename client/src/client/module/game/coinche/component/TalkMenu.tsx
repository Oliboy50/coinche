import {Fragment, useContext, useState} from 'react';
import {
  ExpectedPoints,
  TrumpMode,
  validExpectedPoints,
  validTrumpModes,
} from '../../../../../shared/coinche';
import {I18nContext, OptionsContext} from '../../../../context';
import {getCardColorClassForTrump, getCardSymbolCharForTrump} from '../../../../service/getCardColorAndSymbol';

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
  const { state: {cardColorDisplay} } = useContext(OptionsContext);
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
        <Fragment>
          <select value={selectedExpectedPoint} onChange={onChangeExpectedPoint} data-testid="select sayTakeExpectedPoint">
            {sayableExpectedPoints.map(expectedPoint => (
              <option value={expectedPoint} key={`expectedPoint_${expectedPoint}`}>
                {expectedPoint}
              </option>
            ))}
          </select>
          <select value={selectedTrumpMode} onChange={onChangeTrumpMode} className={selectedTrumpMode ? getCardColorClassForTrump(cardColorDisplay, selectedTrumpMode) : undefined} data-testid="select sayTakeTrumpMode">
            <option value="">{i18n.TalkMenu.selectTrumpModePlaceholder}</option>
            {validTrumpModes.map(trumpMode => (
              <option value={trumpMode} key={`trumpMode_${trumpMode}`}>
                {`${getCardSymbolCharForTrump(trumpMode)} ${i18n.trumpMode[trumpMode]}`}
              </option>
            ))}
          </select>
          <button type="button" disabled={!selectedTrumpMode} onClick={(selectedExpectedPoint && selectedTrumpMode) ? () => sayTake(selectedExpectedPoint, selectedTrumpMode) : undefined} data-testid="button sayTake">{i18n.TalkMenu.takeButton}</button>
        </Fragment>
      )}
      {(canSayCoinche || canSaySurcoinche) && (
        <button type="button" className="sayCoincheButton" onClick={() => sayCoinche()} data-testid="button sayCoinche">{canSaySurcoinche ? i18n.TalkMenu.surcoincheButton : i18n.TalkMenu.coincheButton}</button>
      )}
      <button type="button" className="saySkipButton" onClick={() => saySkip()} data-testid="button saySkip">{i18n.TalkMenu.skipButton}</button>
    </div>
  );
};
