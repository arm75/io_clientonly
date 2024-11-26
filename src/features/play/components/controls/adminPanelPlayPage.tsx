import { Button } from '../../../../app/components/shadcn/ui/button'
import { ReactElement, useEffect, useState } from 'react'
import { useAtom, useAtomValue, useSetAtom } from 'jotai'
import { useCurrentGame } from '../../queries/useCurrentGame'
import { useAuthMe } from '../../../../app/auth/useAuthMe'
import { socketAtom } from '../../../../app/state/socketAtom'
import { XSquare } from 'lucide-react'
import { CellPlayed } from '../../../../app/types/stuffToFix'
import {
    selectedStartingWordAtom,
    hoverPointerCoordinatesAtom,
    hoverPointerCookieAtom,
    hoverCoordinatesAtom,
    hoverCookiesAtom,
    hoverCookieColorAtom,
    hoverCookieAtom,
    chooseWordFormValueAtom,
    chooseWordFormLastValueAtom,
    showAdminGameControlsAtom,
    sortedLettersAtom,
    gameTilesToDisplayAtom,
    sortedLettersInDialogAtom,
    sortedLettersForBuildingPlayAtom,
    sortedLettersForRenderPlayerLettersAtom,
    isValidPlayAtom,
    isBuildingPlayAtom,
    isChosenWordFormInputFocusedAtom,
    showAdminBlockNamesAtom,
    showGameTipsAtom,
    spaceBlockHoverLetterAtom,
    cellHoverStatesAtom,
    cellHoverStatesResetAtom,
    letterHoverStatesAtom,
    letterHoverStatesResetAtom,
    letterSelectStatesAtom,
    letterSelectStatesResetAtom,
    attachChosenWordToPointerAtom,
    checkForNewWordsAtom,
    numOfOutwordLettersPlayedAtom,
    chosenWordLengthAtom,
    cellsPlayedThisTurnAtom,
    turnWordPlaysAtom,
    chosenWordAtom,
    hWordListAtom,
    vWordListAtom,
    letterTilesAtTurnStartAtom,
    letterTilesAtom,
    letterTilesAttachedToPointerAtom,
} from '../../state/atoms/oldAtoms'

