// import { useCurrentGame } from './queries/useCurrentGame'
// import { useAuthMe } from '../../app/auth/useAuthMe'
// import { ReactElement, useEffect, useCallback, useRef, useMemo } from 'react'
// import { useAtom, useAtomValue } from 'jotai'
// import RenderBoard from './components/display/renderBoard'
// import { useMachine } from '@xstate/react'
// import { playStateMachine } from './machines/playStateMachine'
// import { useMutation, useQueryClient } from '@tanstack/react-query'
// import useAxios from '../../app/api/axios'
// import useToastContext from '../../app/context/toast/useToastContext'
// import GameClock from '../../app/components/custom/gameClock'
// import DropDownMenu from '../../app/components/menu/dropDownMenu'
// import { Player } from './types/entity/player'
// import { Tile } from './types/entity/tile'
// import Sortable, { SortableEvent } from 'sortablejs'
// import { Store } from 'react-sortablejs'
// import { NewPlay } from './types/entity/play'
// import { useGameUi } from './state/hooks/useGameUi'
// import { Button } from '../../app/components/shadcn/ui/button'
// import TurnScoreTable from './components/display/turnScoreTable'
// import { Game } from './types/entity/game'
// import { SortableTile } from './types/ui/sortableTile'
// import RenderSortableTiles from './components/display/renderSortableTiles'
// import RenderPickupQueue from './components/display/renderPickupQueue'
// import { socketAtom } from '../../app/state/socketAtom'

// const RENDER_LOG = import.meta.env.VITE_APP_RENDER_LOG

// export default function OldPlayPage() {
//     if (RENDER_LOG === 'true') console.log('<PlayPage /> rendered.')
//     let content: ReactElement = <></>

//     // eslint-disable-next-line @typescript-eslint/no-non-null-assertion
//     //const letterTilePickupFieldRef = useRef<HTMLInputElement>(null!)

//     const api = useAxios()
//     const auth = useAuthMe().data
//     const game: Game = useCurrentGame(auth?.currentGameId)?.data
//     const player = useMemo(() => game?.players?.find((player: Player) => player.user === auth?._id), [auth?._id, game?.players])
//     const { showToast } = useToastContext()
//     const gameUi = useGameUi()
//     const queryClient = useQueryClient()
//     const socket = useAtomValue(socketAtom)

//     //socket.io events from backend
//     useEffect(() => {
//         if (socket) {
//             const turnChanged = (data: any) => {
//                 console.log('turnChanged event:', data)
//                 queryClient.invalidateQueries(['get-current-game'])
//             }

//             const turnPlayed = (data: any) => {
//                 console.log('turnPlayed event:', data)
//                 queryClient.invalidateQueries(['get-current-game'])
//             }

//             const gameEnded = (data: any) => {
//                 console.log('Received endGame event:', data)
//                 window.location.href = '/'
//             }

//             const emitFromController = (data: any) => {
//                 console.log('Received Event From Controller!!!!!: ', data)
//                 //window.location.href = "/"
//             }

//             socket.on('turnChanged', turnChanged)
//             socket.on('turnPlayed', turnPlayed)
//             socket.on('gameEnded', gameEnded)
//             socket.on('controllerEmit', emitFromController)

//             return () => {
//                 socket.off('turnChanged', turnChanged)
//                 socket.off('turnPlayed', turnPlayed)
//                 socket.off('gameEnded', gameEnded)
//                 socket.off('controllerEmit', emitFromController)
//             }
//         }
//     }, [queryClient, socket])

