import './DejaVuFontCard.css';
import React from 'react';
import {CardComponentProps} from './index';
import {UnicodeCardComponent} from './UnicodeCard';

export const DejaVuFontCardComponent: React.FunctionComponent<CardComponentProps> = (props) =>
{
  return <UnicodeCardComponent extraClassName="DejaVuFont" {...props}/>;
};
