export default function Cell({ row, column, value, onClick }) {
    return (
        <div className="cell" onClick={(event) => {
            onClick(event, row, column)
        }}>
            {value}
        </div>
    );

}