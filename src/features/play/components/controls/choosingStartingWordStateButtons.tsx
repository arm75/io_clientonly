import { useEffect } from 'react'
import { Button } from '../../../../app/components/shadcn/ui/button'
import { useAtom, useAtomValue } from 'jotai'
import { Tile } from '../../types/entity/tile'
import { sortedLettersAtom, showAdminBlockNamesAtom } from '../../state/atoms/oldAtoms'

export default function ChoosingStartingWordStateButtons(props: any): JSX.Element {
    console.log('<ChoosingStartingWordStateButtons /> rendered...')

    const { advanceFn, cancelFn, passFn, turnState, turnStateSend, submitTurnFn, letters } = props

    const [sortedLetters, setSortedLetters] = useAtom(sortedLettersAtom)
    const showAdminBlockNames = useAtomValue(showAdminBlockNamesAtom)

    useEffect(() => {
        function transformLetters(letters: [string]) {
            const sortableLetters: any = []
            letters.forEach((letter: string, count: number) => {
                sortableLetters.push({ id: count, name: letter })
            })
            return sortableLetters
        }

        if (letters) {
            const transformedLetters = transformLetters(letters)
            setSortedLetters(transformedLetters)
        }
    }, [letters, setSortedLetters])

    const shuffleArray = (array: Tile[]) => {
        const shuffledArray = [...array]
        for (let i = shuffledArray.length - 1; i > 0; i--) {
            const j = Math.floor(Math.random() * (i + 1))
            ;[shuffledArray[i], shuffledArray[j]] = [shuffledArray[j], shuffledArray[i]]
        }
        setSortedLetters(shuffledArray)
    }

    return (
        <div className="mb-4 p-2 bg-gray-950 rounded-md">
            <div className="flex p-2 justify-center items-center select-none bg-gray-950 rounded-md">
                <div className="px-4">
                    <Button
                        size={'lg'}
                        className="h-[60px] w-96 bg-emerald-600 hover:bg-emerald-700 active:bg-sky-600"
                        onClick={() => shuffleArray(sortedLetters)}
                    >
                        CANCEL (ESC)
                    </Button>
                </div>
                <div className="px-4">
                    <Button size={'lg'} className="h-[60px] w-96 bg-gray-600 hover:bg-gray-700 active:bg-sky-600" onClick={() => shuffleArray(sortedLetters)}>
                        PASS TURN (P)
                    </Button>
                </div>
            </div>
            <div className="flex p-4 pb-0 justify-end">
                {showAdminBlockNames ? <h1 className="text-red-600">&lt;ChoosingStartingWordStateButtons /&gt;</h1> : null}
            </div>
        </div>
    )
}
