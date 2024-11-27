import { useEffect, useRef } from 'react'
import { QueueTile } from '../../types/ui/queueTile'

const RENDER_LOG = import.meta.env.VITE_APP_RENDER_LOG

type PickedUpTilesProps = {
    tiles: QueueTile[]
}

const PickedUpTiles = ({ tiles }: PickedUpTilesProps) => {
    if (RENDER_LOG === 'true') console.log('<ChosenWordToPlay> rendered...')

    const bsDivRef = useRef<HTMLDivElement>(null)

    useEffect(() => {
        let x: number, y: number

        const handleMouseMove = (event: MouseEvent) => {
            x = event.clientX
            y = event.clientY

            if (typeof x !== 'undefined' && bsDivRef.current) {
                bsDivRef.current.style.left = x + 'px'
                bsDivRef.current.style.top = y + 'px'
            }
        }

        window.addEventListener('mousemove', handleMouseMove, false)

        return () => {
            window.removeEventListener('mousemove', handleMouseMove, false)
        }
    }, [])

    return (
        <div className={`fixed top-1/2 left-1/2 transform -translate-x-[18px] -translate-y-[36px] flex pointer-events-none z-50`} ref={bsDivRef}>
            {tiles?.map((tile: QueueTile, index: number) => (
                <div
                    key={`picked-up-${index}`}
                    className={`letter p-4 flex justify-center items-center w-[50px] h-[50px] border-indigo-800 border-2 text-[1.7rem] text-indigo-700 bg-indigo-200 `}
                >
                    {' '}
                    {tile?.value?.toUpperCase()}
                </div>
            ))}
        </div>
    )
}

export default PickedUpTiles
