import './Title.css';
import React from 'react';

export const TitleComponent: React.FunctionComponent = () => {
  return (
    <div className="title">
      <span role="img" aria-label="diamond">♠️</span>
      <span className="red" role="img" aria-label="diamond">♦️</span>
      Oliboy50/coinche
      <span className="red" role="img" aria-label="heart">♥️</span>
      <span role="img" aria-label="diamond">♣️</span>
    </div>
  );
};
