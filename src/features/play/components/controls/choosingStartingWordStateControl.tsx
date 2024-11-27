// import { useAtom, useSetAtom, useAtomValue } from 'jotai'
// import { useAuthMe } from '../../../../app/auth/useAuthMe'
// import { useCurrentGame } from '../../queries/useCurrentGame'
// import { useMemo } from 'react'
// import { WordListWord } from '../../../../app/types/stuffToFix'
// import SortableTiles from '../display/renderSortableTiles'
// import {
//     selectedStartingWordAtom,
//     letterHoverStatesResetAtom,
//     letterSelectStatesResetAtom,
//     showAdminBlockNamesAtom,
//     letterHoverStatesAtom,
//     letterSelectStatesAtom,
//     letterTilesAtTurnStartAtom,
//     letterTilesAtom,
//     letterTilesAttachedToPointerAtom,
// } from '../../state/atoms/oldAtoms'

// export default function ChoosingStartingWordStateControl(props: any): JSX.Element {
//     console.log('<ChoosingStartingWordStateControl /> rendered...')

//     const { advanceFn, cancelFn, passFn, turnState, turnStateSend, submitTurnFn, letters, selectedWordId } = props

//     // const api = useAxios()
//     const auth = useAuthMe()?.data
//     const game = useCurrentGame(auth?.currentGameId)?.data

//     const [selectedStartingWord, setSelectedStartingWord] = useAtom(selectedStartingWordAtom)
//     // const [sortedLettersInDialog, setSortedLettersInDialog] = useAtom(sortedLettersInDialogAtom)
//     // const [gameTilesToDisplay, setGameTilesToDisplay] = useAtom(gameTilesToDisplayAtom)
//     const letterHoverStatesReset = useAtomValue(letterHoverStatesResetAtom)
//     const letterSelectStatesReset = useAtomValue(letterSelectStatesResetAtom)
//     const showAdminBlockNames = useAtomValue(showAdminBlockNamesAtom)
//     const setLetterHoverStates = useSetAtom(letterHoverStatesAtom)
//     const setLetterSelectStates = useSetAtom(letterSelectStatesAtom)

//     // variables i am keeping FOR SURE
//     const [letterTilesAtTurnStart, setLetterTilesAtTurnStart] = useAtom(letterTilesAtTurnStartAtom)
//     const [letterTiles, setLetterTiles] = useAtom(letterTilesAtom)
//     const [letterTilesAttachedToPointer, setLetterTilesAttachedToPointer] = useAtom(letterTilesAttachedToPointerAtom)

//     // const [sortedLetters, setSortedLetters] = useAtom(sortedLettersAtom)
//     // const setHoverPointerCoordinates = useSetAtom(hoverPointerCoordinatesAtom)
//     // const setHoverCoordinates = useSetAtom(hoverCoordinatesAtom)
//     // const setHoverPointerCookie = useSetAtom(hoverPointerCookieAtom)
//     // const setHoverCookies = useSetAtom(hoverCookiesAtom)
//     // const setAttachChosenWordToPointer = useSetAtom(attachChosenWordToPointerAtom)
//     //const [sortedLetters, setSortedLetters] = useAtom(sortedLettersAtom)
//     //const showAdminBlockNames = useAmVtoalue(showAdminBlockNamesAtom)

//     const allHorizontalWordsWithSelectedProp = useMemo(() => {
//         if (!game?.allHorizontalWords) return []

//         return game?.allHorizontalWords?.map((word: Partial<WordListWord>) => ({
//             ...word,
//             selected: word.opId === selectedStartingWord.opId,
//         }))
//     }, [game?.allHorizontalWords, selectedStartingWord.opId])

//     const allVerticalWordsWithSelectedProp = useMemo(() => {
//         if (!game?.allVerticalWords) return []
//         return game?.allVerticalWords?.map((word: any) => ({
//             selected: word.opId === selectedStartingWord.opId,
//         }))
//     }, [game?.allVerticalWords, selectedStartingWord.opId])

