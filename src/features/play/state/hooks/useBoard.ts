import { useAtom } from 'jotai'
import { playingBoardAtom } from '../atoms/board'

export const useBoard = () => {
    const [playingBoard, setPlayingBoard] = useAtom(playingBoardAtom)

    return {
        playingBoard,
        setPlayingBoard,
    }
}
