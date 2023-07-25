import { useState } from "react"

export default function Win(row, column, value, columnValue) {
    const [win, setWin] = useState('draw')

    console.log('win')
    console.log('row', row)
    console.log('column', column)
    console.log('value', value)
    console.log('row.value', row.value)
    // console.log('row.row', row.row)

    let count = 0;

    // row.row.forEach(index => {
    //     console.log(index)
    // })

    row.value.forEach(val => {
        console.log('val', val)
        console.log('currentPlayer', row.currentPlayer)
        if (val !== row.currentPlayer) {
            count = count + 1;
            console.log('count', count);
            if (count === 3) {
                // setWin('win')
                console.log(val, ' win!!!!');
                return val;
            }
        }
    })

    // column.columnValue.forEach(val => {
    //     console.log('val', val)
    //     console.log('currentPlayer', column.currentPlayer)
    //     if (val !== 'undefined') {
    //         if (val !== column.currentPlayer) {
    //             count = count + 1;
    //             console.log('count', count);
    //             if (count === 3) {
    //                 console.log(val, 'win!!!!');
    //                 return val;
    //             }
    //         }
    //     }

    // })


    return (
        <div>
            {value} WIN!!!
        </div>
    );
}