import React from 'react';

export const PageHeaderComponent: React.FunctionComponent = () => {
  return (
    <div className="pageHeader" style={{ fontSize: '40px', textAlign: 'center' }}>
      <span className="black" role="img" aria-label="spade">♠️</span>
      {'\u00A0'}<span className="red" role="img" aria-label="diamond">♦️</span>
      {'\u00A0'}coinche
      {'\u00A0'}<span className="red" role="img" aria-label="heart">♥️</span>
      {'\u00A0'}<span className="black" role="img" aria-label="club">♣️</span>
    </div>
  );
};
