import React from 'react';

export enum CardDisplay {
  UnicodeNativeFont = '0',
  UnicodeDejaVuFont = '1',
}
export const validCardDisplays: CardDisplay[] = Object.values(CardDisplay);
export const cardDisplayDefaultValue: CardDisplay = CardDisplay.UnicodeNativeFont;

export const CardDisplayContext = React.createContext<CardDisplay>(cardDisplayDefaultValue);
