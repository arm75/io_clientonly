import { CellRow, CellSizeRepeater } from './cell'

export const boardStatuses = {
    normal: 'normal',
} as const

export type BoardStatus = (typeof boardStatuses)[keyof typeof boardStatuses]

// type BoardSizeRepeater<T, N extends number, L extends T[] = []> = L['length'] extends N ? L : BoardSizeRepeater<T, N, [...L, T]>
// type BoardRow = BoardSizeRepeater<Cell, 18>

export type Board = {
    _id?: string
    status?: string
    //cells?: BoardSizeRepeater<BoardRow, 18>
    cells?: CellSizeRepeater<CellRow, 18>
    created?: Date
    updated?: Date
}
