import { useState } from "react";

import ringer from "../../assets/winGame.mp3";
import Cell from "../Cell/Cell";
import Win from "../Win/Win";
import Points from "../Points/Points";
import { STATUSES } from "../../enums";

//create board
export default function Board({ currentPlayer, onClick, gameStatus }) {
  //   const [cells, setCells] = useState([
  //     [null, null, null],
  //     [null, null, null],
  //     [null, null, null],
  //   ]);
  //   const [currentPlayer, setCurrentPlayer] = useState("X");
  //   const [isWin, setIsWin] = useState(false);
  //   const [prevPlayer, setPlayer] = useState(currentPlayer);
  //   const audio = new Audio(ringer);

  const checkWinner = (newCells) => {
    // Check rows for a winner
    for (let row = 0; row < 3; row++) {
      if (
        newCells[row][0] &&
        newCells[row][0] === newCells[row][1] &&
        newCells[row][1] === newCells[row][2]
      ) {
        isWin = true;
        // setIsWin(true);
        return newCells[row][0];
      }
    }

    // Check columns for a winner
    for (let col = 0; col < 3; col++) {
      if (
        newCells[0][col] &&
        newCells[0][col] === newCells[1][col] &&
        newCells[1][col] === newCells[2][col]
      ) {
        isWin = true;
        // setIsWin(true);
        return newCells[0][col];
      }
    }

    // Check diagonals for a winner
    if (
      newCells[0][0] &&
      newCells[0][0] === newCells[1][1] &&
      newCells[1][1] === newCells[2][2]
    ) {
      isWin = true;
      //   setIsWin(true);
      return newCells[0][0];
    }

    if (
      newCells[0][2] &&
      newCells[0][2] === newCells[1][1] &&
      newCells[1][1] === newCells[2][0]
    ) {
      isWin = true;
      //   setIsWin(true);
      return newCells[0][2];
    }

    // If no winner is found, check for a draw
    checkDraw(newCells);
  };

  const checkDraw = (newCells) => {
    const isBoardFull = newCells.every((row) =>
      row.every((cell) => cell !== null)
    );
    if (isBoardFull) {
      setIsDraw(true);
    }
  };

  const handleCellClick = (event, row, column) => {
    if (gameStatus !== STATUSES["ACTIVE"]) return;

    if (typeof cells[row][column] === "string") return;

    setCells((previousState) => {
      return [...previousState, (previousState[row][column] = currentPlayer)];
    });
  };

  // // if the cell is not selected already
  // if (cells[row][column] === null) {
  //   //   cells[row][column] = currentPlayer;

  //   setCells((previousState) => {
  //     return [...previousState, (previousState[row][column] = currentPlayer)];
  //   });

  //   let win = checkWinner(cells);
  //   setWinner(win);

  //   if (win === "X") {
  //     audio.play();
  //     setCountX(countX + 1);
  //   } else if (win === "O") {
  //     audio.play();
  //     setCountO(countO + 1);
  //   }
  //   cells;
  //   console.log(currentPlayer);
  //   if (prevPlayer === currentPlayer) setPlayer(currentPlayer);
  //   console.log("2");
  //   console.log(prevPlayer);
  //   console.log(currentPlayer);

  const handleResetClick = () => {
    setCells([
      [null, null, null],
      [null, null, null],
      [null, null, null],
    ]);
    isWin = false;
    // setIsWin(false);
    currentPlayer("X");
    setWinner("");
    setIsDraw(false);
  };

  return (
    <div className="board" onClick={onClick}>
      {cells.map((row, rowIndex) => {
        return (
          <div className="row" key={rowIndex}>
            {row.map((column, columnIndex) => {
              return (
                <Cell
                  row={rowIndex}
                  column={columnIndex}
                  value={column}
                  key={columnIndex}
                  onClick={handleCellClick}
                />
              );
            })}
          </div>
        );
      })}
    </div>
  );
}
