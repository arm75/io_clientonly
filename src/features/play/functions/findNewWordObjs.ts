// import { TurnWord, TurnWordOperation, WordObj } from '../../../models/types/wordObjectTypes'
// import { v4 as uuidv4 } from 'uuid'

// export default function findNewWordObjs(
//     oldBoardWordStringObjArray: WordObj[][],
//     newBoardWordStringObjArray: WordObj[][],
//     orientation: 'horizontal' | 'vertical',
//     title?: string
// ): TurnWord[] {
//     console.log(`\n${title}\n`)
//     // create an array to return
//     const returnArray: TurnWord[] = []
//     // are there ANY words on the NEW board?
//     if (newBoardWordStringObjArray.length > 0) {
//         newBoardWordStringObjArray.map((rowArray: WordObj[], rowIndex: number) => {
//             // is there a word object in this row?
//             if (rowArray.length > 0) {
//                 console.log(`\n${rowArray.length} word(s) detected in Row: ${rowIndex}`)
//                 // get the old board row array
//                 const oldRowArray = oldBoardWordStringObjArray[rowIndex]
//                 // are there any words on the OLD board in this row?
//                 if (oldRowArray.length > 0) {
//                     console.log(`There were ${oldRowArray.length} words on the OLD board in this row.`)
//                     // there are words on the OLD AND NEW bords in this row
//                     // are there more, less, or equal words in this new row, vs. the old row?
//                     if (rowArray.length === oldRowArray.length) {
//                         console.log(`The number of words is equal.`)
//                         // same number of words, let's verify they are the same
//                         const wordsToVerify: number = oldRowArray.length
//                         let wordsVerified = 0
//                         // we will keep track of how many of each object type we add to the return Array
//                         let addedObjects = 0
//                         let movedObjects = 0
//                         const removedObjects = 0
//                         // for each NEW board word obj in this row...
//                         rowArray.forEach((wordStringObj: WordObj, wordStringObjIndex: number) => {
//                             console.log('Word: ', { wordStringObj })
//                             console.log(`Attempting to find exact match...`)
//                             const exactMatch = oldRowArray.filter(
//                                 (oldWordStringObj) =>
//                                     oldWordStringObj.word === wordStringObj.word &&
//                                     oldWordStringObj.rowOrCol === wordStringObj.rowOrCol &&
//                                     oldWordStringObj.startIndex === wordStringObj.startIndex &&
//                                     oldWordStringObj.length === wordStringObj.length
//                             )
//                             if (exactMatch && exactMatch.length === 1) {
//                                 console.log(`Exact match found. No change in word.\n`)
//                                 // word accounted for
//                                 wordsVerified++
//                             } else {
//                                 console.log(`Exact match not found. Attempting to find word match...`)
//                                 const result = oldRowArray.filter((oldWordObject) => oldWordObject.word === wordStringObj.word)
//                                 if (result?.length === 0) {
//                                     // the word is NOT in the old wordObjArray for this row
//                                     // it might be a NEW word completely
//                                     // it might be a word that was modified to a new word
//                                     console.log(
//                                         `Word not found in old row array. Since number of words is equal, word must be a modified word. Adding 'added' operation.\n`
//                                     )
//                                     returnArray.push({
//                                         opId: uuidv4(),
//                                         operation: 'added' as TurnWordOperation,
//                                         orientation: orientation,
//                                         rowOrCol: wordStringObj.rowOrCol,
//                                         word: wordStringObj.word,
//                                         startIndex: wordStringObj.startIndex,
//                                         length: wordStringObj.length,
//                                     })
//                                     addedObjects++
//                                 } else if (result?.length === 1) {
//                                     console.log(`(1) word match found on current board.`)
//                                     if (wordStringObj.startIndex !== result[0].startIndex) {
//                                         console.log(`StartIndex is different. Since 1 result found, word has MOVED. Adding 'moved' operation. Word verified.`)
//                                         const oldStartIndex = result[0].startIndex
//                                         const newStartIndex = wordStringObj.startIndex