//     // const [letterTiles, setLetterTiles] = useAtom(letterTilesAtom)
//     // const attachChosenWordToPointer = useAtomValue(attachChosenWordToPointerAtom)
//     // const [boardForChoosePosition, setBoardForChoosePosition] = useAtom(boardForChoosePositionAtom)
//     // const sortedLetters = useAtomValue(sortedLettersAtom)
//     // const setSortedLettersInDialog = useSetAtom(sortedLettersInDialogAtom)
//     // const showAdminBlockNames = useAtomValue(showAdminBlockNamesAtom)
//     // const [isBuildingPlay, setIsBuildingPlay] = useAtom(isBuildingPlayAtom)
//     // const setChosenWord = useSetAtom(chosenWordAtom)
//     // const [turnWordPlays, setTurnWordPlays] = useAtom(turnWordPlaysAtom)
//     // const isChosenWordFormInputFocused = useAtomValue(isChosenWordFormInputFocusedAtom)
//     // const setChosenWordOrientation = useSetAtom(chosenWordOrientationAtom)
//     // const setCellsPlayedThisTurn = useSetAtom(cellsPlayedThisTurnAtom)
//     // const setSelectedStartingWord = useSetAtom(selectedStartingWordAtom)
//     // const setLetterHoverStates = useSetAtom(letterHoverStatesAtom)
//     // const setLetterSelectStates = useSetAtom(letterSelectStatesAtom)
//     // const letterHoverStatesReset = useAtomValue(letterHoverStatesResetAtom)
//     // const letterSelectStatesReset = useAtomValue(letterSelectStatesResetAtom)
//     // const [sortedLettersForBuildingPlay, setSortedLettersForBuildingPlay] = useAtom(sortedLettersForBuildingPlayAtom)
//     // const setIsChosenWordFormInputFocused = useSetAtom(isChosenWordFormInputFocusedAtom)
//     // const setWordFragment = useSetAtom(chosenWordAtom)

//     //const showAdminGameControls = useAtomValue(showAdminGameControlsAtom)
//     //const [formValue, setFormValue] = useAtom(chooseWordFormValueAtom)

//     // useEffect(() => {
//     //     letterTilePickupFieldRef?.current?.focus()
//     // }, [])

//     // state machine
//     const [turnState, turnStateSend] = useMachine(
//         playStateMachine.provide({
//             actions: {
//                 someAction: () => {
//                     const tiles = player?.tiles
//                     console.log({ tiles })
//                     //gameUi.setUiSource('building_play')
//                     if (tiles) console.log('tiles is true')
//                     if (tiles) gameUi.setBuildingPlayTiles(tiles)
//                 },
//                 someOtherAction: () => {
//                     gameUi.setUiSource('live')
//                 },
//                 notTurnIdleToTurnIdle: () => {
//                     //const board = game?.board
//                     //if (board) {
//                     //const boardToSet = copyBoard(game?.board)
//                     //const boardToSet = game?.board
//                     //setBoardForChoosePosition(boardToSet)
//                     //}
//                     //const tiles = player?.tiles
//                     //if (tiles) {
//                     //const transformedTiles = createLetterTilesSortingArray(tiles)
//                     //setSortedLetters(transformedTiles)
//                     //setSortedLettersForBuildingPlay(transformedTiles)
//                     //setGameTilesToDisplay(transformedTiles)
//                     //setLetterTiles(transformedTiles)
//                     // setLetterTilesAttachedToPointer(transformedTiles)
//                     //setLetterTilesAtTurnStart(transformedTiles)
//                     //}
//                 },
//                 turnIdleToNotTurnIdle: () => {
//                     //setSortedLetters([])
//                     //setSortedLettersForBuildingPlay([])
//                     //setGameTilesToDisplay([])
//                     //setLetterTiles([])
//                     //setLetterTilesAttachedToPointer([])
//                     //setLetterTilesAtTurnStart([])
//                 },
//                 turnIdleToChoosingStartingWord: (context: any, event: any) => {
//                     //setIsBuildingPlay(true)

//                     // is this the first play
//                     //const isVirginGame = game?.isVirgin

//                     // i want to eliminate these, but i need to make sure virgin is being set properly in the backend
//                     const hWordsPlayed = game?.hWords?.length
//                     const vWordsPlayed = game?.vWords?.length

//                     const isVirginGame = hWordsPlayed === 0 && vWordsPlayed === 0

//                     const totalWordsPlayed = hWordsPlayed + vWordsPlayed

//                     if (isVirginGame && totalWordsPlayed === 0) sendAdvanceToTurnMachine()

