import { useForm } from 'react-hook-form'
import { Button } from '../../../app/components/shadcn/ui/button'
import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle } from '../../../app/components/shadcn/ui/dialog'
import { Input } from '../../../app/components/shadcn/ui/input'
import { Form, FormControl, FormField, FormItem } from '../../../app/components/shadcn/ui/form'
import { useMutation, useQueryClient } from '@tanstack/react-query'
import useAxios from '../../../app/api/axios'
import { useAtomValue } from 'jotai'
import { socketAtom } from '../../../app/state/socketAtom'
import { User } from '../../users/types/entity/user'
import useToastContext from '../../../app/context/toast/useToastContext'

export default function JoinGameDialog({ isOpen, onClose, title, description, joinGameId }: any) {
    const { showToast } = useToastContext()

    const api = useAxios()

    const socket = useAtomValue(socketAtom)

    const queryClient = useQueryClient()

    const authMeQueryData: User | undefined = queryClient.getQueryData(['auth-me'])

    const joinGameForm = useForm({ mode: 'onChange' })

    const joinGameMutation = useMutation(async (msg: { userId: string; gameId: string }) => await api.post(`/${import.meta.env.VITE_GAMES_ROUTE}/join`, msg), {
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

    const submitJoinGameForm = ({ userId, gameId }: any) => {
        console.log({ userId })

        console.log({ gameId })

        joinGameMutation.mutate({ userId, gameId })
    }

    const cancelModal = () => {
        joinGameForm.reset()
        onClose()
    }

    return (
        <Dialog open={isOpen} onOpenChange={cancelModal}>
            <DialogContent className="sm:max-w-[425px]">
                <Form {...joinGameForm}>
                    <form onSubmit={joinGameForm.handleSubmit(submitJoinGameForm)}>
                        <DialogHeader>
                            <DialogTitle>{title}</DialogTitle>
                            <DialogDescription>{description}</DialogDescription>
                        </DialogHeader>
                        <FormField
                            control={joinGameForm.control}
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
                            control={joinGameForm.control}
                            name="gameId"
                            defaultValue={joinGameId}
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
                        GameId: {joinGameId}
                        <DialogFooter className="mt-8">
                            <Button type="button" onClick={cancelModal}>
                                Cancel
                            </Button>
                            <Button type="submit">Join Game</Button>
                        </DialogFooter>
                    </form>
                </Form>
            </DialogContent>
        </Dialog>
    )
}