//                                         if (newStartIndex > oldStartIndex) {
//                                             const moveLength = newStartIndex - oldStartIndex
//                                             console.log(`Word has moved ${orientation === 'horizontal' ? 'right' : 'down'} ${moveLength} cells.\n`)
//                                         } else {
//                                             const moveLength = oldStartIndex - newStartIndex
//                                             console.log(`Word has moved ${orientation === 'horizontal' ? 'left' : 'up'} ${moveLength} cells.\n`)
//                                         }
//                                         returnArray.push({
//                                             opId: uuidv4(),
//                                             operation: 'moved' as TurnWordOperation,
//                                             orientation: orientation,
//                                             rowOrCol: wordStringObj.rowOrCol,
//                                             word: wordStringObj.word,
//                                             startIndex: wordStringObj.startIndex,
//                                             length: wordStringObj.length,
//                                         })
//                                         movedObjects++
//                                         wordsVerified++
//                                     }
//                                     if (wordStringObj.rowOrCol !== result[0].rowOrCol) {
//                                         console.log(`Row is different. Shouldn't be possible. An error has occurred. Turn invalid.\n`)
//                                     }
//                                     if (wordStringObj.length !== result[0].length) {
//                                         console.log(`Length is different. An error has occurred. Turn invalid.\n`)
//                                     }
//                                 } else if (result?.length > 1) {
//                                     console.log(`There are more than (1) of this word, on this line, yet no exact match.`)
//                                     console.log(`Something strange is afoot at the Circle K.`)
//                                     console.log(`Adding array index to laterVerificationArray.\n`)
//                                 }
//                             }
//                         })
//                         console.log(`Words to verify: ${wordsToVerify}`)
//                         console.log(`Words actually verified: ${wordsVerified}`)
//                         console.log(`Word Objects Added to return array: ${addedObjects}\n`)
//                     }
//                     if (rowArray.length > oldRowArray.length) {
//                         // more on new than old
//                         console.log(`There are MORE words in this row, on the NEW board than there are on the OLD board.`)
//                         // more words, let's verify the existing, and find the NEW words
//                         const wordsToVerify: number = oldRowArray.length
//                         let wordsVerified = 0
//                         // we will keep track of how many of each object type we add to the return Array
//                         let addedObjects = 0
//                         const movedObjects = 0
//                         const removedObjects = 0
//                         // this is to further test weird cases if any occur
//                         const laterVerification: number[] = [] // indicies with strange test results will be added to this array, for more checking.
//                         // for each NEW word...
//                         rowArray.forEach((wordStringObj: WordObj, wordObjectIndex: number) => {
//                             console.log('Word: ', { wordStringObj })
//                             console.log(`Attempting to find exact match...`)
//                             const exactMatch = oldRowArray.filter(
//                                 (oldWordStringObj) =>
//                                     oldWordStringObj.word === wordStringObj.word &&
//                                     oldWordStringObj.rowOrCol === wordStringObj.rowOrCol &&
//                                     oldWordStringObj.startIndex === wordStringObj.startIndex &&
//                                     oldWordStringObj.length === wordStringObj.length
//                             )
//                             if (exactMatch && exactMatch.length === 1) {
//                                 console.log(`Exact match found. No change in word.\n`)
//                                 // word accounted for
//                                 wordsVerified++
//                             } else {
//                                 console.log(`Exact match not found. Attempting to find word match...`)
//                                 const result = oldRowArray.filter((oldWordObject) => oldWordObject.word === wordStringObj.word)
//                                 if (result?.length === 0) {
//                                     // the word is NOT in the old wordObjArray for this row
//                                     // it is PROBABLY a NEW word since there are more new than old
//                                     // it might be a word that was modified to a new word
//                                     console.log(
//                                         `Word not found in old row array. Since number of words in NEW is more, word is likely NEW. Could be a modified word though. Adding 'added' operation.\n`
//                                     )
//                                     returnArray.push({
//                                         opId: uuidv4(),
//                                         operation: 'added' as TurnWordOperation,
//                                         orientation: orientation,
//                                         rowOrCol: wordStringObj.rowOrCol,
//                                         word: wordStringObj.word,
//                                         startIndex: wordStringObj.startIndex,
//                                         length: wordStringObj.length,
//                                     })
//                                     addedObjects++
//                                 } else if (result?.length === 1) {
//                                     console.log(`(1) word match found on current board.`)
//                                     if (wordStringObj.startIndex !== result[0].startIndex) {
//                                         console.log(`StartIndex is different. Word probably moved. No changes needed to word list. Verified.`)
//                                         const oldStartIndex = result[0].startIndex
//                                         const newStartIndex = wordStringObj.startIndex

