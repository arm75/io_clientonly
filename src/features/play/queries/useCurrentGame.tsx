import { useQuery } from '@tanstack/react-query'
import useAxios from '../../../app/api/axios'

export const useCurrentGame = (gameId: string) => {
    const api = useAxios()

    async function getCurrentGame() {
        return await api.get(`/play/${gameId}`).then((res: any) => {
            //console.log(res.data)
            return res.data
        })
    }

    return useQuery(['get-current-game', gameId], getCurrentGame, { refetchOnWindowFocus: false, enabled: !!gameId })
}
