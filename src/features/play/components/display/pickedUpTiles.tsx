import { useAtomValue } from 'jotai'
import { useEffect, useRef } from 'react'
import { chosenWordAtom, chosenWordLengthAtom, isValidPlayAtom, chosenWordOrientationAtom, spaceBlockHoverLetterAtom } from '../../state/atoms/oldAtoms'
import { QueueTile } from '../../types/ui/queueTile'
import { tilesLeftQueueAtom } from '../../state/atoms/turnQueues'

const RENDER_LOG = import.meta.env.VITE_APP_RENDER_LOG

type PickedUpTilesProps = {
    tiles: QueueTile[]
}

const PickedUpTiles = ({ tiles }: PickedUpTilesProps) => {
    if (RENDER_LOG === 'true') console.log('<ChosenWordToPlay> rendered...')

    const bsDivRef: any = useRef(null)

    const chosenWord = useAtomValue(chosenWordAtom)
    const chosenWordLength = useAtomValue(chosenWordLengthAtom)
    const isValidPlay = useAtomValue(isValidPlayAtom)
    const chosenWordOrientation = useAtomValue(chosenWordOrientationAtom)
    const spaceBlockHoverLetter = useAtomValue(spaceBlockHoverLetterAtom)

    //console.log({ isValidPlay })

    useEffect(() => {
        let x: number, y: number

        const handleMouseMove = (event: any) => {
            x = event.clientX
            y = event.clientY

            if (typeof x !== 'undefined' && bsDivRef.current) {
                bsDivRef.current.style.left = x + 'px'
                bsDivRef.current.style.top = y + 'px'
            }
        }

        // Add event listener on component mount
        window.addEventListener('mousemove', handleMouseMove, false)

        // Clean up event listener on component unmount
        return () => {
            window.removeEventListener('mousemove', handleMouseMove, false)
        }
    }, []) // Empty dependency array to run the effect only once on mount

    return (
        <div
            className={`fixed ${chosenWordLength >= 1 ? 'border-4' : ''} ${
                isValidPlay ? 'border-green-500' : 'border-red-500'
            } top-1/2 left-1/2 transform -translate-x-[18px] -translate-y-[36px] flex ${
                chosenWordOrientation === 'vertical' ? 'flex-col' : ''
            } pointer-events-none z-50`}
            // className="fixed bg-white text-red-500 top-1/2 left-1/2 transform -translate-x-[46px] -translate-y-1/2 flex pointer-events-none z-50"
            ref={bsDivRef}
        >
            {tiles?.map((tile: QueueTile, index: number) => (
                // <div
                //     key={`picked-up-${index}`}
                //     className={`letter p-4 flex justify-center items-center w-[46px] h-[46px] border-4 border-black text-[1.7rem] bg-white
                //     ${char === ' ' && spaceBlockHoverLetter ? 'text-red-500' : 'text-black'} `}
                // >
                <div
                    key={`picked-up-${index}`}
                    className={`letter p-4 flex justify-center items-center w-[50px] h-[50px] border-8 border-indigo-800 border-2 text-[1.7rem] text-indigo-700 bg-indigo-200 `}
                >
                    {' '}
                    {tile?.value?.toUpperCase()}
                </div>
            ))}
        </div>
    )
}

export default PickedUpTiles