//     function handleHorizontalWordListSelect(wordObj: Partial<WordListWord>) {
//         handleWordListSelectReset()
//         //console.log(`Setting selected H word: ${wordObj.word}`)
//         setSelectedStartingWord(wordObj)
//         //console.log(`Setting letter select states for H word: ${wordObj.word}`)
//         if (typeof wordObj.length === 'number') {
//             for (let count = 0; count < wordObj.length; count++) {
//                 setLetterSelectStates((prevLetterSelectStates) => {
//                     const rowIndexToSet = wordObj.rowOrCol !== undefined ? wordObj.rowOrCol : undefined
//                     const colIndexToSet = wordObj.startIndex !== undefined ? wordObj.startIndex + count : undefined
//                     // Create a new outer array
//                     const newStates = [...prevLetterSelectStates]
//                     // Create a new inner array
//                     if (rowIndexToSet) newStates[rowIndexToSet] = [...newStates[rowIndexToSet]]
//                     // Update the specific value, which will cause the hover to lightup in the cell
//                     console.log(`HCoords: (${rowIndexToSet}, ${colIndexToSet})`)
//                     if (rowIndexToSet && colIndexToSet) newStates[rowIndexToSet][colIndexToSet] = true
//                     //console.log("New HORIZONTAL Letter Hover States", newStates)
//                     return newStates
//                 })
//             }
//         }
//         handleWordListHoverReset()
//         advanceFn()
//     }

//     function handleVerticalWordListSelect(wordObj: Partial<WordListWord>) {
//         handleWordListSelectReset()
//         //console.log(`Setting selected V word: ${wordObj.word}`)
//         setSelectedStartingWord(wordObj)
//         //console.log(`Setting letter hover states for V word: ${wordObj.word}`)
//         if (typeof wordObj.length === 'number') {
//             for (let count = 0; count < wordObj.length; count++) {
//                 setLetterSelectStates((prevLetterSelectStates) => {
//                     const rowIndexToSet = wordObj.startIndex !== undefined ? wordObj.startIndex + count : undefined
//                     const colIndexToSet = wordObj.rowOrCol !== undefined ? wordObj.rowOrCol : undefined
//                     // Create a new outer array
//                     const newStates = [...prevLetterSelectStates]
//                     // Create a new inner array
//                     if (rowIndexToSet) newStates[rowIndexToSet] = [...newStates[rowIndexToSet]]
//                     // Update the specific value, which will cause the hover to lightup in the cell
//                     console.log(`VCoords: (${rowIndexToSet}, ${colIndexToSet})`)
//                     if (rowIndexToSet && colIndexToSet) newStates[rowIndexToSet][colIndexToSet] = true
//                     //console.log("New VERTICAL Letter Hover States", newStates)
//                     return newStates
//                 })
//             }
//         }
//         handleWordListHoverReset()
//         advanceFn()
//     }

//     function handleWordListSelectReset() {
//         setLetterSelectStates(letterSelectStatesReset)
//     }

//     function handleHorizontalWordListHover(wordObj: Partial<WordListWord>) {
//         //console.log({ wordObj })
//         //console.log(`Setting letter hover states for H word: ${wordObj.word}`)
//         if (typeof wordObj.length === 'number' && typeof wordObj.startIndex === 'number') {
//             for (let count = 0; count < wordObj?.length; count++) {
//                 setLetterHoverStates((prevLetterHoverStates) => {
//                     const rowIndexToSet = wordObj.rowOrCol !== undefined ? wordObj.rowOrCol : undefined
//                     const colIndexToSet = wordObj.startIndex !== undefined ? wordObj.startIndex + count : undefined
//                     // Create a new outer array
//                     const newStates = [...prevLetterHoverStates]
//                     // Create a new inner array
//                     if (rowIndexToSet) newStates[rowIndexToSet] = [...newStates[rowIndexToSet]]
//                     // Update the specific value, which will cause the hover to lightup in the cell
//                     console.log(`HCoords: (${rowIndexToSet}, ${colIndexToSet})`)
//                     if (rowIndexToSet && colIndexToSet) newStates[rowIndexToSet][colIndexToSet] = true
//                     //console.log("New HORIZONTAL Letter Hover States", newStates)
//                     return newStates
//                 })
//             }
//         }
//     }

