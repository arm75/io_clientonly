import { columns } from './columns'
import { DataTable } from './dataTable'
import { useQuery } from '@tanstack/react-query'
import useAxios from '../../../../app/api/axios'

export default function UsersTable(props: any) {
    const { updateUserFn, deleteUserFn } = props

    let content: JSX.Element = <></>

    const api = useAxios()

    const getAllUsersQuery = useQuery(['get-all-users'], async () => await api.get(`/${import.meta.env.VITE_USERS_ROUTE}`).then((res: any) => res.data), {
        refetchOnWindowFocus: false,
    })

    const onUpdateUserClick = (id: any) => {
        updateUserFn(id)
    }

    const onDeleteUserClick = (id: any) => {
        deleteUserFn(id)
    }

    if (getAllUsersQuery.isLoading || getAllUsersQuery.isFetching) {
        content = <p>Loading...</p>
    }

    if (getAllUsersQuery.isError) {
        content = <p className="errmsg">whatev</p>
    }

    if (getAllUsersQuery.isSuccess) {
        const data = getAllUsersQuery.data
        content = <DataTable columns={columns} data={data} updateUserFn={onUpdateUserClick} deleteUserFn={onDeleteUserClick} />
    }

    return content
}
