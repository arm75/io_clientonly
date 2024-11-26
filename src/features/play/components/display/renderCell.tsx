import LetterTileToRender from './letterTileToRender'

type RenderCellProps = {
    cell: any
    cookieToken: JSX.Element
    cookieTokenMini: JSX.Element
}

const RenderCell = function RenderCell({ cell, cookieToken, cookieTokenMini }: RenderCellProps) {
    return (
        <div className={`bg-slate-300 flex justify-center items-center w-[46px] h-[46px]`}>
            <div className="relative">
                {cell?.letterTile ? (
                    <>
                        <LetterTileToRender letter={cell?.letterTile} />
                        <div className="absolute top-[8%] left-[7%] w-full h-full bg-transparent">{cookieTokenMini}</div>
                    </>
                ) : (
                    <div className="opacity-80">{cookieToken}</div>
                )}
            </div>
        </div>
    )
}

export default RenderCell
