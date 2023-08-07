import { useState } from "react";
import "./App.css";
import { AppContext } from "./contexts/AppContext";
import { STATUSES } from "./enums";
import NewBoard from "./components/NewBoard/NewBoard";
import Board from "./components/Board/Board.jsx";
import Points from "./components/Points/Points";
import Win from "./components/Win/Win";

function App() {
  const [currentPlayer, setCurrentPlayer] = useState("X");
  const [gameStatus, setGameStatus] = useState(STATUSES["ACTIVE"]);
  const [cells, setCells] = useState([
    [null, null, null],
    [null, null, null],
    [null, null, null],
  ]);

  // tell Points to add a point on win

  // tell Win(Status) who won

  return (
    <>
      <div className="title">
        <b>Tic Tac Toe</b>
      </div>
      <h2 className="player">Player: {currentPlayer}</h2>
      <AppContext.Provider
        value={{
          currentPlayer,
          setCurrentPlayer,
          gameStatus,
          setGameStatus,
          cells,
          setCells,
        }}
      >
        <NewBoard />

        {/* <Board
          currentPlayer={currentPlayer}
          onClick={() => setCurrentPlayer(currentPlayer === "X" ? "O" : "X")}
          gameStatus={gameStatus}
        /> */}
        {/* <Points /> */}
        {/* <Win /> this should be status */}
      </AppContext.Provider>
    </>
  );
}

export default App;
