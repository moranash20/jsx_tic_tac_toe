import "./GameStatus.css";
import { useContext } from "react";
import { AppContext } from "../../contexts/AppContext";
import { STATUSES } from "../../enums";

export default function GameStatus() {
  const { gameStatus, currentPlayer, setCurrentPlayer } =
    useContext(AppContext);

  if (gameStatus !== STATUSES["ACTIVE"]) {
    setCurrentPlayer((prevPlayer) => (prevPlayer = currentPlayer));
  }

  return (
    <div className={`status ${gameStatus}`}>
      {gameStatus === STATUSES["WIN"] ? `${currentPlayer} Win!!!` : null}
      {gameStatus === STATUSES["DRAW"] ? "Draw!!!" : null}
      {gameStatus === STATUSES["ACTIVE"] ? "Playing" : null}
    </div>
  );
}
