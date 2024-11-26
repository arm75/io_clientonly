import { useState, useEffect } from 'react'
import { differenceInSeconds, parseISO } from 'date-fns' // Import date-fns functions

const GameClock = ({ gameCreatedAt }: any) => {
    const [offsetSeconds, setOffsetSeconds] = useState(0)

    useEffect(() => {
        //console.log('Game created at timestamp: ', gameCreatedAt)

        if (gameCreatedAt) {
            const createdTimestamp = parseISO(gameCreatedAt) // Assuming 'created' is the ISO date string in your game data

            //console.log('Game created at: ', createdTimestamp)

            const intervalId = setInterval(() => {
                const currentTimestamp = new Date()
                const newOffsetSeconds = differenceInSeconds(currentTimestamp, createdTimestamp)

                setOffsetSeconds(newOffsetSeconds)
            }, 1000)

            return () => {
                //console.log('Clearing interval: ', intervalId)
                clearInterval(intervalId)
            }
        }
    }, [gameCreatedAt]) // Add offsetSeconds as a dependency

    // Calculate days, hours, minutes, and seconds
    const days = Math.floor(offsetSeconds / (3600 * 24))
    const hours = Math.floor((offsetSeconds % (3600 * 24)) / 3600)

    const minutes = Math.floor((offsetSeconds % 3600) / 60)
    const seconds = offsetSeconds % 60

    // Format the time as Days:Hours:Minutes:Seconds
    const offsetFormatted = `${String(days).padStart(2, '0')}:${String(hours).padStart(2, '0')}:${String(minutes).padStart(2, '0')}:${String(seconds).padStart(
        2,
        '0'
    )}`

    if (offsetFormatted) {
        return <div className="text-2xl text-gray-500 tracking-wider">{offsetFormatted}</div>
    } else {
        return <></>
    }
}

export default GameClock
