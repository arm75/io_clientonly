import { Tile } from './tile'

export const playerStatuses = {
    not_turn: 'not_turn',
    turn: 'turn',
} as const

export type PlayerStatus = (typeof playerStatuses)[keyof typeof playerStatuses]

export type Player = {
    _id?: string
    user?: string
    username?: string
    status?: PlayerStatus
    tiles?: Tile[]
    score?: string
    created?: Date
    updated?: Date
}
