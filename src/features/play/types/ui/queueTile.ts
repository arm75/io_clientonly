export const queueTileStatuses = {
    normal: 'normal',
    buck: 'buck',
} as const

export type QueueTileStatus = (typeof queueTileStatuses)[keyof typeof queueTileStatuses]

// QueueTiles are NOT stored in db. when a player's turn starts, all the sorting/pickup/etc is done with QueueTiles, not Tiles.
export type QueueTile = {
    id?: number // this is for ReactSortable, not the mongodb _id
    tile?: string
    status?: QueueTileStatus
    value?: string
    buck?: string
}