export default function AdminPanelPlayPage(props: any): React.JSX.Element {
    console.log('<AdminPanelPlayPage /> rendered...')

    let content: ReactElement = <></>

    const { advanceFn, buckTilePlayFn, cancelFn, passFn, turnState, cancelGameFn } = props

    const authMeQueryData = useAuthMe()
    const currentGameQueryData = useCurrentGame(authMeQueryData?.data?.currentGameId)
    const authMeQuery = authMeQueryData?.data
    const currentGameQuery = currentGameQueryData?.data

    const socket = useAtomValue(socketAtom)

    const selectedStartingWord = useAtomValue(selectedStartingWordAtom)

    const hoverPointerCoordinates = useAtomValue(hoverPointerCoordinatesAtom)
    const hoverPointerCookie = useAtomValue(hoverPointerCookieAtom)
    const hoverCoordinates = useAtomValue(hoverCoordinatesAtom)
    const hoverCookies = useAtomValue(hoverCookiesAtom)
    const hoverCookieColor = useAtomValue(hoverCookieColorAtom)
    const hoverCookie = useAtomValue(hoverCookieAtom)

    const chooseWordFormValue = useAtomValue(chooseWordFormValueAtom)
    const chooseWordFormLastValue = useAtomValue(chooseWordFormLastValueAtom)

    const setShowAdminGameControls = useSetAtom(showAdminGameControlsAtom)

    const sortedLetters = useAtomValue(sortedLettersAtom)
    const [gameTilesToDisplay, setGameTilesToDisplay] = useAtom(gameTilesToDisplayAtom)
    const sortedLettersInDialog = useAtomValue(sortedLettersInDialogAtom)
    const sortedLettersForBuildingPlay = useAtomValue(sortedLettersForBuildingPlayAtom)
    const sortedLettersForRenderPlayerLetters = useAtomValue(sortedLettersForRenderPlayerLettersAtom)

    const isValidPlay = useAtomValue(isValidPlayAtom)
    const isBuildingPlay = useAtomValue(isBuildingPlayAtom)
    const isChosenWordFormInputFocused = useAtomValue(isChosenWordFormInputFocusedAtom)

    const showAdminBlockNames = useAtomValue(showAdminBlockNamesAtom)
    const showAdminGameControls = useAtomValue(showAdminGameControlsAtom)
    const showGameTips = useAtomValue(showGameTipsAtom)

    const spaceBlockHoverLetter = useAtomValue(spaceBlockHoverLetterAtom)
    const cellHoverStates = useAtomValue(cellHoverStatesAtom)
    const cellHoverStatesReset = useAtomValue(cellHoverStatesResetAtom)
    const letterHoverStates = useAtomValue(letterHoverStatesAtom)
    const letterHoverStatesReset = useAtomValue(letterHoverStatesResetAtom)
    const letterSelectStates = useAtomValue(letterSelectStatesAtom)
    const letterSelectStatesReset = useAtomValue(letterSelectStatesResetAtom)

    const attachChosenWordToPointer = useAtomValue(attachChosenWordToPointerAtom)
    const checkForNewWords = useAtomValue(checkForNewWordsAtom)
    const numOfOutwordLettersPlayed = useAtomValue(numOfOutwordLettersPlayedAtom)
    const chosenWordLength = useAtomValue(chosenWordLengthAtom)

    const cellsPlayedThisTurn = useAtomValue(cellsPlayedThisTurnAtom)
    const turnWordPlays = useAtomValue(turnWordPlaysAtom)
    const chosenWord = useAtomValue(chosenWordAtom)
    const hWordList = useAtomValue(hWordListAtom)
    const vWordList = useAtomValue(vWordListAtom)

    const letterTilesAtTurnStart = useAtomValue(letterTilesAtTurnStartAtom)
    const letterTiles = useAtomValue(letterTilesAtom)
    const letterTilesAttachedToPointer = useAtomValue(letterTilesAttachedToPointerAtom)

    const [playerObject, setPlayerObject] = useState<any>({})

    useEffect(() => {
        if (currentGameQueryData?.data?.players) {
            const playersToSearch: any = currentGameQuery?.data?.players
            setPlayerObject(playersToSearch?.find((player: any) => player.user._id === authMeQuery?.data?.id))
        } else {
            setPlayerObject({})
        }
    }, [authMeQuery?.data?.id, currentGameQuery?.data?.players, currentGameQueryData?.data?.players])

    function onCloseAdminGameControls() {
        setShowAdminGameControls(false)
    }

    const handleSendTestGameMessage = (message: string) => {
        console.log('game message sent: ', message)
        if (socket) {
            socket.emit('game message', 'game', message)
        }
    }

    //if (turnState) console.log({ turnState })

    if (authMeQuery?.currentGameId && currentGameQuery) {
        content = (
            <div className="select-none leading-tight text-xs mb-4 p-2 bg-red-800 rounded-md">
                {/* // Title bar and close button 'X' */}
                <div className="flex justify-between w-full p-1">
                    <div className="p-1">
                        <h6 className="text-slate-950 text-sm font-extrabold">Admin Panel</h6>
                    </div>
                    <div className="p-1">
                        <a role="button" onClick={onCloseAdminGameControls}>
                            <XSquare className="hover:text-red-500" />
                        </a>
                    </div>
                </div>
                {/* // content section */}
                <div className="flex-col justify-start w-full p-2 bg-gray-950 rounded-md">
                    {/* // top 3 columns */}
                    <div className="flex">
                        {/* // col1 */}
                        <div className="p-1 w-1/3">
                            {/* // State Control */}
                            <div className="rounded-md bg-black p-4 pt-2 mb-4">
                                {/* // State name display line */}
                                <div className="p-1">
                                    <h6 className="text-red-500">
                                        STATE:&nbsp;&nbsp;
                                        <span className="text-sky-600">
                                            {turnState?.value?.TURN
                                                ? typeof turnState?.value?.TURN === 'string'
                                                    ? `TURN.${turnState?.value?.TURN}`
                                                    : `TURN.BUILDING_PLAY.${turnState?.value?.TURN?.BUILDING_PLAY}`
                                                : `NOT_TURN.${turnState?.value?.NOT_TURN}`}

                                            {/* {typeof turnState?.value?.TURN === "string"
													? `TURN.${turnState?.value?.TURN}`
													: `TURN.${turnState?.value?.TURN?.CHOOSING_PLAY_POSITION2}`} */}
                                        </span>
                                    </h6>
                                </div>
                                {/* // State based buttons */}
                                <div className="flex p-1">
                                    {turnState.matches({ NOT_TURN: 'IDLE' }) ? (
                                        <>
                                            <Button className="mr-2 bg-red-600 hover:bg-red-500 text-red-300 hover:text-white" onClick={advanceFn}>
                                                Take Turn
                                            </Button>
                                        </>
                                    ) : null}
                                    {turnState.matches({ TURN: 'IDLE' }) ? (
                                        <>
                                            <Button className="mr-2 bg-red-600 hover:bg-red-500 text-red-300 hover:text-white" onClick={advanceFn}>
                                                Make Play
                                            </Button>
                                            <Button className="mr-2 bg-red-600 hover:bg-red-500 text-red-300 hover:text-white" onClick={passFn}>
                                                Pass Turn
                                            </Button>
                                        </>
                                    ) : null}
                                    {turnState.matches({ TURN: 'CHOOSING_STARTING_WORD' }) ? (
                                        <>
                                            <Button className="mr-2 bg-red-600 hover:bg-red-500 text-red-300 hover:text-white" onClick={advanceFn}>
                                                Choose Word
                                            </Button>
                                            <Button className="mr-2 bg-red-600 hover:bg-red-500 text-red-300 hover:text-white" onClick={cancelFn}>
                                                Cancel
                                            </Button>
                                            <Button className="mr-2 bg-red-600 hover:bg-red-500 text-red-300 hover:text-white" onClick={passFn}>
                                                Pass Turn
                                            </Button>
                                        </>
                                    ) : null}
                                    {turnState.matches({ TURN: { BUILDING_PLAY: 'LETTER_TILE_INPUT' } }) ? (
                                        <>
                                            <Button className="mr-2 bg-red-600 hover:bg-red-500 text-red-300 hover:text-white" onClick={advanceFn}>
                                                Choose Position
                                            </Button>
                                            <Button className="mr-2 bg-red-600 hover:bg-red-500 text-red-300 hover:text-white" onClick={cancelFn}>
                                                Cancel
                                            </Button>
                                            <Button className="mr-2 bg-red-600 hover:bg-red-500 text-red-300 hover:text-white" onClick={passFn}>
                                                Pass Turn
                                            </Button>
                                        </>
                                    ) : null}
                                    {turnState.matches({ TURN: { BUILDING_PLAY: 'PLAYING_TILES' } }) ? (
                                        <>
                                            <Button className="mr-2 bg-red-600 hover:bg-red-500 text-red-300 hover:text-white" onClick={advanceFn}>
                                                Choose Position
                                            </Button>
                                            <Button className="mr-2 bg-red-600 hover:bg-red-500 text-red-300 hover:text-white" onClick={cancelFn}>
                                                Cancel
                                            </Button>
                                            <Button className="mr-2 bg-red-600 hover:bg-red-500 text-red-300 hover:text-white" onClick={passFn}>
                                                Pass Turn
                                            </Button>
                                        </>
                                    ) : null}
                                    {turnState.matches({ TURN: { BUILDING_PLAY: 'BUCK_SUB_INPUT' } }) ? (
                                        <>
                                            <Button className="mr-2 bg-red-600 hover:bg-red-500 text-red-300 hover:text-white" onClick={advanceFn}>
                                                Choose Position
                                            </Button>
                                            <Button className="mr-2 bg-red-600 hover:bg-red-500 text-red-300 hover:text-white" onClick={cancelFn}>
                                                Cancel
                                            </Button>
                                            <Button className="mr-2 bg-red-600 hover:bg-red-500 text-red-300 hover:text-white" onClick={passFn}>
                                                Pass Turn
                                            </Button>
                                        </>
                                    ) : null}
                                    {turnState.matches({ TURN: 'READY_TO_PLAY' }) ? (
                                        <>
                                            <Button className="mr-2 bg-red-600 hover:bg-red-500 text-red-300 hover:text-white" onClick={advanceFn}>
                                                Play
                                            </Button>
                                            <Button className="mr-2 bg-red-600 hover:bg-red-500 text-red-300 hover:text-white" onClick={cancelFn}>
                                                Cancel
                                            </Button>
                                            <Button className="mr-2 bg-red-600 hover:bg-red-500 text-red-300 hover:text-white" onClick={passFn}>
                                                Pass Turn
                                            </Button>
                                        </>
                                    ) : null}
                                </div>
                                {/* // Misc buttons */}
                                <div className="flex p-1">
                                    <Button
                                        className="mr-2 bg-red-600 hover:bg-red-500 text-red-300 hover:text-white"
                                        onClick={() => {
                                            handleSendTestGameMessage('This is a test game message!')
                                        }}
                                    >
                                        Test Game Message
                                    </Button>
                                    <Button className="mr-2 bg-red-600 hover:bg-red-500 text-red-300 hover:text-white" onClick={cancelGameFn}>
                                        Cancel Game
                                    </Button>
                                </div>
                            </div>
                            {/* // not sure where these go yet */}
                            <div className="p-0">
                                <h6 className="text-red-500">
                                    checkForNewWords:&nbsp;&nbsp;
                                    <span className="text-sky-600">{checkForNewWords ? 'true' : 'false'}</span>
                                </h6>
                            </div>
                            <div className="p-0">
                                <h6 className="text-red-500">
                                    numOfOutwordLettersPlayed:&nbsp;&nbsp;
                                    <span className="text-sky-600">{numOfOutwordLettersPlayed}</span>
                                </h6>
                            </div>
                            <div className="p-0">
                                <h6 className="text-red-500">turnWordPlays:&nbsp;&nbsp;</h6>
                                {turnWordPlays?.map((play) => (
                                    <div>
                                        <p className="text-sky-600">{play?.playId}</p>
                                        <p className="text-sky-600">{play?.wordFragment}</p>
                                        <p className="text-sky-600">{play?.cells?.map((cell: CellPlayed) => `(${cell.row}, ${cell.col}), `)}</p>
                                    </div>
                                ))}
                            </div>
                        </div>
                        {/* // col2 */}
                        <div className="p-1 w-1/3">
                            {/* // game states */}
                            <div className="rounded-md bg-black p-4 pt-2 mb-4">
                                <div className="p-1">
                                    <h6 className="text-gray-600 text-center">GAME</h6>
                                </div>

                                <div className="p-0">
                                    <h6 className="text-red-500">
                                        gameId:&nbsp;&nbsp;
                                        <span className="text-sky-600">{currentGameQueryData.data._id}</span>
                                    </h6>
                                </div>

                                <div className="p-0">
                                    <h6 className="text-red-500">
                                        showAdminBlockNames:&nbsp;&nbsp;
                                        <span className="text-sky-600">{showAdminBlockNames ? 'true' : 'false'}</span>
                                    </h6>
                                </div>
                                <div className="p-0">
                                    <h6 className="text-red-500">
                                        showAdminGameControls:&nbsp;&nbsp;
                                        <span className="text-sky-600">{showAdminGameControls ? 'true' : 'false'}</span>
                                    </h6>
                                </div>
                                <div className="p-0">
                                    <h6 className="text-red-500">
                                        showGameTips:&nbsp;&nbsp;
                                        <span className="text-sky-600">{showGameTips ? 'true' : 'false'}</span>
                                    </h6>
                                </div>
                            </div>
                            {/* // turn states */}
                            <div className="rounded-md bg-black p-4 pt-2 mb-4">
                                <div className="p-1">
                                    <h6 className="text-gray-600 text-center">TURN:</h6>
                                </div>
                                <div className="p-0">
                                    <h6 className="text-red-500">
                                        letterTiles:&nbsp;&nbsp;
                                        <span className="text-sky-600">
                                            {letterTiles?.map((tile, index, array) => `${index !== array.length - 1 ? `${tile.value}-` : tile.value}`)}
                                        </span>
                                    </h6>
                                </div>
                                <div className="p-0">
                                    <h6 className="text-red-500">
                                        letterTilesAttachedToPointer:&nbsp;&nbsp;
                                        <span className="text-sky-600">
                                            {letterTilesAttachedToPointer?.map(
                                                (tile, index, array) => `${index !== array.length - 1 ? `${tile.value}-` : tile.value}`
                                            )}
                                        </span>
                                    </h6>
                                </div>
                                <div className="p-0">
                                    <h6 className="text-red-500">
                                        letterTilesAtTurnStart:&nbsp;&nbsp;
                                        <span className="text-sky-600">
                                            {letterTilesAtTurnStart?.map(
                                                (tile, index, array) => `${index !== array.length - 1 ? `${tile.value}-` : tile.value}`
                                            )}
                                        </span>
                                    </h6>
                                </div>
                                <div className="p-0">
                                    <h6 className="text-red-500">
                                        isBuildingPlay:&nbsp;&nbsp;
                                        <span className="text-sky-600">{isBuildingPlay ? 'true' : 'false'}</span>
                                    </h6>
                                </div>
                                <div className="p-0">
                                    <h6 className="text-red-500">
                                        sortedLetters:&nbsp;&nbsp;
                                        <span className="text-sky-600">
                                            {sortedLetters?.map((tile, index, array) => `${index !== array.length - 1 ? `${tile.value}-` : tile.value}`)}
                                        </span>
                                    </h6>
                                </div>
                                <div className="p-0">
                                    <h6 className="text-red-500">
                                        gameTilesToDisplay:&nbsp;&nbsp;
                                        <span className="text-sky-600">
                                            {gameTilesToDisplay?.map((tile, index, array) => `${index !== array.length - 1 ? `${tile.value}-` : tile.value}`)}
                                        </span>
                                    </h6>
                                </div>
                                <div className="p-0">
                                    <h6 className="text-red-500">
                                        playerObject.turn:&nbsp;&nbsp;
                                        <span className="text-sky-600">{playerObject?.turn ? 'true' : 'false'}</span>
                                    </h6>
                                </div>
                                <div className="p-0">
                                    <h6 className="text-red-500">cellsPlayedThisTurn:&nbsp;&nbsp;</h6>
                                    {cellsPlayedThisTurn?.map((cell) => (
                                        <p className="text-sky-600">
                                            {cell.letter}
                                            {'=>'}({cell.row},{cell.col})
                                        </p>
                                    ))}
                                </div>
                            </div>
                        </div>
                        {/* // col3 */}
                        <div className="p-1 w-1/3">
                            {/* // play states */}
                            <div className="rounded-md bg-black p-4 pt-2 mb-4">
                                <div className="p-1">
                                    <h6 className="text-gray-600 text-center">PLAY:</h6>
                                </div>
                                <div className="p-0">
                                    <h6 className="text-red-500">
                                        isValidPlay:&nbsp;&nbsp;
                                        <span className="text-sky-600">{isValidPlay ? 'true' : 'false'}</span>
                                    </h6>
                                </div>
                                <div className="p-0">
                                    <h6 className="text-red-500">
                                        selectedStartingWord.word:&nbsp;&nbsp;
                                        <span className="text-sky-600">{selectedStartingWord?.word?.toUpperCase()}</span>
                                    </h6>
                                </div>
                                <div className="p-0">
                                    <h6 className="text-red-500">
                                        isChosenWordFormInputFocused:&nbsp;&nbsp;
                                        <span className="text-sky-600">{isChosenWordFormInputFocused ? 'true' : 'false'}</span>
                                    </h6>
                                </div>
                                <div className="p-0">
                                    <h6 className="text-red-500">
                                        chooseWordFormValue:&nbsp;&nbsp;
                                        <span className="text-sky-600">{chooseWordFormValue}</span>
                                    </h6>
                                </div>
                                <div className="p-0">
                                    <h6 className="text-red-500">
                                        chooseWordFormLastValue:&nbsp;&nbsp;
                                        <span className="text-sky-600">{chooseWordFormLastValue}</span>
                                    </h6>
                                </div>
                                <div className="p-0">
                                    <h6 className="text-red-500">
                                        sortedLettersInDialog:&nbsp;&nbsp;
                                        <span className="text-sky-600">
                                            {sortedLettersInDialog?.map(
                                                (tile, index, array) => `${index !== array.length - 1 ? `${tile.value}-` : tile.value}`
                                            )}
                                        </span>
                                    </h6>
                                </div>
                                <div className="p-0">
                                    <h6 className="text-red-500">
                                        sortedLettersForBuildingPlay:&nbsp;&nbsp;
                                        <span className="text-sky-600">
                                            {sortedLettersForBuildingPlay?.map(
                                                (tile, index, array) => `${index !== array.length - 1 ? `${tile.value}-` : tile.value}`
                                            )}
                                        </span>
                                    </h6>
                                </div>
                                <div className="p-0">
                                    <h6 className="text-red-500">
                                        sortedLettersForRenderPlayerLetters:&nbsp;&nbsp;
                                        <span className="text-sky-600">
                                            {sortedLettersForRenderPlayerLetters?.map(
                                                (tile, index, array) => `${index !== array.length - 1 ? `${tile.value}-` : tile.value}`
                                            )}
                                        </span>
                                    </h6>
                                </div>
                            </div>
                            {/* // board/pointer states */}
                            <div className="rounded-md bg-black p-4 pt-2 mb-4">
                                <div className="p-1">
                                    <h6 className="text-gray-600 text-center">BOARD/POINTER:</h6>
                                </div>
                                <div className="p-0">
                                    <h6 className="text-red-500">
                                        chosenWord.word:&nbsp;&nbsp;
                                        <span className="text-sky-600">{chosenWord?.word}</span>
                                    </h6>
                                </div>
                                <div className="p-0">
                                    <h6 className="text-red-500">
                                        attachChosenWordToPointer:&nbsp;&nbsp;
                                        <span className="text-sky-600">{attachChosenWordToPointer ? 'true' : 'false'}</span>
                                    </h6>
                                </div>
                                <div className="p-0">
                                    <h6 className="text-red-500">
                                        chosenWordLength:&nbsp;&nbsp;
                                        <span className="text-sky-600">{chosenWordLength}</span>
                                    </h6>
                                </div>
                                <div className="p-0">
                                    <h6 className="text-red-500">
                                        spaceBlockHoverLetter:&nbsp;&nbsp;
                                        <span className="text-sky-600">{spaceBlockHoverLetter}</span>
                                    </h6>
                                </div>
                                <div className="p-0">
                                    <h6 className="text-red-500">
                                        hoverCookie:&nbsp;&nbsp;
                                        <span className="text-sky-600">{hoverCookie}</span>
                                    </h6>
                                </div>
                                <div className="p-0">
                                    <h6 className="text-red-500">
                                        hoverCookieColor:&nbsp;&nbsp;
                                        <span className="text-sky-600">{hoverCookieColor}</span>
                                    </h6>
                                </div>
                            </div>
                        </div>
                    </div>
                    {/* // middle 6 grid columns */}
                    <div className="flex">
                        {/* // letterHoverStates */}
                        <div className="p-1 w-1/6">
                            <h6 className="text-red-500">
                                letterHoverStates:&nbsp;&nbsp;
                                <div className="text-sky-600 text-xxxs p-0 m-0">
                                    {letterHoverStates.map((val, index) => (
                                        <p key={`letterHoverStatesCols-key${index}`}>
                                            {val.map((innerVal, innerIndex) => (
                                                <span key={`letterHoverStatesRows-innerKey${innerIndex}`} className={innerVal ? 'text-sky-300' : ''}>
                                                    {innerIndex !== val.length - 1 ? (innerVal === true ? 'T-' : 'F-') : innerVal === true ? 'T' : 'F'}
                                                </span>
                                            ))}
                                        </p>
                                    ))}
                                </div>
                            </h6>
                        </div>
                        {/* // letterHoverStatesReset */}
                        <div className="p-1 w-1/6">
                            <h6 className="text-red-500">
                                letterHoverStatesReset:&nbsp;&nbsp;
                                <div className="text-sky-600 text-xxxs p-0 m-0">
                                    {letterHoverStatesReset.map((val, index) => (
                                        <p key={`letterHoverStatesResetCols-key${index}`}>
                                            {val.map((innerVal, innerIndex) => (
                                                <span key={`letterHoverStatesResetRows-key${innerIndex}`} className={innerVal ? 'text-sky-300' : ''}>
                                                    {innerIndex !== val.length - 1 ? (innerVal === true ? 'T-' : 'F-') : innerVal === true ? 'T' : 'F'}
                                                </span>
                                            ))}
                                        </p>
                                    ))}
                                </div>
                            </h6>
                        </div>
                        {/* // letterSelectStates */}
                        <div className="p-1 w-1/6">
                            <h6 className="text-red-500">
                                letterSelectStates:&nbsp;&nbsp;
                                <div className="text-sky-600 text-xxxs p-0 m-0">
                                    {letterSelectStates.map((val, index) => (
                                        <p key={`letterSelectStatesCols-key${index}`}>
                                            {val.map((innerVal, innerIndex) => (
                                                <span key={`letterSelectStatesRows-key${innerIndex}`} className={innerVal ? 'text-sky-300' : ''}>
                                                    {innerIndex !== val.length - 1 ? (innerVal === true ? 'T-' : 'F-') : innerVal === true ? 'T' : 'F'}
                                                </span>
                                            ))}
                                        </p>
                                    ))}
                                </div>
                            </h6>
                        </div>
                        {/* // letterSelectStatesReset */}
                        <div className="p-1 w-1/6">
                            <h6 className="text-red-500">
                                letterSelectStatesReset:&nbsp;&nbsp;
                                <div className="text-sky-600 text-xxxs p-0 m-0">
                                    {letterSelectStatesReset.map((val, index) => (
                                        <p key={`letterSelectStatesResetCols-key${index}`}>
                                            {val.map((innerVal, innerIndex) => (
                                                <span key={`letterSelectStatesResetRows-key${innerIndex}`} className={innerVal ? 'text-sky-300' : ''}>
                                                    {innerIndex !== val.length - 1 ? (innerVal === true ? 'T-' : 'F-') : innerVal === true ? 'T' : 'F'}
                                                </span>
                                            ))}
                                        </p>
                                    ))}
                                </div>
                            </h6>
                        </div>
                        {/* // cellHoverStates */}
                        <div className="p-1 w-1/6">
                            <h6 className="text-red-500">
                                cellHoverStates:&nbsp;&nbsp;
                                <div className="text-sky-600 text-xxxs p-0 m-0">
                                    {cellHoverStates.map((val, index) => (
                                        <p key={`cellHoverStatesCols-key${index}`}>
                                            {val.map((innerVal, innerIndex) => (
                                                <span key={`cellHoverStatesRows-key${innerIndex}`} className={innerVal ? 'text-sky-300' : ''}>
                                                    {innerIndex !== val.length - 1 ? (innerVal === true ? 'T-' : 'F-') : innerVal === true ? 'T' : 'F'}
                                                </span>
                                            ))}
                                        </p>
                                    ))}
                                </div>
                            </h6>
                        </div>
                        {/* // cellHoverStatesReset */}
                        <div className="p-1 w-1/6">
                            <h6 className="text-red-500">
                                cellHoverStatesReset:&nbsp;&nbsp;
                                <div className="text-sky-600 text-xxxs p-0 m-0">
                                    {cellHoverStatesReset.map((val, index) => (
                                        <p key={`cellHoverStatesResetCols-key${index}`}>
                                            {val.map((innerVal, innerIndex) => (
                                                <span key={`cellHoverStatesResetRows-key${innerIndex}`} className={innerVal ? 'text-sky-300' : ''}>
                                                    {innerIndex !== val.length - 1 ? (innerVal === true ? 'T-' : 'F-') : innerVal === true ? 'T' : 'F'}
                                                </span>
                                            ))}
                                        </p>
                                    ))}
                                </div>
                            </h6>
                        </div>
                    </div>
                    {/* // bottom 4 columns */}
                    <div className="flex">
                        <div className="p-1 w-1/4">
                            <div className="p-1">
                                <h6 className="text-red-500">hoverPointerCoordinates:</h6>
                                <span className="text-sky-600">
                                    {hoverPointerCoordinates?.row !== undefined && hoverPointerCoordinates?.col !== undefined
                                        ? `(${hoverPointerCoordinates.row}, ${hoverPointerCoordinates.col})`
                                        : null}
                                </span>
                            </div>
                        </div>
                        <div className="p-1 w-1/4">
                            <div className="p-1">
                                <h6 className="text-red-500">hoverPointerCookie:</h6>
                                <span className="text-sky-600">
                                    {hoverPointerCookie?.color !== undefined && hoverPointerCookie?.cookie !== undefined
                                        ? `(${hoverPointerCookie.color} - ${hoverPointerCookie.cookie})`
                                        : null}
                                </span>
                            </div>
                        </div>
                        <div className="p-1 w-1/4">
                            <div className="p-1">
                                <h6 className="text-red-500">hoverCoordinates:</h6>
                                {hoverCoordinates?.map((coordinates: { row: number; col: number }, index: number) => (
                                    <span key={`coordlist-${index}`} className="text-sky-600">
                                        {`${index + 1} => ${coordinates.row},${coordinates.col}`}
                                        <br />
                                    </span>
                                ))}
                            </div>
                        </div>
                        <div className="p-1 w-1/4">
                            <h6 className="text-red-500">hoverCookies:</h6>
                            {hoverCookies?.map((cookies: { color: string; cookie: string }, index: number) => (
                                <span key={`cookielist-${index}`} className="text-sky-600">
                                    {`${index + 1} => ${cookies.color} - ${cookies.cookie}`}
                                    <br />
                                </span>
                            ))}
                        </div>
                    </div>
                </div>
            </div>
        )
    } else {
        content = <></>
    }

    return content
}