//                                         if (newStartIndex > oldStartIndex) {
//                                             const moveLength = newStartIndex - oldStartIndex
//                                             console.log(`Word has moved ${orientation === 'horizontal' ? 'right' : 'down'} ${moveLength} cells.\n`)
//                                         } else {
//                                             const moveLength = oldStartIndex - newStartIndex
//                                             console.log(`Word has moved ${orientation === 'horizontal' ? 'left' : 'up'} ${moveLength} cells.\n`)
//                                         }
//                                         returnArray.push({
//                                             opId: uuidv4(),
//                                             operation: 'moved' as TurnWordOperation,
//                                             orientation: orientation,
//                                             rowOrCol: wordStringObj.rowOrCol,
//                                             word: wordStringObj.word,
//                                             startIndex: wordStringObj.startIndex,
//                                             length: wordStringObj.length,
//                                         })
//                                         wordsVerified++
//                                     }
//                                     if (wordStringObj.rowOrCol !== result[0].rowOrCol) {
//                                         console.log(`Row is different. Shouldn't be possible. An error has occurred. Turn invalid.\n`)
//                                     }
//                                     if (wordStringObj.length !== result[0].length) {
//                                         console.log(`Length is different. An error has occurred. Turn invalid.\n`)
//                                     }
//                                 } else if (result?.length > 1) {
//                                     console.log(`There are more than (1) of this word, on this line, yet no exact match.`)
//                                     console.log(`Something strange is afoot at the Circle K.`)
//                                     console.log(`Adding array index to laterVerificationArray.\n`)
//                                 }
//                             }
//                         })
//                         console.log(`Words to verify: ${wordsToVerify}`)
//                         console.log(`Words actually verified: ${wordsVerified}`)
//                         console.log(`Word Objects Added to return array: ${addedObjects}`)
//                         console.log(`Verified words + Added words: ${addedObjects + wordsVerified}`)
//                         console.log(`Verified words + Added words should equal rowArray.length: ${rowArray.length}\n`)
//                     }
//                     if (rowArray.length < oldRowArray.length) {
//                         // more on old?
//                         console.log(`There are MORE words on the OLD board in this row than the new. A word MUST have MOVED off row, or words merged.\n`)
//                     }
//                     // find a word object on the old board row, that matches this word object's 'word' property...

//                     // ??? ??? What to PUSH??
//                     // well, you PUSH CHANGES!!!!,  'added', 'moved', or 'removed'
//                     // remember, the return object of this function, gets saved to the TURN!!!
//                     // SO, WHAT TO PUSH?
//                     // rowWordObjectsToPush.push(???)
//                 } else {
//                     // There are NEW word(s) in this row on the NEW BOARD, BUT there are
//                     // NO OLD words on the OLD board in this row...
//                     // so ALL words in this row, on the NEW board, are CHANGES!
//                     console.log(`There are NO words on the OLD board in this row. The word must be NEW. Creating 'added' operation.\n`)
//                     rowArray.map((wordStringObj: WordObj, wordStringObjIndex: number) => {
//                         console.log(wordStringObj.word)
//                         returnArray.push({
//                             opId: uuidv4(),
//                             operation: 'added' as TurnWordOperation,
//                             orientation: orientation,
//                             rowOrCol: wordStringObj.rowOrCol,
//                             word: wordStringObj.word,
//                             startIndex: wordStringObj.startIndex,
//                             length: wordStringObj.length,
//                         })
//                     })
//                 }
//             } else {
//                 // there are NO words on the NEW board in this row,
//                 // so there COULDN'T have been any on the OLD board in this row
//             }
//         })
//     } else {
//         // there are NO words on the NEW board OR there is some kind of error...
//         console.log(`\nThere are NO words on the NEW board. Something is wrong.\n`)
//     }

//     return returnArray
// }
