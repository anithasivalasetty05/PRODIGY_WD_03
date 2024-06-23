import React, { useState } from 'react';
import './App.css';
import Board from './Board';
import DifficultySelector from './DifficultySelector';

const App = () => {
  const [difficulty, setDifficulty] = useState('easy');

  return (
    <div className="container">
      <h1>Tic-Tac-Toe</h1>
      <DifficultySelector difficulty={difficulty} setDifficulty={setDifficulty} />
      <Board difficulty={difficulty} />
    </div>
  );
};

export default App;
