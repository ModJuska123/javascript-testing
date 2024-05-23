import React, { useState } from 'react';
import './App.css';

const Square = ({ value, onClick }) => {
  return (
    <button className="square" onClick={onClick}>
      {value}
    </button>
  );
};

const Board = ({ squares, onClick }) => {
  const renderSquare = (i) => {
    return (
      <Square
        value={squares[i]}
        onClick={() => onClick(i)}
      />
    );
  };

  return (
    <div>
      <div className="board-row">
        {renderSquare(0)}
        {renderSquare(1)}
        {renderSquare(2)}
      </div>
      <div className="board-row">
        {renderSquare(3)}
        {renderSquare(4)}
        {renderSquare(5)}
      </div>
      <div className="board-row">
        {renderSquare(6)}
        {renderSquare(7)}
        {renderSquare(8)}
      </div>
    </div>
  );
};

const Game = () => {
  const [history, setHistory] = useState([Array(9).fill(null)]);
  const [stepNumber, setStepNumber] = useState(0);
  const [xIsNext, setXIsNext] = useState(true);

  const current = history[stepNumber];

  const handleClick = (i) => {
    const historyPoint = history.slice(0, stepNumber + 1);
    const current = historyPoint[stepNumber];
    const squares = [...current];

    if (calculateWinner(squares) || squares[i]) {
      return;
    }

    squares[i] = 'X';
    setHistory([...historyPoint, squares]);
    setStepNumber(historyPoint.length);
    setXIsNext(!xIsNext);

    if (!calculateWinner(squares) && squares.includes(null)) {
      setTimeout(() => makeAIMove(squares), 500);
    }
  };

  const makeAIMove = (squares) => {
    const availableMoves = squares
      .map((square, index) => (square === null ? index : null))
      .filter((index) => index !== null);

    const randomMove = availableMoves[Math.floor(Math.random() * availableMoves.length)];

    squares[randomMove] = 'O';
    setHistory([...history.slice(0, stepNumber + 1), squares]);
    setStepNumber(stepNumber + 1);
    setXIsNext(true);
  };

  const jumpTo = (step) => {
    setStepNumber(step);
    setXIsNext(step % 2 === 0);
  };

  const winner = calculateWinner(current);
  const status = winner
    ? 'Winner: ' + winner
    : 'Next player: ' + (xIsNext ? 'X' : 'O');

  const moves = history.map((step, move) => {
    const desc = move ? 'Go to move #' + move : 'Go to game start';
    return (
      <li key={move}>
        <button onClick={() => jumpTo(move)}>{desc}</button>
      </li>
    );
  });

  return (
    <div className="game">
      <div className="game-board">
        <Board squares={current} onClick={handleClick} />
      </div>
      <div className="game-info">
        <div>{status}</div>
        <ol>{moves}</ol>
      </div>
    </div>
  );
};

const calculateWinner = (squares) => {
  const lines = [
    [0, 1, 2],
    [3, 4, 5],
    [6, 7, 8],
    [0, 3, 6],
    [1, 4, 7],
    [2, 5, 8],
    [0, 4, 8],
    [2, 4, 6],
  ];

  for (let i = 0; i < lines.length; i++) {
    const [a, b, c] = lines[i];
    if (squares[a] && squares[a] === squares[b] && squares[a] === squares[c]) {
      return squares[a];
    }
  }

  return null;
};

const App = () => <Game />;

export default App;
