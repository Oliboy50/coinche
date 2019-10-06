import React from 'react';
import { CoincheClient } from './coinche/CoincheClient';
import {PlayerID} from './shared/coinche';

const App: React.FunctionComponent = () => {
  return (
    <React.Fragment>
      <CoincheClient playerID={PlayerID.North} debug={false} />
      {/*<CoincheClient playerID={PlayerID.West} debug={false} />*/}
      {/*<CoincheClient playerID={PlayerID.South} debug={false} />*/}
      {/*<CoincheClient playerID={PlayerID.East} debug={false} />*/}
    </React.Fragment>
  );
};

export default App;
