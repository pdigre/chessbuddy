import React from 'react';
import { ChessBuddy } from './ChessBuddy';
import { theme } from '../../controller/control/theme';

const App: React.FC = () => {
  return <ChessBuddy theme={theme} />;
};

export default App;