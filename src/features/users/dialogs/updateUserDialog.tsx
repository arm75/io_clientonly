import { useForm } from 'react-hook-form'
import { Button } from '../../../app/components/shadcn/ui/button'
import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle } from '../../../app/components/shadcn/ui/dialog'
import { Input } from '../../../app/components/shadcn/ui/input'
import { Form, FormControl, FormDescription, FormField, FormItem, FormLabel, FormMessage } from '../../../app/components/shadcn/ui/form'
import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query'
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '../../../app/components/shadcn/ui/select'
import { useState } from 'react'
import useAxios from '../../../app/api/axios'
import useToastContext from '../../../app/context/toast/useToastContext'
import { User } from '../types/entity/user'

export default function UpdateUserDialog({ isOpen, onClose, title, description, updateUserId }: any) {
    const [roleField, setRoleField] = useState('')

    const userForm = useForm({ mode: 'onChange' })

    const { showToast } = useToastContext()

    const api = useAxios()

    const queryClient = useQueryClient()

    const getUserQuery = useQuery([`get-user`], async () => await api.get(`/${import.meta.env.VITE_USERS_ROUTE}/${updateUserId}`).then((res) => res.data), {
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
        refetchOnWindowFocus: false,
        enabled: Boolean(updateUserId),
    })

    const updateUserMutation = useMutation(async (user: Partial<User>) => await api.patch(`/${import.meta.env.VITE_USERS_ROUTE}`, user), {
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
            queryClient.invalidateQueries(['get-user'])
            cancelModal()
        },
    })

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
                            render={({ field }) => (
                                <FormItem>
                                    <FormControl>
                                        <Input
                                            type="hidden"
                                            // placeholder=""
                                            {...field}
                                        />
                                    </FormControl>
                                </FormItem>
                            )}
                        />
                        <FormField
                            name="username"
                            defaultValue=""
                            render={({ field }) => (
                                <FormItem>
                                    <FormLabel>Username</FormLabel>
                                    <FormControl>
                                        <Input {...field} />
                                    </FormControl>
                                    <FormDescription>Please enter a username.</FormDescription>
                                    <FormMessage />
                                </FormItem>
                            )}
                        />
                        <FormField
                            name="password"
                            defaultValue=""
                            render={({ field }) => (
                                <FormItem>
                                    <FormLabel>Password</FormLabel>
                                    <FormControl>
                                        <Input {...field} />
                                    </FormControl>
                                    <FormDescription>Please enter a password.</FormDescription>
                                    <FormMessage />
                                </FormItem>
                            )}
                        />
                        <FormField
                            control={userForm.control}
                            name="role"
                            defaultValue=""
                            render={({ field }) => (
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
                            )}
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
