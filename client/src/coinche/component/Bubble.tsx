import React from 'react';
import styles from './Bubble.module.css';

type ComponentProps = {
  type: 'PlayerTurnIndicator' | 'PlayerSaid',
  content: React.ReactNode,
};
export const BubbleComponent: React.FunctionComponent<ComponentProps> = ({
  type,
  content,
}) => {
  return (
    <div className={`${styles.bubble} ${styles[type]}`}>
      {content}
    </div>
  );
};
