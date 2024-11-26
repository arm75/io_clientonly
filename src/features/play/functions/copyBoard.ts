// import { Board } from '../types/entity/board'

// export default function copyBoard(board: Board): Board {
//     //const startTime = performance.now()
//     // set the board size and initialize a blank array to return
//     const boardSize = 18
//     const arrayToReturn = []
//     const status = 'normal'
//     const cells = board?.cells
//     // loop through the board, rows then cols
//     for (let rowCount = 0; rowCount <= boardSize - 1; rowCount++) {
//         // create an array to represent the cols in this row
//         const newCells = []
//         // for each col (each cell) in this row
//         for (let colCount = 0; colCount <= boardSize - 1; colCount++) {
//             if (cells) newCells.push({ ...cells[rowCount][colCount] })
//         }
//         //arrayToReturn.push(rowArrayToPush)
//     }
//     //const endTime = performance.now()
//     //console.log(`copyBoard Function took ${endTime - startTime} milliseconds.`)
//     //return arrayToReturn
//     return board
// }
