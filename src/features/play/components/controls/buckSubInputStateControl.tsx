// import { useEffect, useRef } from 'react'
// import { useAtom, useSetAtom, useAtomValue } from 'jotai'
// import { Input } from '../../../../app/components/shadcn/ui/input'
// import { useAuthMe } from '../../../../app/auth/useAuthMe'
// import { useCurrentGame } from '../../queries/useCurrentGame'
// import MiniKeyboardFormExample from '../input/miniOnScreenKeyboard/miniKeyboardFormExample'
// import { Tile } from '../../types/entity/tile'
// import {
//     chooseWordFormValueAtom,
//     sortedLettersInDialogAtom,
//     chosenWordAtom,
//     isChosenWordFormInputFocusedAtom,
//     sortedLettersAtom,
//     sortedLettersForBuildingPlayAtom,
//     showAdminBlockNamesAtom,
// } from '../../state/atoms/oldAtoms'

// export default function BuckSubInputStateControl(props: any): JSX.Element {
//     console.log('<BuckSubInputStateControl /> rendered...')

//     const inputRef = useRef<HTMLInputElement | null>(null)

//     const authMeQueryData = useAuthMe()
//     const currentGameQueryData = useCurrentGame(authMeQueryData?.data?.currentGameId)

//     const [formValue, setFormValue] = useAtom(chooseWordFormValueAtom)
//     const [sortedLettersInDialog, setSortedLettersInDialog] = useAtom(sortedLettersInDialogAtom)
//     const setWordFragment = useSetAtom(chosenWordAtom)
//     // const [turnWordPlays, setTurnWordPlays] = useAtom(turnWordPlaysAtom)
//     // const [boardForChoosePosition, setBoardForChoosePosition] = useAtom(boardForChoosePositionAtom)
//     // const [checkForNewWords, setCheckForNewWords] = useAtom(checkForNewWordsAtom)
//     // const [showGameTips, setShowGameTips] = useAtom(showGameTipsAtom)
//     const setIsChosenWordFormInputFocused = useSetAtom(isChosenWordFormInputFocusedAtom)
//     const sortedLetters = useAtomValue(sortedLettersAtom)
//     const sortedLettersForBuildingPlay = useAtomValue(sortedLettersForBuildingPlayAtom)
//     const showAdminBlockNames = useAtomValue(showAdminBlockNamesAtom)
//     //const selectedStartingWord = useAtomValue(selectedStartingWordAtom)

//     useEffect(() => {
//         inputRef?.current?.focus()
//     }, [])

//     useEffect(() => {
//         setWordFragment({ word: '' })
//     }, [setWordFragment])

//     useEffect(() => {
//         if (sortedLetters) {
//             setSortedLettersInDialog(sortedLettersForBuildingPlay)
//         }
//     }, [setSortedLettersInDialog, sortedLetters, sortedLettersForBuildingPlay])

//     const handleOnBlur = () => {
//         console.log('onBlur occurred')
//         setIsChosenWordFormInputFocused(false)
//     }

//     // this function runs every time the Pickup Letters box value changes...
//     const handleOnChange = (event: any) => {
//         console.log('\n\n\n\n---------------BEGIN handleOnChange------------------')

//         // get the current field value
//         const { value } = event.target
//         console.log({ value })

//         // The onChange handler needs to do 2 main things:
//         // 1. Update the available letters in the letters box display below the form input, and
//         // 2. Filter and Update the value displayed in the text input box
//         // a) Filter: it only allows available letters to be typed
//         // b) Whatever is typed, is updated in state, the input box reflects that state

//         // 1> UPDATE THE LETTERS BOX DISPLAY
//         // create a single dimensional array of characters (strings of length=1) that reflects the current field value
//         // so, if value is 'hello', the result is ['h', 'e', 'l', 'l', 'o']
//         const valueAsArray = Array.from(value as string)
//         console.log({ valueAsArray })

//         // const someItemTypeArray = [
//         // 	{ id: 0, name: "A" },
//         // 	{ id: 1, name: "B" },
//         // 	{ id: 2, name: "C" },
//         // 	{ id: 3, name: "D" },
//         // 	{ id: 4, name: "E" },
//         // ]

//         // create an ItemType array, a copy of the current available letters atom
//         // that I will then use to trim down on each change to match available letters
//         // start it with ALL the players current letters
//         console.log({ sortedLetters })

//         const sortedLettersToTrim: Tile[] = [...sortedLettersForBuildingPlay]

//         valueAsArray.forEach((char: string) => removeOneObjectOccurrence(sortedLettersToTrim, char.toUpperCase()))

//         //const sortedLettersToTrim: ItemType[] = someItemTypeArray

//         // trim the array
//         // remove the object from trim array, matching each letter in the current field value

//         console.log({ sortedLetters })
//         console.log({ sortedLettersToTrim })
//         console.log({ sortedLettersInDialog })
//         console.log({ sortedLettersForBuildingPlay })

//         // and finally, set the letters to display in the letters box
//         setSortedLettersInDialog(sortedLettersToTrim)

//         // 2> FILTER/UPDATE THE TEXT INPUT FIELD STATE VALUE (which updates the value in the text box)
//         // set the STATE, but only if it is a valid available letter, which decreases on each change
//         setFormValue((previousValue: string) => {
//             console.log({ previousValue })
//             // get the most recent key pressed
//             const lastKeyPressed = value?.length > previousValue?.length ? value.slice(-1) : ''

