import { useState } from 'react'
import CreateUserDialog from './dialogs/createUserDialog'
import UsersTable from './tables/allUsersTable/usersTable'
import { Button } from '../../app/components/shadcn/ui/button'
import HomeLayout from '../../app/layouts/home/homeLayout'
import UpdateUserDialog from './dialogs/updateUserDialog'
import DeleteUserDialog from './dialogs/deleteUserDialog'

const RENDER_LOG = import.meta.env.VITE_APP_RENDER_LOG

export default function UsersPage() {
    if (RENDER_LOG === 'true') console.log('<UsersPage> rendered...')

    const [showCreateModal, setShowCreateModal] = useState(false)

    const [updateUserId, setUpdateUserId] = useState(null)
    const showUpdateModal = updateUserId !== null

    const [deleteUserId, setDeleteUserId] = useState(null)
    const showDeleteModal = deleteUserId !== null

    const onUpdateUserClick = (id: any) => {
        setUpdateUserId(id)
    }

    const onDeleteUserClick = (id: any) => {
        setDeleteUserId(id)
    }

    return (
        <>
            <HomeLayout>
                <h1 className="text-3xl font-bold mb-2">Users</h1>
                <Button
                    className="text-white bg-emerald-500 border border-emerald-900 hover:bg-emerald-800"
                    onClick={() => {
                        setShowCreateModal(true)
                    }}
                >
                    Create User
                </Button>
                <UsersTable updateUserFn={onUpdateUserClick} deleteUserFn={onDeleteUserClick} />
                <CreateUserDialog
                    isOpen={showCreateModal}
                    onClose={() => {
                        setShowCreateModal(false)
                    }}
                    title="Create User"
                    description="Please enter the new user's details."
                />
                <UpdateUserDialog
                    updateUserId={updateUserId}
                    isOpen={showUpdateModal}
                    onClose={() => {
                        setUpdateUserId(null)
                    }}
                    title="Update User"
                    description="Please update the new user's details."
                />
                <DeleteUserDialog
                    deleteUserId={deleteUserId}
                    isOpen={showDeleteModal}
                    onClose={() => {
                        setDeleteUserId(null)
                    }}
                    title="Delete User"
                    description="Are you sure you want to delete the user?"
                />
            </HomeLayout>
        </>
    )
}
