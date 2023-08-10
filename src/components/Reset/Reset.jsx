import "./Reset.css";
import { useContext } from "react";
import { AppContext } from "../../contexts/AppContext";
import { STATUSES } from "../../enums";

export default function Reset() {
  const { setCells, setCurrentPlayer, setGameStatus } = useContext(AppContext);

  const handleResetClick = () => {
    setGameStatus(STATUSES["ACTIVE"]);

    setCurrentPlayer("X");

    setCells([
      [null, null, null],
      [null, null, null],
      [null, null, null],
    ]);
  };

  return (
    <button className="reset" onClick={handleResetClick}>
      Reset
    </button>
  );
}
