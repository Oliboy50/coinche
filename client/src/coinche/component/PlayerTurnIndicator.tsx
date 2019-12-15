import React from 'react';
import {BubbleComponent} from './Bubble';

type ComponentProps = {};
export const PlayerTurnIndicatorComponent: React.FunctionComponent<ComponentProps> = () => {
  return (
    <BubbleComponent type="PlayerTurnIndicator" content="..." />
  );
};
