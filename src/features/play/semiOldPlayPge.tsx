// import { useCurrentGame } from './queries/useCurrentGame'
// import { useAuthMe } from '../../app/auth/useAuthMe'
// import { ReactElement, useEffect, useCallback, useMemo } from 'react'
// import { useAtomValue } from 'jotai'
// import RenderBoard from './components/display/renderBoard'
// import { useMachine } from '@xstate/react'
// import { playStateMachine } from './machines/playStateMachine'
// import { useMutation, useQueryClient } from '@tanstack/react-query'
// import useAxios from '../../app/api/axios'
// import useToastContext from '../../app/context/toast/useToastContext'
// import GameClock from '../../app/components/custom/gameClock'
// import DropDownMenu from '../../app/components/menu/dropDownMenu'
// import { Player } from './types/entity/player'
// import { NewPlay } from './types/entity/play'
// import { useGameUi } from './state/hooks/useGameUi'
// import { Button } from '../../app/components/shadcn/ui/button'
// import TurnScoreTable from './components/display/turnScoreTable'
// import { Game } from './types/entity/game'
// import RenderSortableTiles from './components/display/renderSortableTiles'
// import RenderPickupQueue from './components/display/renderPickupQueue'
// import { socketAtom } from '../../app/state/socketAtom'
// import { useTurnQueues } from './state/hooks/useTurnQueues'
// import { Tile } from './types/entity/tile'
// import { QueueTile } from './types/ui/queueTile'
// import { SortableTile } from './types/ui/sortableTile'

// const RENDER_LOG = import.meta.env.VITE_APP_RENDER_LOG

// export default function PlayPage() {
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
//     const queues = useTurnQueues()
//     const queryClient = useQueryClient()
//     const socket = useAtomValue(socketAtom)

//     // state machine
//     const [turnState, turnStateSend] = useMachine(
//         playStateMachine.provide({
//             actions: {
//                 someAction: () => {
//                     if (player?.tiles) {
//                         const startingQueueTiles = convertTilesToQueueTiles(player?.tiles)
//                         queues.setStartingTiles(startingQueueTiles)
//                         queues.setTilesLeftQueue(startingQueueTiles)
//                         queues.setPlayerTilesQueue(startingQueueTiles)
//                         queues.setTilePickupQueue([])
//                         queues.setPickedUpTilesQueue([])
//                     }
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
//                     //}
//                 },
//                 turnIdleToNotTurnIdle: () => {
//                     //
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

//                     //if (isVirginGame && totalWordsPlayed === 0) sendAdvanceToTurnMachine()

//                     // is this the second word played? auto-select the first word (the only one available)
//                     //let autoSelectedWord = ''
//                     if (totalWordsPlayed === 1) {
//                         if (hWordsPlayed === 1) {
//                             // autoSelectedWord = game?.allHorizontalWords[0]
//                             //setSelectedStartingWord(game?.hWords[0])
//                             //sendAdvanceToTurnMachine()
//                         } else {
//                             // autoSelectedWord = game?.allVerticalWords[0]
//                             //setSelectedStartingWord(game?.vWords[0])
//                             //sendAdvanceToTurnMachine()
//                         }
//                     }
//                 },
//                 choosingStartingWordToTurnIdle: (context: any, event: any) => {
//                     //
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

//     function convertTilesToQueueTiles(tiles: Tile[]): QueueTile[] {
//         return tiles?.map((tile: Tile) => ({ tile: tile?._id, value: tile?.value, status: 'normal', buck: '' } as QueueTile))
//     }

//     // when player picks up the pickupQueue
//     const pickupTiles = () => {
//         // pickedUpTilesQueue = tilePickupQueue
//         // tilePickupQueue = []
//     }

//     // player has tiles picked up already, but decides to not play them on the board
//     const cancelPickedUpTiles = () => {
//         // pickedUpTilesQueue = []
//         // tilePickupQueue = []
//         // playerTilesQueue = tilesLeftQueue
//     }

//     // this is ran when the player modifies the board (drops tiles on the board)
//     const playTiles = () => {
//         // play:Play = {}
//         // // create play object to save to turnToTake
//         // play.startingTiles = tilesLeftQueue
//         // play.tilesPlayed = pickupQueueTiles
//         // // save play to turn
//         // turnToTake.play.push(play)
//         // // if that saved
//         // pickedUpTilesQueue = []
//         // pickupQueueTiles = []
//         // tilesLeftQueue = playerTilesQueue
//     }

//     const addToPickupQueue = useCallback(
//         (_id: string) => {
//             const playerTileIndex = queues.playerTilesQueue.findIndex((qTile) => qTile.tile === _id)

