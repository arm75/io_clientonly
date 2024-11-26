import React, { useState, useEffect } from 'react'
import { motion } from 'framer-motion'

type CountdownProgressBarProps = {
    seconds: number // The number of seconds to countdown
    onComplete: () => void // Callback function to call after countdown completes
}

const CountdownProgressBar: React.FC<CountdownProgressBarProps> = ({ seconds, onComplete }) => {
    const [timeLeft, setTimeLeft] = useState(seconds) // Track the time remaining in seconds
    const [progress, setProgress] = useState(100) // Track the progress percentage (based on time left)

    useEffect(() => {
        let interval: NodeJS.Timeout
        let timeRemaining = seconds // Countdown in seconds

        // This interval will update the progress every 100ms
        // eslint-disable-next-line prefer-const
        interval = setInterval(() => {
            if (timeRemaining > 0) {
                timeRemaining -= 0.1 // Decrease time every 100ms
                setProgress((timeRemaining / seconds) * 100) // Update progress percentage
                setTimeLeft(Math.ceil(timeRemaining)) // Update the time left in seconds
            } else {
                clearInterval(interval) // Stop the countdown once we reach 0
                setProgress(0) // Ensure progress is exactly 0%
                setTimeLeft(0) // Ensure time left is 0
            }
        }, 100) // Update every 100ms

        // Cleanup interval on unmount
        return () => clearInterval(interval)
    }, [seconds])

    useEffect(() => {
        // Once the progress is complete, call the callback function
        if (timeLeft === 0) {
            onComplete()
        }
    }, [timeLeft, onComplete])

    return (
        <div className="w-full flex justify-center items-center">
            <div className="w-full bg-gray-200 rounded-lg h-16 overflow-hidden relative">
                <motion.div
                    className="bg-indigo-600 h-full"
                    initial={{ width: '100%' }}
                    animate={{ width: `${progress}%` }} // Animate to the current progress
                    transition={{ duration: 0.1, ease: 'easeInOut' }} // Smooth animation
                />
                <div className="absolute inset-0 flex items-center justify-center text-sm text-white">
                    {timeLeft}s {/* Display the remaining seconds */}
                </div>
            </div>
        </div>
    )
}

export default CountdownProgressBar
