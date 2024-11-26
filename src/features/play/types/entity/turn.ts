import { Play } from './play'

export const turnStatuses = {
    pending: 'pending',
    started: 'started',
    complete: 'complete',
} as const

export type TurnStatus = (typeof turnStatuses)[keyof typeof turnStatuses]

export type Turn = {
    _id?: string
    player?: string
    status?: TurnStatus
    start?: Date
    stop?: Date
    plays?: Play[]
    created?: Date
    updated?: Date
}
