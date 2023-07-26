import { useState} from "react";
import Cell from "./cell";
import Win from "./win"


//create bord
export default function Board() {
    const [cells, setCells] = useState([[null, null, null], [null, null, null], [null, null, null]]);
    const [currentPlayer, setCurrentPlayer] = useState('X');
    const [isWin, setIsWin] = useState(false);
    const [winner, setWinner] = useState('');
    const [isDraw, setIsDraw] = useState(false);
    const [countX, setCountX] = useState(0);
    const [countO, setCountO] = useState(0);
    const [showFireworks, setShowFireworks] = useState(false);

    let winCombo1 = cells[0][0] && cells[0][1] && cells[0][2]
    let winCombo2 = cells[1][0] && cells[1][1] && cells[1][2]
    let winCombo3 = cells[2][0] && cells[2][1] && cells[2][2]
    let winCombo4 = cells[0][0] && cells[1][0] && cells[2][0]
    let winCombo5 = cells[0][1] && cells[1][1] && cells[2][1]
    let winCombo6 = cells[0][2] && cells[1][2] && cells[2][2]
    let winCombo7 = cells[0][0] && cells[1][1] && cells[2][2]
    let winCombo8 = cells[0][2] && cells[1][1] && cells[2][0]

    let winCombos = {
        'firstRow': winCombo1,
        'secondRow': winCombo2,
        'thirdRow': winCombo3,
        'firstColumn': winCombo4,
        'secondColumn': winCombo5,
        'thirdColumn': winCombo6,
        'diagonal1': winCombo7,
        'diagonal2': winCombo8
        // { winCombo1: cells[0][0] && cells[0][1] && cells[0][2] },
        // { winCombo2: cells[1][0] && cells[1][1] && cells[1][2] },
        // { winCombo3: cells[2][0] && cells[2][1] && cells[2][2] },
        // { winCombo4: cells[0][0] && cells[1][0] && cells[2][0] },
        // { winCombo5: cells[0][1] && cells[1][1] && cells[2][1] },
        // { winCombo6: cells[0][2] && cells[1][2] && cells[2][2] },
        // { winCombo7: cells[0][0] && cells[1][1] && cells[2][2] },
        // { winCombo8: cells[0][2] && cells[1][1] && cells[2][0] },
    }

    const checkWinner = (newCells) => {
        // Check rows for a winner
        for (let row = 0; row < 3; row++) {
            if (
                newCells[row][0] &&
                newCells[row][0] === newCells[row][1] &&
                newCells[row][1] === newCells[row][2]
            ) {
                setIsWin(true);
                return newCells[row][0]
                // setWinner(player => player);
                // return;
            }
        }

        // Check columns for a winner
        for (let col = 0; col < 3; col++) {
            if (
                newCells[0][col] &&
                newCells[0][col] === newCells[1][col] &&
                newCells[1][col] === newCells[2][col]
            ) {
                // setWinner(newCells[0][col]);
                setIsWin(true);
                return newCells[0][col];
            }
        }

        // Check diagonals for a winner
        if (
            newCells[0][0] &&
            newCells[0][0] === newCells[1][1] &&
            newCells[1][1] === newCells[2][2]
        ) {
            // setWinner(newCells[0][0]);
            setIsWin(true);
            return newCells[0][0];
        }

        if (
            newCells[0][2] &&
            newCells[0][2] === newCells[1][1] &&
            newCells[1][1] === newCells[2][0]
        ) {
            // setWinner(newCells[0][2]);
            setIsWin(true);
            return newCells[0][2];
        }
        // If no winner is found, check for a draw
        checkDraw(newCells);
    }

    const checkDraw = (newCells) => {
        const isBoardFull = newCells.every(row => row.every(cell => cell !== null));
        if (isBoardFull) {
            setIsDraw(true);
        }
      };

    const handleClick = (event, row, column) => {
        //if win- disable click on the board
        if (isWin) {
            return;
        }

        // if the cell is not selected already 
        if (cells[row][column] === null) {
            cells[row][column] = currentPlayer

            setCells(cells);
            console.log(cells);

            let win = checkWinner(cells);
            setWinner(win);
            if (win === 'X') {
                setCountX(countX + 1);
            }
            else if(win === 'O'){
                setCountO(countO + 1);
            }

            setCurrentPlayer(currentPlayer === 'X' ? 'O' : 'X');
        }
    }

    const handleReset = () => {
        setCells([[null, null, null], [null, null, null], [null, null, null]]);
        setIsWin(false);
        setCurrentPlayer('X');
        setWinner('');
        setIsDraw(false)
    }

    return (
        <>
        
            <div className="title">
                <b>Tic Tac Toe</b>
            </div>
            <div className="player">Next Player: {currentPlayer}</div>
            <div className="board">
                {
                    cells.map((row, rowIndex) => {
                        return <div className="row" key={rowIndex}>
                            {row.map((column, columnIndex) => {
                                return <Cell row={rowIndex} column={columnIndex} value={column} key={columnIndex} onClick={handleClick} />
                            })}
                        </div>
                    })}
                <div className="points">
                    <table >
                        <th id="table_title"> Points </th>
                        <tr>
                            <th> X </th>
                            <th> O </th>
                        </tr>
                        <tr>
                            <td>{countX}</td>
                            <td>{countO}</td>
                        </tr>
                    </table>
                </div>
            </div>
            <div className="win">            
                <b> {winner } {winner && isWin && 'win '} </b>
                <b className="draw">{isDraw && 'Draw'}</b>
            </div>
            <p></p>
            <button className="reset" onClick={handleReset}>Reset Board</button>
        </>
    );
}

