import "./Cell.css";

export default function Cell({ row, column, value, onClick }) {
  const handleClick = () => {
    onClick(row, column);
  };

  return (
    <div className="cell" onClick={handleClick}>
      {value}
    </div>
  );
}
