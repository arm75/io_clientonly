import { useForm } from 'react-hook-form'
import { Button } from '../../../app/components/shadcn/ui/button'
import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle } from '../../../app/components/shadcn/ui/dialog'
import { Input } from '../../../app/components/shadcn/ui/input'
import { Form, FormControl, FormDescription, FormField, FormItem, FormLabel, FormMessage } from '../../../app/components/shadcn/ui/form'
import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query'
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '../../../app/components/shadcn/ui/select'
import { useState } from 'react'
import useAxios from '../../../app/api/axios'
import { User } from '../../users/types/entity/user'

export default function UpdateGameDialog(props: any) {
    const { isOpen, onClose, title, description, updateGameId } = props

    const api = useAxios()

    const [roleField, setRoleField] = useState('')

    const queryClient = useQueryClient()

    const getGameQuery = useQuery(
        [`get-game-update-game`],
        async () => await api.get(`/${import.meta.env.VITE_GAMES_ROUTE}/${updateGameId}`).then((res) => res.data),
        {
            onSuccess: (data) => {
                userForm.setValue('id', data._id)
                userForm.setValue('username', data.username)
                userForm.setValue('role', data.role)
                setRoleField(data.role)
            },
            onError: () => {
                userForm.setValue('id', '')
                userForm.setValue('username', '')
                userForm.setValue('role', '')
                setRoleField('')
            },
            onSettled: () => {
                //
            },
            refetchOnWindowFocus: false,
            enabled: updateGameId !== null,
        }
    )

    // UPDATE USER mutation (react-query)
    const updateUserMutation = useMutation(async (user: User) => await api.patch(`/${import.meta.env.VITE_GAMES_ROUTE}`, user), {
        onSuccess: () => {
            //console.log("Success: ", {res})
        },
        onError: (res) => {
            //console.log("Error: ", { res })
        },
        onSettled: () => {
            queryClient.invalidateQueries(['get-all-users'])
            queryClient.invalidateQueries(['get-user'])
            cancelModal()
        },
    })

    const userForm = useForm({ mode: 'onChange' })

    const submitUpdateUserForm: any = (data: any) => {
        const { _id, username, password, role } = data
        updateUserMutation.mutate({ _id, username, password, role })
    }

    const cancelModal = () => {
        userForm.reset()
        onClose()
    }

    return (
        <Dialog open={isOpen} onOpenChange={cancelModal}>
            <DialogContent className="sm:max-w-[425px]">
                <Form {...userForm}>
                    <form onSubmit={userForm.handleSubmit(submitUpdateUserForm)}>
                        <DialogHeader>
                            <DialogTitle>{title}</DialogTitle>
                            <DialogDescription>{description}</DialogDescription>
                        </DialogHeader>
                        <FormField
                            control={userForm.control}
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
                        <FormField
                            //control={userForm.control}
                            name="username"
                            defaultValue=""
                            render={({ field }) => {
                                //console.log("username field:", field)
                                return (
                                    <FormItem>
                                        <FormLabel>Username</FormLabel>
                                        <FormControl>
                                            <Input
                                                // placeholder=""
                                                {...field}
                                            />
                                        </FormControl>
                                        <FormDescription>Please enter a username.</FormDescription>
                                        <FormMessage />
                                    </FormItem>
                                )
                            }}
                        />
                        <FormField
                            //control={userForm.control}
                            name="password"
                            defaultValue=""
                            render={({ field }) => {
                                //console.log("password field:", field)
                                return (
                                    <FormItem>
                                        <FormLabel>Password</FormLabel>
                                        <FormControl>
                                            <Input
                                                // placeholder=""
                                                {...field}
                                            />
                                        </FormControl>
                                        <FormDescription>Please enter a password.</FormDescription>
                                        <FormMessage />
                                    </FormItem>
                                )
                            }}
                        />
                        <FormField
                            control={userForm.control}
                            name="role"
                            defaultValue=""
                            render={({ field }) => {
                                //console.log("role field:", field)
                                return (
                                    <FormItem>
                                        <FormLabel>Role</FormLabel>
                                        <FormControl>
                                            <Select
                                                onValueChange={(value) => {
                                                    userForm.setValue('role', value)
                                                    setRoleField(value)
                                                }}
                                                value={roleField}
                                                defaultValue=""
                                            >
                                                <SelectTrigger className="w-[180px]">
                                                    <SelectValue placeholder="" />
                                                </SelectTrigger>
                                                <SelectContent>
                                                    <SelectItem value="Player">Player</SelectItem>
                                                    <SelectItem value="Admin">Admin</SelectItem>
                                                </SelectContent>
                                            </Select>
                                        </FormControl>
                                        <FormDescription>Please select a role.</FormDescription>
                                        <FormMessage />
                                    </FormItem>
                                )
                            }}
                        />
                        <DialogFooter className="mt-8">
                            <Button type="button" onClick={cancelModal}>
                                Cancel
                            </Button>
                            <Button type="submit">Update User</Button>
                        </DialogFooter>
                    </form>
                </Form>
            </DialogContent>
        </Dialog>
    )
}
