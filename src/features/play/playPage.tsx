import { ReactElement, useEffect, useCallback, useMemo, useState } from 'react'
import { useAtom } from 'jotai'
import RenderBoard from './components/display/renderBoard'
import { Player, PlayerStatus } from './types/entity/player'
import { Button } from '../../app/components/shadcn/ui/button'
import TurnScoreTable from './components/display/turnScoreTable'
import { GameStatus } from './types/entity/game'
import RenderSortableTiles from './components/display/renderSortableTiles'
import RenderPickupQueue from './components/display/renderPickupQueue'
import { useTurnQueues } from './state/hooks/useTurnQueues'
import { Tile, TileStatus } from './types/entity/tile'
import { QueueTile } from './types/ui/queueTile'
import { turnRequestAtom } from './state/atoms/turnRequest'
import { TurnRequest } from './types/dto/turnRequest'
import PickedUpTiles from './components/display/pickedUpTiles.tsx'
import { useBoard } from './state/hooks/useBoard.ts'
import { useGameUi } from './state/hooks/useGameUi.ts'
import RenderBuckInput from './components/display/renderBuckInput.tsx'
import { BoardStatus } from './types/entity/board.ts'
import { CellStatus } from './types/entity/cell.ts'

const RENDER_LOG = import.meta.env.VITE_APP_RENDER_LOG

const authTemp = {
    _id: '6674942b0e1aa0f662dc3efc',
    currentGameId: '674222cca2bccaa21775b0e0',
}

