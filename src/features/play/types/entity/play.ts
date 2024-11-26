export const playStatuses = {
    pending: 'pending',
    accepted: 'accepted',
    rejected: 'rejected',
} as const

export type PlayStatus = (typeof playStatuses)[keyof typeof playStatuses]

export const playTypes = {
    normal: 'normal',
} as const

export type PlayType = (typeof playTypes)[keyof typeof playTypes]

export type Play = {
    _id?: string
    game?: string
    player?: string
    status?: PlayStatus
    start?: Date
    stop?: Date
    type?: PlayType
    data?: object
    created?: Date
    updated?: Date
}

export type NewPlay = Pick<Play, '_game' & 'type' & 'data'>