//                     // is this the second word played? auto-select the first word (the only one available)
//                     //let autoSelectedWord = ''
//                     if (totalWordsPlayed === 1) {
//                         if (hWordsPlayed === 1) {
//                             // autoSelectedWord = game?.allHorizontalWords[0]
//                             //setSelectedStartingWord(game?.hWords[0])
//                             sendAdvanceToTurnMachine()
//                         } else {
//                             // autoSelectedWord = game?.allVerticalWords[0]
//                             //setSelectedStartingWord(game?.vWords[0])
//                             sendAdvanceToTurnMachine()
//                         }
//                     }
//                 },
//                 choosingStartingWordToTurnIdle: (context: any, event: any) => {
//                     //setIsBuildingPlay(false)
//                     //setCellsPlayedThisTurn([])
//                     //setSelectedStartingWord({})
//                     //setLetterHoverStates(letterHoverStatesReset)
//                     //setLetterSelectStates(letterSelectStatesReset)
//                     //setSortedLettersForBuildingPlay(sortedLetters)
//                     //setSortedLettersInDialog(sortedLetters)
//                 },
//                 choosingStartingWordToLetterTileInput: (context: any, event: any) => {
//                     //
//                 },
//                 letterTileInputToChoosingStartingWord: () => {
//                     // the user cancelled, reset the board to the current live board state (from react query)
//                     // and reset all of the play variables..
//                     if (game?.board) {
//                         //const boardToSet = copyBoard(game?.board)
//                         const boardToSet = game?.board
//                         //setBoardForChoosePosition(boardToSet)
//                     }
//                     //setFormValue('')
//                     //setChosenWord({ word: '' })
//                     //setSortedLettersForBuildingPlay(sortedLetters)
//                     //setSortedLettersInDialog(sortedLetters)
//                     //setTurnWordPlays([])
//                 },
//                 letterTileInputToPlayingTiles: () => {
//                     //
//                 },
//                 playingTilesToLetterTileInput: () => {
//                     //
//                 },
//                 letterTileInputToBuckSubInput: () => {
//                     //
//                 },
//                 buckSubInputToLetterTileInput: () => {
//                     //
//                 },
//                 letterTileInputToReadyToPlay: () => {
//                     //
//                 },
//                 readyToPlayToLetterTileInput: () => {
//                     //
//                 },
//                 readyToPlayToNotTurnIdle: () => {
//                     //
//                 },
//                 passTurn: () => {
//                     //
//                 },
//             },
//         })
//     )

//     const sendAdvanceToTurnMachine = useCallback(() => {
//         console.log('Advance sent.')
//         turnStateSend({ type: 'advance' })
//         turnStateSend({ type: 'take_turn' })
//     }, [turnStateSend])

//     const sendBuckTilePlayToTurnMachine = useCallback(() => {
//         turnStateSend({ type: 'buck_tile_play' })
//         console.log('BuckTilePlay sent.')
//     }, [turnStateSend])

//     const sendCancelToTurnMachine = useCallback(() => {
//         turnStateSend({ type: 'cancel' })
//         console.log('Cancel sent.')
//     }, [turnStateSend])

//     const sendPassToTurnMachine = useCallback(() => {
//         turnStateSend({ type: 'pass' })
//         console.log('Pass sent.')
//     }, [turnStateSend])

