import { Turn } from './turn'

export const roundStatuses = {
    pending: 'pending',
    started: 'started',
    complete: 'complete',
} as const

export type RoundStatus = (typeof roundStatuses)[keyof typeof roundStatuses]

export type Round = {
    _id?: string
    status?: RoundStatus
    start?: Date
    stop?: Date
    turns?: Turn[]
    created?: Date
    updated?: Date
}
