import { useState } from 'react'
import axios, { AxiosResponse } from 'axios'
import useAxios from '../api/axios'

export default function LoginPage() {
    const [errorMessage, setErrorMessage] = useState<string | null>('')
    const [username, setUsername] = useState<string>('')
    const [password, setPassword] = useState<string>('')

    const api = useAxios()

    const login = (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault()
        setErrorMessage('')
        api.post(
            '/auth/login',
            {
                username,
                password,
            },
            {
                withCredentials: true,
            }
        ).then(
            (res: AxiosResponse) => {
                if (res.data === 'success') {
                    window.location.href = '/'
                }
            },
            (res) => {
                console.log({ res })
                setErrorMessage('Sorry, your login request failed. Please try again.')
            }
        )
    }

    const logout = () => {
        api.get('/auth/logout', { withCredentials: true }).then(
            (res: AxiosResponse) => {
                if (res.data === 'success') {
                    window.location.href = '/'
                }
            },
            () => {
                console.log('Failure')
            }
        )
    }

    return (
        <div className="h-screen flex">
            {/* <!-- Left Column - Login Form --> */}
            <div className="w-screen flex items-center justify-center bg-slate-600">
                <form
                    className="w-96 p-8 bg-gray-400 rounded-lg shadow-md"
                    onSubmit={(e) => {
                        login(e)
                    }}
                >
                    <h2 className="text-2xl font-bold mb-6">INWORD/OUTWORD</h2>
                    <h6 className="text-2xl font-bold mb-6">Please Login</h6>
                    <div className="mb-4">
                        <label htmlFor="username" className="block text-gray-700 font-bold">
                            Username
                        </label>
                        <input
                            type="username"
                            id="username"
                            className="w-full border-gray-300 rounded-lg p-2"
                            placeholder="Enter your Username"
                            onChange={(e) => setUsername(e.target.value)}
                        />
                    </div>
                    <div className="mb-4">
                        <label htmlFor="password" className="block text-gray-700 font-bold">
                            Password
                        </label>
                        <input
                            type="password"
                            id="password"
                            className="w-full border-gray-300 rounded-lg p-2"
                            placeholder="Enter your password"
                            onChange={(e) => setPassword(e.target.value)}
                        />
                    </div>
                    {errorMessage ? <div className="text-white bg-red-700 border-1 border-red-950 p-4 m-2 mb-4">{errorMessage}</div> : ''}
                    <button
                        type="submit"
                        className="w-full bg-emerald-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:ring focus:ring-blue-300"
                    >
                        Login
                    </button>
                </form>
            </div>

            {/* <!-- Right Column - Image --> */}
            {/* <div className="w-1/2 bg-cover bg-center bg-/images/galaxy.jpg" style={{backgroundImage: 'url(/images/galaxy.jpg)'}}></div> */}
        </div>
    )
}
