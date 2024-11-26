import { useForm } from 'react-hook-form'
import { Button } from '../../../app/components/shadcn/ui/button'
import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle } from '../../../app/components/shadcn/ui/dialog'
import { Input } from '../../../app/components/shadcn/ui/input'
import { Form, FormControl, FormDescription, FormField, FormItem, FormLabel, FormMessage } from '../../../app/components/shadcn/ui/form'
import { useMutation, useQueryClient } from '@tanstack/react-query'
import useAxios from '../../../app/api/axios'
import useToastContext from '../../../app/context/toast/useToastContext'
import { Game } from '../../play/types/entity/game'

export default function CreateGameDialog({ isOpen, onClose, title, description }: any) {
    const createGameForm = useForm({ mode: 'onChange' })

    const { showToast } = useToastContext()

    const api = useAxios()

    const queryClient = useQueryClient()

    const createGameMutation = useMutation(async (game: Partial<Game>) => await api.post(`/${import.meta.env.VITE_GAMES_ROUTE}`, game), {
        onSuccess: (data: any) => {
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
            queryClient.invalidateQueries(['get-all-games'])
            cancelModal()
        },
    })

    const submitCreateGameForm: any = ({ name, description }: any) => {
        createGameMutation.mutate({ name, description })
    }

    const cancelModal = () => {
        createGameForm.reset()
        onClose()
    }

    return (
        <Dialog open={isOpen} onOpenChange={cancelModal}>
            <DialogContent className="sm:max-w-[425px]">
                <Form {...createGameForm}>
                    <form onSubmit={createGameForm.handleSubmit(submitCreateGameForm)}>
                        <DialogHeader>
                            <DialogTitle>{title}</DialogTitle>
                            <DialogDescription>{description}</DialogDescription>
                        </DialogHeader>
                        <FormField
                            control={createGameForm.control}
                            name="name"
                            defaultValue=""
                            render={({ field }) => (
                                <FormItem>
                                    <FormLabel>Game Name</FormLabel>
                                    <FormControl>
                                        <Input {...field} />
                                    </FormControl>
                                    <FormDescription>Please enter a game name.</FormDescription>
                                    <FormMessage />
                                </FormItem>
                            )}
                        />
                        <FormField
                            control={createGameForm.control}
                            name="description"
                            defaultValue=""
                            render={({ field }) => (
                                <FormItem>
                                    <FormLabel>Description</FormLabel>
                                    <FormControl>
                                        <Input {...field} />
                                    </FormControl>
                                    <FormDescription>Please enter a game description.</FormDescription>
                                    <FormMessage />
                                </FormItem>
                            )}
                        />
                        <DialogFooter className="mt-8">
                            <Button type="button" onClick={cancelModal}>
                                Cancel
                            </Button>
                            <Button type="submit">Create Game</Button>
                        </DialogFooter>
                    </form>
                </Form>
            </DialogContent>
        </Dialog>
    )
}
