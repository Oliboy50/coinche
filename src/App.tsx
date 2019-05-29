import React from 'react';
import styles from './App.module.css';
import { CoincheClient } from './coinche/CoincheClient';

const App: React.FC = () => {
  return (
    <div className={styles.base}>
      <CoincheClient />
    </div>
  );
};

export default App;
