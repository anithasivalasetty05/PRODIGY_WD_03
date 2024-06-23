import React from 'react';

const DifficultySelector = ({ difficulty, setDifficulty }) => {
  return (
    <div>
      <label htmlFor="difficulty">Select Difficulty: </label>
      <select
        id="difficulty"
        value={difficulty}
        onChange={(e) => setDifficulty(e.target.value)}
      >
        <option value="easy">Easy</option>
        <option value="medium">Medium</option>
        <option value="hard">Hard</option>
        <option value="player">Two Players</option>
      </select>
    </div>
  );
};

export default DifficultySelector;
