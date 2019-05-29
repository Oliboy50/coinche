import React from 'react';
import styles from './App.module.css';
import {CoincheClient} from './coinche/CoincheClient';
import {PlayerID} from './shared/coinche';

const App: React.FC = () => {
  return (
    <div className={styles.base}>
      <CoincheClient playerID={PlayerID.North} />
      <CoincheClient playerID={PlayerID.East} debug={false} />
      <CoincheClient playerID={PlayerID.South} debug={false} />
      <CoincheClient playerID={PlayerID.West} debug={false} />
    </div>
  );
};

export default App;
