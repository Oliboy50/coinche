import React from 'react';

export type Theme = 'light';
export type CardDisplay = 'unicode';

export const theme: Record<Theme, {
  cardDisplay: CardDisplay;
}> = {
  light: {
    cardDisplay: 'unicode',
  },
};

export const ThemeContext = React.createContext(theme.light);
