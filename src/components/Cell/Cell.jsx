import { useContext } from "react";
import { AppContext } from "../../contexts/AppContext";
import { STATUSES } from "../../enums";

export default function Cell({ row, column, value }) {
  const { cells, setCells, currentPlayer, setCurrentPlayer, gameStatus } =
    useContext(AppContext);

  const handleClick = () => {
    if (gameStatus !== STATUSES["ACTIVE"]) return;

    if (typeof cells[row][column] === "string") return;

    setCells((previousState) => {
      return [...previousState, (previousState[row][column] = currentPlayer)];
    });

    setCurrentPlayer(currentPlayer === "X" ? "O" : "X");
  };

  return (
    <div className="cell" onClick={handleClick}>
      {cells[row][column]}
    </div>
  );
}
