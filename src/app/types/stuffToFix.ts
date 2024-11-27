// import { Board } from '../../features/play/types/entity/board'
// import { Cell } from '../../features/play/types/entity/cell'
// import { Tile } from '../../features/play/types/entity/tile'

// export type TurnPlay = {
//     cells: Cell[]
//     start: any
//     end: any
//     tilesAfter: Tile[]
//     boardAfter: Board
// }

// export type PlayerTurn = {
//     plays: TurnPlay[]
//     start: any
//     end: any
// }

// export type WordFragment = {
//     word: string
// }

// export type TurnWordOperation = 'added' | 'morphed' | 'mutated' | 'moved' | 'removed'

// export type TurnWord = {
//     opId?: string
//     operation?: TurnWordOperation
//     orientation?: 'horizontal' | 'vertical'
//     rowOrCol?: number
//     word?: string
//     startIndex?: number
//     length?: number
//     isWord?: boolean
// }

// export type WordListWord = Omit<TurnWord, 'operation'>

// export type WordObj = Omit<TurnWord, 'operation' | 'opId' | 'orientation'>

// export type CellPlayed = {
//     letter?: string
//     row?: number
//     col?: number
// }

// export type WordPlay = {
//     playId?: string
//     wordFragment?: string
//     cells?: CellPlayed[]
//     board?: Board
//     newHWords?: TurnWord[]
//     newVWords?: TurnWord[]
// }

// export type TurnPlayNew = [
//     {
//         timestamp: string
//         cells: [
//             {
//                 row: number
//                 col: number
//                 value: string
//                 isBuck: boolean
//                 buckValue: string
//             }
//         ]
//         user: User
//         newHWords: TurnWord[]
//         newVWords: TurnWord[]
//         boardAfterPlay: Board
//         tilesAfterPlay: Tile[]
//     }
// ]