//     // keyboard events
//     useEffect(() => {
//         const handleKeyUp = (e: KeyboardEvent) => {
//             // console.log(`charCode: ${e.charCode}`)
//             // console.log(`keyCode: ${e.keyCode}`)
//             // console.log(`key: ${e.key}`)
//             // console.log(`e: ${e}`)
//             const keyReleased = e.key.toLowerCase()
//             // current turn state
//             // console.log(turnState.value)
//             switch (true) {
//                 case turnState.matches({ NOT_TURN: 'IDLE' }):
//                     switch (keyReleased) {
//                         case 'backspace':
//                             break
//                         case ' ':
//                             break
//                         case 'h':
//                             //setChosenWordOrientation('horizontal')
//                             break
//                         case 'v':
//                             //setChosenWordOrientation('vertical')
//                             break
//                         case 'escape':
//                             sendCancelToTurnMachine()
//                             break
//                         default:
//                             break
//                     }
//                     break
//                 case turnState.matches({ TURN: 'IDLE' }):
//                     switch (keyReleased) {
//                         case 'backspace':
//                             break
//                         case ' ':
//                             break
//                         case 'h':
//                             //setChosenWordOrientation('horizontal')
//                             break
//                         case 'v':
//                             //setChosenWordOrientation('vertical')
//                             break
//                         case 'escape':
//                             sendCancelToTurnMachine()
//                             break
//                         default:
//                             break
//                     }
//                     break
//                 case turnState.matches({ TURN: { PLAYING: 'PICKING_UP_TILES' } }):
//                     switch (keyReleased) {
//                         case 'backspace':
//                             gameUi.setPickupQueue((queue) => {
//                                 const newQueue = [...queue]
//                                 const removedItem = newQueue.pop() // remove the right-most (highest index) in the pickup queue
//                                 //console.log(`Letter: ${removedItem?.value}, removed from queue.`)
//                                 // return queue.slice(0, -1) // remove the right-most (highest index) in the pickup queue
//                                 return newQueue
//                             })
//                             //console.log('BACKSPACE YO!!!')
//                             break
//                         // case ' ':
//                         //     break
//                         // case 'h':
//                         //     //setChosenWordOrientation('horizontal')
//                         //     break
//                         // case 'v':
//                         //     //setChosenWordOrientation('vertical')
//                         //     break
//                         // case 'escape':
//                         //     sendCancelToTurnMachine()
//                         //     break
//                         default:
//                             if (/^[a-z]$/.test(keyReleased) || /^[1-2]$/.test(keyReleased)) {
//                                 if (gameUi.buildingPlayTiles.find((tile) => tile.value === keyReleased.toUpperCase())) {
//                                     gameUi.setPickupQueue((queue) => {
//                                         return [...queue, { tile: '', status: 'normal', value: keyReleased, buck: '' }]
//                                     })
//                                     //console.log(`Letter: ${keyReleased}, added to queue.`)
//                                     // Handle any letter key
//                                 }
//                             }
//                             break
//                     }
//                     break
//                 case turnState.matches({
//                     TURN: { CHOOSING_PLAY_POSITION: 'LETTER_TILE_INPUT' },
//                 }):
//                     switch (keyReleased) {
//                         case 'backspace':
//                             break
//                         case ' ':
//                             break
//                         case 't':
//                             console.log('T: Test keyboard command.')
//                             break
//                         case 'h':
//                             //setChosenWordOrientation('horizontal')
//                             break
//                         case 'v':
//                             //setChosenWordOrientation('vertical')
//                             break
//                         case 'escape':
//                             sendCancelToTurnMachine()
//                             break
//                         default:
//                             break
//                     }
//                     break
//                 case turnState.matches({
//                     TURN: { CHOOSING_PLAY_POSITION: 'BUCK_SUBSTITUTION_INPUT' },
//                 }):
//                     switch (keyReleased) {
//                         case 'backspace':
//                             break
//                         case ' ':
//                             break
//                         case 'h':
//                             //setChosenWordOrientation('horizontal')
//                             break
//                         case 'v':
//                             //setChosenWordOrientation('vertical')
//                             break
//                         case 'escape':
//                             sendCancelToTurnMachine()
//                             break
//                         default:
//                             break
//                     }
//                     break
//                 case turnState.matches({ TURN: 'READY_TO_PLAY' }):
//                     switch (keyReleased) {
//                         case 'backspace':
//                             break
//                         case ' ':
//                             break
//                         case 'h':
//                             //setChosenWordOrientation('horizontal')
//                             break
//                         case 'v':
//                             //setChosenWordOrientation('vertical')
//                             break
//                         case 'escape':
//                             sendCancelToTurnMachine()
//                             break
//                         default:
//                             break
//                     }
//                     break
//                 default:
//                     break
//             }
//             //console.log('Key Pressed: ', keyReleased)
//         }

//         // 	window.addEventListener("keypress", handleKeyPress)
//         // 	return () => window.removeEventListener("keypress", handleKeyPress)
//         window.addEventListener('keyup', handleKeyUp)
//         return () => window.removeEventListener('keyup', handleKeyUp)
//     }, [gameUi, sendCancelToTurnMachine, turnState, turnState.value])

