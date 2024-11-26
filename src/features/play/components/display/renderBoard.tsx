import TokenBlue1 from '../tokens/bonusCookies/full/blue/tokenBlue1'
import TokenBlue10 from '../tokens/bonusCookies/full/blue/tokenBlue10'
import TokenBlue3 from '../tokens/bonusCookies/full/blue/tokenBlue3'
import TokenBlue5 from '../tokens/bonusCookies/full/blue/tokenBlue5'
import TokenBlueArrow from '../tokens/bonusCookies/full/blue/tokenBlueArrow'
import TokenBlueSpinner from '../tokens/bonusCookies/full/blue/tokenBlueSpinner'
import TokenGold1 from '../tokens/bonusCookies/full/gold/tokenGold1'
import TokenGold10 from '../tokens/bonusCookies/full/gold/tokenGold10'
import TokenGold3 from '../tokens/bonusCookies/full/gold/tokenGold3'
import TokenGold5 from '../tokens/bonusCookies/full/gold/tokenGold5'
import TokenGoldArrow from '../tokens/bonusCookies/full/gold/tokenGoldArrow'
import TokenGoldSpinner from '../tokens/bonusCookies/full/gold/tokenGoldSpinner'
import TokenRed1 from '../tokens/bonusCookies/full/red/tokenRed1'
import TokenRed10 from '../tokens/bonusCookies/full/red/tokenRed10'
import TokenRed3 from '../tokens/bonusCookies/full/red/tokenRed3'
import TokenRed5 from '../tokens/bonusCookies/full/red/tokenRed5'
import TokenRedArrow from '../tokens/bonusCookies/full/red/tokenRedArrow'
import TokenRedSpinner from '../tokens/bonusCookies/full/red/tokenRedSpinner'
import RenderCell from './renderCell'
import { Board } from '../../types/entity/board'
import { Cell } from '../../types/entity/cell'
import React, { useCallback } from 'react'

const RENDER_LOG = import.meta.env.VITE_APP_RENDER_LOG

type RenderBoardProps = {
    board: Board
}

