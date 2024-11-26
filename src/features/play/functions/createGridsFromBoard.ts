// import { Board } from '../types/entity/board'

// export default function createStringGridsFromBoardObj(board: Board): { hGrid: string[]; vGrid: string[] } {
//     const createHGrid = (board: Board): string[] => {
//         const hGrid: string[] = []
//         const cells = board?.cells
//         cells?.map((row) => {
//             let rowString = ''
//             row.map((cell) => {
//                 if (cell.letterTile) {
//                     rowString = rowString + cell.letterTile
//                 } else {
//                     rowString = rowString + '*'
//                 }
//             })
//             hGrid.push(rowString)
//         })
//         return hGrid
//     }

//     const rotateGrid90DegreesLeft = (grid: string[]): string[] => {
//         const gridSize = grid.length // 18 in your case

//         const newGrid: string[] = []

//         for (let i = 0; i < gridSize; i++) {
//             let newRow = ''
//             for (let j = 0; j < gridSize; j++) {
//                 newRow += grid[j][i]
//             }
//             newGrid.unshift(newRow) // unshift to reverse the order
//         }

//         return newGrid
//     }

//     const hGrid: string[] = createHGrid(board)

//     const vGrid: string[] = rotateGrid90DegreesLeft(hGrid)

//     return { hGrid, vGrid }
// }
