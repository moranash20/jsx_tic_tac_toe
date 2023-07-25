import { useState, useEffect } from "react";
import Cell from "./cell";
import Win from "./win"


//create bord
export default function Board() {
    const [cells, setCells] = useState([[null, null, null], [null, null, null], [null, null, null]]);
    const [currentPlayer, setCurrentPlayer] = useState('X');
    const [isWin, setIsWin] = useState(false);
    // const [winner, setWinner] = useState('');
    const [isDrawe, setIsDrawe] = useState(false);
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

    // const checkWinner = (newCells) => {
    //     // Check rows for a winner
    //     for (let row = 0; row < 3; row++) {
    //         if (
    //             newCells[row][0] &&
    //             newCells[row][0] === newCells[row][1] &&
    //             newCells[row][1] === newCells[row][2]
    //         ) {
    //             return newCells[row][0]
    //             // setWinner(player => player);
    //             // return;
    //         }
    //     }

    //     // Check columns for a winner
    //     for (let col = 0; col < 3; col++) {
    //         if (
    //             newCells[0][col] &&
    //             newCells[0][col] === newCells[1][col] &&
    //             newCells[1][col] === newCells[2][col]
    //         ) {
    //             // setWinner(newCells[0][col]);
    //             return newCells[0][col];
    //         }
    //     }

    //     // Check diagonals for a winner
    //     if (
    //         newCells[0][0] &&
    //         newCells[0][0] === newCells[1][1] &&
    //         newCells[1][1] === newCells[2][2]
    //     ) {
    //         // setWinner(newCells[0][0]);
    //         return newCells[0][0];
    //     }

    //     if (
    //         newCells[0][2] &&
    //         newCells[0][2] === newCells[1][1] &&
    //         newCells[1][1] === newCells[2][0]
    //     ) {
    //         setWinner(newCells[0][2]);
    //         return newCells[0][2];
    //     }

    // }

    const handleClick = (event, row, column) => {
        if (isWin) {
            return;
        }

        // if the cell is not selected already 
        if (cells[row][column] === null) {
            // update the cells
            const newCells = [...cells];
            newCells[row][column] = currentPlayer

            setCells(newCells);

            // setWinner(checkWinner(newCells))
            // if (winner === 'X' || winner === 'O') {
            //     setIsWin(true)
            // }
            `  `
            Object.values(winCombos).forEach(value => {
                if (value !== null) {
                    setIsWin(prev => !prev);
                    setShowFireworks(true);
                    setTimeout(() => setShowFireworks(false), 5000);
                    if (value === 'X') {
                        setCountX(countX + 1);
                    }
                    else if (value === 'O') {
                        setCountO(countO + 1);
                    }
                    else {
                        setIsDrawe(true);
                    }

                }
            });

            setCurrentPlayer(currentPlayer === 'X' ? 'O' : 'X');
        }
    }
    useEffect(() => {
        // Function to remove the fireworks after the animation duration
        if (showFireworks) {
            setTimeout(() => setShowFireworks(false), 1000);
        }
    }, [showFireworks]);

    const handleReset = () => {
        setCells([[null, null, null], [null, null, null], [null, null, null]]);
        setIsWin(false);
        setCurrentPlayer('X');
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
                <b>{isWin && 'win'}</b>
                {showFireworks && (
                    <div>
                        {/* Add multiple firework elements here to have multiple fireworks */}
                        <div className="firework" style={{ top: "50%", left: "50%" }}></div>
                    </div>
                )}
            </div>
            <p></p>
            <button className="reset" onClick={handleReset}>Reset Board</button>
        </>
    );
}

