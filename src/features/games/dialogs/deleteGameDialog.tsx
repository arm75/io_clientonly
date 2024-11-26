import { useForm } from 'react-hook-form'
import { Button } from '../../../app/components/shadcn/ui/button'
import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle } from '../../../app/components/shadcn/ui/dialog'
import { Form } from '../../../app/components/shadcn/ui/form'
import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query'
import useAxios from '../../../app/api/axios'
import useToastContext from '../../../app/context/toast/useToastContext'

export default function DeleteGameDialog({ isOpen, onClose, title, description, deleteGameId }: any) {
    const gameForm = useForm({ mode: 'onChange' })

    const { showToast } = useToastContext()

    const api = useAxios()

    const queryClient = useQueryClient()

    const getGameQuery = useQuery(
        [`get-game-delete-game`],
        async () => await api.get(`/${import.meta.env.VITE_GAMES_ROUTE}/${deleteGameId}`).then((res) => res.data),
        {
            onSuccess: (data: any) => {
                gameForm.setValue('_id', data._id)
                gameForm.setValue('name', data.name)
            },
            onError: () => {
                gameForm.setValue('_id', '')
                gameForm.setValue('name', '')
            },
            refetchOnWindowFocus: false,
            enabled: deleteGameId !== null,
        }
    )

    const deleteGameMutation = useMutation(async (gameId: string) => await api.delete(`/${import.meta.env.VITE_GAMES_ROUTE}/${gameId}`), {
        onSuccess: (data: any) => {
            const message = data?.data?.message
            console.log(message)
            showToast('success', message)
            onClose()
        },
        onError: (error: any) => {
            const message = error?.response?.data?.message
            console.log(message)
            showToast('error', message)
        },
        onSettled: () => {
            queryClient.invalidateQueries(['get-all-games'])
            cancelModal()
        },
    })

    const submitDeleteGameForm = ({ _id }: any) => {
        //console.log('Id from form: ', { _id })
        console.log(`Id from form: ${_id}`)
        deleteGameMutation.mutate(_id)
    }

    const cancelModal = () => {
        gameForm.reset()
        onClose()
    }

    return (
        <Dialog open={isOpen} onOpenChange={cancelModal}>
            <DialogContent className="sm:max-w-[425px]">
                <p>Value: {deleteGameId !== null ? 'true' : 'false'}</p>
                <Form {...gameForm}>
                    <form onSubmit={gameForm.handleSubmit(submitDeleteGameForm)}>
                        <DialogHeader>
                            <DialogTitle>{title}</DialogTitle>
                            <DialogDescription>{description}</DialogDescription>
                        </DialogHeader>
                        <h4>Are you sure you want to delete game {getGameQuery?.data?.name} ?</h4>
                        <DialogFooter className="mt-8">
                            <Button type="button" onClick={cancelModal}>
                                Cancel
                            </Button>
                            <Button type="submit">Delete Game</Button>
                        </DialogFooter>
                    </form>
                </Form>
            </DialogContent>
        </Dialog>
    )
}
