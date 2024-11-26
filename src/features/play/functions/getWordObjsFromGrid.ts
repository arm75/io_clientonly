import { WordObj } from '../../../models/types/wordObjectTypes'

const BOARD_SIZE = 18

// returns an array of WordStringObj's for all strings 2 or greater in length
export default function get2PlusWordStringObjsFromGrid(grid: string[], orientation: string): WordObj[][] {
    // returns an array of objects, {index, rowNumber, word, wordStartIndex, wordLength}[]
    function getWordStringObjsInRow(rowString: string, rowIndex: number): WordObj[] {
        const regex = /[A-Za-z]{2,}/g
        const matches: WordObj[] = []
        let match: RegExpExecArray | null

        let matchCount = 0
        while ((match = regex.exec(rowString)) !== null) {
            const matchedString = match[0]
            const matchIndex = match.index
            const matchLength = matchedString.length
            let rowToSet = rowIndex
            if (orientation === 'vertical') rowToSet = BOARD_SIZE - 1 - rowIndex
            matches.push({
                rowOrCol: rowToSet,
                word: matchedString,
                startIndex: matchIndex,
                length: matchLength,
            })
            matchCount++
        }

        return matches
    }

    const twoPlusObjects: WordObj[][] = []
    // get an array of objects for each row, so an array of word object arrays
    // so: [
    //   [{index, boardRow, wordString, wordStartIndex, wordLength}, ...] // row0
    //   [{index, boardRow, wordString, wordStartIndex, wordLength}, ...] // row1
    //   [{index, boardRow, wordString, wordStartIndex, wordLength}, ...] // row2
    //     ...
    //   [{index, boardRow, wordString, wordStartIndex, wordLength}, ...], // row17
    // ]
    grid.map((row: any, rowIndex: number) => {
        const stringsInRowArray = getWordStringObjsInRow(row, rowIndex)
        twoPlusObjects.push(stringsInRowArray)
    })

    return twoPlusObjects
}