const RenderBoard = React.memo((props: RenderBoardProps): React.JSX.Element => {
    if (RENDER_LOG === 'true') console.log('<RenderBoard> rendered...')

    const { board } = props

    const getCookieJsx = useCallback((cell: Cell): JSX.Element => {
        const color = cell.cookieColor
        const cookie = cell.cookie
        switch (color) {
            case 'gold':
                switch (cookie) {
                    case 'arrow':
                        return <TokenGoldArrow />
                    case 'spinner':
                        return <TokenGoldSpinner />
                    case 'ten':
                        return <TokenGold10 />
                    case 'five':
                        return <TokenGold5 />
                    case 'three':
                        return <TokenGold3 />
                    case 'one':
                        return <TokenGold1 />
                    default:
                        return <></>
                }
            case 'red':
                switch (cookie) {
                    case 'arrow':
                        return <TokenRedArrow />
                    case 'spinner':
                        return <TokenRedSpinner />
                    case 'ten':
                        return <TokenRed10 />
                    case 'five':
                        return <TokenRed5 />
                    case 'three':
                        return <TokenRed3 />
                    case 'one':
                        return <TokenRed1 />
                    default:
                        return <></>
                }
            case 'blue':
                switch (cookie) {
                    case 'arrow':
                        return <TokenBlueArrow />
                    case 'spinner':
                        return <TokenBlueSpinner />
                    case 'ten':
                        return <TokenBlue10 />
                    case 'five':
                        return <TokenBlue5 />
                    case 'three':
                        return <TokenBlue3 />
                    case 'one':
                        return <TokenBlue1 />
                    default:
                        return <></>
                }
        }
        return <></>
    }, [])

    return (
        <div className="flex justify-center p-8">
            <div className="p-1 border-4 border-slate-500 rounded-lg bg-slate-400">
                <div className="flex justify-center items-center">
                    {/* // left number row */}
                    <div className="p-1">
                        <div className="flex flex-col gap-1">
                            {[...Array(18)].map((_, index) => (
                                <div key={`leftBoardNumberLine-${index}`} className="flex justify-center items-center h-[46px] px-1 text-slate-600">
                                    {index + 1}
                                </div>
                            ))}
                        </div>
                    </div>
                    {/* // middle column - top/bottom number rows, and board */}
                    <div className="">
                        <div className="flex flex-col justify-center items-center">
                            {/* // top number line */}
                            <div className="flex items-center justify-center gap-1 pointer-events-none pb-1">
                                {[...Array(18)].map((_, index) => (
                                    <div key={`topBoardNumberLine-${index}`} className="w-[46px] p-1 text-slate-600 flex items-center justify-center">
                                        {index + 1}
                                    </div>
                                ))}
                            </div>
                            {/* // board */}
                            <div className="overflow-auto flex flex-col justify-center relative border-4 border-slate-600 bg-slate-400">
                                {/* Main Board */}
                                <div
                                    key={'cookieGrid'}
                                    //className="absolute h-min gap-1  grid grid-cols-18 grid-rows-18"
                                    className="grid grid-rows-[repeat(18,_minmax(0,_1fr))] gap-1 pointer-events-none"
                                    // onMouseEnter={handleOnMouseEnter}
                                    // onMouseLeave={handleOnMouseLeave}
                                >
                                    {board.cells?.map((row: any, indexRow: number) => (
                                        <div key={`boardRow-${indexRow}`} className="flex gap-1">
                                            {/* <div className="h-[46px] w-[30px] bg-slate-600 text-slate-200 flex items-center justify-center">{indexRow.toString()}</div> */}
                                            {row.map((cell: any, indexCell: number) => (
                                                <div
                                                    key={`boardCell-${indexRow.toString()}-cell-${indexCell.toString()}`}
                                                    className="flex justify-center gap-1 items-center w-[46px] h-[46px]"
                                                >
                                                    <RenderCell
                                                        cell={cell}
                                                        //cookieToken={bonusCookieToRender[indexRow][indexCell]}
                                                        cookieToken={getCookieJsx(cell)}
                                                        //cookieTokenMini={bonusCookieMiniToRender[indexRow][indexCell]}
                                                        cookieTokenMini={<></>}
                                                    />
                                                </div>
                                            ))}
                                        </div>
                                    ))}
                                </div>

                                {/* Transparent Overlay Grid */}
                                <div
                                    key={'overlayGrid'}
                                    className="absolute h-min gap-1  grid grid-cols-18 grid-rows-18"
                                    style={{
                                        gridTemplateColumns: 'repeat(18, 1fr)',
                                        gridTemplateRows: 'repeat(18, 1fr)',
                                    }}
                                >
                                    {[...Array(18)].map((_, rowIndex) =>
                                        [...Array(18)].map((_, colIndex) => (
                                            <div key={`overlayCell-${rowIndex}-${colIndex}`} className="flex justify-center items-center w-[46px] h-[46px]">
                                                {/* <span className="text-red-600 m-0 p-0 bg-opacity-50">a</span> */}
                                            </div>
                                        ))
                                    )}
                                </div>
                            </div>
                            {/* // bottom number line */}
                            <div className="flex items-center justify-center gap-1 pointer-events-none pb-1">
                                {[...Array(18)].map((_, index) => (
                                    <div key={`bottomBoardNumberLine-${index}`} className="w-[46px] p-1 text-slate-600 flex items-center justify-center">
                                        {(index + 1).toString()}
                                    </div>
                                ))}
                            </div>
                        </div>
                    </div>
                    {/* // right number row */}
                    <div className="p-1">
                        <div className="flex flex-col gap-1">
                            {[...Array(18)].map((_, index) => (
                                <div key={`rightBoardNumberLine-${index}`} className="flex justify-center items-center h-[46px] px-1 text-slate-600">
                                    {(index + 1).toString()}
                                </div>
                            ))}
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
})

export default RenderBoard
