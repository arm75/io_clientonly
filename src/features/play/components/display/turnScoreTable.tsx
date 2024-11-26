import { Player } from '../../types/entity/player'

const customStyles = {
    fontFamily: 'emoji',
}

export default function TurnScoreTable(props: any) {
    const { players } = props

    return (
        <div className="mb-4 p-2 bg-gray-950 rounded-md">
            <div className="flex select-none bg-gray-950 rounded-md">
                <table className="table-auto min-w-full border-8 border-gray-950">
                    <thead>
                        <tr className="text-sm tracking-widest text-gray-800">
                            <td className="text-center pb-2"></td>
                            <td className="text-center pb-2">TURN</td>
                            <td className="text-center pb-2">PLAYER</td>
                            <td className="text-center pb-2">SCORE</td>
                        </tr>
                    </thead>
                    <tbody>
                        {players?.map((player: Player, index: number) => (
                            <tr key={`turnScoreTableRow-${index}`}>
                                <td className="p-2 px-8 text-gray-600 text-xl text-center">{index + 1}</td>
                                <td className="px-8 text-yellow-500 text-4xl text-center" style={customStyles}>
                                    {player?.status === 'turn' ? <>&lowast;</> : <></>}
                                </td>
                                <td className="p-2 px-8 text-white text-xl text-center">{player?.username}</td>
                                <td className="p-2 px-8 text-white text-xl text-center">{player?.score}</td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
        </div>
    )
}
