import React from 'react';
import { ChessBuddy } from './components/ChessBuddy';
import { theme } from './logic/theme';

const App: React.FC = () => {
  return <ChessBuddy theme={theme} />;
};

export default App;