//     // send turn to the backend
//     const takeTurnMutation = useMutation(async (play: NewPlay) => await api.patch(`/play/${game?._id}/turn`, play), {
//         onSuccess: (data) => {
//             const message = data?.data?.message
//             console.log(message)
//             showToast('success', message)
//         },
//         onError: (error: any) => {
//             const message = error?.response?.data?.message
//             console.log(message)
//             showToast('error', message)
//         },
//         onSettled: () => {
//             //cancelModal()
//         },
//     })

//     const cancelGameMutation = useMutation(async (gameId: string) => await api.patch(`/games/cancel/${gameId}`), {
//         onSuccess: (data) => {
//             const message = data?.data?.message
//             console.log(message)
//             showToast('success', message)
//         },
//         onError: (error: any) => {
//             const message = error?.response?.data?.message
//             console.log(message)
//             showToast('error', message)
//         },
//         onSettled: () => {
//             //cancelModal()
//         },
//     })

//     // function createLetterTilesSortingArray(letterTiles: [string]) {
//     //     const sortingArray: Tile[] = []
//     //     letterTiles.forEach((tile: string, count: number) => {
//     //         sortingArray.push({ _id: count, value: tile, buck: ''})
//     //     })
//     //     return sortingArray
//     // }

//     const playWordFunction = useCallback(() => {
//         //setFormValue('')
//     }, [])

//     function submitTurn() {
//         const objectToSend = {
//             _game: auth?.currentGameId,
//             type: 'normal',
//             data: {
//                 //turnWordPlays,
//                 //newBoard: boardForChoosePosition,
//             },
//         } as NewPlay
//         takeTurnMutation.mutate(objectToSend)
//     }

//     const handleOnBlur = () => {
//         //setIsChosenWordFormInputFocused(false)
//     }

//     // const handleOnChange = (event: any) => {
//     //     // get the current field value
//     //     const fieldValue = event?.target?.value

//     //     // The onChange handler needs to do 2 main things:
//     //     // 1. Filter and Update the values displayed in the game tile text input box...
//     //     // 	a) Filter:
//     //     //      i) letter: if a letter is typed, it checks available letter tiles to be sure only available tiles can be typed
//     //     //      ii) backspace: acts normal, but if it removes a letter, it adds that letter back to the available tiles, and updates tile display
//     //     //      iii) buck tile something....
//     //     //	b) Update: once a VALID tile is typed, is updated in state, the input box reflects that state
//     //     // 2. Add-to/Remove-from available letters in the letters box display below the form input...

//     //     // create array from chars, so, if value is 'hello', the result is ['h', 'e', 'l', 'l', 'o']
//     //     const fieldValueArray = Array.from(fieldValue as string)

//     //     // create a Tile array, a copy of the current available letters atom
//     //     // that I will then use to trim down on each change to match available letters
//     //     // start it with ALL the players current letters

//     //     const sortedLettersForBuildingPlay: Tile[] = []

//     //     const sortedLettersToTrim: Tile[] = [...sortedLettersForBuildingPlay]

//     //     fieldValueArray.forEach((char: string) => {
//     //         for (let i = 0; i < sortedLettersToTrim.length; i++) {
//     //             if (sortedLettersToTrim[i].value === char.toUpperCase()) {
//     //                 const removedObject = sortedLettersToTrim.splice(i, 1) // remove one obj with the specified char
//     //                 console.log({ removedObject })
//     //                 break // stop after removing one obj
//     //             }
//     //         }
//     //     })

//     //     // and finally, set the letters to display in the letters box
//     //     //setSortedLettersInDialog(sortedLettersToTrim)
//     //     //setLetterTiles(sortedLettersToTrim)

//     //     // 2> FILTER/UPDATE THE TEXT INPUT FIELD STATE VALUE (which updates the value in the text box)
//     //     // set the STATE, but only if it is a valid available letter, which decreases on each change
//     //     setFormValue((previousValue: string) => {
//     //         // get the most recent key pressed
//     //         const lastKeyPressed = fieldValue?.length > previousValue?.length ? fieldValue.slice(-1) : ''

