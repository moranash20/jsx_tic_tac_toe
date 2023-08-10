import { useState } from "react";
import "./App.css";
import { AppContext } from "./contexts/AppContext";
import { STATUSES } from "./enums";
import Board from "./components/Board/Board.jsx";
import Points from "./components/Points/Points.jsx";
import Reset from "./components/Reset/Reset.jsx";
import GameStatus from "./components/GameStatus/GameStatus";

function App() {
  const [currentPlayer, setCurrentPlayer] = useState("X");
  const [gameStatus, setGameStatus] = useState(STATUSES["ACTIVE"]);
  const [cells, setCells] = useState([
    [null, null, null],
    [null, null, null],
    [null, null, null],
  ]);
  const [pointsX, setPointsX] = useState(0);
  const [pointsO, setPointsO] = useState(0);

  const handleCellClick = (row, column) => {
    if (gameStatus !== STATUSES["ACTIVE"]) return;

    if (typeof cells[row][column] === "string") return;

    const newCells = [...cells];
    newCells[row][column] = currentPlayer;

    setCells(newCells);

    if (isWinStatus(newCells)) {
      setGameStatus(STATUSES["WIN"]);

      if (currentPlayer === "X") setPointsX(pointsX + 1);
      if (currentPlayer === "O") setPointsO(pointsO + 1);

      return;
    }

    if (isDrawStatus(newCells)) {
      setGameStatus(STATUSES["DRAW"]);

      return;
    }

    setCurrentPlayer(currentPlayer === "X" ? "O" : "X");
  };

  const isWinStatus = (newCells) => {
    // Check rows for a winner
    for (let row = 0; row < 3; row++) {
      if (
        newCells[row][0] &&
        newCells[row][0] === newCells[row][1] &&
        newCells[row][1] === newCells[row][2]
      ) {
        return true;
      }
    }

    // Check columns for a winner
    for (let col = 0; col < 3; col++) {
      if (
        newCells[0][col] &&
        newCells[0][col] === newCells[1][col] &&
        newCells[1][col] === newCells[2][col]
      ) {
        return true;
      }
    }

    // Check diagonals for a winner
    if (
      newCells[0][0] &&
      newCells[0][0] === newCells[1][1] &&
      newCells[1][1] === newCells[2][2]
    ) {
      return true;
    }

    if (
      newCells[0][2] &&
      newCells[0][2] === newCells[1][1] &&
      newCells[1][1] === newCells[2][0]
    ) {
      return true;
    }

    return false;
  };

  const isDrawStatus = (newCells) => {
    const isBoardFull = newCells.every((row) =>
      row.every((cell) => cell !== null)
    );

    if (isBoardFull) return true;

    return false;
  };

  return (
    <>
      <div className="title">
        <b>Tic Tac Toe</b>
      </div>
      <h2 className="player">Player: {currentPlayer}</h2>
      <AppContext.Provider
        value={{
          cells,
          setCells,
          gameStatus,
          setGameStatus,
          currentPlayer,
          setCurrentPlayer,
          pointsO,
          pointsX,
        }}
      >
        <Board onCellClick={handleCellClick} />

        <GameStatus />

        <Points />

        <Reset />
      </AppContext.Provider>
    </>
  );
}

export default App;
