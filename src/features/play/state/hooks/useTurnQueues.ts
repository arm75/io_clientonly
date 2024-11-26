import { useAtom } from 'jotai'
import { startingTilesAtom, tilesLeftQueueAtom, playerTilesQueueAtom, tilePickupQueueAtom, pickedUpTilesQueueAtom } from '../atoms/turnQueues'

export const useTurnQueues = () => {
    const [startingTiles, setStartingTiles] = useAtom(startingTilesAtom)

    const [tilesLeftQueue, setTilesLeftQueue] = useAtom(tilesLeftQueueAtom)

    const [playerTilesQueue, setPlayerTilesQueue] = useAtom(playerTilesQueueAtom)

    const [tilePickupQueue, setTilePickupQueue] = useAtom(tilePickupQueueAtom)

    const [pickedUpTilesQueue, setPickedUpTilesQueue] = useAtom(pickedUpTilesQueueAtom)

    return {
        startingTiles,
        setStartingTiles,
        tilesLeftQueue,
        setTilesLeftQueue,
        playerTilesQueue,
        setPlayerTilesQueue,
        tilePickupQueue,
        setTilePickupQueue,
        pickedUpTilesQueue,
        setPickedUpTilesQueue,
    }
}
