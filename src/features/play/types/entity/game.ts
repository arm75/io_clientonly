import { Board } from './board'
import { Player } from './player'
import { Round } from './round'
import { Tile } from './tile'

export const gameStatuses = {
    pending: 'pending',
    started: 'started',
    complete: 'complete',
    cancelled: 'cancelled',
} as const

export type GameStatus = (typeof gameStatuses)[keyof typeof gameStatuses]

export type Game = {
    _id?: string
    creator?: string
    status?: GameStatus
    name?: string
    description?: string
    start?: Date
    stop?: Date
    gameRoom?: string
    chatRoom?: string
    hWords?: any
    vWords?: any
    players?: Player[]
    board?: Board
    tiles?: Tile[]
    rounds?: Round[]
    logs?: any
    created?: Date
    updated?: Date
}

export type NewGame = Pick<Game, 'name' & 'description'>
