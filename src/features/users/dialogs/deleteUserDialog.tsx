import { useForm } from 'react-hook-form'
import { Button } from '../../../app/components/shadcn/ui/button'
import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle } from '../../../app/components/shadcn/ui/dialog'
import { Form } from '../../../app/components/shadcn/ui/form'
import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query'
import useAxios from '../../../app/api/axios'
import useToastContext from '../../../app/context/toast/useToastContext'

export default function DeleteUserDialog({ isOpen, onClose, title, description, deleteUserId }: any) {
    const deleteUserForm = useForm({ mode: 'onChange' })

    const { showToast } = useToastContext()

    const api = useAxios()

    const queryClient = useQueryClient()

    const getUserQuery = useQuery([`get-user`], async () => await api.get(`/${import.meta.env.VITE_USERS_ROUTE}/${deleteUserId}`).then((res) => res.data), {
        onSuccess: (data) => {
            deleteUserForm.setValue('id', data._id)
            deleteUserForm.setValue('username', data.username)
            deleteUserForm.setValue('role', data.role)
        },
        onError: () => {
            deleteUserForm.setValue('id', '')
            deleteUserForm.setValue('username', '')
            deleteUserForm.setValue('role', '')
        },
        refetchOnWindowFocus: false,
        enabled: deleteUserId !== null,
    })

    const deleteUserMutation = useMutation(async (id: string) => await api.delete(`/${import.meta.env.VITE_USERS_ROUTE}/${id}`), {
        onSuccess: (data) => {
            const message = data?.data?.message
            console.log(message)
            showToast('success', message)
        },
        onError: (error: any) => {
            const message = error?.response?.data?.message
            console.log(message)
            showToast('error', message)
        },
        onSettled: () => {
            queryClient.invalidateQueries(['get-all-users'])
            cancelModal()
        },
    })

    const submitDeleteUserForm = ({ id }: any) => {
        console.log('Id from form: ', { id })
        deleteUserMutation.mutate(id)
    }

    const cancelModal = () => {
        deleteUserForm.reset()
        onClose()
    }

    return (
        <Dialog open={isOpen} onOpenChange={cancelModal}>
            <DialogContent className="sm:max-w-[425px]">
                <Form {...deleteUserForm}>
                    <form onSubmit={deleteUserForm.handleSubmit(submitDeleteUserForm)}>
                        <DialogHeader>
                            <DialogTitle>{title}</DialogTitle>
                            <DialogDescription>{description}</DialogDescription>
                        </DialogHeader>
                        <h4>Are you sure you want to delete {getUserQuery?.data?.username} ?</h4>
                        <DialogFooter className="mt-8">
                            <Button type="button" onClick={cancelModal}>
                                Cancel
                            </Button>
                            <Button type="submit">Delete User</Button>
                        </DialogFooter>
                    </form>
                </Form>
            </DialogContent>
        </Dialog>
    )
}
