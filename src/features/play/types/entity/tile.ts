export const tileStatuses = {
    normal: 'normal',
} as const

export type TileStatus = (typeof tileStatuses)[keyof typeof tileStatuses]

export type Tile = {
    _id?: number
    status?: TileStatus
    value?: string
    buck?: string
    created?: Date
    updated?: Date
}
