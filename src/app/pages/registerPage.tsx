import { useState } from 'react'
import { AxiosResponse } from 'axios'
import useAxios from '../api/axios'

export default function Register() {
    const [username, setUsername] = useState<string>('')
    const [password, setPassword] = useState<string>('')

    const api = useAxios()

    const register = () => {
        api.post(
            '/register',
            {
                username,
                password,
            },
            {
                withCredentials: true,
            }
        ).then((res: AxiosResponse) => {
            if (res.data === 'success') {
                window.location.href = '/login'
            }
        })
    }

    return (
        <div>
            <h1>Register</h1>
            <input type="text" placeholder="username" onChange={(e) => setUsername(e.target.value)} />
            <input type="text" placeholder="password" onChange={(e) => setPassword(e.target.value)} />
            <button onClick={register}>Login</button>
        </div>
    )
}
