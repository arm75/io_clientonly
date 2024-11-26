import { useEffect, useState } from 'react'
import GamesTable from './tables/gamesTable/gamesTable'
import { Button } from '../../app/components/shadcn/ui/button'
import HomeLayout from '../../app/layouts/home/homeLayout'
import CreateGameDialog from './dialogs/createGameDialog'
import UpdateGameDialog from './dialogs/updateGameDialog'
import CancelGameDialog from './dialogs/cancelGameDialog'
import DeleteGameDialog from './dialogs/deleteGameDialog'
import JoinGameDialog from './dialogs/joinGameDialog'
import StartGameDialog from './dialogs/startGameDialog'
import { Tabs, TabsContent, TabsList, TabsTrigger } from '../../app/components/shadcn/ui/tabs'
import { useQueryClient } from '@tanstack/react-query'
import { useAtomValue } from 'jotai'
import { socketAtom } from '../../app/state/socketAtom'
import { SocketIoCommand } from '../play/types/dto/socketIoCommand'

const RENDER_LOG = import.meta.env.VITE_APP_RENDER_LOG

export default function GamesPage() {
    if (RENDER_LOG === 'true') console.log('<GamesPage> rendered...')

    const queryClient = useQueryClient()

    const socket = useAtomValue(socketAtom)

    const [showCreateModal, setShowCreateModal] = useState(false)

    const [startGameId, setStartGameId] = useState<string | null>(null)
    const showStartModal = startGameId !== null

    const [joinGameId, setJoinGameId] = useState<string | null>(null)
    const showJoinModal = joinGameId !== null

    const [updateGameId, setUpdateGameId] = useState<string | null>(null)
    const showUpdateModal = updateGameId !== null

    const [cancelGameId, setCancelGameId] = useState<string | null>(null)
    const showCancelModal = cancelGameId !== null

    const [deleteGameId, setDeleteGameId] = useState<string | null>(null)
    const showDeleteModal = deleteGameId !== null

    const onStartGameClick = (_id: string) => {
        setStartGameId(_id)
    }

    const onJoinGameClick = (_id: string) => {
        setJoinGameId(_id)
    }

    const onUpdateGameClick = (_id: string) => {
        setUpdateGameId(_id)
    }

    const onCancelGameClick = (_id: string) => {
        setCancelGameId(_id)
    }

    const onDeleteGameClick = (_id: string) => {
        setDeleteGameId(_id)
    }

    useEffect(() => {
        if (socket) {
            const gameCreated = (data: SocketIoCommand) => {
                console.log('playerAdded event:', data)
                queryClient.invalidateQueries(['get-all-games'])
            }

            const gameUpdated = (data: SocketIoCommand) => {
                console.log('playerAdded event:', data)
                queryClient.invalidateQueries(['get-all-games'])
            }

            const gameStarted = (data: SocketIoCommand) => {
                console.log('Received startGame event:', data)
            }

            const gameJoined = (data: SocketIoCommand) => {
                console.log('playerAdded event:', data)
                queryClient.invalidateQueries(['get-all-games'])
            }

            const gameDeleted = (data: SocketIoCommand) => {
                console.log('playerAdded event:', data)
                queryClient.invalidateQueries(['get-all-games'])
            }

            socket.on('gameCreated', gameCreated)
            socket.on('gameUpdated', gameUpdated)
            socket.on('gameStarted', gameStarted)
            socket.on('gameJoined', gameJoined)
            socket.on('gameDeleted', gameDeleted)

            return () => {
                socket.off('gameCreated', gameCreated)
                socket.off('gameUpdated', gameUpdated)
                socket.off('gameStarted', gameStarted)
                socket.off('gameJoined', gameJoined)
                socket.off('gameDeleted', gameDeleted)
            }
        }
    }, [queryClient, socket])

    return (
        <HomeLayout>
            <Tabs defaultValue="games-current" className="w-full">
                <TabsList>
                    <TabsTrigger value="games-current">current</TabsTrigger>
                    <TabsTrigger value="games-completed">completed</TabsTrigger>
                    <TabsTrigger value="games-cancelled">cancelled</TabsTrigger>
                </TabsList>
                <TabsContent value="games-current">
                    <h1 className="text-4xl text-slate-800 text-center font-bold mb-2">Games</h1>
                    <Button
                        className="text-white bg-emerald-500 border border-emerald-900 hover:bg-emerald-800"
                        onClick={() => {
                            setShowCreateModal(true)
                        }}
                    >
                        New Game
                    </Button>
                    <GamesTable
                        startGameFn={onStartGameClick}
                        joinGameFn={onJoinGameClick}
                        updateGameFn={onUpdateGameClick}
                        cancelGameFn={onCancelGameClick}
                        deleteGameFn={onDeleteGameClick}
                    />
                </TabsContent>
                <TabsContent value="games-completed">
                    <h1 className="text-4xl text-slate-800 text-center font-bold mb-2">Completed Games</h1>
                </TabsContent>
                <TabsContent value="games-cancelled">
                    <h1 className="text-4xl text-slate-800 text-center font-bold mb-2">Cancelled Games</h1>
                </TabsContent>
            </Tabs>
            <CreateGameDialog
                isOpen={showCreateModal}
                onClose={() => {
                    setShowCreateModal(false)
                }}
                title="Create Game"
                description="Please enter the new Game's details."
            />
            <StartGameDialog
                startGameId={startGameId}
                isOpen={showStartModal}
                onClose={() => {
                    console.log('onClose() Ran')
                    setStartGameId(null)
                }}
                title="Start Game"
                description="Start this game?"
            />
            <JoinGameDialog
                joinGameId={joinGameId}
                isOpen={showJoinModal}
                onClose={() => {
                    setJoinGameId(null)
                }}
                title="Join Game"
                description="Join this game?"
            />
            <UpdateGameDialog
                updateGameId={updateGameId}
                isOpen={showUpdateModal}
                onClose={() => {
                    setUpdateGameId(null)
                }}
                title="Update Game"
                description="Please update the new Game's details."
            />
            <CancelGameDialog
                cancelGameId={cancelGameId}
                isOpen={showCancelModal}
                onClose={() => {
                    setCancelGameId(null)
                }}
                title="Cancel Game"
                description="Are you sure you want to cancel the game?"
            />
            <DeleteGameDialog
                deleteGameId={deleteGameId}
                isOpen={showDeleteModal}
                onClose={() => {
                    setDeleteGameId(null)
                }}
                title="Delete Game"
                description="Are you sure you want to delete the game?"
            />
        </HomeLayout>
    )
}