const gameTemp = {
    _id: '674222cca2bccaa21775b0e0',
    creator: '6674942b0e1aa0f662dc3efc',
    status: 'started' as GameStatus,
    name: 'TestGame2',
    description: 'Hello game',
    gameRoom: '32e52a72-6bcf-41a1-b80e-90a29a6c0b73',
    chatRoom: '4ed176d8-afe0-4df5-9b90-2e7a7ec75115',
    hWords: '',
    vWords: '',
    players: [
        {
            user: '6674942b0e1aa0f662dc3efc',
            status: 'turn' as PlayerStatus,
            username: 'admin',
            tiles: [
                {
                    status: 'normal' as TileStatus,
                    value: '1',
                    buck: '',
                    _id: '674222cca2bccaa21775b0e2',
                    created: '2024-11-23T18:45:32.712Z',
                    updated: '2024-11-23T18:45:32.712Z',
                },
                {
                    status: 'normal' as TileStatus,
                    value: 'S',
                    buck: '',
                    _id: '674222cca2bccaa21775b0e3',
                    created: '2024-11-23T18:45:32.713Z',
                    updated: '2024-11-23T18:45:32.713Z',
                },
                {
                    status: 'normal' as TileStatus,
                    value: 'P',
                    buck: '',
                    _id: '674222cca2bccaa21775b0e4',
                    created: '2024-11-23T18:45:32.713Z',
                    updated: '2024-11-23T18:45:32.713Z',
                },
                {
                    status: 'normal' as TileStatus,
                    value: 'E',
                    buck: '',
                    _id: '674222cca2bccaa21775b0e5',
                    created: '2024-11-23T18:45:32.713Z',
                    updated: '2024-11-23T18:45:32.713Z',
                },
                {
                    status: 'normal' as TileStatus,
                    value: 'I',
                    buck: '',
                    _id: '674222cca2bccaa21775b0e6',
                    created: '2024-11-23T18:45:32.714Z',
                    updated: '2024-11-23T18:45:32.714Z',
                },
                {
                    status: 'normal' as TileStatus,
                    value: 'T',
                    buck: '',
                    _id: '674222cca2bccaa21775b0e7',
                    created: '2024-11-23T18:45:32.714Z',
                    updated: '2024-11-23T18:45:32.714Z',
                },
                {
                    status: 'normal' as TileStatus,
                    value: 'T',
                    buck: '',
                    _id: '674222cca2bccaa21775b0e8',
                    created: '2024-11-23T18:45:32.714Z',
                    updated: '2024-11-23T18:45:32.714Z',
                },
                {
                    status: 'normal' as TileStatus,
                    value: 'T',
                    buck: '',
                    _id: '674222cca2bccaa21775b0e9',
                    created: '2024-11-23T18:45:32.714Z',
                    updated: '2024-11-23T18:45:32.714Z',
                },
            ],
            score: 0,
            _id: '674222cca2bccaa21775b0e1',
            created: '2024-11-23T18:45:32.714Z',
            updated: '2024-11-23T18:45:55.290Z',
        },
        {
            user: '67421f9c89c1deba3996c99f',
            status: 'not_turn' as PlayerStatus,
            username: 'panda',
            tiles: [
                {
                    status: 'normal' as TileStatus,
                    value: 'N',
                    buck: '',
                    _id: '674222cca2bccaa21775b287',
                    created: '2024-11-23T18:45:32.721Z',
                    updated: '2024-11-23T18:45:32.721Z',
                },
                {
                    status: 'normal' as TileStatus,
                    value: 'I',
                    buck: '',
                    _id: '674222cca2bccaa21775b286',
                    created: '2024-11-23T18:45:32.721Z',
                    updated: '2024-11-23T18:45:32.721Z',
                },
                {
                    status: 'normal' as TileStatus,
                    value: 'G',
                    buck: '',
                    _id: '674222cca2bccaa21775b285',
                    created: '2024-11-23T18:45:32.721Z',
                    updated: '2024-11-23T18:45:32.721Z',
                },
                {
                    status: 'normal' as TileStatus,
                    value: 'A',
                    buck: '',
                    _id: '674222cca2bccaa21775b284',
                    created: '2024-11-23T18:45:32.721Z',
                    updated: '2024-11-23T18:45:32.721Z',
                },
                {
                    status: 'normal' as TileStatus,
                    value: 'H',
                    buck: '',
                    _id: '674222cca2bccaa21775b283',
                    created: '2024-11-23T18:45:32.721Z',
                    updated: '2024-11-23T18:45:32.721Z',
                },
                {
                    status: 'normal' as TileStatus,
                    value: 'I',
                    buck: '',
                    _id: '674222cca2bccaa21775b282',
                    created: '2024-11-23T18:45:32.720Z',
                    updated: '2024-11-23T18:45:32.720Z',
                },
                {
                    status: 'normal' as TileStatus,
                    value: '2',
                    buck: '',
                    _id: '674222cca2bccaa21775b281',
                    created: '2024-11-23T18:45:32.720Z',
                    updated: '2024-11-23T18:45:32.720Z',
                },
                {
                    status: 'normal' as TileStatus,
                    value: 'E',
                    buck: '',
                    _id: '674222cca2bccaa21775b280',
                    created: '2024-11-23T18:45:32.720Z',
                    updated: '2024-11-23T18:45:32.720Z',
                },
            ],
            score: 0,
            _id: '674222daa2bccaa21775b57d',
            created: '2024-11-23T18:45:46.409Z',
            updated: '2024-11-23T18:45:46.409Z',
        },
    ],
    board: {
        status: 'normal' as BoardStatus,
        cells: [
            [
                { status: 'normal' as CellStatus, row: 1, col: 1, tile: null, cookie: 'ten', cookieColor: 'red', _id: '674222cca2bccaa21775b0eb' },
                { status: 'normal' as CellStatus, row: 1, col: 3, tile: null, cookie: 'one', cookieColor: 'red', _id: '674222cca2bccaa21775b0ed' },
                { status: 'normal' as CellStatus, row: 1, col: 5, tile: null, cookie: '', cookieColor: '', _id: '674222cca2bccaa21775b0ef' },
                { status: 'normal' as CellStatus, row: 1, col: 4, tile: null, cookie: '', cookieColor: '', _id: '674222cca2bccaa21775b0ee' },
                { status: 'normal' as CellStatus, row: 1, col: 6, tile: null, cookie: '', cookieColor: '', _id: '674222cca2bccaa21775b0f0' },
                { status: 'normal' as CellStatus, row: 1, col: 7, tile: null, cookie: 'three', cookieColor: 'blue', _id: '674222cca2bccaa21775b0f1' },
                { status: 'normal' as CellStatus, row: 1, col: 8, tile: null, cookie: '', cookieColor: '', _id: '674222cca2bccaa21775b0f2' },
                { status: 'normal' as CellStatus, row: 1, col: 9, tile: null, cookie: '', cookieColor: '', _id: '674222cca2bccaa21775b0f3' },
                { status: 'normal' as CellStatus, row: 1, col: 10, tile: null, cookie: '', cookieColor: '', _id: '674222cca2bccaa21775b0f4' },
                { status: 'normal' as CellStatus, row: 1, col: 11, tile: null, cookie: '', cookieColor: '', _id: '674222cca2bccaa21775b0f5' },
                { status: 'normal' as CellStatus, row: 1, col: 2, tile: null, cookie: 'spinner', cookieColor: 'gold', _id: '674222cca2bccaa21775b0ec' },
                { status: 'normal' as CellStatus, row: 1, col: 12, tile: null, cookie: '', cookieColor: '', _id: '674222cca2bccaa21775b0f6' },
                { status: 'normal' as CellStatus, row: 1, col: 13, tile: null, cookie: '', cookieColor: '', _id: '674222cca2bccaa21775b0f7' },
                { status: 'normal' as CellStatus, row: 1, col: 14, tile: null, cookie: 'five', cookieColor: 'gold', _id: '674222cca2bccaa21775b0f8' },
                { status: 'normal' as CellStatus, row: 1, col: 15, tile: null, cookie: 'one', cookieColor: 'red', _id: '674222cca2bccaa21775b0f9' },
                { status: 'normal' as CellStatus, row: 1, col: 16, tile: null, cookie: '', cookieColor: '', _id: '674222cca2bccaa21775b0fa' },
                { status: 'normal' as CellStatus, row: 1, col: 17, tile: null, cookie: 'five', cookieColor: 'blue', _id: '674222cca2bccaa21775b0fb' },
                { status: 'normal' as CellStatus, row: 1, col: 18, tile: null, cookie: 'spinner', cookieColor: 'red', _id: '674222cca2bccaa21775b0fc' },
            ],
            [
                { status: 'normal' as CellStatus, row: 2, col: 1, tile: null, cookie: '', cookieColor: '', _id: '674222cca2bccaa21775b0fd' },
                { status: 'normal' as CellStatus, row: 2, col: 2, tile: null, cookie: '', cookieColor: '', _id: '674222cca2bccaa21775b0fe' },
                { status: 'normal' as CellStatus, row: 2, col: 3, tile: null, cookie: '', cookieColor: '', _id: '674222cca2bccaa21775b0ff' },
                { status: 'normal' as CellStatus, row: 2, col: 5, tile: null, cookie: 'three', cookieColor: 'red', _id: '674222cca2bccaa21775b101' },
                { status: 'normal' as CellStatus, row: 2, col: 6, tile: null, cookie: '', cookieColor: '', _id: '674222cca2bccaa21775b102' },
                { status: 'normal' as CellStatus, row: 2, col: 7, tile: null, cookie: '', cookieColor: '', _id: '674222cca2bccaa21775b103' },
                { status: 'normal' as CellStatus, row: 2, col: 8, tile: null, cookie: '', cookieColor: '', _id: '674222cca2bccaa21775b104' },
                { status: 'normal' as CellStatus, row: 2, col: 4, tile: null, cookie: 'ten', cookieColor: 'gold', _id: '674222cca2bccaa21775b100' },
                { status: 'normal' as CellStatus, row: 2, col: 9, tile: null, cookie: '', cookieColor: '', _id: '674222cca2bccaa21775b105' },
                { status: 'normal' as CellStatus, row: 2, col: 10, tile: null, cookie: '', cookieColor: '', _id: '674222cca2bccaa21775b106' },
                { status: 'normal' as CellStatus, row: 2, col: 11, tile: null, cookie: 'arrow', cookieColor: 'blue', _id: '674222cca2bccaa21775b107' },
                { status: 'normal' as CellStatus, row: 2, col: 12, tile: null, cookie: 'arrow', cookieColor: 'red', _id: '674222cca2bccaa21775b108' },
                { status: 'normal' as CellStatus, row: 2, col: 13, tile: null, cookie: '', cookieColor: '', _id: '674222cca2bccaa21775b109' },
                { status: 'normal' as CellStatus, row: 2, col: 14, tile: null, cookie: 'one', cookieColor: 'blue', _id: '674222cca2bccaa21775b10a' },
                { status: 'normal' as CellStatus, row: 2, col: 15, tile: null, cookie: 'spinner', cookieColor: 'red', _id: '674222cca2bccaa21775b10b' },
                { status: 'normal' as CellStatus, row: 2, col: 16, tile: null, cookie: 'arrow', cookieColor: 'blue', _id: '674222cca2bccaa21775b10c' },
                { status: 'normal' as CellStatus, row: 2, col: 17, tile: null, cookie: 'ten', cookieColor: 'gold', _id: '674222cca2bccaa21775b10d' },
                { status: 'normal' as CellStatus, row: 2, col: 18, tile: null, cookie: 'three', cookieColor: 'gold', _id: '674222cca2bccaa21775b10e' },
            ],
            [
                { status: 'normal' as CellStatus, row: 3, col: 1, tile: null, cookie: 'spinner', cookieColor: 'red', _id: '674222cca2bccaa21775b10f' },
                { status: 'normal' as CellStatus, row: 3, col: 2, tile: null, cookie: '', cookieColor: '', _id: '674222cca2bccaa21775b110' },
                { status: 'normal' as CellStatus, row: 3, col: 3, tile: null, cookie: '', cookieColor: '', _id: '674222cca2bccaa21775b111' },
                { status: 'normal' as CellStatus, row: 3, col: 4, tile: null, cookie: '', cookieColor: '', _id: '674222cca2bccaa21775b112' },
                { status: 'normal' as CellStatus, row: 3, col: 5, tile: null, cookie: '', cookieColor: '', _id: '674222cca2bccaa21775b113' },
                { status: 'normal' as CellStatus, row: 3, col: 6, tile: null, cookie: '', cookieColor: '', _id: '674222cca2bccaa21775b114' },
                { status: 'normal' as CellStatus, row: 3, col: 7, tile: null, cookie: '', cookieColor: '', _id: '674222cca2bccaa21775b115' },
                { status: 'normal' as CellStatus, row: 3, col: 8, tile: null, cookie: '', cookieColor: '', _id: '674222cca2bccaa21775b116' },
                { status: 'normal' as CellStatus, row: 3, col: 9, tile: null, cookie: 'ten', cookieColor: 'blue', _id: '674222cca2bccaa21775b117' },
                { status: 'normal' as CellStatus, row: 3, col: 10, tile: null, cookie: '', cookieColor: '', _id: '674222cca2bccaa21775b118' },
                { status: 'normal' as CellStatus, row: 3, col: 11, tile: null, cookie: 'arrow', cookieColor: 'gold', _id: '674222cca2bccaa21775b119' },
                { status: 'normal' as CellStatus, row: 3, col: 12, tile: null, cookie: '', cookieColor: '', _id: '674222cca2bccaa21775b11a' },
                { status: 'normal' as CellStatus, row: 3, col: 13, tile: null, cookie: '', cookieColor: '', _id: '674222cca2bccaa21775b11b' },
                { status: 'normal' as CellStatus, row: 3, col: 14, tile: null, cookie: '', cookieColor: '', _id: '674222cca2bccaa21775b11c' },
                { status: 'normal' as CellStatus, row: 3, col: 15, tile: null, cookie: 'three', cookieColor: 'gold', _id: '674222cca2bccaa21775b11d' },
                { status: 'normal' as CellStatus, row: 3, col: 16, tile: null, cookie: '', cookieColor: '', _id: '674222cca2bccaa21775b11e' },
                { status: 'normal' as CellStatus, row: 3, col: 17, tile: null, cookie: '', cookieColor: '', _id: '674222cca2bccaa21775b11f' },
                { status: 'normal' as CellStatus, row: 3, col: 18, tile: null, cookie: '', cookieColor: '', _id: '674222cca2bccaa21775b120' },
            ],
            [
                { status: 'normal' as CellStatus, row: 4, col: 1, tile: null, cookie: 'five', cookieColor: 'gold', _id: '674222cca2bccaa21775b121' },
                { status: 'normal' as CellStatus, row: 4, col: 2, tile: null, cookie: '', cookieColor: '', _id: '674222cca2bccaa21775b122' },
                { status: 'normal' as CellStatus, row: 4, col: 3, tile: null, cookie: '', cookieColor: '', _id: '674222cca2bccaa21775b123' },
                { status: 'normal' as CellStatus, row: 4, col: 4, tile: null, cookie: '', cookieColor: '', _id: '674222cca2bccaa21775b124' },
                { status: 'normal' as CellStatus, row: 4, col: 5, tile: null, cookie: '', cookieColor: '', _id: '674222cca2bccaa21775b125' },
                { status: 'normal' as CellStatus, row: 4, col: 6, tile: null, cookie: 'arrow', cookieColor: 'gold', _id: '674222cca2bccaa21775b126' },
                { status: 'normal' as CellStatus, row: 4, col: 7, tile: null, cookie: '', cookieColor: '', _id: '674222cca2bccaa21775b127' },
                { status: 'normal' as CellStatus, row: 4, col: 8, tile: null, cookie: '', cookieColor: '', _id: '674222cca2bccaa21775b128' },
                { status: 'normal' as CellStatus, row: 4, col: 9, tile: null, cookie: '', cookieColor: '', _id: '674222cca2bccaa21775b129' },
                { status: 'normal' as CellStatus, row: 4, col: 10, tile: null, cookie: 'arrow', cookieColor: 'red', _id: '674222cca2bccaa21775b12a' },
                { status: 'normal' as CellStatus, row: 4, col: 11, tile: null, cookie: 'spinner', cookieColor: 'gold', _id: '674222cca2bccaa21775b12b' },
                { status: 'normal' as CellStatus, row: 4, col: 12, tile: null, cookie: '', cookieColor: '', _id: '674222cca2bccaa21775b12c' },
                { status: 'normal' as CellStatus, row: 4, col: 13, tile: null, cookie: '', cookieColor: '', _id: '674222cca2bccaa21775b12d' },
                { status: 'normal' as CellStatus, row: 4, col: 14, tile: null, cookie: '', cookieColor: '', _id: '674222cca2bccaa21775b12e' },
                { status: 'normal' as CellStatus, row: 4, col: 15, tile: null, cookie: '', cookieColor: '', _id: '674222cca2bccaa21775b12f' },
                { status: 'normal' as CellStatus, row: 4, col: 16, tile: null, cookie: '', cookieColor: '', _id: '674222cca2bccaa21775b130' },
                { status: 'normal' as CellStatus, row: 4, col: 17, tile: null, cookie: '', cookieColor: '', _id: '674222cca2bccaa21775b131' },
                { status: 'normal' as CellStatus, row: 4, col: 18, tile: null, cookie: '', cookieColor: '', _id: '674222cca2bccaa21775b132' },
            ],
            [
                { status: 'normal' as CellStatus, row: 5, col: 1, tile: null, cookie: 'arrow', cookieColor: 'blue', _id: '674222cca2bccaa21775b133' },
                { status: 'normal' as CellStatus, row: 5, col: 2, tile: null, cookie: '', cookieColor: '', _id: '674222cca2bccaa21775b134' },
                { status: 'normal' as CellStatus, row: 5, col: 3, tile: null, cookie: 'three', cookieColor: 'red', _id: '674222cca2bccaa21775b135' },
                { status: 'normal' as CellStatus, row: 5, col: 4, tile: null, cookie: '', cookieColor: '', _id: '674222cca2bccaa21775b136' },
                { status: 'normal' as CellStatus, row: 5, col: 5, tile: null, cookie: '', cookieColor: '', _id: '674222cca2bccaa21775b137' },
                { status: 'normal' as CellStatus, row: 5, col: 6, tile: null, cookie: '', cookieColor: '', _id: '674222cca2bccaa21775b138' },
                { status: 'normal' as CellStatus, row: 5, col: 7, tile: null, cookie: '', cookieColor: '', _id: '674222cca2bccaa21775b139' },
                { status: 'normal' as CellStatus, row: 5, col: 8, tile: null, cookie: '', cookieColor: '', _id: '674222cca2bccaa21775b13a' },
                { status: 'normal' as CellStatus, row: 5, col: 9, tile: null, cookie: '', cookieColor: '', _id: '674222cca2bccaa21775b13b' },
                { status: 'normal' as CellStatus, row: 5, col: 10, tile: null, cookie: '', cookieColor: '', _id: '674222cca2bccaa21775b13c' },
                { status: 'normal' as CellStatus, row: 5, col: 11, tile: null, cookie: 'spinner', cookieColor: 'blue', _id: '674222cca2bccaa21775b13d' },
                { status: 'normal' as CellStatus, row: 5, col: 12, tile: null, cookie: '', cookieColor: '', _id: '674222cca2bccaa21775b13e' },
                { status: 'normal' as CellStatus, row: 5, col: 13, tile: null, cookie: '', cookieColor: '', _id: '674222cca2bccaa21775b13f' },
                { status: 'normal' as CellStatus, row: 5, col: 14, tile: null, cookie: '', cookieColor: '', _id: '674222cca2bccaa21775b140' },
                { status: 'normal' as CellStatus, row: 5, col: 15, tile: null, cookie: '', cookieColor: '', _id: '674222cca2bccaa21775b141' },
                { status: 'normal' as CellStatus, row: 5, col: 16, tile: null, cookie: 'ten', cookieColor: 'blue', _id: '674222cca2bccaa21775b142' },
                { status: 'normal' as CellStatus, row: 5, col: 17, tile: null, cookie: '', cookieColor: '', _id: '674222cca2bccaa21775b143' },
                { status: 'normal' as CellStatus, row: 5, col: 18, tile: null, cookie: '', cookieColor: '', _id: '674222cca2bccaa21775b144' },
            ],
            [
                { status: 'normal' as CellStatus, row: 6, col: 1, tile: null, cookie: 'arrow', cookieColor: 'blue', _id: '674222cca2bccaa21775b145' },
                { status: 'normal' as CellStatus, row: 6, col: 2, tile: null, cookie: 'ten', cookieColor: 'red', _id: '674222cca2bccaa21775b146' },
                { status: 'normal' as CellStatus, row: 6, col: 3, tile: null, cookie: '', cookieColor: '', _id: '674222cca2bccaa21775b147' },
                { status: 'normal' as CellStatus, row: 6, col: 4, tile: null, cookie: '', cookieColor: '', _id: '674222cca2bccaa21775b148' },
                { status: 'normal' as CellStatus, row: 6, col: 5, tile: null, cookie: 'five', cookieColor: 'blue', _id: '674222cca2bccaa21775b149' },
                { status: 'normal' as CellStatus, row: 6, col: 6, tile: null, cookie: '', cookieColor: '', _id: '674222cca2bccaa21775b14a' },
                { status: 'normal' as CellStatus, row: 6, col: 7, tile: null, cookie: 'spinner', cookieColor: 'gold', _id: '674222cca2bccaa21775b14b' },
                { status: 'normal' as CellStatus, row: 6, col: 8, tile: null, cookie: 'spinner', cookieColor: 'blue', _id: '674222cca2bccaa21775b14c' },
                { status: 'normal' as CellStatus, row: 6, col: 9, tile: null, cookie: '', cookieColor: '', _id: '674222cca2bccaa21775b14d' },
                { status: 'normal' as CellStatus, row: 6, col: 10, tile: null, cookie: '', cookieColor: '', _id: '674222cca2bccaa21775b14e' },
                { status: 'normal' as CellStatus, row: 6, col: 11, tile: null, cookie: '', cookieColor: '', _id: '674222cca2bccaa21775b14f' },
                { status: 'normal' as CellStatus, row: 6, col: 12, tile: null, cookie: '', cookieColor: '', _id: '674222cca2bccaa21775b150' },
                { status: 'normal' as CellStatus, row: 6, col: 13, tile: null, cookie: 'spinner', cookieColor: 'gold', _id: '674222cca2bccaa21775b151' },
                { status: 'normal' as CellStatus, row: 6, col: 14, tile: null, cookie: '', cookieColor: '', _id: '674222cca2bccaa21775b152' },
                { status: 'normal' as CellStatus, row: 6, col: 15, tile: null, cookie: 'one', cookieColor: 'gold', _id: '674222cca2bccaa21775b153' },
                { status: 'normal' as CellStatus, row: 6, col: 16, tile: null, cookie: '', cookieColor: '', _id: '674222cca2bccaa21775b154' },
                { status: 'normal' as CellStatus, row: 6, col: 17, tile: null, cookie: '', cookieColor: '', _id: '674222cca2bccaa21775b155' },
                { status: 'normal', row: 6, col: 18, tile: null, cookie: '', cookieColor: '', _id: '674222cca2bccaa21775b156' },
            ],
            [
                { status: 'normal' as CellStatus, row: 7, col: 1, tile: null, cookie: 'ten', cookieColor: 'blue', _id: '674222cca2bccaa21775b157' },
                { status: 'normal' as CellStatus, row: 7, col: 2, tile: null, cookie: 'five', cookieColor: 'red', _id: '674222cca2bccaa21775b158' },
                { status: 'normal' as CellStatus, row: 7, col: 3, tile: null, cookie: '', cookieColor: '', _id: '674222cca2bccaa21775b159' },
                { status: 'normal' as CellStatus, row: 7, col: 4, tile: null, cookie: '', cookieColor: '', _id: '674222cca2bccaa21775b15a' },
                { status: 'normal' as CellStatus, row: 7, col: 5, tile: null, cookie: '', cookieColor: '', _id: '674222cca2bccaa21775b15b' },
                { status: 'normal' as CellStatus, row: 7, col: 6, tile: null, cookie: 'ten', cookieColor: 'gold', _id: '674222cca2bccaa21775b15c' },
                { status: 'normal' as CellStatus, row: 7, col: 7, tile: null, cookie: '', cookieColor: '', _id: '674222cca2bccaa21775b15d' },
                { status: 'normal' as CellStatus, row: 7, col: 8, tile: null, cookie: '', cookieColor: '', _id: '674222cca2bccaa21775b15e' },
                { status: 'normal' as CellStatus, row: 7, col: 9, tile: null, cookie: '', cookieColor: '', _id: '674222cca2bccaa21775b15f' },
                { status: 'normal' as CellStatus, row: 7, col: 10, tile: null, cookie: 'arrow', cookieColor: 'blue', _id: '674222cca2bccaa21775b160' },
                { status: 'normal' as CellStatus, row: 7, col: 11, tile: null, cookie: '', cookieColor: '', _id: '674222cca2bccaa21775b161' },
                { status: 'normal' as CellStatus, row: 7, col: 12, tile: null, cookie: '', cookieColor: '', _id: '674222cca2bccaa21775b162' },
                { status: 'normal' as CellStatus, row: 7, col: 13, tile: null, cookie: '', cookieColor: '', _id: '674222cca2bccaa21775b163' },
                { status: 'normal' as CellStatus, row: 7, col: 14, tile: null, cookie: '', cookieColor: '', _id: '674222cca2bccaa21775b164' },
                { status: 'normal' as CellStatus, row: 7, col: 15, tile: null, cookie: '', cookieColor: '', _id: '674222cca2bccaa21775b165' },
                { status: 'normal' as CellStatus, row: 7, col: 16, tile: null, cookie: 'spinner', cookieColor: 'gold', _id: '674222cca2bccaa21775b166' },
                { status: 'normal' as CellStatus, row: 7, col: 17, tile: null, cookie: '', cookieColor: '', _id: '674222cca2bccaa21775b167' },
                { status: 'normal' as CellStatus, row: 7, col: 18, tile: null, cookie: '', cookieColor: '', _id: '674222cca2bccaa21775b168' },
            ],
            [
                { status: 'normal' as CellStatus, row: 8, col: 1, tile: null, cookie: '', cookieColor: '', _id: '674222cca2bccaa21775b169' },
                { status: 'normal' as CellStatus, row: 8, col: 2, tile: null, cookie: '', cookieColor: '', _id: '674222cca2bccaa21775b16a' },
                { status: 'normal' as CellStatus, row: 8, col: 3, tile: null, cookie: 'three', cookieColor: 'gold', _id: '674222cca2bccaa21775b16b' },
                { status: 'normal' as CellStatus, row: 8, col: 4, tile: null, cookie: 'ten', cookieColor: 'gold', _id: '674222cca2bccaa21775b16c' },
                { status: 'normal' as CellStatus, row: 8, col: 5, tile: null, cookie: '', cookieColor: '', _id: '674222cca2bccaa21775b16d' },
                { status: 'normal' as CellStatus, row: 8, col: 6, tile: null, cookie: '', cookieColor: '', _id: '674222cca2bccaa21775b16e' },
                { status: 'normal' as CellStatus, row: 8, col: 7, tile: null, cookie: '', cookieColor: '', _id: '674222cca2bccaa21775b16f' },
                { status: 'normal' as CellStatus, row: 8, col: 8, tile: null, cookie: 'ten', cookieColor: 'gold', _id: '674222cca2bccaa21775b170' },
                { status: 'normal' as CellStatus, row: 8, col: 9, tile: null, cookie: '', cookieColor: '', _id: '674222cca2bccaa21775b171' },
                { status: 'normal' as CellStatus, row: 8, col: 10, tile: null, cookie: 'arrow', cookieColor: 'gold', _id: '674222cca2bccaa21775b172' },
                { status: 'normal' as CellStatus, row: 8, col: 11, tile: null, cookie: '', cookieColor: '', _id: '674222cca2bccaa21775b173' },
                { status: 'normal' as CellStatus, row: 8, col: 12, tile: null, cookie: '', cookieColor: '', _id: '674222cca2bccaa21775b174' },
                { status: 'normal' as CellStatus, row: 8, col: 13, tile: null, cookie: '', cookieColor: '', _id: '674222cca2bccaa21775b175' },
                { status: 'normal' as CellStatus, row: 8, col: 14, tile: null, cookie: 'three', cookieColor: 'red', _id: '674222cca2bccaa21775b176' },
                { status: 'normal' as CellStatus, row: 8, col: 15, tile: null, cookie: '', cookieColor: '', _id: '674222cca2bccaa21775b177' },
                { status: 'normal' as CellStatus, row: 8, col: 16, tile: null, cookie: '', cookieColor: '', _id: '674222cca2bccaa21775b178' },
                { status: 'normal' as CellStatus, row: 8, col: 17, tile: null, cookie: 'spinner', cookieColor: 'red', _id: '674222cca2bccaa21775b179' },
                { status: 'normal' as CellStatus, row: 8, col: 18, tile: null, cookie: 'one', cookieColor: 'gold', _id: '674222cca2bccaa21775b17a' },
            ],
            [
                { status: 'normal' as CellStatus, row: 9, col: 1, tile: null, cookie: '', cookieColor: '', _id: '674222cca2bccaa21775b17b' },
                { status: 'normal' as CellStatus, row: 9, col: 2, tile: null, cookie: '', cookieColor: '', _id: '674222cca2bccaa21775b17c' },
                { status: 'normal' as CellStatus, row: 9, col: 3, tile: null, cookie: '', cookieColor: '', _id: '674222cca2bccaa21775b17d' },
                { status: 'normal' as CellStatus, row: 9, col: 4, tile: null, cookie: 'arrow', cookieColor: 'red', _id: '674222cca2bccaa21775b17e' },
                { status: 'normal' as CellStatus, row: 9, col: 5, tile: null, cookie: 'arrow', cookieColor: 'gold', _id: '674222cca2bccaa21775b17f' },
                { status: 'normal' as CellStatus, row: 9, col: 6, tile: null, cookie: 'spinner', cookieColor: 'blue', _id: '674222cca2bccaa21775b180' },
                { status: 'normal' as CellStatus, row: 9, col: 7, tile: null, cookie: '', cookieColor: '', _id: '674222cca2bccaa21775b181' },
                { status: 'normal' as CellStatus, row: 9, col: 8, tile: null, cookie: '', cookieColor: '', _id: '674222cca2bccaa21775b182' },
                { status: 'normal' as CellStatus, row: 9, col: 9, tile: null, cookie: '', cookieColor: '', _id: '674222cca2bccaa21775b183' },
                { status: 'normal' as CellStatus, row: 9, col: 10, tile: null, cookie: '', cookieColor: '', _id: '674222cca2bccaa21775b184' },
                { status: 'normal' as CellStatus, row: 9, col: 11, tile: null, cookie: 'five', cookieColor: 'red', _id: '674222cca2bccaa21775b185' },
                { status: 'normal' as CellStatus, row: 9, col: 12, tile: null, cookie: 'five', cookieColor: 'gold', _id: '674222cca2bccaa21775b186' },
                { status: 'normal' as CellStatus, row: 9, col: 13, tile: null, cookie: '', cookieColor: '', _id: '674222cca2bccaa21775b187' },
                { status: 'normal' as CellStatus, row: 9, col: 14, tile: null, cookie: '', cookieColor: '', _id: '674222cca2bccaa21775b188' },
                { status: 'normal' as CellStatus, row: 9, col: 15, tile: null, cookie: 'spinner', cookieColor: 'gold', _id: '674222cca2bccaa21775b189' },
                { status: 'normal' as CellStatus, row: 9, col: 16, tile: null, cookie: '', cookieColor: '', _id: '674222cca2bccaa21775b18a' },
                { status: 'normal' as CellStatus, row: 9, col: 17, tile: null, cookie: 'three', cookieColor: 'gold', _id: '674222cca2bccaa21775b18b' },
                { status: 'normal' as CellStatus, row: 9, col: 18, tile: null, cookie: '', cookieColor: '', _id: '674222cca2bccaa21775b18c' },
            ],
            [
                { status: 'normal' as CellStatus, row: 10, col: 1, tile: null, cookie: '', cookieColor: '', _id: '674222cca2bccaa21775b18d' },
                { status: 'normal' as CellStatus, row: 10, col: 2, tile: null, cookie: '', cookieColor: '', _id: '674222cca2bccaa21775b18e' },
                { status: 'normal' as CellStatus, row: 10, col: 3, tile: null, cookie: 'arrow', cookieColor: 'red', _id: '674222cca2bccaa21775b18f' },
                { status: 'normal' as CellStatus, row: 10, col: 4, tile: null, cookie: '', cookieColor: '', _id: '674222cca2bccaa21775b190' },
                { status: 'normal' as CellStatus, row: 10, col: 5, tile: null, cookie: '', cookieColor: '', _id: '674222cca2bccaa21775b191' },
                { status: 'normal' as CellStatus, row: 10, col: 6, tile: null, cookie: '', cookieColor: '', _id: '674222cca2bccaa21775b192' },
                { status: 'normal' as CellStatus, row: 10, col: 7, tile: null, cookie: '', cookieColor: '', _id: '674222cca2bccaa21775b193' },
                { status: 'normal' as CellStatus, row: 10, col: 8, tile: null, cookie: '', cookieColor: '', _id: '674222cca2bccaa21775b194' },
                { status: 'normal' as CellStatus, row: 10, col: 9, tile: null, cookie: '', cookieColor: '', _id: '674222cca2bccaa21775b195' },
                { status: 'normal' as CellStatus, row: 10, col: 10, tile: null, cookie: 'five', cookieColor: 'gold', _id: '674222cca2bccaa21775b196' },
                { status: 'normal' as CellStatus, row: 10, col: 11, tile: null, cookie: 'five', cookieColor: 'red', _id: '674222cca2bccaa21775b197' },
                { status: 'normal' as CellStatus, row: 10, col: 12, tile: null, cookie: '', cookieColor: '', _id: '674222cca2bccaa21775b198' },
                { status: 'normal' as CellStatus, row: 10, col: 13, tile: null, cookie: '', cookieColor: '', _id: '674222cca2bccaa21775b199' },
                { status: 'normal' as CellStatus, row: 10, col: 14, tile: null, cookie: '', cookieColor: '', _id: '674222cca2bccaa21775b19a' },
                { status: 'normal' as CellStatus, row: 10, col: 15, tile: null, cookie: 'ten', cookieColor: 'gold', _id: '674222cca2bccaa21775b19b' },
                { status: 'normal' as CellStatus, row: 10, col: 16, tile: null, cookie: '', cookieColor: '', _id: '674222cca2bccaa21775b19c' },
                { status: 'normal' as CellStatus, row: 10, col: 17, tile: null, cookie: 'five', cookieColor: 'blue', _id: '674222cca2bccaa21775b19d' },
                { status: 'normal' as CellStatus, row: 10, col: 18, tile: null, cookie: '', cookieColor: '', _id: '674222cca2bccaa21775b19e' },
            ],
            [
                { status: 'normal' as CellStatus, row: 11, col: 1, tile: null, cookie: '', cookieColor: '', _id: '674222cca2bccaa21775b19f' },
                { status: 'normal' as CellStatus, row: 11, col: 2, tile: null, cookie: '', cookieColor: '', _id: '674222cca2bccaa21775b1a0' },
                { status: 'normal' as CellStatus, row: 11, col: 3, tile: null, cookie: '', cookieColor: '', _id: '674222cca2bccaa21775b1a1' },
                { status: 'normal' as CellStatus, row: 11, col: 4, tile: null, cookie: 'ten', cookieColor: 'blue', _id: '674222cca2bccaa21775b1a2' },
                { status: 'normal' as CellStatus, row: 11, col: 5, tile: null, cookie: '', cookieColor: '', _id: '674222cca2bccaa21775b1a3' },
                { status: 'normal' as CellStatus, row: 11, col: 6, tile: null, cookie: 'arrow', cookieColor: 'red', _id: '674222cca2bccaa21775b1a4' },
                { status: 'normal' as CellStatus, row: 11, col: 7, tile: null, cookie: '', cookieColor: '', _id: '674222cca2bccaa21775b1a5' },
                { status: 'normal' as CellStatus, row: 11, col: 8, tile: null, cookie: 'one', cookieColor: 'blue', _id: '674222cca2bccaa21775b1a6' },
                { status: 'normal' as CellStatus, row: 11, col: 9, tile: null, cookie: '', cookieColor: '', _id: '674222cca2bccaa21775b1a7' },
                { status: 'normal' as CellStatus, row: 11, col: 10, tile: null, cookie: 'five', cookieColor: 'gold', _id: '674222cca2bccaa21775b1a8' },
                { status: 'normal' as CellStatus, row: 11, col: 11, tile: null, cookie: '', cookieColor: '', _id: '674222cca2bccaa21775b1a9' },
                { status: 'normal' as CellStatus, row: 11, col: 12, tile: null, cookie: '', cookieColor: '', _id: '674222cca2bccaa21775b1aa' },
                { status: 'normal' as CellStatus, row: 11, col: 13, tile: null, cookie: '', cookieColor: '', _id: '674222cca2bccaa21775b1ab' },
                { status: 'normal' as CellStatus, row: 11, col: 14, tile: null, cookie: '', cookieColor: '', _id: '674222cca2bccaa21775b1ac' },
                { status: 'normal' as CellStatus, row: 11, col: 15, tile: null, cookie: '', cookieColor: '', _id: '674222cca2bccaa21775b1ad' },
                { status: 'normal' as CellStatus, row: 11, col: 16, tile: null, cookie: 'spinner', cookieColor: 'blue', _id: '674222cca2bccaa21775b1ae' },
                { status: 'normal' as CellStatus, row: 11, col: 17, tile: null, cookie: '', cookieColor: '', _id: '674222cca2bccaa21775b1af' },
                { status: 'normal' as CellStatus, row: 11, col: 18, tile: null, cookie: '', cookieColor: '', _id: '674222cca2bccaa21775b1b0' },
            ],
            [
                { status: 'normal' as CellStatus, row: 12, col: 1, tile: null, cookie: '', cookieColor: '', _id: '674222cca2bccaa21775b1b1' },
                { status: 'normal' as CellStatus, row: 12, col: 2, tile: null, cookie: '', cookieColor: '', _id: '674222cca2bccaa21775b1b2' },
                { status: 'normal' as CellStatus, row: 12, col: 3, tile: null, cookie: '', cookieColor: '', _id: '674222cca2bccaa21775b1b3' },
                { status: 'normal' as CellStatus, row: 12, col: 4, tile: null, cookie: 'spinner', cookieColor: 'blue', _id: '674222cca2bccaa21775b1b4' },
                { status: 'normal' as CellStatus, row: 12, col: 5, tile: null, cookie: '', cookieColor: '', _id: '674222cca2bccaa21775b1b5' },
                { status: 'normal' as CellStatus, row: 12, col: 6, tile: null, cookie: '', cookieColor: '', _id: '674222cca2bccaa21775b1b6' },
                { status: 'normal' as CellStatus, row: 12, col: 7, tile: null, cookie: '', cookieColor: '', _id: '674222cca2bccaa21775b1b7' },
                { status: 'normal' as CellStatus, row: 12, col: 8, tile: null, cookie: '', cookieColor: '', _id: '674222cca2bccaa21775b1b8' },
                { status: 'normal' as CellStatus, row: 12, col: 9, tile: null, cookie: '', cookieColor: '', _id: '674222cca2bccaa21775b1b9' },
                { status: 'normal' as CellStatus, row: 12, col: 10, tile: null, cookie: '', cookieColor: '', _id: '674222cca2bccaa21775b1ba' },
                { status: 'normal' as CellStatus, row: 12, col: 11, tile: null, cookie: 'three', cookieColor: 'red', _id: '674222cca2bccaa21775b1bb' },
                { status: 'normal' as CellStatus, row: 12, col: 12, tile: null, cookie: 'three', cookieColor: 'blue', _id: '674222cca2bccaa21775b1bc' },
                { status: 'normal' as CellStatus, row: 12, col: 13, tile: null, cookie: '', cookieColor: '', _id: '674222cca2bccaa21775b1bd' },
                { status: 'normal' as CellStatus, row: 12, col: 14, tile: null, cookie: 'spinner', cookieColor: 'blue', _id: '674222cca2bccaa21775b1be' },
                { status: 'normal' as CellStatus, row: 12, col: 15, tile: null, cookie: 'spinner', cookieColor: 'red', _id: '674222cca2bccaa21775b1bf' },
                { status: 'normal' as CellStatus, row: 12, col: 16, tile: null, cookie: '', cookieColor: '', _id: '674222cca2bccaa21775b1c0' },
                { status: 'normal' as CellStatus, row: 12, col: 17, tile: null, cookie: '', cookieColor: '', _id: '674222cca2bccaa21775b1c1' },
                { status: 'normal' as CellStatus, row: 12, col: 18, tile: null, cookie: '', cookieColor: '', _id: '674222cca2bccaa21775b1c2' },
            ],
            [
                { status: 'normal' as CellStatus, row: 13, col: 1, tile: null, cookie: '', cookieColor: '', _id: '674222cca2bccaa21775b1c3' },
                { status: 'normal' as CellStatus, row: 13, col: 2, tile: null, cookie: 'one', cookieColor: 'gold', _id: '674222cca2bccaa21775b1c4' },
                { status: 'normal' as CellStatus, row: 13, col: 3, tile: null, cookie: 'arrow', cookieColor: 'red', _id: '674222cca2bccaa21775b1c5' },
                { status: 'normal' as CellStatus, row: 13, col: 4, tile: null, cookie: '', cookieColor: '', _id: '674222cca2bccaa21775b1c6' },
                { status: 'normal' as CellStatus, row: 13, col: 5, tile: null, cookie: '', cookieColor: '', _id: '674222cca2bccaa21775b1c7' },
                { status: 'normal' as CellStatus, row: 13, col: 6, tile: null, cookie: 'arrow', cookieColor: 'gold', _id: '674222cca2bccaa21775b1c8' },
                { status: 'normal' as CellStatus, row: 13, col: 7, tile: null, cookie: 'arrow', cookieColor: 'gold', _id: '674222cca2bccaa21775b1c9' },
                { status: 'normal' as CellStatus, row: 13, col: 8, tile: null, cookie: 'five', cookieColor: 'gold', _id: '674222cca2bccaa21775b1ca' },
                { status: 'normal' as CellStatus, row: 13, col: 9, tile: null, cookie: '', cookieColor: '', _id: '674222cca2bccaa21775b1cb' },
                { status: 'normal' as CellStatus, row: 13, col: 10, tile: null, cookie: '', cookieColor: '', _id: '674222cca2bccaa21775b1cc' },
                { status: 'normal' as CellStatus, row: 13, col: 11, tile: null, cookie: '', cookieColor: '', _id: '674222cca2bccaa21775b1cd' },
                { status: 'normal' as CellStatus, row: 13, col: 12, tile: null, cookie: '', cookieColor: '', _id: '674222cca2bccaa21775b1ce' },
                { status: 'normal' as CellStatus, row: 13, col: 13, tile: null, cookie: '', cookieColor: '', _id: '674222cca2bccaa21775b1cf' },
                { status: 'normal' as CellStatus, row: 13, col: 14, tile: null, cookie: 'five', cookieColor: 'red', _id: '674222cca2bccaa21775b1d0' },
                { status: 'normal' as CellStatus, row: 13, col: 15, tile: null, cookie: '', cookieColor: '', _id: '674222cca2bccaa21775b1d1' },
                { status: 'normal' as CellStatus, row: 13, col: 16, tile: null, cookie: '', cookieColor: '', _id: '674222cca2bccaa21775b1d2' },
                { status: 'normal' as CellStatus, row: 13, col: 17, tile: null, cookie: '', cookieColor: '', _id: '674222cca2bccaa21775b1d3' },
                { status: 'normal' as CellStatus, row: 13, col: 18, tile: null, cookie: '', cookieColor: '', _id: '674222cca2bccaa21775b1d4' },
            ],
            [
                { status: 'normal' as CellStatus, row: 14, col: 1, tile: null, cookie: '', cookieColor: '', _id: '674222cca2bccaa21775b1d5' },
                { status: 'normal' as CellStatus, row: 14, col: 2, tile: null, cookie: '', cookieColor: '', _id: '674222cca2bccaa21775b1d6' },
                { status: 'normal' as CellStatus, row: 14, col: 3, tile: null, cookie: '', cookieColor: '', _id: '674222cca2bccaa21775b1d7' },
                { status: 'normal' as CellStatus, row: 14, col: 4, tile: null, cookie: '', cookieColor: '', _id: '674222cca2bccaa21775b1d8' },
                { status: 'normal' as CellStatus, row: 14, col: 5, tile: null, cookie: '', cookieColor: '', _id: '674222cca2bccaa21775b1d9' },
                { status: 'normal' as CellStatus, row: 14, col: 6, tile: null, cookie: '', cookieColor: '', _id: '674222cca2bccaa21775b1da' },
                { status: 'normal' as CellStatus, row: 14, col: 7, tile: null, cookie: 'one', cookieColor: 'red', _id: '674222cca2bccaa21775b1db' },
                { status: 'normal' as CellStatus, row: 14, col: 8, tile: null, cookie: '', cookieColor: '', _id: '674222cca2bccaa21775b1dc' },
                { status: 'normal' as CellStatus, row: 14, col: 9, tile: null, cookie: '', cookieColor: '', _id: '674222cca2bccaa21775b1dd' },
                { status: 'normal' as CellStatus, row: 14, col: 10, tile: null, cookie: '', cookieColor: '', _id: '674222cca2bccaa21775b1de' },
                { status: 'normal' as CellStatus, row: 14, col: 11, tile: null, cookie: '', cookieColor: '', _id: '674222cca2bccaa21775b1df' },
                { status: 'normal' as CellStatus, row: 14, col: 12, tile: null, cookie: 'one', cookieColor: 'blue', _id: '674222cca2bccaa21775b1e0' },
                { status: 'normal' as CellStatus, row: 14, col: 13, tile: null, cookie: 'one', cookieColor: 'blue', _id: '674222cca2bccaa21775b1e1' },
                { status: 'normal' as CellStatus, row: 14, col: 14, tile: null, cookie: 'spinner', cookieColor: 'gold', _id: '674222cca2bccaa21775b1e2' },
                { status: 'normal' as CellStatus, row: 14, col: 15, tile: null, cookie: '', cookieColor: '', _id: '674222cca2bccaa21775b1e3' },
                { status: 'normal' as CellStatus, row: 14, col: 16, tile: null, cookie: '', cookieColor: '', _id: '674222cca2bccaa21775b1e4' },
                { status: 'normal' as CellStatus, row: 14, col: 17, tile: null, cookie: '', cookieColor: '', _id: '674222cca2bccaa21775b1e5' },
                { status: 'normal' as CellStatus, row: 14, col: 18, tile: null, cookie: '', cookieColor: '', _id: '674222cca2bccaa21775b1e6' },
            ],
            [
                { status: 'normal' as CellStatus, row: 15, col: 1, tile: null, cookie: '', cookieColor: '', _id: '674222cca2bccaa21775b1e7' },
                { status: 'normal' as CellStatus, row: 15, col: 2, tile: null, cookie: '', cookieColor: '', _id: '674222cca2bccaa21775b1e8' },
                { status: 'normal' as CellStatus, row: 15, col: 3, tile: null, cookie: 'one', cookieColor: 'blue', _id: '674222cca2bccaa21775b1e9' },
                { status: 'normal' as CellStatus, row: 15, col: 4, tile: null, cookie: 'arrow', cookieColor: 'gold', _id: '674222cca2bccaa21775b1ea' },
                { status: 'normal' as CellStatus, row: 15, col: 5, tile: null, cookie: '', cookieColor: '', _id: '674222cca2bccaa21775b1eb' },
                { status: 'normal' as CellStatus, row: 15, col: 6, tile: null, cookie: '', cookieColor: '', _id: '674222cca2bccaa21775b1ec' },
                { status: 'normal' as CellStatus, row: 15, col: 7, tile: null, cookie: '', cookieColor: '', _id: '674222cca2bccaa21775b1ed' },
                { status: 'normal' as CellStatus, row: 15, col: 8, tile: null, cookie: 'three', cookieColor: 'gold', _id: '674222cca2bccaa21775b1ee' },
                { status: 'normal' as CellStatus, row: 15, col: 9, tile: null, cookie: 'three', cookieColor: 'blue', _id: '674222cca2bccaa21775b1ef' },
                { status: 'normal' as CellStatus, row: 15, col: 10, tile: null, cookie: '', cookieColor: '', _id: '674222cca2bccaa21775b1f0' },
                { status: 'normal' as CellStatus, row: 15, col: 11, tile: null, cookie: '', cookieColor: '', _id: '674222cca2bccaa21775b1f1' },
                { status: 'normal' as CellStatus, row: 15, col: 12, tile: null, cookie: '', cookieColor: '', _id: '674222cca2bccaa21775b1f2' },
                { status: 'normal' as CellStatus, row: 15, col: 13, tile: null, cookie: 'one', cookieColor: 'gold', _id: '674222cca2bccaa21775b1f3' },
                { status: 'normal' as CellStatus, row: 15, col: 14, tile: null, cookie: '', cookieColor: '', _id: '674222cca2bccaa21775b1f4' },
                { status: 'normal' as CellStatus, row: 15, col: 15, tile: null, cookie: '', cookieColor: '', _id: '674222cca2bccaa21775b1f5' },
                { status: 'normal' as CellStatus, row: 15, col: 16, tile: null, cookie: 'three', cookieColor: 'blue', _id: '674222cca2bccaa21775b1f6' },
                { status: 'normal' as CellStatus, row: 15, col: 17, tile: null, cookie: 'one', cookieColor: 'red', _id: '674222cca2bccaa21775b1f7' },
                { status: 'normal' as CellStatus, row: 15, col: 18, tile: null, cookie: '', cookieColor: '', _id: '674222cca2bccaa21775b1f8' },
            ],
            [
                { status: 'normal' as CellStatus, row: 16, col: 1, tile: null, cookie: '', cookieColor: '', _id: '674222cca2bccaa21775b1f9' },
                { status: 'normal' as CellStatus, row: 16, col: 2, tile: null, cookie: '', cookieColor: '', _id: '674222cca2bccaa21775b1fa' },
                { status: 'normal' as CellStatus, row: 16, col: 3, tile: null, cookie: '', cookieColor: '', _id: '674222cca2bccaa21775b1fb' },
                { status: 'normal' as CellStatus, row: 16, col: 4, tile: null, cookie: '', cookieColor: '', _id: '674222cca2bccaa21775b1fc' },
                { status: 'normal' as CellStatus, row: 16, col: 5, tile: null, cookie: '', cookieColor: '', _id: '674222cca2bccaa21775b1fd' },
                { status: 'normal' as CellStatus, row: 16, col: 6, tile: null, cookie: '', cookieColor: '', _id: '674222cca2bccaa21775b1fe' },
                { status: 'normal' as CellStatus, row: 16, col: 7, tile: null, cookie: '', cookieColor: '', _id: '674222cca2bccaa21775b1ff' },
                { status: 'normal' as CellStatus, row: 16, col: 8, tile: null, cookie: '', cookieColor: '', _id: '674222cca2bccaa21775b200' },
                { status: 'normal' as CellStatus, row: 16, col: 9, tile: null, cookie: '', cookieColor: '', _id: '674222cca2bccaa21775b201' },
                { status: 'normal' as CellStatus, row: 16, col: 10, tile: null, cookie: '', cookieColor: '', _id: '674222cca2bccaa21775b202' },
                { status: 'normal' as CellStatus, row: 16, col: 11, tile: null, cookie: '', cookieColor: '', _id: '674222cca2bccaa21775b203' },
                { status: 'normal' as CellStatus, row: 16, col: 12, tile: null, cookie: '', cookieColor: '', _id: '674222cca2bccaa21775b204' },
                { status: 'normal' as CellStatus, row: 16, col: 13, tile: null, cookie: '', cookieColor: '', _id: '674222cca2bccaa21775b205' },
                { status: 'normal' as CellStatus, row: 16, col: 14, tile: null, cookie: '', cookieColor: '', _id: '674222cca2bccaa21775b206' },
                { status: 'normal' as CellStatus, row: 16, col: 15, tile: null, cookie: '', cookieColor: '', _id: '674222cca2bccaa21775b207' },
                { status: 'normal' as CellStatus, row: 16, col: 16, tile: null, cookie: '', cookieColor: '', _id: '674222cca2bccaa21775b208' },
                { status: 'normal' as CellStatus, row: 16, col: 17, tile: null, cookie: '', cookieColor: '', _id: '674222cca2bccaa21775b209' },
                { status: 'normal' as CellStatus, row: 16, col: 18, tile: null, cookie: 'spinner', cookieColor: 'red', _id: '674222cca2bccaa21775b20a' },
            ],
            [
                { status: 'normal' as CellStatus, row: 17, col: 1, tile: null, cookie: '', cookieColor: '', _id: '674222cca2bccaa21775b20b' },
                { status: 'normal' as CellStatus, row: 17, col: 2, tile: null, cookie: 'arrow', cookieColor: 'gold', _id: '674222cca2bccaa21775b20c' },
                { status: 'normal' as CellStatus, row: 17, col: 3, tile: null, cookie: '', cookieColor: '', _id: '674222cca2bccaa21775b20d' },
                { status: 'normal' as CellStatus, row: 17, col: 4, tile: null, cookie: 'one', cookieColor: 'red', _id: '674222cca2bccaa21775b20e' },
                { status: 'normal' as CellStatus, row: 17, col: 5, tile: null, cookie: '', cookieColor: '', _id: '674222cca2bccaa21775b20f' },
                { status: 'normal' as CellStatus, row: 17, col: 6, tile: null, cookie: '', cookieColor: '', _id: '674222cca2bccaa21775b210' },
                { status: 'normal' as CellStatus, row: 17, col: 7, tile: null, cookie: '', cookieColor: '', _id: '674222cca2bccaa21775b211' },
                { status: 'normal' as CellStatus, row: 17, col: 8, tile: null, cookie: '', cookieColor: '', _id: '674222cca2bccaa21775b212' },
                { status: 'normal' as CellStatus, row: 17, col: 9, tile: null, cookie: '', cookieColor: '', _id: '674222cca2bccaa21775b213' },
                { status: 'normal' as CellStatus, row: 17, col: 10, tile: null, cookie: '', cookieColor: '', _id: '674222cca2bccaa21775b214' },
                { status: 'normal' as CellStatus, row: 17, col: 11, tile: null, cookie: '', cookieColor: '', _id: '674222cca2bccaa21775b215' },
                { status: 'normal' as CellStatus, row: 17, col: 12, tile: null, cookie: 'ten', cookieColor: 'red', _id: '674222cca2bccaa21775b216' },
                { status: 'normal' as CellStatus, row: 17, col: 13, tile: null, cookie: 'ten', cookieColor: 'red', _id: '674222cca2bccaa21775b217' },
                { status: 'normal' as CellStatus, row: 17, col: 14, tile: null, cookie: '', cookieColor: '', _id: '674222cca2bccaa21775b218' },
                { status: 'normal' as CellStatus, row: 17, col: 15, tile: null, cookie: 'five', cookieColor: 'blue', _id: '674222cca2bccaa21775b219' },
                { status: 'normal' as CellStatus, row: 17, col: 16, tile: null, cookie: '', cookieColor: '', _id: '674222cca2bccaa21775b21a' },
                { status: 'normal' as CellStatus, row: 17, col: 17, tile: null, cookie: '', cookieColor: '', _id: '674222cca2bccaa21775b21b' },
                { status: 'normal' as CellStatus, row: 17, col: 18, tile: null, cookie: '', cookieColor: '', _id: '674222cca2bccaa21775b21c' },
            ],
            [
                { status: 'normal' as CellStatus, row: 18, col: 1, tile: null, cookie: '', cookieColor: '', _id: '674222cca2bccaa21775b21d' },
                { status: 'normal' as CellStatus, row: 18, col: 2, tile: null, cookie: '', cookieColor: '', _id: '674222cca2bccaa21775b21e' },
                { status: 'normal' as CellStatus, row: 18, col: 3, tile: null, cookie: 'arrow', cookieColor: 'blue', _id: '674222cca2bccaa21775b21f' },
                { status: 'normal' as CellStatus, row: 18, col: 4, tile: null, cookie: '', cookieColor: '', _id: '674222cca2bccaa21775b220' },
                { status: 'normal' as CellStatus, row: 18, col: 5, tile: null, cookie: '', cookieColor: '', _id: '674222cca2bccaa21775b221' },
                { status: 'normal' as CellStatus, row: 18, col: 6, tile: null, cookie: '', cookieColor: '', _id: '674222cca2bccaa21775b222' },
                { status: 'normal' as CellStatus, row: 18, col: 7, tile: null, cookie: '', cookieColor: '', _id: '674222cca2bccaa21775b223' },
                { status: 'normal' as CellStatus, row: 18, col: 8, tile: null, cookie: '', cookieColor: '', _id: '674222cca2bccaa21775b224' },
                { status: 'normal' as CellStatus, row: 18, col: 9, tile: null, cookie: '', cookieColor: '', _id: '674222cca2bccaa21775b225' },
                { status: 'normal' as CellStatus, row: 18, col: 10, tile: null, cookie: '', cookieColor: '', _id: '674222cca2bccaa21775b226' },
                { status: 'normal' as CellStatus, row: 18, col: 11, tile: null, cookie: '', cookieColor: '', _id: '674222cca2bccaa21775b227' },
                { status: 'normal' as CellStatus, row: 18, col: 12, tile: null, cookie: 'one', cookieColor: 'gold', _id: '674222cca2bccaa21775b228' },
                { status: 'normal' as CellStatus, row: 18, col: 13, tile: null, cookie: '', cookieColor: '', _id: '674222cca2bccaa21775b229' },
                { status: 'normal' as CellStatus, row: 18, col: 14, tile: null, cookie: '', cookieColor: '', _id: '674222cca2bccaa21775b22a' },
                { status: 'normal' as CellStatus, row: 18, col: 15, tile: null, cookie: 'three', cookieColor: 'gold', _id: '674222cca2bccaa21775b22b' },
                { status: 'normal' as CellStatus, row: 18, col: 16, tile: null, cookie: '', cookieColor: '', _id: '674222cca2bccaa21775b22c' },
                { status: 'normal' as CellStatus, row: 18, col: 17, tile: null, cookie: 'spinner', cookieColor: 'gold', _id: '674222cca2bccaa21775b22d' },
                { status: 'normal' as CellStatus, row: 18, col: 18, tile: null, cookie: '', cookieColor: '', _id: '674222cca2bccaa21775b22e' },
            ],
        ],
        _id: '674222cca2bccaa21775b0ea',
        created: '2024-11-23T18:45:32.714Z',
        updated: '2024-11-23T18:45:32.714Z',
    },
    tiles: [
        {
            status: 'normal' as TileStatus,
            value: 'V',
            buck: '',
            _id: '674222cca2bccaa21775b22f',
            created: '2024-11-23T18:45:32.715Z',
            updated: '2024-11-23T18:45:32.715Z',
        },
        {
            status: 'normal' as TileStatus,
            value: 'M',
            buck: '',
            _id: '674222cca2bccaa21775b230',
            created: '2024-11-23T18:45:32.715Z',
            updated: '2024-11-23T18:45:32.715Z',
        },
        {
            status: 'normal' as TileStatus,
            value: 'U',
            buck: '',
            _id: '674222cca2bccaa21775b231',
            created: '2024-11-23T18:45:32.715Z',
            updated: '2024-11-23T18:45:32.715Z',
        },
        {
            status: 'normal' as TileStatus,
            value: 'F',
            buck: '',
            _id: '674222cca2bccaa21775b232',
            created: '2024-11-23T18:45:32.715Z',
            updated: '2024-11-23T18:45:32.715Z',
        },
        {
            status: 'normal' as TileStatus,
            value: 'R',
            buck: '',
            _id: '674222cca2bccaa21775b233',
            created: '2024-11-23T18:45:32.715Z',
            updated: '2024-11-23T18:45:32.715Z',
        },
        {
            status: 'normal' as TileStatus,
            value: 'F',
            buck: '',
            _id: '674222cca2bccaa21775b234',
            created: '2024-11-23T18:45:32.715Z',
            updated: '2024-11-23T18:45:32.715Z',
        },
        {
            status: 'normal' as TileStatus,
            value: 'P',
            buck: '',
            _id: '674222cca2bccaa21775b235',
            created: '2024-11-23T18:45:32.715Z',
            updated: '2024-11-23T18:45:32.715Z',
        },
        {
            status: 'normal' as TileStatus,
            value: 'N',
            buck: '',
            _id: '674222cca2bccaa21775b236',
            created: '2024-11-23T18:45:32.715Z',
            updated: '2024-11-23T18:45:32.715Z',
        },
        {
            status: 'normal' as TileStatus,
            value: 'V',
            buck: '',
            _id: '674222cca2bccaa21775b237',
            created: '2024-11-23T18:45:32.715Z',
            updated: '2024-11-23T18:45:32.715Z',
        },
        {
            status: 'normal' as TileStatus,
            value: 'S',
            buck: '',
            _id: '674222cca2bccaa21775b238',
            created: '2024-11-23T18:45:32.715Z',
            updated: '2024-11-23T18:45:32.715Z',
        },
        {
            status: 'normal' as TileStatus,
            value: 'O',
            buck: '',
            _id: '674222cca2bccaa21775b239',
            created: '2024-11-23T18:45:32.715Z',
            updated: '2024-11-23T18:45:32.715Z',
        },
        {
            status: 'normal' as TileStatus,
            value: 'E',
            buck: '',
            _id: '674222cca2bccaa21775b23a',
            created: '2024-11-23T18:45:32.715Z',
            updated: '2024-11-23T18:45:32.715Z',
        },
        {
            status: 'normal' as TileStatus,
            value: 'A',
            buck: '',
            _id: '674222cca2bccaa21775b23b',
            created: '2024-11-23T18:45:32.716Z',
            updated: '2024-11-23T18:45:32.716Z',
        },
        {
            status: 'normal' as TileStatus,
            value: 'N',
            buck: '',
            _id: '674222cca2bccaa21775b23c',
            created: '2024-11-23T18:45:32.716Z',
            updated: '2024-11-23T18:45:32.716Z',
        },
        {
            status: 'normal' as TileStatus,
            value: 'D',
            buck: '',
            _id: '674222cca2bccaa21775b23d',
            created: '2024-11-23T18:45:32.716Z',
            updated: '2024-11-23T18:45:32.716Z',
        },
        {
            status: 'normal' as TileStatus,
            value: 'R',
            buck: '',
            _id: '674222cca2bccaa21775b23e',
            created: '2024-11-23T18:45:32.716Z',
            updated: '2024-11-23T18:45:32.716Z',
        },
        {
            status: 'normal' as TileStatus,
            value: 'E',
            buck: '',
            _id: '674222cca2bccaa21775b23f',
            created: '2024-11-23T18:45:32.716Z',
            updated: '2024-11-23T18:45:32.716Z',
        },
        {
            status: 'normal' as TileStatus,
            value: 'D',
            buck: '',
            _id: '674222cca2bccaa21775b240',
            created: '2024-11-23T18:45:32.716Z',
            updated: '2024-11-23T18:45:32.716Z',
        },
        {
            status: 'normal' as TileStatus,
            value: 'A',
            buck: '',
            _id: '674222cca2bccaa21775b241',
            created: '2024-11-23T18:45:32.716Z',
            updated: '2024-11-23T18:45:32.716Z',
        },
        {
            status: 'normal' as TileStatus,
            value: 'T',
            buck: '',
            _id: '674222cca2bccaa21775b242',
            created: '2024-11-23T18:45:32.716Z',
            updated: '2024-11-23T18:45:32.716Z',
        },
        {
            status: 'normal' as TileStatus,
            value: 'A',
            buck: '',
            _id: '674222cca2bccaa21775b243',
            created: '2024-11-23T18:45:32.716Z',
            updated: '2024-11-23T18:45:32.716Z',
        },
        {
            status: 'normal' as TileStatus,
            value: 'O',
            buck: '',
            _id: '674222cca2bccaa21775b244',
            created: '2024-11-23T18:45:32.716Z',
            updated: '2024-11-23T18:45:32.716Z',
        },
        {
            status: 'normal' as TileStatus,
            value: 'C',
            buck: '',
            _id: '674222cca2bccaa21775b245',
            created: '2024-11-23T18:45:32.716Z',
            updated: '2024-11-23T18:45:32.716Z',
        },
        {
            status: 'normal' as TileStatus,
            value: 'R',
            buck: '',
            _id: '674222cca2bccaa21775b246',
            created: '2024-11-23T18:45:32.716Z',
            updated: '2024-11-23T18:45:32.716Z',
        },
        {
            status: 'normal' as TileStatus,
            value: 'O',
            buck: '',
            _id: '674222cca2bccaa21775b247',
            created: '2024-11-23T18:45:32.716Z',
            updated: '2024-11-23T18:45:32.716Z',
        },
        {
            status: 'normal' as TileStatus,
            value: 'N',
            buck: '',
            _id: '674222cca2bccaa21775b248',
            created: '2024-11-23T18:45:32.716Z',
            updated: '2024-11-23T18:45:32.716Z',
        },
        {
            status: 'normal' as TileStatus,
            value: 'B',
            buck: '',
            _id: '674222cca2bccaa21775b249',
            created: '2024-11-23T18:45:32.717Z',
            updated: '2024-11-23T18:45:32.717Z',
        },
        {
            status: 'normal' as TileStatus,
            value: 'O',
            buck: '',
            _id: '674222cca2bccaa21775b24a',
            created: '2024-11-23T18:45:32.717Z',
            updated: '2024-11-23T18:45:32.717Z',
        },
        {
            status: 'normal' as TileStatus,
            value: 'E',
            buck: '',
            _id: '674222cca2bccaa21775b24b',
            created: '2024-11-23T18:45:32.717Z',
            updated: '2024-11-23T18:45:32.717Z',
        },
        {
            status: 'normal' as TileStatus,
            value: 'Q',
            buck: '',
            _id: '674222cca2bccaa21775b24c',
            created: '2024-11-23T18:45:32.717Z',
            updated: '2024-11-23T18:45:32.717Z',
        },
        {
            status: 'normal' as TileStatus,
            value: 'E',
            buck: '',
            _id: '674222cca2bccaa21775b24d',
            created: '2024-11-23T18:45:32.717Z',
            updated: '2024-11-23T18:45:32.717Z',
        },
        {
            status: 'normal' as TileStatus,
            value: 'I',
            buck: '',
            _id: '674222cca2bccaa21775b24e',
            created: '2024-11-23T18:45:32.717Z',
            updated: '2024-11-23T18:45:32.717Z',
        },
        {
            status: 'normal' as TileStatus,
            value: 'Y',
            buck: '',
            _id: '674222cca2bccaa21775b24f',
            created: '2024-11-23T18:45:32.717Z',
            updated: '2024-11-23T18:45:32.717Z',
        },
        {
            status: 'normal' as TileStatus,
            value: 'Z',
            buck: '',
            _id: '674222cca2bccaa21775b250',
            created: '2024-11-23T18:45:32.717Z',
            updated: '2024-11-23T18:45:32.717Z',
        },
        {
            status: 'normal' as TileStatus,
            value: 'W',
            buck: '',
            _id: '674222cca2bccaa21775b251',
            created: '2024-11-23T18:45:32.717Z',
            updated: '2024-11-23T18:45:32.717Z',
        },
        {
            status: 'normal' as TileStatus,
            value: 'G',
            buck: '',
            _id: '674222cca2bccaa21775b252',
            created: '2024-11-23T18:45:32.717Z',
            updated: '2024-11-23T18:45:32.717Z',
        },
        {
            status: 'normal' as TileStatus,
            value: 'E',
            buck: '',
            _id: '674222cca2bccaa21775b253',
            created: '2024-11-23T18:45:32.717Z',
            updated: '2024-11-23T18:45:32.717Z',
        },
        {
            status: 'normal' as TileStatus,
            value: 'S',
            buck: '',
            _id: '674222cca2bccaa21775b254',
            created: '2024-11-23T18:45:32.717Z',
            updated: '2024-11-23T18:45:32.717Z',
        },
        {
            status: 'normal' as TileStatus,
            value: 'A',
            buck: '',
            _id: '674222cca2bccaa21775b255',
            created: '2024-11-23T18:45:32.717Z',
            updated: '2024-11-23T18:45:32.717Z',
        },
        {
            status: 'normal' as TileStatus,
            value: 'R',
            buck: '',
            _id: '674222cca2bccaa21775b256',
            created: '2024-11-23T18:45:32.717Z',
            updated: '2024-11-23T18:45:32.717Z',
        },
        {
            status: 'normal' as TileStatus,
            value: 'W',
            buck: '',
            _id: '674222cca2bccaa21775b257',
            created: '2024-11-23T18:45:32.717Z',
            updated: '2024-11-23T18:45:32.717Z',
        },
        {
            status: 'normal' as TileStatus,
            value: 'C',
            buck: '',
            _id: '674222cca2bccaa21775b258',
            created: '2024-11-23T18:45:32.718Z',
            updated: '2024-11-23T18:45:32.718Z',
        },
        {
            status: 'normal' as TileStatus,
            value: 'I',
            buck: '',
            _id: '674222cca2bccaa21775b259',
            created: '2024-11-23T18:45:32.718Z',
            updated: '2024-11-23T18:45:32.718Z',
        },
        {
            status: 'normal' as TileStatus,
            value: 'O',
            buck: '',
            _id: '674222cca2bccaa21775b25a',
            created: '2024-11-23T18:45:32.718Z',
            updated: '2024-11-23T18:45:32.718Z',
        },
        {
            status: 'normal' as TileStatus,
            value: 'U',
            buck: '',
            _id: '674222cca2bccaa21775b25b',
            created: '2024-11-23T18:45:32.718Z',
            updated: '2024-11-23T18:45:32.718Z',
        },
        {
            status: 'normal' as TileStatus,
            value: 'J',
            buck: '',
            _id: '674222cca2bccaa21775b25c',
            created: '2024-11-23T18:45:32.718Z',
            updated: '2024-11-23T18:45:32.718Z',
        },
        {
            status: 'normal' as TileStatus,
            value: 'S',
            buck: '',
            _id: '674222cca2bccaa21775b25d',
            created: '2024-11-23T18:45:32.718Z',
            updated: '2024-11-23T18:45:32.718Z',
        },
        {
            status: 'normal' as TileStatus,
            value: 'N',
            buck: '',
            _id: '674222cca2bccaa21775b25e',
            created: '2024-11-23T18:45:32.718Z',
            updated: '2024-11-23T18:45:32.718Z',
        },
        {
            status: 'normal' as TileStatus,
            value: 'R',
            buck: '',
            _id: '674222cca2bccaa21775b25f',
            created: '2024-11-23T18:45:32.718Z',
            updated: '2024-11-23T18:45:32.718Z',
        },
        {
            status: 'normal' as TileStatus,
            value: 'E',
            buck: '',
            _id: '674222cca2bccaa21775b260',
            created: '2024-11-23T18:45:32.718Z',
            updated: '2024-11-23T18:45:32.718Z',
        },
        {
            status: 'normal' as TileStatus,
            value: 'I',
            buck: '',
            _id: '674222cca2bccaa21775b261',
            created: '2024-11-23T18:45:32.718Z',
            updated: '2024-11-23T18:45:32.718Z',
        },
        {
            status: 'normal' as TileStatus,
            value: 'R',
            buck: '',
            _id: '674222cca2bccaa21775b262',
            created: '2024-11-23T18:45:32.718Z',
            updated: '2024-11-23T18:45:32.718Z',
        },
        {
            status: 'normal' as TileStatus,
            value: 'O',
            buck: '',
            _id: '674222cca2bccaa21775b263',
            created: '2024-11-23T18:45:32.718Z',
            updated: '2024-11-23T18:45:32.718Z',
        },
        {
            status: 'normal' as TileStatus,
            value: 'A',
            buck: '',
            _id: '674222cca2bccaa21775b264',
            created: '2024-11-23T18:45:32.718Z',
            updated: '2024-11-23T18:45:32.718Z',
        },
        {
            status: 'normal' as TileStatus,
            value: 'L',
            buck: '',
            _id: '674222cca2bccaa21775b265',
            created: '2024-11-23T18:45:32.718Z',
            updated: '2024-11-23T18:45:32.718Z',
        },
        {
            status: 'normal' as TileStatus,
            value: 'D',
            buck: '',
            _id: '674222cca2bccaa21775b266',
            created: '2024-11-23T18:45:32.718Z',
            updated: '2024-11-23T18:45:32.718Z',
        },
        {
            status: 'normal' as TileStatus,
            value: 'M',
            buck: '',
            _id: '674222cca2bccaa21775b267',
            created: '2024-11-23T18:45:32.719Z',
            updated: '2024-11-23T18:45:32.719Z',
        },
        {
            status: 'normal' as TileStatus,
            value: 'B',
            buck: '',
            _id: '674222cca2bccaa21775b268',
            created: '2024-11-23T18:45:32.719Z',
            updated: '2024-11-23T18:45:32.719Z',
        },
        {
            status: 'normal' as TileStatus,
            value: 'I',
            buck: '',
            _id: '674222cca2bccaa21775b269',
            created: '2024-11-23T18:45:32.719Z',
            updated: '2024-11-23T18:45:32.719Z',
        },
        {
            status: 'normal' as TileStatus,
            value: 'O',
            buck: '',
            _id: '674222cca2bccaa21775b26a',
            created: '2024-11-23T18:45:32.719Z',
            updated: '2024-11-23T18:45:32.719Z',
        },
        {
            status: 'normal' as TileStatus,
            value: 'A',
            buck: '',
            _id: '674222cca2bccaa21775b26b',
            created: '2024-11-23T18:45:32.719Z',
            updated: '2024-11-23T18:45:32.719Z',
        },
        {
            status: 'normal' as TileStatus,
            value: 'L',
            buck: '',
            _id: '674222cca2bccaa21775b26c',
            created: '2024-11-23T18:45:32.719Z',
            updated: '2024-11-23T18:45:32.719Z',
        },
        {
            status: 'normal' as TileStatus,
            value: 'G',
            buck: '',
            _id: '674222cca2bccaa21775b26d',
            created: '2024-11-23T18:45:32.719Z',
            updated: '2024-11-23T18:45:32.719Z',
        },
        {
            status: 'normal' as TileStatus,
            value: 'L',
            buck: '',
            _id: '674222cca2bccaa21775b26e',
            created: '2024-11-23T18:45:32.719Z',
            updated: '2024-11-23T18:45:32.719Z',
        },
        {
            status: 'normal' as TileStatus,
            value: 'E',
            buck: '',
            _id: '674222cca2bccaa21775b26f',
            created: '2024-11-23T18:45:32.719Z',
            updated: '2024-11-23T18:45:32.719Z',
        },
        {
            status: 'normal' as TileStatus,
            value: 'N',
            buck: '',
            _id: '674222cca2bccaa21775b270',
            created: '2024-11-23T18:45:32.719Z',
            updated: '2024-11-23T18:45:32.719Z',
        },
        {
            status: 'normal' as TileStatus,
            value: 'E',
            buck: '',
            _id: '674222cca2bccaa21775b271',
            created: '2024-11-23T18:45:32.719Z',
            updated: '2024-11-23T18:45:32.719Z',
        },
        {
            status: 'normal' as TileStatus,
            value: 'K',
            buck: '',
            _id: '674222cca2bccaa21775b272',
            created: '2024-11-23T18:45:32.719Z',
            updated: '2024-11-23T18:45:32.719Z',
        },
        {
            status: 'normal' as TileStatus,
            value: 'L',
            buck: '',
            _id: '674222cca2bccaa21775b273',
            created: '2024-11-23T18:45:32.719Z',
            updated: '2024-11-23T18:45:32.719Z',
        },
        {
            status: 'normal' as TileStatus,
            value: 'A',
            buck: '',
            _id: '674222cca2bccaa21775b274',
            created: '2024-11-23T18:45:32.719Z',
            updated: '2024-11-23T18:45:32.719Z',
        },
        {
            status: 'normal' as TileStatus,
            value: 'I',
            buck: '',
            _id: '674222cca2bccaa21775b275',
            created: '2024-11-23T18:45:32.719Z',
            updated: '2024-11-23T18:45:32.719Z',
        },
        {
            status: 'normal' as TileStatus,
            value: 'O',
            buck: '',
            _id: '674222cca2bccaa21775b276',
            created: '2024-11-23T18:45:32.720Z',
            updated: '2024-11-23T18:45:32.720Z',
        },
        {
            status: 'normal' as TileStatus,
            value: 'E',
            buck: '',
            _id: '674222cca2bccaa21775b277',
            created: '2024-11-23T18:45:32.720Z',
            updated: '2024-11-23T18:45:32.720Z',
        },
        {
            status: 'normal' as TileStatus,
            value: 'T',
            buck: '',
            _id: '674222cca2bccaa21775b278',
            created: '2024-11-23T18:45:32.720Z',
            updated: '2024-11-23T18:45:32.720Z',
        },
        {
            status: 'normal' as TileStatus,
            value: 'T',
            buck: '',
            _id: '674222cca2bccaa21775b279',
            created: '2024-11-23T18:45:32.720Z',
            updated: '2024-11-23T18:45:32.720Z',
        },
        {
            status: 'normal' as TileStatus,
            value: 'X',
            buck: '',
            _id: '674222cca2bccaa21775b27a',
            created: '2024-11-23T18:45:32.720Z',
            updated: '2024-11-23T18:45:32.720Z',
        },
        {
            status: 'normal' as TileStatus,
            value: 'D',
            buck: '',
            _id: '674222cca2bccaa21775b27b',
            created: '2024-11-23T18:45:32.720Z',
            updated: '2024-11-23T18:45:32.720Z',
        },
        {
            status: 'normal' as TileStatus,
            value: 'I',
            buck: '',
            _id: '674222cca2bccaa21775b27c',
            created: '2024-11-23T18:45:32.720Z',
            updated: '2024-11-23T18:45:32.720Z',
        },
        {
            status: 'normal' as TileStatus,
            value: 'H',
            buck: '',
            _id: '674222cca2bccaa21775b27d',
            created: '2024-11-23T18:45:32.720Z',
            updated: '2024-11-23T18:45:32.720Z',
        },
        {
            status: 'normal' as TileStatus,
            value: 'Y',
            buck: '',
            _id: '674222cca2bccaa21775b27e',
            created: '2024-11-23T18:45:32.720Z',
            updated: '2024-11-23T18:45:32.720Z',
        },
        {
            status: 'normal' as TileStatus,
            value: 'E',
            buck: '',
            _id: '674222cca2bccaa21775b27f',
            created: '2024-11-23T18:45:32.720Z',
            updated: '2024-11-23T18:45:32.720Z',
        },
    ],
    logs: [],
    rounds: [],
    created: '2024-11-23T18:45:32.727Z',
    updated: '2024-11-23T18:45:55.300Z',
}

