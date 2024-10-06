export enum CardColorDisplay {
  TwoColors = '0',
  FourColors = '1',
}
export const validCardColorDisplays: CardColorDisplay[] = Object.values(CardColorDisplay);
export const cardColorDisplayDefaultValue: CardColorDisplay = CardColorDisplay.TwoColors;
