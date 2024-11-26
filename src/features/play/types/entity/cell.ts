import { Tile } from './tile'

export const cellStatuses = {
    normal: 'normal',
} as const

export type CellStatus = (typeof cellStatuses)[keyof typeof cellStatuses]

export type Cell = {
    _id?: string
    status?: CellStatus
    row?: number
    col?: number
    tile?: Tile
    // tileValue?: Tile
    letterTile?: string
    cookie?: string
    cookieColor?: string
    created?: Date
    updated?: Date
}

export type CellSizeRepeater<T, N extends number, L extends T[] = []> = L['length'] extends N ? L : CellSizeRepeater<T, N, [...L, T]>

export type CellRow = CellSizeRepeater<Cell, 18>
