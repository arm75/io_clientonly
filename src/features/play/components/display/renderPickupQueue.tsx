import { ItemInterface, ReactSortable } from 'react-sortablejs'
import { QueueTile } from '../../types/ui/queueTile'
import { X } from 'lucide-react'
import BuckTile3 from '../tokens/misc/buckTile/buckTile3'

type RenderPickupQueueProps = {
    tiles: QueueTile[]
    setTiles: (value: QueueTile[] | ((prev: QueueTile[]) => QueueTile[])) => void
    removeFromPickupQueue: (_id: string) => void
}

export default function RenderPickupQueue({ tiles, setTiles, removeFromPickupQueue }: RenderPickupQueueProps) {
    return (
        <div className="flex flex-col justify-start items-center pb-10 select-none">
            <div className="flex justify-center items-center pb-4 text-sm tracking-widest text-gray-800">PICKUP QUEUE</div>
            {tiles.length > 0 ? (
                <>
                    <div className="flex flex-wrap gap-2 justify-center items-center">
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
                            {tiles.map((tile: QueueTile, index, tiles) => {
                                if (tile?.tile) {
                                    return (
                                        <div key={`pickupQueue-${index}`} className="queueBox flex justify-center group">
                                            <div className="tileBox p-1 pr-2 flex w-full max-w-[200px] min-w-[110px] min-h-[130px] rounded-2xl text-indigo-500 border-8 border-indigo-500 group-hover:text-indigo-300 group-hover:border-indigo-300">
                                                {/* First Column */}
                                                <div className="firstColumn flex items-center justify-center w-2/3">
                                                    {tile?.value === '1' || tile?.value === '2' ? (
                                                        <div className="tileLetter text-6xl py-4">{tile?.buck?.toUpperCase()}</div>
                                                    ) : (
                                                        // <div className="buckyIcon flex justify-end items-center text-lg">🦌</div>
                                                        <div className="tileLetter text-6xl py-4">{tile?.value?.toUpperCase()}</div>
                                                    )}
                                                </div>

                                                {/* Second Column */}
                                                <div className="secondColumn flex flex-col relative w-1/3">
                                                    <div className="topRight absolute top-0 right-0 text-xs">
                                                        <div className="flex flex-col justify-start items-center text-center">
                                                            <div className="flex justify-start items-center text-center">
                                                                <X onClick={() => removeFromPickupQueue(tile?.tile as string)} className="w-[1rem] h-[1rem]" />
                                                            </div>
                                                            {tiles?.length - 1 === index ? <div className="text-center text-xxxs">(BKSP)</div> : <></>}
                                                        </div>
                                                    </div>
                                                    <div className="bottomRight absolute bottom-0 right-0 text-xs">
                                                        {tile?.value === '1' || tile?.value === '2' ? (
                                                            <div className="buckyIcon flex justify-end items-center pb-1">
                                                                <BuckTile3 />
                                                            </div>
                                                        ) : (
                                                            // <div className="buckyIcon flex justify-end items-center text-lg">🦌</div>
                                                            <></>
                                                        )}
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                    )
                                }
                            })}
                        </ReactSortable>
                    </div>
                </>
            ) : (
                <div className="flex flex-wrap gap-2 justify-center items-center">
                    <div className="queueBox flex justify-center">
                        <div className="tileBox p-1 pr-2 flex justify-center items-center w-full max-w-[200px] min-w-[110px] min-h-[130px] rounded-2xl text-slate-700 border-8 border-slate-800 hover:text-slate-500 hover:border-slate-500">
                            (EMPTY)
                        </div>
                    </div>
                </div>
            )}
        </div>
    )
}