//     //         // is this key a letter, space, or other (backspace, delete, etc...)?
//     //         // first, if it is a letter
//     //         if (/^[A-Za-z]+$/.test(lastKeyPressed)) {
//     //             console.log('Letter detected.')

//     //             // first, create a temporary array of all the player's letters
//     //             const tempLettersArray = sortedLettersForBuildingPlay.map((letterObject: Tile) => letterObject.value)
//     //             //const tempLettersArray = [...escapedLetters]

//     //             // next, remove the letters from the temp array that already exist in the form field
//     //             // for each letter
//     //             for (const letter of previousValue) {
//     //                 // is this letter in the array?
//     //                 const indexToRemove = tempLettersArray.indexOf(letter.toUpperCase())
//     //                 // if it is, remove it
//     //                 if (indexToRemove !== -1) {
//     //                     tempLettersArray.splice(indexToRemove, 1) // Remove one element at the found index
//     //                 }
//     //             }

//     //             // then, does this current key exist in the array?
//     //             const index = tempLettersArray.indexOf(lastKeyPressed.toUpperCase())

//     //             // if so, remove it
//     //             if (index !== -1) {
//     //                 // The string exists, so remove it
//     //                 tempLettersArray.splice(index, 1)
//     //                 // set the state!
//     //                 return fieldValue
//     //             } else {
//     //                 // the key doesn't exist in array, so it isn't a valid key press
//     //                 // set the OLD value again (so no scheduled update in react)
//     //                 return previousValue
//     //             }
//     //             // the key is a digit, non-space, or non-whitespace, for some reason, this doesn't match
//     //         } else if (/^[0-9]|[^\w\s]+$/.test(lastKeyPressed)) {
//     //             console.log('Digit, Non-Space, or Non-Whitespace detected.')
//     //             return previousValue
//     //             // the key is a dash, underscore, plus, equal, or plus
//     //         } else if (/^[-_=+]$/.test(lastKeyPressed)) {
//     //             console.log('Plus, equals, underscore, or dash detected.')
//     //             return previousValue
//     //             // the key is a space
//     //         } else if (lastKeyPressed === ' ') {
//     //             console.log('Space detected.')
//     //             return fieldValue
//     //             // the key is whitespace like a delete or backspace key...
//     //         } else if (lastKeyPressed === '') {
//     //             console.log('Whitespace detected.')
//     //             return fieldValue
//     //         }
//     //     })
//     // }

//     // const handleOnEnd = (event: SortableEvent, sortable: Sortable | null, store: Store) => {
//     //     console.log('\nShuffle end has occurred: ', event)
//     //     if (sortable) console.log('Sortable instance: ', sortable)
//     //     console.log('Store instance: ', store, '\n\n')
//     // }

//     // const handleOnFocus = () => {
//     //     //setIsChosenWordFormInputFocused(true)
//     // }

//     // const pickupTiles = (event: any) => {
//     //     event.preventDefault()
//     //     console.log('FORM SUBMISSION: ', event.target.value)
//     //     //setWordFragment({ word: formValue.toUpperCase() })
//     // }

//     // function convertTilesToDisplayTiles(tiles: Tile[]): SortableTile[] {
//     //     return tiles?.map((tile: Tile, index: number) => ({ id: index, value: tile?.value } as SortableTile))
//     // }

