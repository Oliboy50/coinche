import './DejaVuFontCard.css';
import type {CardComponentProps} from './index';
import {UnicodeCardComponent} from './UnicodeCard';
import {CardColorDisplay} from '../../../../../context/cardColor';

export const DejaVuFontCardComponent: React.FunctionComponent<CardComponentProps & { cardColorDisplay: CardColorDisplay }> = ({ cardColorDisplay, ...props}) =>
{
  return <UnicodeCardComponent cardColorDisplay={cardColorDisplay} extraClassName="DejaVuFont" {...props}/>;
};
