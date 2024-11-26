import { useAtom } from 'jotai'
import { buckTileAtom, buildingPlayAtom, usingBuckAtom } from '../atoms/gameUi'

export const useGameUi = () => {
    const [buildingPlay, setBuildingPlay] = useAtom(buildingPlayAtom)
    const [usingBuck, setUsingBuck] = useAtom(usingBuckAtom)
    const [buckTile, setBuckTile] = useAtom(buckTileAtom)

    return {
        buildingPlay,
        setBuildingPlay,
        usingBuck,
        setUsingBuck,
        buckTile,
        setBuckTile,
    }
}