export default function PlayPage() {
    if (RENDER_LOG === 'true') console.log('<PlayPage /> rendered.')
    let content: ReactElement = <></>

    //const api = useAxios()

    //const auth = useAuthMe().data
    //const game: Game = useCurrentGame(auth?.currentGameId)?.data
    const auth: any = authTemp
    const game: any = gameTemp

    const player = useMemo(() => game?.players?.find((player: Player) => player.user === auth?._id), [auth?._id, game?.players])

    //const isTurn = player?.status === 'turn' ? true : false
    const [isTurn, setIsTurn] = useState(false)

    const { buildingPlay, setBuildingPlay, usingBuck, setUsingBuck, buckTile, setBuckTile } = useGameUi()
    const board = useBoard()
    const queues = useTurnQueues()
    const [turnRequest, setTurnRequest] = useAtom(turnRequestAtom)

    if (typeof turnRequest === 'string') console.log({ turnRequest })

    const tempTakeTurn = useCallback(() => {
        setIsTurn(true)
    }, [])

    const tempPassTurn = useCallback(() => {
        setIsTurn(false)
    }, [])

    const convertTilesToQueueTiles = useCallback((tiles: Tile[]): QueueTile[] => {
        return tiles?.map((tile: Tile) => ({ tile: tile?._id, value: tile?.value, status: 'normal', buck: '' } as QueueTile))
    }, [])

    const resetAllQueues = useCallback((): void => {
        queues.setStartingTiles([])
        queues.setTilesLeftQueue([])
        queues.setPlayerTilesQueue([])
        queues.setTilePickupQueue([])
        queues.setPickedUpTilesQueue([])
    }, [queues])

    const startPlaying = useCallback(() => {
        board.setPlayingBoard(() => {
            // const boardCopy = deepCopy(game?.board)
            // return boardCopy
            return { ...game?.board }
        })

        // ui tile queues
        resetAllQueues()

        // create new browser storage object, which we'll send to backend as a turn
        const newTurnRequest: TurnRequest = {
            playingStartTime: new Date(Date.now()),
        }
        setTurnRequest(newTurnRequest)

        // setup ui tiles queues
        if (player?.tiles) {
            const startingQueueTiles = convertTilesToQueueTiles(player?.tiles)
            queues.setStartingTiles(startingQueueTiles)
            queues.setTilesLeftQueue(startingQueueTiles)
            queues.setPlayerTilesQueue(startingQueueTiles)
            queues.setTilePickupQueue([])
            queues.setPickedUpTilesQueue([])
        }
        setBuildingPlay(true)
    }, [board, convertTilesToQueueTiles, game?.board, player?.tiles, queues, resetAllQueues, setBuildingPlay, setTurnRequest])

    const cancelPlaying = useCallback(() => {
        // ui tile queues
        resetAllQueues()

        // reset storage object
        setTurnRequest(null)

        // set ui source back to live - react query
        setBuildingPlay(false)
    }, [resetAllQueues, setBuildingPlay, setTurnRequest])

    const addToPickupQueue = useCallback(
        (_id: string, letter?: string) => {
            const playerTileIndex = queues.playerTilesQueue.findIndex((qTile) => qTile.tile === _id)

            if (playerTileIndex >= 0) {
                const tileToMove = queues.playerTilesQueue[playerTileIndex]

                if (tileToMove.value === '1' || tileToMove.value === '2') {
                    if (tileToMove?.tile && letter) {
                        //addToPickupQueue(tileToMove.tile, letter)
                        tileToMove.buck = letter
                        queues.setPlayerTilesQueue((prevPlayerTilesQueue) => {
                            const returnArray = [...prevPlayerTilesQueue] // clone array - immutability
                            returnArray.splice(playerTileIndex, 1) // delete element at playerTileIndex
                            return returnArray // return new array
                        })

                        queues.setTilePickupQueue((prevTilePickupQueue) => {
                            return [...prevTilePickupQueue, tileToMove] // clone array
                        })
                    }
                } else {
                    queues.setPlayerTilesQueue((prevPlayerTilesQueue) => {
                        const returnArray = [...prevPlayerTilesQueue] // clone array - immutability
                        returnArray.splice(playerTileIndex, 1) // delete element at playerTileIndex
                        return returnArray // return new array
                    })

                    queues.setTilePickupQueue((prevTilePickupQueue) => {
                        return [...prevTilePickupQueue, tileToMove] // clone array
                    })
                }
            }
            setBuckTile('')
            setUsingBuck(false)
        },
        [queues, setBuckTile, setUsingBuck]
    )

    const handleAddToPickupQueue = useCallback(
        (_id: string) => {
            const playerTileIndex = queues.playerTilesQueue.findIndex((qTile) => qTile.tile === _id)
            if (playerTileIndex >= 0) {
                const tileToMove = queues.playerTilesQueue[playerTileIndex]

                if (tileToMove.value === '1' || tileToMove.value === '2') {
                    if (tileToMove.tile) {
                        console.log('inhere')
                        setBuckTile(tileToMove.tile)
                        setUsingBuck(true)
                    }
                } else {
                    if (tileToMove.tile) {
                        addToPickupQueue(tileToMove.tile)
                    }
                }
            }
        },
        [addToPickupQueue, queues.playerTilesQueue, setBuckTile, setUsingBuck]
    )

    const removeFromPickupQueue = useCallback(
        (_id: string) => {
            const pickupTileIndex = queues.tilePickupQueue.findIndex((qTile) => {
                console.log({ qTile })
                return qTile.tile === _id
            })

            console.log({ pickupTileIndex })
            if (pickupTileIndex >= 0) {
                const tileToMove = queues.tilePickupQueue[pickupTileIndex]
                queues.setTilePickupQueue((prevTilePickupQueue) => {
                    const returnArray = [...prevTilePickupQueue]
                    returnArray.splice(pickupTileIndex, 1)
                    return returnArray
                })

                // remove the buck value when removing from the pickup queue. every time.
                tileToMove.buck = ''
                queues.setPlayerTilesQueue((prevPlayerTilesQueue) => {
                    return [...prevPlayerTilesQueue, tileToMove]
                })
            }
        },
        [queues]
    )

    const pickupTilesInPickupQueue = useCallback(() => {
        queues.setPickedUpTilesQueue([...queues.tilePickupQueue])
        queues.setTilePickupQueue([])
    }, [queues])

    // keyboard events
    useEffect(() => {
        const handleKeyUp = (e: KeyboardEvent) => {
            const keyReleased = e.key.toLowerCase()

            switch (buildingPlay) {
                case true:
                    switch (usingBuck) {
                        case true:
                            break
                        default:
                            switch (keyReleased) {
                                case 'backspace':
                                    if (queues.tilePickupQueue.length > 0) {
                                        console.log('im in')
                                        const pickupTileIndex = queues.tilePickupQueue.length - 1
                                        if (pickupTileIndex >= 0) {
                                            console.log('im in too')
                                            const tile = queues.tilePickupQueue[pickupTileIndex]
                                            if (tile.tile) removeFromPickupQueue(tile.tile)
                                        }
                                    }

                                    break

                                default:
                                    if (/^[a-z]$/.test(keyReleased) || /^[1-2]$/.test(keyReleased)) {
                                        const playerTileIndex = queues.playerTilesQueue.findIndex((qTile) => qTile.value === keyReleased.toUpperCase())
                                        if (playerTileIndex >= 0) {
                                            const tile = queues.playerTilesQueue[playerTileIndex]
                                            if (tile.tile) addToPickupQueue(tile.tile)
                                        }
                                    }
                                    break
                            }
                            break
                    }
                    break
                case false:
                    console.log('poop')
                    break
                default:
                    console.log('hello')
                    break
            }
        }

        window.addEventListener('keyup', handleKeyUp)

        return () => window.removeEventListener('keyup', handleKeyUp)
    }, [addToPickupQueue, buildingPlay, queues.playerTilesQueue, queues.tilePickupQueue, removeFromPickupQueue, usingBuck])

    content = (
        <>
            <div className="grid grid-cols-12 h-screen select-none">
                {/* LEFT BLOCK */}
                <div className="col-span-6 h-full bg-indigo-950 px-2 pt-2 pb-2">
                    {game?.board ? (
                        <>
                            {buildingPlay ? (
                                <>
                                    <RenderBoard board={board?.playingBoard} />
                                </>
                            ) : (
                                <>
                                    <RenderBoard board={game?.board} />
                                </>
                            )}
                        </>
                    ) : (
                        <></>
                    )}
                    <div className="flex p-4 pb-0 justify-center items-center">
                        {buildingPlay ? <h1 className="text-red-600">buildingPlayBoard</h1> : <h1 className="text-white">game.board</h1>}
                    </div>
                </div>
                {/* <!-- RIGHT BLOCK --> */}
                <div className="col-span-6 h-full grid bg-gray-900 overflow-y-auto">
                    <div className="row-start-1 row-end-11 p-8 pt-2">
                        {/* // HEADER */}
                        <div className="flex justify-left items-center pt-3 pb-4">
                            <div className="font-bold">
                                <a href="/" className="text-xl">
                                    <span className="text-emerald-500 bg-gray-300 border border-gray-700 p-2">InWord</span>
                                    <span className="text-white bg-gray-700 border border-gray-700 p-2">OUTWORD</span>
                                </a>
                            </div>
                            <div className="flex justify-center items-center">
                                <div className="text-2xl px-4 text-gray-500">{game?.name}</div>
                                {/* <GameClock gameCreatedAt={game?.created} /> */}
                            </div>
                            <div className="ml-auto">{/* <DropDownMenu menuTitleColorTw={'slate-100'} menuTitleHoverColorTw={'slate-400'} /> */}</div>
                        </div>

                        <TurnScoreTable players={game?.players} />

                        {/* // GAME COMPONENTS */}
                        <div className="mb-4 p-2 bg-gray-950 rounded-md">
                            <div className="flex flex-col p-2 justify-center items-center select-none bg-gray-950 rounded-md">
                                {isTurn ? (
                                    <>
                                        {buildingPlay ? (
                                            <>
                                                {usingBuck ? (
                                                    <>
                                                        <div className="flex justify-center items-center pb-4 text-sm tracking-widest text-gray-800">
                                                            BUCK TILE
                                                        </div>
                                                        <div className="mb-4 p-2 bg-slate-900 rounded-md select-none">
                                                            <div className="flex p-2 flex-nowrap gap-6 justify-center items-center">
                                                                <div className="p-2 rounded-md select-none">
                                                                    <div className="flex justify-center items-center rounded-md">
                                                                        <RenderBuckInput
                                                                            buckTile={buckTile}
                                                                            //setUsingBuck={setUsingBuck}
                                                                            addToPickupQueue={addToPickupQueue}
                                                                        />
                                                                    </div>
                                                                </div>
                                                            </div>
                                                        </div>
                                                    </>
                                                ) : (
                                                    <>
                                                        <div className="flex pb-2 justify-center">
                                                            {/* // ------------------------------------------- */}
                                                            <div className="mb-4 bg-gray-950 rounded-md select-none">
                                                                <div className="flex flex-col">
                                                                    {/* // left col */}
                                                                    {/* // Pickup letters */}
                                                                    <div className="flex flex-col justify-center items-center">
                                                                        <RenderPickupQueue
                                                                            tiles={queues.tilePickupQueue}
                                                                            setTiles={queues.setTilePickupQueue}
                                                                            removeFromPickupQueue={removeFromPickupQueue}
                                                                        />

                                                                        <div className="">
                                                                            <div className="flex">
                                                                                {queues?.playerTilesQueue?.length >= 0 ? (
                                                                                    <RenderSortableTiles
                                                                                        tiles={queues.playerTilesQueue}
                                                                                        setTiles={queues.setPlayerTilesQueue}
                                                                                        handleAddToPickupQueue={handleAddToPickupQueue}
                                                                                    />
                                                                                ) : (
                                                                                    <p className="text-xl text-red-500">You have no more letters this turn.</p>
                                                                                )}
                                                                            </div>
                                                                        </div>
                                                                    </div>
                                                                </div>
                                                            </div>
                                                        </div>
                                                    </>
                                                )}
                                            </>
                                        ) : (
                                            <>
                                                <div className="flex flex-col p-2 pb-4 justify-center">
                                                    <div className="flex justify-center items-center pb-4">
                                                        <h1 className="text-emerald-400 text-5xl play-font">It's Your Turn! Play or Pass?</h1>
                                                    </div>
                                                    <div className="flex justify-center items-center">
                                                        {/* <CountupProgressBar onComplete={() => console.log('done')} /> */}
                                                        {/* <TestComp /> */}
                                                        {/* <RenderProgressBar progress={100} /> */}
                                                    </div>
                                                    <div className="flex justify-center items-center w-full">
                                                        {/* <CountupProgressBar onComplete={() => console.log('done')} /> */}
                                                        {/* <CountdownProgressBar seconds={10} onComplete={() => console.log('done')} /> */}
                                                        {/* <RenderProgressBar progress={100} /> */}
                                                    </div>
                                                </div>
                                            </>
                                        )}
                                    </>
                                ) : (
                                    <>
                                        <div className="flex flex-col p-2 pb-4 justify-center">
                                            <h1 className="text-red-400 text-5xl play-font">It's Not Your Turn. Please wait...</h1>
                                        </div>
                                    </>
                                )}
                            </div>
                        </div>

                        {/* // GAME BUTTONS */}
                        <div className="mb-4 p-2 bg-gray-950 rounded-md">
                            <div className="flex p-2 justify-evenly items-center spa select-none bg-gray-950 rounded-md">
                                {isTurn ? (
                                    <>
                                        {buildingPlay ? (
                                            <>
                                                <Button
                                                    disabled={queues?.tilePickupQueue.length === 0}
                                                    size={'lg'}
                                                    className={`p-12 px-32 text-4xl tracking-widest bg-indigo-800 hover:bg-indigo-600 text-indigo-300 hover:text-indigo-100 active:bg-indigo-500`}
                                                    onClick={pickupTilesInPickupQueue}
                                                >
                                                    PICKUP
                                                </Button>
                                                <Button
                                                    //size={'default'}
                                                    className="p-12 px-24 text-4xl tracking-widest bg-indigo-800 hover:bg-indigo-600 text-indigo-300 hover:text-indigo-100 active:bg-indigo-500"
                                                    onClick={cancelPlaying}
                                                >
                                                    CANCEL
                                                </Button>
                                            </>
                                        ) : (
                                            <>
                                                <Button
                                                    size={'lg'}
                                                    className="p-8 px-16 bg-emerald-600 hover:bg-emerald-700 active:bg-sky-600"
                                                    onClick={startPlaying}
                                                >
                                                    MAKE PLAY
                                                </Button>
                                                <Button
                                                    size={'lg'}
                                                    className="p-8 px-16 bg-emerald-600 hover:bg-emerald-700 active:bg-sky-600"
                                                    onClick={tempPassTurn}
                                                >
                                                    PASS TURN
                                                </Button>
                                            </>
                                        )}
                                    </>
                                ) : (
                                    <>
                                        <Button size={'lg'} className="p-8 px-16 bg-emerald-600 hover:bg-emerald-700 active:bg-sky-600" onClick={tempTakeTurn}>
                                            TAKE TURN
                                        </Button>
                                    </>
                                )}
                            </div>
                        </div>
                        {/* <div className="mb-4 p-2 bg-gray-950 rounded-md">
                            <ToggleBox />
                        </div>
                        <div className="mb-4 p-2 bg-gray-950 rounded-md">
                            <PulsingButton />
                        </div> */}
                    </div>
                </div>
            </div>
            {/* TILES ATTACHED TO POINTER */}
            {queues?.pickedUpTilesQueue.length > 0 ? <PickedUpTiles tiles={queues?.pickedUpTilesQueue} /> : <></>}
        </>
    )

    return content
}
