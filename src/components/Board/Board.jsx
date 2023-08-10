import "./Board.css";
import { useContext } from "react";
import { AppContext } from "../../contexts/AppContext";
import Cell from "../Cell/Cell.jsx";

export default function Board({ onCellClick }) {
  const { cells } = useContext(AppContext);

  return (
    <div className="board">
      {cells.map((row, rowIndex) => (
        <div className="row" key={rowIndex}>
          {row.map((column, columnIndex) => (
            <Cell
              row={rowIndex}
              column={columnIndex}
              value={cells[rowIndex][columnIndex]}
              key={columnIndex}
              onClick={onCellClick}
            />
          ))}
        </div>
      ))}
    </div>
  );
}
