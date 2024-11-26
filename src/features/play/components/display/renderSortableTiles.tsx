import { ItemInterface, ReactSortable } from 'react-sortablejs'
import { Button } from '../../../../app/components/shadcn/ui/button'
import BuckTile2 from '../tokens/misc/buckTile/buckTile2'
import { QueueTile } from '../../types/ui/queueTile'

type RenderSortableTilesProps = {
    tiles: QueueTile[]
    setTiles: (value: QueueTile[] | ((prev: QueueTile[]) => QueueTile[])) => void
    handleAddToPickupQueue: (_id: string) => void
}

export default function RenderSortableTiles({ tiles, setTiles, handleAddToPickupQueue }: RenderSortableTilesProps) {
    const shuffleTiles = () => {
        setTiles((prevTiles) => shuffleArray(prevTiles))
    }

    const shuffleArray = <T,>(array: T[]): T[] => {
        const shuffledArray = [...array]
        for (let i = shuffledArray.length - 1; i > 0; i--) {
            const j = Math.floor(Math.random() * (i + 1))
            ;[shuffledArray[i], shuffledArray[j]] = [shuffledArray[j], shuffledArray[i]]
        }
        return shuffledArray
    }

    return (
        <div className="flex flex-col justify-start items-center">
            <div className="flex justify-center items-center pb-4 text-sm tracking-widest text-gray-800">PLAYER TILES</div>
            <div className="mb-4 p-2 bg-slate-900 rounded-md select-none">
                <div className="flex p-2 flex-nowrap gap-6 justify-center items-center">
                    <>
                        <ReactSortable
                            className="flex gap-3"
                            list={tiles.map((tile: QueueTile) => ({ ...tile } as ItemInterface))}
                            //list={tiles.map((item) => ({ ...item } as ItemInterface))}
                            setList={(tiles) => {
                                //setTiles(newState as SortableTile[])
                                setTiles(tiles as QueueTile[])
                            }}
                            animation={220}
                        >
                            {tiles.map((tile: QueueTile, index) =>
                                tile?.tile ? (
                                    <a
                                        key={`sortedLetters-${index}`}
                                        type="button"
                                        onClick={() => {
                                            console.log(`tile.tile: ${tile?.tile}`)
                                            handleAddToPickupQueue(tile?.tile as string)
                                            return
                                        }}
                                    >
                                        <div className="flex flex-col rounded-md justify-center items-center min-w-[80px] min-h-[80px] text-5xl p-4 font-bold text-indigo-300 hover:text-indigo-100 bg-indigo-800 hover:bg-indigo-600">
                                            <div className="">{tile.value === '1' || tile.value === '2' ? <BuckTile2 /> : tile.value}</div>
                                            {/* <div className="flex justify-end text-xxxs">R</div> */}
                                        </div>
                                    </a>
                                ) : (
                                    <></>
                                )
                            )}
                        </ReactSortable>
                        <Button
                            key={'sert'}
                            size={'default'}
                            className="p-6 bg-indigo-800 hover:bg-indigo-600 text-indigo-300 hover:text-indigo-100 active:bg-indigo-500"
                            onClick={() => shuffleTiles()}
                        >
                            SHUFFLE
                        </Button>
                    </>
                </div>
            </div>
        </div>
    )
}
