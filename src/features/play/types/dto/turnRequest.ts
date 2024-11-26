export type TurnRequestTile = {
    tileId: string
    value: string
    buck: string
    row: number
    col: number
}

export type TurnRequestPlay = {
    playStartTime: Date
    playStopTime: Date
    tilesPlayed: TurnRequestTile[]
}

export type TurnRequest = {
    playingStartTime: Date
    submitTime?: Date
    plays?: TurnRequestPlay[]
}
