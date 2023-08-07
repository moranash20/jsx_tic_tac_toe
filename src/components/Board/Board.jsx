import { useState } from "react";
import Confetti from "react-confetti";
import ringer from "../../assets/winGame.mp3";
import Cell from "../Cell/Cell";
import Win from "../Win/Win";

//create board
export default function Board() {
  const [cells, setCells] = useState([
    [null, null, null],
    [null, null, null],
    [null, null, null],
  ]);
  const [currentPlayer, setCurrentPlayer] = useState("X");
  const [isWin, setIsWin] = useState(false);
  const [winner, setWinner] = useState("");
  const [isDraw, setIsDraw] = useState(false);
  const [countX, setCountX] = useState(0);
  const [countO, setCountO] = useState(0);

  const audio = new Audio(ringer);

  const checkWinner = (newCells) => {
    // Check rows for a winner
    for (let row = 0; row < 3; row++) {
      if (
        newCells[row][0] &&
        newCells[row][0] === newCells[row][1] &&
        newCells[row][1] === newCells[row][2]
      ) {
        setIsWin(true);
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
        setIsWin(true);
        return newCells[0][col];
      }
    }

    // Check diagonals for a winner
    if (
      newCells[0][0] &&
      newCells[0][0] === newCells[1][1] &&
      newCells[1][1] === newCells[2][2]
    ) {
      setIsWin(true);
      return newCells[0][0];
    }

    if (
      newCells[0][2] &&
      newCells[0][2] === newCells[1][1] &&
      newCells[1][1] === newCells[2][0]
    ) {
      setIsWin(true);
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
    //if win- disable click on the board
    if (isWin) {
      return;
    }

    // if the cell is not selected already
    if (cells[row][column] === null) {
      cells[row][column] = currentPlayer;

      setCells(cells);
      console.log(cells);

      let win = checkWinner(cells);
      setWinner(win);

      if (win === "X") {
        audio.play();
        setCountX(countX + 1);
      } else if (win === "O") {
        audio.play();
        setCountO(countO + 1);
      }

      setCurrentPlayer(currentPlayer === "X" ? "O" : "X");
    }
  };

  const handleResetClick = () => {
    setCells([
      [null, null, null],
      [null, null, null],
      [null, null, null],
    ]);
    setIsWin(false);
    setCurrentPlayer("X");
    setWinner("");
    setIsDraw(false);
  };

  return (
    <>
      <div className="title">
        <b>Tic Tac Toe</b>
      </div>
      <h2 className="player">Player: {currentPlayer}</h2>
      <div className="board">
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
        <div className="points">
          <table>
            <th id="table_title"> Points </th>
            <tr className="table-head">
              <th> X </th>
              <th> O </th>
            </tr>
            <tr className="table-body">
              <td>{countX}</td>
              <td>{countO}</td>
            </tr>
          </table>
        </div>
      </div>
      <div className="win">
        <b>
          {" "}
          {winner} {isWin && "win"}
          {isWin && <Confetti />}
        </b>
        <b className="draw">{isDraw && "Draw"}</b>
      </div>
      <p></p>
      <button className="reset" onClick={handleResetClick}>
        Reset Board
      </button>
    </>
  );
}
