import { useAtomValue } from 'jotai'
import { useState, useEffect, useRef } from 'react'
import { socketAtom } from '../../../../app/state/socketAtom'
import { useAuthMe } from '../../../../app/auth/useAuthMe'
import { useCurrentGame } from '../../queries/useCurrentGame'
import { useQueryClient } from '@tanstack/react-query'
import { showAdminBlockNamesAtom } from '../../state/atoms/oldAtoms'

export default function ChatBox() {
    const queryClient = useQueryClient()

    const authMeQueryData = useAuthMe()
    const currentGameQueryData = useCurrentGame(authMeQueryData?.data?.currentGameId)
    const authMeQuery = authMeQueryData?.data
    const currentGameQuery = currentGameQueryData?.data

    const socket = useAtomValue(socketAtom)
    const showAdminBlockNames = useAtomValue(showAdminBlockNamesAtom)

    // socket.on("connection", () => {
    // 	console.log(`I'm connected with the back-end`)
    // })

    const [message, setMessage] = useState('')

    //const [messages, setMessages] = useState<string[]>([])

    const chatInputRef = useRef<HTMLInputElement>(null)
    const chatLogRef = useRef<HTMLDivElement>(null)

    useEffect(() => {
        // Scroll to the bottom when chat messages change
        if (currentGameQuery?.logs && chatLogRef.current) {
            chatLogRef.current.scrollTop = chatLogRef.current.scrollHeight
        }
    }, [currentGameQuery?.logs])

    useEffect(() => {
        if (socket) {
            socket.on('chat messages update', (message: string) => {
                queryClient.invalidateQueries(['get-current-game'])
                //setMessages([...messages, message])
            })
        }
    }, [queryClient, socket])

    const handleSendMessage = () => {
        console.log('chat message sent: ', message)
        if (socket) {
            socket.emit('game message', 'chat', message)
            setMessage('')
        }
        if (chatInputRef.current) {
            chatInputRef.current.focus()
        }
    }

    return (
        <>
            <div className="w-full mb-4 p-4 rounded-md bg-gray-950">
                <div ref={chatLogRef} className="w-full h-[200px] flex flex-col overflow-y-scroll">
                    {currentGameQuery?.logs.map((entry: any, index: number) => (
                        <div key={`game-log-entry-${entry._id}`} className={`${(index + 1) % 2 === 0 ? 'bg-gray-900' : 'bg-gray-950'} p-2`}>
                            <div className="text-gray-200 text-sm">
                                [
                                <span className="text-gray-600">
                                    {entry.timeString} {entry.type === 'chat' ? ' - ' : ''} {entry.type === 'chat' ? entry.displayName : ''}
                                </span>
                                ]{' '}
                                <span className={entry.type === 'game' ? 'text-orange-500 uppercase' : entry.type === 'chat' ? 'text-white-400' : ''}>
                                    {entry.message}
                                </span>
                            </div>
                        </div>
                    ))}
                    {/* {chatMessages.map((message, index) => (
					<>
						<div className={`${(index + 1) % 2 === 0 ? "bg-slate-800" : "bg-slate-900"} p-2`}>
							<div className="text-slate-100 text-xs">
								<span className="text-slate-500">{message.name}&gt; </span>
								{message.text}
							</div>
						</div>
					</>
				))} */}
                </div>

                <div className="flex p-2">
                    <input
                        ref={chatInputRef}
                        type="text"
                        className="w-full px-4 py-2 rounded-l-lg border border-gray-300 focus:outline-none focus:ring focus:border-blue-300"
                        placeholder="Type your message..."
                        value={message}
                        onChange={(e) => setMessage(e.target.value)}
                    />
                    <button onClick={handleSendMessage} className="bg-emerald-500 hover:bg-emerald-600 text-white px-4 py-2 rounded-r-lg">
                        Send
                    </button>
                </div>
                <div className="flex p-4 pb-0 justify-end">{showAdminBlockNames ? <h1 className="text-red-600">&lt;ChatBoxControl /&gt;</h1> : null}</div>
            </div>
        </>
    )
}
