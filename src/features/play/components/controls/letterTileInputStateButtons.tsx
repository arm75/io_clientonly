import { Button } from '../../../../app/components/shadcn/ui/button'
import { useAtom, useAtomValue } from 'jotai'
import { Tile } from '../../types/entity/tile'
import { sortedLettersAtom, sortedLettersInDialogAtom, showAdminBlockNamesAtom, chosenWordOrientationAtom } from '../../state/atoms/oldAtoms'

export default function LetterTileInputStateButtons(props: any): JSX.Element {
    console.log('<ChoosingPlayPositionStateButtons /> rendered...')

    const { advanceFn, buckTilePlayFn, cancelFn, passFn, turnState, submitTurnFn } = props

    const [sortedLetters, setSortedLetters] = useAtom(sortedLettersAtom)
    const [sortedLettersInDialog, setSortedLettersInDialog] = useAtom(sortedLettersInDialogAtom)
    const showAdminBlockNames = useAtomValue(showAdminBlockNamesAtom)
    const [chosenWordOrientation, setChosenWordOrientation] = useAtom(chosenWordOrientationAtom)
    //const [isBuildingPlay, setIsBuildingPlay] = useAtom(isBuildingPlayAtom)

    // useEffect(() => {
    // 	function transformLetters(letters: [string]) {
    // 		const sortableLetters: any = []
    // 		letters.forEach((letter: string, count: number) => {
    // 			sortableLetters.push({ id: count, name: letter })
    // 		})
    // 		return sortableLetters
    // 	}

    // 	if (letters) {
    // 		const transformedLetters = transformLetters(letters)
    // 		setSortedLetters(transformedLetters)
    // 	}
    // }, [letters, setSortedLetters])

    function toggleOrientation() {
        if (chosenWordOrientation === 'horizontal') {
            setChosenWordOrientation('vertical')
        } else {
            setChosenWordOrientation('horizontal')
        }
    }

    const shuffleArray = (array: Tile[]) => {
        const shuffledArray = [...array]
        for (let i = shuffledArray.length - 1; i > 0; i--) {
            const r = Math.random() * (i + 1)
            const j = Math.floor(r)
            const iThIndex = shuffledArray[i]
            const jThIndex = shuffledArray[j]
            shuffledArray[i] = jThIndex
            shuffledArray[j] = iThIndex
        }
        setSortedLettersInDialog(shuffledArray)
    }

    return (
        <div className="mb-4 p-2 bg-gray-950 rounded-md">
            <div className="flex p-2 justify-center items-center bg-gray-950 rounded-md">
                <div className="px-4">
                    <Button
                        size={'lg'}
                        className="p-8 bg-emerald-600 hover:bg-emerald-700 active:bg-sky-600"
                        onClick={() => shuffleArray(sortedLettersInDialog)}
                    >
                        PICKUP WORD
                    </Button>
                </div>
                <div className="px-4">
                    <Button size={'lg'} className="p-8 bg-emerald-600 hover:bg-emerald-700 active:bg-sky-600" onClick={() => buckTilePlayFn()}>
                        BUCK TILE PLAY
                    </Button>
                </div>
                <div className="px-4">
                    <Button size={'lg'} className="p-8 bg-gray-600 hover:bg-gray-700 active:bg-sky-600" onClick={() => cancelFn()}>
                        CANCEL
                    </Button>
                </div>
                <div className="px-4">
                    <Button size={'lg'} className="p-8 bg-gray-600 hover:bg-gray-700 active:bg-sky-600" onClick={() => toggleOrientation()}>
                        {chosenWordOrientation === 'horizontal' ? 'SET VERTICAL [V]' : 'SET HORIZONTAL [H]'}
                    </Button>
                </div>
                <div className="px-4">
                    <Button size={'lg'} className="p-8 bg-gray-600 hover:bg-gray-700 active:bg-sky-600" onClick={() => passFn()}>
                        PASS TURN
                    </Button>
                </div>
                <div className="px-4">
                    <Button size={'lg'} className="p-8 bg-gray-600 hover:bg-gray-700 active:bg-sky-600" onClick={() => submitTurnFn()}>
                        SUBMIT TURN
                    </Button>
                </div>
            </div>
            <div className="flex p-4 pb-0 justify-end">
                {showAdminBlockNames ? <h1 className="text-red-600">&lt;ChoosingPlayPositionStateButtons /&gt;</h1> : null}
            </div>
        </div>
    )
}