//             if (playerTileIndex >= 0) {
//                 const tileToMove = queues.playerTilesQueue[playerTileIndex]
//                 //if tile.tileId is in playerTilesQueue, remove from the playerTilesQueue, push to tilePickupQueue
//                 queues.setPlayerTilesQueue((prevPlayerTilesQueue) => {
//                     const returnArray = [...prevPlayerTilesQueue] // Clone the array to ensure immutability
//                     returnArray.splice(playerTileIndex, 1) // Remove the element at the specified index
//                     return returnArray // Return the updated array
//                 })
//                 queues.setTilePickupQueue((prevTilePickupQueue) => {
//                     return [...prevTilePickupQueue, tileToMove] // Clone the array to ensure immutability
//                 })
//             }
//             console.log(queues.playerTilesQueue)
//             console.log(queues.tilePickupQueue)
//         },
//         [queues]
//     )

//     const removeFromPickupQueue = useCallback(
//         (_id: string) => {
//             const pickupTileIndex = queues.tilesLeftQueue.findIndex((qTile) => qTile.tile === _id)

//             if (pickupTileIndex >= 0) {
//                 const tileToMove = queues.tilePickupQueue[pickupTileIndex]
//                 //if tile.tileId is in playerTilesQueue, remove from the playerTilesQueue, push to tilePickupQueue
//                 queues.setTilePickupQueue((prevTilePickupQueue) => {
//                     const returnArray = [...prevTilePickupQueue] // Clone the array to ensure immutability
//                     returnArray.splice(pickupTileIndex, 1) // Remove the element at the specified index
//                     return returnArray // Return the updated array
//                 })
//                 queues.setPlayerTilesQueue((prevPlayerTilesQueue) => {
//                     return [...prevPlayerTilesQueue, tileToMove] // Clone the array to ensure immutability
//                 })
//             }
//             console.log(queues.playerTilesQueue)
//             console.log(queues.tilePickupQueue)
//         },
//         [queues]
//     )

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

//     const playWordFunction = useCallback(() => {
//         //setFormValue('')
//     }, [])

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
//                 // case turnState.matches({ NOT_TURN: 'IDLE' }):
//                 //     switch (keyReleased) {
//                 //         case 'backspace':
//                 //             break
//                 //         case ' ':
//                 //             break
//                 //         case 'h':
//                 //             //setChosenWordOrientation('horizontal')
//                 //             break
//                 //         case 'v':
//                 //             //setChosenWordOrientation('vertical')
//                 //             break
//                 //         case 'escape':
//                 //             //sendCancelToTurnMachine()
//                 //             break
//                 //         default:
//                 //             break
//                 //     }
//                 //     break
//                 // case turnState.matches({ TURN: 'IDLE' }):
//                 //     switch (keyReleased) {
//                 //         case 'backspace':
//                 //             break
//                 //         case ' ':
//                 //             break
//                 //         case 'h':
//                 //             //setChosenWordOrientation('horizontal')
//                 //             break
//                 //         case 'v':
//                 //             //setChosenWordOrientation('vertical')
//                 //             break
//                 //         case 'escape':
//                 //             //sendCancelToTurnMachine()
//                 //             break
//                 //         default:
//                 //             break
//                 //     }
//                 //     break
//                 case turnState.matches({ TURN: { PLAYING: 'PICKING_UP_TILES' } }):
//                     switch (keyReleased) {
//                         case 'backspace':
//                             // queues.setTilePickupQueue((queue) => {
//                             //     const newQueue = [...queue]
//                             //     const removedItem = newQueue.pop() // remove the right-most (highest index) in the pickup queue
//                             //     //console.log(`Letter: ${removedItem?.value}, removed from queue.`)
//                             //     // return queue.slice(0, -1) // remove the right-most (highest index) in the pickup queue
//                             //     return newQueue
//                             // })
//                             if (queues.tilePickupQueue.length > 0) {
//                                 console.log('im in')
//                                 const pickupTileIndex = queues.tilePickupQueue.length - 1
//                                 if (pickupTileIndex >= 0) {
//                                     console.log('im in too')
//                                     const tile = queues.tilePickupQueue[pickupTileIndex]
//                                     if (tile.tile) removeFromPickupQueue(tile.tile)
//                                 }
//                             }
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
//                                 const playerTileIndex = queues.playerTilesQueue.findIndex((qTile) => qTile.value === keyReleased.toUpperCase())
//                                 if (playerTileIndex >= 0) {
//                                     const tile = queues.playerTilesQueue[playerTileIndex]
//                                     if (tile.tile) addToPickupQueue(tile.tile)
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
//                             //sendCancelToTurnMachine()
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
//                             //sendCancelToTurnMachine()
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
//                             //sendCancelToTurnMachine()
//                             break
//                         default:
//                             break
//                     }
//                     break
//                 default:
//                     break
//             }
//         }

//         window.addEventListener('keyup', handleKeyUp)
//         return () => window.removeEventListener('keyup', handleKeyUp)
//     }, [addToPickupQueue, queues.playerTilesQueue, queues.tilePickupQueue, removeFromPickupQueue, turnState])

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
//                                                     <RenderPickupQueue tiles={queues.tilePickupQueue} removeFromPickupQueue={removeFromPickupQueue} />
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
//                                                                     tiles={queues.playerTilesQueue}
//                                                                     setTiles={queues.setPlayerTilesQueue}
//                                                                     addToPickupQueue={addToPickupQueue}
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
