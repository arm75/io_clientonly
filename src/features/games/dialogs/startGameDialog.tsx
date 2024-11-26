import { useForm } from 'react-hook-form'
import { Button } from '../../../app/components/shadcn/ui/button'
import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle } from '../../../app/components/shadcn/ui/dialog'
import { Input } from '../../../app/components/shadcn/ui/input'
import { Form, FormControl, FormField, FormItem } from '../../../app/components/shadcn/ui/form'
import { useMutation, useQueryClient } from '@tanstack/react-query'
import useAxios from '../../../app/api/axios'
import { User } from '../../users/types/entity/user'
import useToastContext from '../../../app/context/toast/useToastContext'

export default function StartGameDialog({ isOpen, onClose, title, description, startGameId }: any) {
    const { showToast } = useToastContext()

    const api = useAxios()

    //const socket = useAtomValue(socketAtom)

    const queryClient = useQueryClient()

    const authMeQueryData: User | undefined = queryClient.getQueryData(['auth-me'])

    const startGameForm = useForm({ mode: 'onChange' })

    const startGameMutation = useMutation(
        async (msg: { userId: string; gameId: string }) => await api.post(`/${import.meta.env.VITE_GAMES_ROUTE}/start`, msg),
        {
            onSuccess: (data: any) => {
                const message = data?.data?.message
                console.log(message)
                showToast('success', message)
                onClose()
            },
            onError: (res: any) => {
                const { message, code, status } = res.response.data.error
                console.log(`${code} ${status}: ${message}`)
                showToast('error', `${code} ${status}: ${message}`)
            },
            onSettled: () => {
                queryClient.invalidateQueries(['get-all-games'])
                cancelModal()
            },
        }
    )

    const submitStartGameForm = ({ userId, gameId }: any) => {
        startGameMutation.mutate({ userId, gameId })
    }

    const cancelModal = () => {
        startGameForm.reset()
        console.log('cancelModal() ran')
        onClose()
    }

    return (
        <Dialog open={isOpen} onOpenChange={cancelModal}>
            <DialogContent className="sm:max-w-[425px]">
                <Form {...startGameForm}>
                    <form onSubmit={startGameForm.handleSubmit(submitStartGameForm)}>
                        <DialogHeader>
                            <DialogTitle>{title}</DialogTitle>
                            <DialogDescription>{description}</DialogDescription>
                        </DialogHeader>
                        <FormField
                            control={startGameForm.control}
                            name="userId"
                            defaultValue={authMeQueryData?._id}
                            render={({ field }) => {
                                return (
                                    <FormItem>
                                        <FormControl>
                                            <Input type="hidden" {...field} />
                                        </FormControl>
                                    </FormItem>
                                )
                            }}
                        />
                        <FormField
                            control={startGameForm.control}
                            name="gameId"
                            defaultValue={startGameId}
                            render={({ field }) => {
                                return (
                                    <FormItem>
                                        <FormControl>
                                            <Input type="hidden" {...field} />
                                        </FormControl>
                                    </FormItem>
                                )
                            }}
                        />
                        UserId: {authMeQueryData?._id}
                        <br />
                        GameId: {startGameId}
                        <DialogFooter className="mt-8">
                            <Button type="button" onClick={cancelModal}>
                                Cancel
                            </Button>
                            <Button type="submit">Start Game</Button>
                        </DialogFooter>
                    </form>
                </Form>
            </DialogContent>
        </Dialog>
    )
}