//             // is this key a letter, space, or other (backspace, delete, etc...)?
//             // first, if it is a letter
//             if (/^[A-Za-z]+$/.test(lastKeyPressed)) {
//                 console.log('Letter detected.')

//                 // first, create a temporary array of all the player's letters
//                 const tempLettersArray = sortedLettersForBuildingPlay.map((letterObject: Tile) => letterObject.value)
//                 //const tempLettersArray = [...escapedLetters]

//                 // next, remove the letters from the temp array that already exist in the form field
//                 // for each letter
//                 for (const letter of previousValue) {
//                     // is this letter in the array?
//                     const indexToRemove = tempLettersArray.indexOf(letter.toUpperCase())
//                     // if it is, remove it
//                     if (indexToRemove !== -1) {
//                         tempLettersArray.splice(indexToRemove, 1) // Remove one element at the found index
//                     }
//                 }

//                 // then, does this current key exist in the array?
//                 const index = tempLettersArray.indexOf(lastKeyPressed.toUpperCase())

//                 // if so, remove it
//                 if (index !== -1) {
//                     // The string exists, so remove it
//                     tempLettersArray.splice(index, 1)
//                     // set the state!
//                     return value
//                 } else {
//                     // the key doesn't exist in array, so it isn't a valid key press
//                     // set the OLD value again (so no scheduled update in react)
//                     return previousValue
//                 }
//                 // the key is a digit, non-space, or non-whitespace, for some reason, this doesn't match
//             } else if (/^[0-9]|[^\w\s]+$/.test(lastKeyPressed)) {
//                 console.log('Digit, Non-Space, or Non-Whitespace detected.')
//                 return previousValue
//                 // the key is a dash, underscore, plus, equal, or plus
//             } else if (/^[-_=+]$/.test(lastKeyPressed)) {
//                 console.log('Plus, equals, underscore, or dash detected.')
//                 return previousValue
//                 // the key is a space
//             } else if (lastKeyPressed === ' ') {
//                 console.log('Space detected.')
//                 return value
//                 // the key is whitespace like a delete or backspace key...
//             } else if (lastKeyPressed === '') {
//                 console.log('Whitespace detected.')
//                 return value
//             }
//         })
//         console.log('---------------END handleOnChange------------------\n\n\n')
//     }

//     const handleOnFocus = () => {
//         console.log('onFocus occurred')
//         setIsChosenWordFormInputFocused(true)
//     }

//     const removeOneObjectOccurrence = (array: Tile[], valueToRemove: string) => {
//         for (let i = 0; i < array.length; i++) {
//             if (array[i].value === valueToRemove) {
//                 // remove one obj with the specified char
//                 array.splice(i, 1)
//                 break // stop after removing one obj
//             }
//         }
//     }

//     const submitChooseWordForm = (event: any) => {
//         event.preventDefault()
//         console.log('FORM SUBMISSION: ', event.target.value)
//         setWordFragment({ word: formValue.toUpperCase() })
//         //onClose()
//     }

//     const shuffleArray = (array: Tile[]) => {
//         const shuffledArray = [...array]
//         for (let i = shuffledArray.length - 1; i > 0; i--) {
//             const r = Math.random() * (i + 1)
//             const j = Math.floor(r)
//             const iThIndex = shuffledArray[i]
//             const jThIndex = shuffledArray[j]
//             shuffledArray[i] = jThIndex
//             shuffledArray[j] = iThIndex
//         }
//         setSortedLettersInDialog(shuffledArray)
//     }

//     return (
//         <div className="mb-4 p-2 px-4 bg-gray-950 rounded-md select-none">
//             <div className="flex p-2 pb-4 justify-center">
//                 <h1 className="text-emerald-400 text-2xl play-font">
//                     <>&lowast;&nbsp;Play Buck Tile&nbsp;&lowast;</>
//                 </h1>
//             </div>
//             <div className="flex p-2 pb-16 items-center select-none bg-gray-950 rounded-md">
//                 <div className="px-4 w-[50%]">
//                     <div className="flex justify-end flex-wrap">
//                         <form onSubmit={(event) => submitChooseWordForm(event)}>
//                             <Input
//                                 className="text-black text-6xl w-24 bg-slate-300 text-center uppercase"
//                                 type="text"
//                                 width={2}
//                                 minLength={1}
//                                 maxLength={1}
//                                 ref={inputRef}
//                                 // value={formValue}
//                                 // onBlur={handleOnBlur}
//                                 // onChange={handleOnChange}
//                                 // onFocus={handleOnFocus}
//                                 placeholder=""
//                                 title="word-pickup"
//                             />
//                         </form>
//                     </div>
//                 </div>
//                 <div className="px-4 w-[50%]">
//                     <div className="flex justify-start flex-wrap">
//                         <MiniKeyboardFormExample />
//                     </div>
//                 </div>
//             </div>
//             <div className="">
//                 <div className="flex-col justify-center items-center">
//                     <div className="flex pb-4 justify-center items-center">
//                         <h1 className="text-emerald-400 text-2xl play-font">
//                             <>&nbsp;Choose a letter to play the buck tile: &nbsp;</>
//                         </h1>
//                     </div>
//                 </div>
//                 {/* </div> */}
//             </div>
//             {showAdminBlockNames ? (
//                 <div className="flex p-2 pb-0 justify-end">
//                     <h1 className="text-red-600">&lt;BuckSubInputState /&gt;</h1>
//                 </div>
//             ) : null}
//         </div>
//     )
// }
