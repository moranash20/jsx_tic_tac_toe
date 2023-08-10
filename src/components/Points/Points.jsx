import "./Points.css";
import { useContext } from "react";
import { AppContext } from "../../contexts/AppContext";

export default function Points({}) {
  const { pointsO, pointsX } = useContext(AppContext);

  return (
    <div className="points">
      <table>
        <th id="table_title"> Points </th>
        <tr className="table-head">
          <th> X </th>
          <th> O </th>
        </tr>
        <tr className="table-body">
          <td>{pointsX}</td>
          <td>{pointsO}</td>
        </tr>
      </table>
    </div>
  );
}
