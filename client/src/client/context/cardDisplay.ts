export enum CardDisplay {
  UnicodeNativeFont = '0',
  UnicodeDejaVuFont = '1',
}
export const validCardDisplays: CardDisplay[] = Object.values(CardDisplay);
export const cardDisplayDefaultValue: CardDisplay = CardDisplay.UnicodeNativeFont;