//     content = (
//         <div className="grid grid-cols-12 h-screen select-none">
//             {/* LEFT BLOCK */}
//             <div className="col-span-6 h-full bg-indigo-950 px-2 pt-2 pb-2">
//                 {/* GAME BOARD */}
//                 {auth?.currentGameId && game?.board ? (
//                     gameUi.uiSource === 'live' ? (
//                         <RenderBoard board={game?.board} playTileFn={playWordFunction} />
//                     ) : (
//                         <RenderBoard board={gameUi.buildingPlayBoard} playTileFn={playWordFunction} />
//                     )
//                 ) : (
//                     <h1>No game in progress.</h1>
//                 )}
//                 <div className="flex p-4 pb-0 justify-center items-center">
//                     {gameUi.uiSource === 'building_play' ? <h1 className="text-red-600">buildingPlayBoard</h1> : <h1 className="text-white">game.board</h1>}
//                 </div>
//             </div>
//             {/* <!-- RIGHT BLOCK --> */}
//             <div className="col-span-6 h-full grid bg-gray-900 overflow-y-auto">
//                 <div className="row-start-1 row-end-11 p-8 pt-2">
//                     {/* // HEADER */}
//                     <div className="flex justify-left items-center pb-4">
//                         {/* <div className="">
//                             <a href="/" className="title-font font-medium text-gray-100 mb-4 md:mb-0">
//                                 <img width="70" src="/images/io-logo.jpg" />
//                             </a>
//                         </div> */}
//                         <div className="ml-2 font-bold">
//                             <a href="/" className="text-xl">
//                                 <span className="text-emerald-500 bg-gray-300 border border-gray-700 p-2">InWord</span>
//                                 <span className="text-white bg-gray-700 border border-gray-700 p-2">OUTWORD</span>
//                             </a>
//                         </div>
//                         <div className="flex justify-center items-center">
//                             <div className="text-2xl px-6 text-gray-500">{game?.name}</div>
//                             <GameClock gameCreatedAt={game?.created} />
//                         </div>
//                         <div className="ml-auto">
//                             <DropDownMenu menuTitleColorTw={'slate-100'} menuTitleHoverColorTw={'slate-400'} />
//                         </div>
//                     </div>

//                     <TurnScoreTable players={game?.players} />

//                     {/* // GAME COMPONENTS */}
//                     <div className="mb-4 p-2 bg-gray-950 rounded-md">
//                         <div className="flex p-2 justify-center items-center select-none bg-gray-950 rounded-md">
//                             {turnState.matches({ NOT_TURN: 'IDLE' }) ? (
//                                 <div className="flex p-2 pb-4 justify-center">
//                                     <h1 className="text-red-400 text-5xl play-font">It's Not Your Turn. Please wait...</h1>
//                                 </div>
//                             ) : null}
//                             {turnState.matches({ TURN: 'IDLE' }) ? (
//                                 <div className="flex p-2 pb-4 justify-center">
//                                     <h1 className="text-emerald-400 text-5xl play-font">It's Your Turn! Play or Pass?</h1>
//                                 </div>
//                             ) : null}
//                             {turnState.matches({ TURN: { PLAYING: 'PICKING_UP_TILES' } }) ? (
//                                 <>
//                                     {/* <div className="flex p-2 pb-4 justify-center">
//                                             <h1 className="text-emerald-400 text-5xl play-font">Picking Up!</h1>
//                                         </div> */}
//                                     <div className="flex pb-2 justify-center">
//                                         {/* // ------------------------------------------- */}
//                                         <div className="mb-4 bg-gray-950 rounded-md select-none">
//                                             <div className="flex flex-col">
//                                                 {/* // left col */}
//                                                 {/* // Pickup letters */}
//                                                 <div className="flex flex-col justify-center items-center">
//                                                     <RenderPickupQueue pickupQueueTiles={gameUi.pickupQueue} />
//                                                     {/* // TEXT INPUT FORM */}
//                                                     {/* <div className="pb-4">
//                                                             <form onSubmit={(event) => pickupTiles(event)}>
//                                                                 <Input
//                                                                     className="text-black text-3xl bg-slate-300 text-center uppercase"
//                                                                     type="text"
//                                                                     ref={letterTilePickupFieldRef}
//                                                                     value={formValue}
//                                                                     onBlur={handleOnBlur}
//                                                                     onChange={handleOnChange}
//                                                                     onFocus={handleOnFocus}
//                                                                     placeholder=""
//                                                                     title="word-pickup"
//                                                                 />
//                                                             </form>
//                                                         </div> */}
//                                                     <div className="">
//                                                         <div className="flex">
//                                                             {gameUi.buildingPlayTiles.length >= 0 ? (
//                                                                 <RenderSortableTiles
//                                                                     //tiles={convertTilesToDisplayTiles(gameUi.buildingPlayTiles)}
//                                                                     tiles={gameUi.buildingPlayTiles}
//                                                                     //setTiles={gameUi.setBuildingPlayTiles}
//                                                                 />
//                                                             ) : (
//                                                                 <p className="text-xl text-red-500">You have no more letters this turn.</p>
//                                                             )}
//                                                         </div>
//                                                     </div>
//                                                 </div>
//                                             </div>
//                                         </div>
//                                         {/* // ------------------------------------------- */}
//                                         {/* letterTiles={buildingPlayTiles}
//                                                 setLetterTiles={setBuildingPlayTiles}
//                                                 letterTilePickupField={letterTilePickupFieldRef} */}
//                                     </div>
//                                 </>
//                             ) : null}
//                         </div>
//                     </div>

