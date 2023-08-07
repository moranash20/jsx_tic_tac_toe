import { useContext } from "react";
import { AppContext } from "../../contexts/AppContext";

export default function Cell({ row, column, value }) {
  const { setCells, setCurrentPlayer } = useContext(AppContext);

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
      {value}
    </div>
  );
}
