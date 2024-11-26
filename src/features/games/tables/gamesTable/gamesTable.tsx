import { columns } from './columns'
import { DataTable } from './dataTable'
import { useQuery } from '@tanstack/react-query'
import useAxios from '../../../../app/api/axios'

export default function GamesTable({ startGameFn, joinGameFn, updateGameFn, cancelGameFn, deleteGameFn }: any) {
    let content: JSX.Element = <></>

    const api = useAxios()

    const getAllGamesQuery = useQuery(['get-all-games'], async () => await api.get(`/${import.meta.env.VITE_GAMES_ROUTE}`).then((res: any) => res.data), {
        onError: (error) => {
            console.log('There was an error: ', error)
        },
        refetchOnWindowFocus: false,
    })

    const onStartGameClick = (_id: any) => {
        startGameFn(_id)
    }

    const onJoinGameClick = (_id: any) => {
        joinGameFn(_id)
    }

    const onUpdateGameClick = (_id: any) => {
        updateGameFn(_id)
    }

    const onCancelGameClick = (_id: any) => {
        cancelGameFn(_id)
    }

    const onDeleteGameClick = (_id: any) => {
        deleteGameFn(_id)
    }

    if (getAllGamesQuery.isLoading || getAllGamesQuery.isFetching) {
        content = <p>Loading...</p>
    }

    if (getAllGamesQuery.isError) {
        content = <p className="errmsg">whatev</p>
    }

    if (getAllGamesQuery.isSuccess) {
        const data = getAllGamesQuery.data
        content = (
            <DataTable
                columns={columns}
                data={data}
                startGameFn={onStartGameClick}
                joinGameFn={onJoinGameClick}
                updateGameFn={onUpdateGameClick}
                cancelGameFn={onCancelGameClick}
                deleteGameFn={onDeleteGameClick}
            />
        )
    }

    return content
}