//     function handleVerticalWordListHover(wordObj: Partial<WordListWord>) {
//         //console.log({ wordObj })
//         //console.log(`Setting letter hover states for V word: ${wordObj.word}`)
//         if (typeof wordObj.length === 'number' && typeof wordObj.startIndex === 'number') {
//             for (let count = 0; count < wordObj.length; count++) {
//                 setLetterHoverStates((prevLetterHoverStates) => {
//                     const rowIndexToSet = wordObj.startIndex !== undefined ? wordObj.startIndex + count : undefined
//                     const colIndexToSet = wordObj.rowOrCol !== undefined ? wordObj.rowOrCol : undefined
//                     // Create a new outer array
//                     const newStates = [...prevLetterHoverStates]
//                     // Create a new inner array
//                     if (rowIndexToSet) newStates[rowIndexToSet] = [...newStates[rowIndexToSet]]
//                     // Update the specific value, which will cause the hover to lightup in the cell
//                     console.log(`VCoords: (${rowIndexToSet}, ${colIndexToSet})`)
//                     if (rowIndexToSet && colIndexToSet) newStates[rowIndexToSet][colIndexToSet] = true
//                     //console.log("New VERTICAL Letter Hover States", newStates)
//                     return newStates
//                 })
//             }
//         }
//     }

//     function handleWordListHoverReset() {
//         setLetterHoverStates(letterHoverStatesReset)
//     }

//     return (
//         <div className="mb-4 p-2 bg-gray-950 rounded-md select-none">
//             <div className="flex p-2 pb-4 justify-center">
//                 <h1 className="text-emerald-400 text-2xl play-font">
//                     <>&lowast;&nbsp;Choose Starting Word&nbsp;&lowast;</>
//                 </h1>
//             </div>
//             <div className="flex p-2 pb-16 justify-center items-start select-none bg-gray-950 rounded-md">
//                 <div className="px-4 w-[50%]">
//                     <h6 className="text-lg text-gray-500 text-center">Horizontal Words</h6>
//                     <div className="flex justify-center flex-wrap">
//                         {allHorizontalWordsWithSelectedProp?.map((wordObject: any, wordObjectIndex: number) => (
//                             <div
//                                 key={`allHWords-${wordObjectIndex}`}
//                                 onClick={() => handleHorizontalWordListSelect(wordObject)}
//                                 onMouseOver={() => handleHorizontalWordListHover(wordObject)}
//                                 onMouseOut={() => handleWordListHoverReset()}
//                                 className="p-[2px]"
//                             >
//                                 <div
//                                     className={`${
//                                         wordObject.selected ? 'bg-orange-600' : 'bg-slate-500'
//                                     } p-[1px] px-4 rounded-md text-md text-white hover:bg-sky-500 active:bg-orange-600`}
//                                 >
//                                     {wordObject.word}
//                                 </div>
//                             </div>
//                         ))}
//                     </div>
//                 </div>
//                 <div className="px-4 w-[50%]">
//                     <h6 className="text-lg text-gray-500 text-center">Vertical Words</h6>
//                     <div className="flex justify-center flex-wrap">
//                         {allVerticalWordsWithSelectedProp?.map((wordObject: any, wordObjectIndex: number) => (
//                             <div
//                                 key={`allVWords-${wordObjectIndex}`}
//                                 onClick={() => handleVerticalWordListSelect(wordObject)}
//                                 onMouseOver={() => handleVerticalWordListHover(wordObject)}
//                                 onMouseOut={() => handleWordListHoverReset()}
//                                 className="p-[2px]"
//                             >
//                                 <div
//                                     className={`${
//                                         wordObject.selected ? 'bg-orange-600' : 'bg-slate-500'
//                                     } p-[1px] px-4 rounded-md text-md text-white hover:bg-sky-500 active:bg-orange-600`}
//                                 >
//                                     {wordObject.word}
//                                 </div>
//                             </div>
//                         ))}
//                     </div>
//                 </div>
//             </div>
//             <div className="">
//                 <div className="flex-col justify-center items-center">
//                     <div className="flex pb-4 justify-center items-center">
//                         <h1 className="text-emerald-400 text-2xl play-font">
//                             <>&lowast;&nbsp;Your Letters&nbsp;&lowast;</>
//                         </h1>
//                     </div>
//                     {letterTiles.length > 0 ? (
//                         <div className="flex justify-center">
//                             <SortableTiles tiles={letterTiles} setTiles={setLetterTiles} />
//                         </div>
//                     ) : (
//                         <p className="text-xl text-red-500">You have no more letters this turn.</p>
//                     )}
//                 </div>
//             </div>
//             <div className="flex p-4 pb-0 justify-end">
//                 {showAdminBlockNames ? <h1 className="text-red-600">&lt;ChoosingStartingWordStateControl /&gt;</h1> : null}
//             </div>
//         </div>
//     )
// }
