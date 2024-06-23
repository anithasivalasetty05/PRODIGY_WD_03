import React, { useState, useEffect } from 'react';
import './Board.css';

const Board = ({ difficulty }) => {
  const getBoardSize = () => {
    switch (difficulty) {
      case 'medium':
        return 4;
      case 'hard':
        return 5;
      default:
        return 3;
    }
  };

  const size = getBoardSize();
  const [boardState, setBoardState] = useState(Array(size * size).fill(''));
  const [currentPlayer, setCurrentPlayer] = useState('X');
  const [message, setMessage] = useState('Player X\'s turn');
  const [gameActive, setGameActive] = useState(true);

  useEffect(() => {
    setBoardState(Array(size * size).fill(''));
    setCurrentPlayer('X');
    setMessage('Player X\'s turn');
    setGameActive(true);
  }, [difficulty]);

  const handleCellClick = (index) => {
    if (boardState[index] !== '' || !gameActive) return;

    const newBoardState = [...boardState];
    newBoardState[index] = currentPlayer;
    setBoardState(newBoardState);

    if (checkWin(newBoardState, currentPlayer)) {
      setMessage(`Congratulations! Player ${currentPlayer} wins!`);
      setGameActive(false);
    } else if (newBoardState.every(cell => cell !== '')) {
      setMessage("It's a tie!");
      setGameActive(false);
    } else {
      setCurrentPlayer(currentPlayer === 'X' ? 'O' : 'X');
      setMessage(`Player ${currentPlayer === 'X' ? 'O' : 'X'}'s turn`);
    }
  };

  const makeAIMove = () => {
    const emptyIndices = boardState
      .map((cell, index) => (cell === '' ? index : null))
      .filter(index => index !== null);

    let chosenIndex;
    if (difficulty === 'easy') {
      chosenIndex = emptyIndices[Math.floor(Math.random() * emptyIndices.length)];
    } else if (difficulty === 'medium') {
      chosenIndex = getMediumMove(emptyIndices);
    } else {
      chosenIndex = getBestMove(emptyIndices);
    }

    handleCellClick(chosenIndex);
  };

  const getMediumMove = (emptyIndices) => {
    return emptyIndices[Math.floor(Math.random() * emptyIndices.length)];
  };

  const getBestMove = (emptyIndices) => {
    for (let i = 0; i < emptyIndices.length; i++) {
      const newBoardState = [...boardState];
      newBoardState[emptyIndices[i]] = 'O';
      if (checkWin(newBoardState, 'O')) {
        return emptyIndices[i];
      }
    }
    for (let i = 0; i < emptyIndices.length; i++) {
      const newBoardState = [...boardState];
      newBoardState[emptyIndices[i]] = 'X';
      if (checkWin(newBoardState, 'X')) {
        return emptyIndices[i];
      }
    }
    return emptyIndices[Math.floor(Math.random() * emptyIndices.length)];
  };

  const checkWin = (board, player) => {
    const lines = getWinningCombinations(size);
    return lines.some(combination => {
      return combination.every(index => board[index] === player);
    });
  };

  const getWinningCombinations = (size) => {
    const lines = [];

    // Rows
    for (let i = 0; i < size; i++) {
      lines.push(Array.from({ length: size }, (_, k) => i * size + k));
    }

    // Columns
    for (let i = 0; i < size; i++) {
      lines.push(Array.from({ length: size }, (_, k) => i + k * size));
    }

    // Diagonals
    lines.push(Array.from({ length: size }, (_, k) => k * (size + 1)));
    lines.push(Array.from({ length: size }, (_, k) => (k + 1) * (size - 1)));

    return lines;
  };

  const resetGame = () => {
    setBoardState(Array(size * size).fill(''));
    setCurrentPlayer('X');
    setMessage('Player X\'s turn');
    setGameActive(true);
  };

  useEffect(() => {
    if (currentPlayer === 'O' && gameActive) {
      if (difficulty !== 'player') {
        setTimeout(() => makeAIMove(), 500);
      }
    }
  }, [currentPlayer, gameActive, difficulty]);

  return (
    <div>
      <div className="board" style={{ gridTemplateColumns: `repeat(${size}, 100px)` }}>
        {boardState.map((cell, index) => (
          <div
            key={index}
            className="cell"
            onClick={() => handleCellClick(index)}
          >
            {cell}
          </div>
        ))}
      </div>
      <button onClick={resetGame}>Restart Game</button>
      <p>{message}</p>
    </div>
  );
};

export default Board;
