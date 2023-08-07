import "./Points.css";

export default function Points({ countX, countO }) {
  return (
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
  );
}
