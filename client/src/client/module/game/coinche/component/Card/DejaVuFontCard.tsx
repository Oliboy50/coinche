import './DejaVuFontCard.css';
import type {CardComponentProps} from './index';
import {UnicodeCardComponent} from './UnicodeCard';

export const DejaVuFontCardComponent: React.FunctionComponent<CardComponentProps> = (props) =>
{
  return <UnicodeCardComponent extraClassName="DejaVuFont" {...props}/>;
};
