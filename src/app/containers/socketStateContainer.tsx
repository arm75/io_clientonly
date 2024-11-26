import { useSetAtom } from 'jotai'
import { useEffect } from 'react'
import { io } from 'socket.io-client'
import { socketAtom } from '../state/socketAtom'

const SOCKET_SERVER = import.meta.env.VITE_APP_BASE_URL
const RENDER_LOG = import.meta.env.VITE_APP_RENDER_LOG

export default function SocketStateContainer({ children }: any) {
    if (RENDER_LOG === 'true') console.log('<SocketStateContainer> rendered...')

    const setSocket = useSetAtom(socketAtom)

    useEffect(() => {
        const socketInstance = io(SOCKET_SERVER, {
            withCredentials: true,
        })
        setSocket(socketInstance)

        return () => {
            console.log('Disconnect ran.')
            socketInstance.disconnect()
        }
    }, [setSocket])

    // useEffect(() => {
    // 	if (socket) {
    // 		const startNewGame = (data: any) => {
    // 			console.log("Received startNewGame event:", data)
    // 			startNewGame(data)
    // 		}

    // 		const gamePlayerAdded = (data: any) => {
    // 			console.log("gamePlayerAdded event:", data)
    // 			queryClient.invalidateQueries(["get-all-games"])
    // 		}

    // 		const turnChanged = (data: any) => {
    // 			console.log("turnChanged event:", data)
    // 			queryClient.invalidateQueries(["get-game-in-progress"])
    // 			//queryClient.refetchQueries(["get-game-in-progress"])
    // 		}

    // 		const turnPlayed = (data: any) => {
    // 			console.log("turnPlayed event:", data)
    // 			queryClient.invalidateQueries(["get-game-in-progress"])
    // 			//queryClient.refetchQueries(["get-game-in-progress"])
    // 		}

    // 		const gameEnded = (data: any) => {
    // 			console.log("Received endGame event:", data)
    // 			window.location.href = "/"
    // 		}

    // 		socket.on("startNewGame", startNewGame)
    // 		socket.on("gamePlayerAdded", gamePlayerAdded)
    // 		socket.on("turnChanged", turnChanged)
    // 		socket.on("turnPlayed", turnPlayed)
    // 		socket.on("gameEnded", gameEnded)

    // 		return () => {
    // 			socket.off("startNewGame", startNewGame)
    // 			socket.off("gamePlayerAdded", gamePlayerAdded)
    // 			socket.off("turnChanged", turnChanged)
    // 			socket.off("turnPlayed", turnPlayed)
    // 			socket.off("gameEnded", gameEnded)
    // 		}
    // 	}
    // }, [queryClient, socket])

    return <>{children}</>
}
