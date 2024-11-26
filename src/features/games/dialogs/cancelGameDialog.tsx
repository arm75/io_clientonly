import { useForm } from 'react-hook-form'
import { Button } from '../../../app/components/shadcn/ui/button'
import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle } from '../../../app/components/shadcn/ui/dialog'
import { Form, FormControl, FormField, FormItem } from '../../../app/components/shadcn/ui/form'
import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query'
import { Input } from '../../../app/components/shadcn/ui/input'
import useAxios from '../../../app/api/axios'

export default function CancelGameDialog(props: any) {
    const { isOpen, onClose, title, description, cancelGameId } = props

    const api = useAxios()

    // const [roleField, setRoleField] = useState("")

    // get query client (react-query)
    const queryClient = useQueryClient()

    // GET USER QUERY (react-query)
    const getGameQuery = useQuery(
        [`get-game-cancel-game`],
        async () => await api.get(`/${import.meta.env.VITE_GAMES_ROUTE}/${cancelGameId}`).then((res) => res.data),
        {
            onSuccess: (data) => {
                console.log('query-changed:', data)
                gameForm.setValue('id', data.id)
                gameForm.setValue('name', data.name)
            },
            onError: () => {
                gameForm.setValue('id', '')
                gameForm.setValue('name', '')
            },
            onSettled: () => {
                console.log(cancelGameId)
            },
            refetchOnWindowFocus: false,
            enabled: cancelGameId !== null,
        }
    )

    // UPDATE USER mutation (react-query)
    const cancelGameMutation = useMutation(async (gameId: string) => await api.post(`/${import.meta.env.VITE_GAMES_ROUTE}/cancel`), {
        onSuccess: () => {
            //console.log("Success: ", {res})
            //cl('info', "CREATE USER Successful!")
            //cancelModal()
            //makeToast(res.data.message, 'primary')
        },
        onError: (res) => {
            //console.log("Error: ", { res })
            //cl('error', "CREATE USER FAILED!")
            //makeToast(res.response.data.message, 'danger')
        },
        onSettled: () => {
            //console.log("Settled: ", {res})
            queryClient.invalidateQueries(['get-all-games'])
            //queryClient.invalidateQueries(["get-user"])
            cancelModal()
        },
    })

    const gameForm = useForm({ mode: 'onChange' })

    const submitCancelGameForm: any = (data: any) => {
        1
        // { username, password, roles }: any
        //console.log("Form Submit Data: ", data)
        const { id, username, password, role } = data
        console.log({ id })
        // console.log({ password })
        // console.log({ role })
        // console.log("submit function ran.")
        // const newUser = {
        // 	username: username,
        // 	password: password,
        // 	//firstname: firstname,
        // 	//lastname: lastname,
        // 	//email: email,
        // 	roles: roles,
        // 	//rolesArray: rolesArray,
        // }
        cancelGameMutation.mutate(id)
    }

    const cancelModal = () => {
        //makeToast('Cancel World!', 'primary')
        gameForm.reset()
        onClose()
    }

    return (
        <Dialog open={isOpen} onOpenChange={cancelModal}>
            <DialogContent className="sm:max-w-[425px]">
                <Form {...gameForm}>
                    <form onSubmit={gameForm.handleSubmit(submitCancelGameForm)}>
                        <DialogHeader>
                            <DialogTitle>{title}</DialogTitle>
                            <DialogDescription>{description}</DialogDescription>
                        </DialogHeader>
                        <FormField
                            control={gameForm.control}
                            name="id"
                            defaultValue=""
                            render={({ field }) => {
                                //console.log("id field:", field)
                                return (
                                    <FormItem>
                                        {/* <FormLabel>Username</FormLabel> */}
                                        <FormControl>
                                            <Input
                                                type="hidden"
                                                // placeholder=""
                                                {...field}
                                            />
                                        </FormControl>
                                        {/* <FormDescription>Please enter a username.</FormDescription>
										<FormMessage /> */}
                                    </FormItem>
                                )
                            }}
                        />
                        <h4>Are you sure you want to delete {getGameQuery?.data?.name} ?</h4>
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
