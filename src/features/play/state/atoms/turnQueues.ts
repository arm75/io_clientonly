import { atom } from 'jotai'
import { QueueTile } from '../../types/ui/queueTile'

// set at the beginning of the TURN, by converting game.tiles to QueueTiles,
export const startingTilesAtom = atom<QueueTile[]>([])
startingTilesAtom.debugLabel = '___startingTiles___'

// the TILES the player has left THIS turn, this is set after each PLAY, initially set to startingTiles
export const tilesLeftQueueAtom = atom<QueueTile[]>([])
tilesLeftQueueAtom.debugLabel = '___tilesLeftQueue___'

// the tiles to display in RenderPlayerTiles. this is constantly changing, while player selects tiles
export const playerTilesQueueAtom = atom<QueueTile[]>([])
playerTilesQueueAtom.debugLabel = '___playerTilesQueue___'

// the tiles to display in RenderPickupQueue. this is constantly changing while player selects tiles
export const tilePickupQueueAtom = atom<QueueTile[]>([])
tilePickupQueueAtom.debugLabel = '___tilePickupQueue___'

// tiles that should be attached to the mouse cursor...
export const pickedUpTilesQueueAtom = atom<QueueTile[]>([])
pickedUpTilesQueueAtom.debugLabel = '___pickedUpTilesQueue___'
