// import { atom } from 'jotai'
// import { Tile } from '../../types/entity/tile'
// import { CellPlayed, WordFragment, WordListWord, WordPlay } from '../../../../app/types/stuffToFix'

// type Axis = 'horizontal' | 'vertical'

// // Initial value for mainAxisAtom
// const initialMainAxis: Axis = 'horizontal'

// // Initial value for offAxisAtom
// const initialOffAxis: Axis = 'vertical'

// // Writable Derived Atom for mainAxis
// export const mainAxisAtom = atom(initialMainAxis, (get, set, newMainAxis: Axis) => {
//     console.log(`mainAxisAtom changed to: ${newMainAxis}`)
//     set(mainAxisAtom, newMainAxis)
//     set(offAxisAtom, newMainAxis === 'horizontal' ? 'vertical' : 'horizontal')
// })

// // Writable Derived Atom for offAxis
// export const offAxisAtom = atom(initialOffAxis, (get, set, newOffAxis: Axis) => {
//     console.log(`offAxisAtom changed to: ${newOffAxis}`)
//     set(offAxisAtom, newOffAxis)
//     set(mainAxisAtom, newOffAxis === 'horizontal' ? 'vertical' : 'horizontal')
// })
// export const showGameTipsAtom = atom<boolean>(false)

// export const sortedLettersAtom = atom<Tile[]>([])
// export const showAdminGameControlsAtom = atom<boolean>(true)

// export const sortedLettersForBuildingPlayAtom = atom<Tile[]>([])
// export const letterTilesAtTurnStartAtom = atom<Tile[]>([{ id: 0, value: '', isBuck: false }])

// export const letterTilesAtom = atom<Tile[]>([{ id: 0, value: '', isBuck: false }])

// export const letterTilesAttachedToPointerAtom = atom<Tile[]>([{ id: 0, value: '', isBuck: false }])
// export const sortedLettersInDialogAtom = atom<Tile[]>([{ id: 0, value: '', isBuck: false }])
// export const sortedLettersForRenderPlayerLettersAtom = atom<Tile[]>([{ id: 0, value: '', isBuck: false }])
// export const isValidPlayAtom = atom<boolean>(false)
// export const isChosenWordFormInputFocusedAtom = atom<boolean>(false)
// export const isBuildingPlayAtom = atom<boolean>(false)

// export const boardForChoosePositionAtom = atom<any>([])
// export const showAdminBlockNamesAtom = atom<boolean>(false)

// export const hWordListAtom = atom<
//     Partial<{
//         opId: string
//         row: number
//         word: string
//         startIndex: number
//         length: number
//     }>
// >({})

// export const vWordListAtom = atom<
//     Partial<{
//         opId: string
//         row: number
//         word: string
//         startIndex: number
//         length: number
//     }>
// >({})

// export const spaceBlockHoverLetterAtom = atom<string>('')

// const numRows = 18
// const numCols = 18
// const cellHoverStates: boolean[][] = []

// for (let row = 0; row < numRows; row++) {
//     const cellHoverStatesRowArray: boolean[] = []
//     for (let col = 0; col < numCols; col++) {
//         cellHoverStatesRowArray.push(false)
//     }
//     cellHoverStates.push(cellHoverStatesRowArray)
// }
// export const chooseWordFormValueAtom = atom('')
// export const chooseWordFormLastValueAtom = atom('')
// // to reset the hover states to all false
// const hoverStatesReset = cellHoverStates
// export type WordOrientation = 'horizontal' | 'vertical'
// export const chosenWordAtom = atom<WordFragment>({ word: '' })
// export const selectedStartingWordAtom = atom<Partial<WordListWord>>({})

// export const cellsPlayedThisTurnAtom = atom<CellPlayed[]>([])

// export const turnWordPlaysAtom = atom<WordPlay[]>([])

// export const numOfOutwordLettersPlayedAtom = atom<number>(0)

// export const checkForNewWordsAtom = atom<boolean>(false)

// checkForNewWordsAtom.debugLabel = 'checkForNewWordsAtom'
// export const attachChosenWordToPointerAtom = atom<boolean>(false)

// export const chosenWordLengthAtom = atom((get) => {
//     const wordChosen = get(chosenWordAtom)
//     return wordChosen.word.length
// })
// export const chosenWordOrientationAtom = atom<WordOrientation>('horizontal')
// // hover state atoms
// export const cellHoverStatesAtom = atom<boolean[][]>(cellHoverStates)
// export const cellHoverStatesResetAtom = atom<boolean[][]>(hoverStatesReset)
// export const gameTilesToDisplayAtom = atom<Tile[]>([{ id: 0, value: '', isBuck: false }])

// // other hover stuff
// export const hoverPointerCoordinatesAtom = atom<{ row?: number; col?: number }>({})
// export const hoverCoordinatesAtom = atom<{ row: number; col: number }[]>([])

// export const hoverPointerCookieAtom = atom<{ color?: string; cookie?: string }>({})
// export const hoverCookiesAtom = atom<{ color: string; cookie: string }[]>([])

// export const poopAtom = atom<string>('')

// export const hoverCookieColorAtom = atom<string>('')
// export const hoverCookieAtom = atom<string>('')
// const letterHoverStates: boolean[][] = []

// for (let row = 0; row < numRows; row++) {
//     const letterHoverStatesRowArray: boolean[] = []
//     for (let col = 0; col < numCols; col++) {
//         letterHoverStatesRowArray.push(false)
//     }
//     letterHoverStates.push(letterHoverStatesRowArray)
// }

// // to reset the hover states to all false
// const letterHoverStatesReset = letterHoverStates

// // hover state atoms
// export const letterHoverStatesAtom = atom<boolean[][]>(letterHoverStates)
// export const letterHoverStatesResetAtom = atom<boolean[][]>(letterHoverStatesReset)
// const letterSelectStates: boolean[][] = []

// for (let row = 0; row < numRows; row++) {
//     const letterSelectStatesRowArray: boolean[] = []
//     for (let col = 0; col < numCols; col++) {
//         letterSelectStatesRowArray.push(false)
//     }
//     letterSelectStates.push(letterSelectStatesRowArray)
// }

// // to reset the hover states to all false
// const letterSelectStatesReset = letterSelectStates

// // hover state atoms
// export const letterSelectStatesAtom = atom<boolean[][]>(letterSelectStates)
// export const letterSelectStatesResetAtom = atom<boolean[][]>(letterSelectStatesReset)