//                     {/* // GAME BUTTONS */}
//                     <div className="mb-4 p-2 bg-gray-950 rounded-md">
//                         <div className="flex p-2 justify-evenly items-center spa select-none bg-gray-950 rounded-md">
//                             {turnState.matches({ NOT_TURN: 'IDLE' }) ? (
//                                 <Button
//                                     size={'lg'}
//                                     className="p-8 px-16 bg-emerald-600 hover:bg-emerald-700 active:bg-sky-600"
//                                     onClick={() => turnStateSend({ type: 'take_turn' })}
//                                 >
//                                     TAKE TURN
//                                 </Button>
//                             ) : null}
//                             {turnState.matches({ TURN: 'IDLE' }) ? (
//                                 <>
//                                     <Button
//                                         size={'lg'}
//                                         className="p-8 px-16 bg-emerald-600 hover:bg-emerald-700 active:bg-sky-600"
//                                         onClick={() => turnStateSend({ type: 'play' })}
//                                     >
//                                         PLAY
//                                     </Button>
//                                     <Button
//                                         size={'lg'}
//                                         className="p-8 px-16 bg-emerald-600 hover:bg-emerald-700 active:bg-sky-600"
//                                         onClick={() => turnStateSend({ type: 'pass' })}
//                                     >
//                                         PASS
//                                     </Button>
//                                 </>
//                             ) : null}
//                             {turnState.matches({ TURN: { PLAYING: 'PICKING_UP_TILES' } }) ? (
//                                 <>
//                                     <Button
//                                         size={'lg'}
//                                         className="p-12 px-32 text-4xl tracking-widest bg-indigo-800 hover:bg-indigo-600 text-indigo-300 hover:text-indigo-100 active:bg-indigo-500"
//                                         onClick={() => turnStateSend({ type: 'pickup' })}
//                                     >
//                                         PICKUP
//                                     </Button>
//                                     <Button
//                                         //size={'default'}
//                                         className="p-12 px-24 text-4xl tracking-widest bg-indigo-800 hover:bg-indigo-600 text-indigo-300 hover:text-indigo-100 active:bg-indigo-500"
//                                         onClick={() => turnStateSend({ type: 'cancel' })}
//                                     >
//                                         EXIT
//                                     </Button>
//                                 </>
//                             ) : null}
//                         </div>
//                     </div>

//                     {/* {showAdminGameControls ? (
//                                 <AdminPanelPlayPage
//                                     advanceFn={sendAdvanceToTurnMachine}
//                                     buckTilePlayFn={sendBuckTilePlayToTurnMachine}
//                                     cancelFn={sendCancelToTurnMachine}
//                                     passFn={sendPassToTurnMachine}
//                                     turnState={turnState}
//                                     cancelGameFn={handleCancelGame}
//                                 />
//                             ) : null} */}
//                 </div>
//                 {/* <div className="row-start-7 row-end-11 bg-slate-700 p-8">
//                         <ChatBox />
//                     </div> */}
//             </div>
//             {/* LETTER TILE BOARD BLOCK - larger version of the tiles. expands/moves to allow the player to play tiles on an existing word */}
//             {/* DOESN'T EXIST YET */}
//             {/* LETTER TILE PICKUP - This becomes whatever tiles are 'picked up' by the player. It moves with the mouse cursor. */}
//             {/* {attachChosenWordToPointer ? <ChosenWordToPlay /> : <></>} */}
//         </div>
//     )

//     return content
// }
