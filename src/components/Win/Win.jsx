import Confetti from "react-confetti";
import "./Win.css";

export default function Win({ winner, isDraw }) {
  return (
    <div className="win">
      <b>
        {winner} {winner && "win"}
        {winner && <Confetti />}
      </b>
      <b className="draw">{isDraw && "Draw"}</b>
    </div>
  );
}
