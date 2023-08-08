// props
// cells = array of size 3 each item is array of size 3
import { useContext } from "react";
import { AppContext } from "../../contexts/AppContext";
import Cell from "../../components/Cell/Cell.jsx";

export default function NewBoard() {
  const { cells } = useContext(AppContext);

  return (
    <div className="board">
      {cells.map((row, rowIndex) => (
        <div className="row" key={rowIndex}>
          {row.map((column, columnIndex) => (
            <Cell
              row={rowIndex}
              column={columnIndex}
              // value={column}
              key={columnIndex}
              // onClick={handleCellClick}
            />
          ))}
        </div>
      ))}
    </div>
  );
}
