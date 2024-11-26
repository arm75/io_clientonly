import React, { useState, useEffect } from 'react'
import { RenderProgressBar } from './renderProgressBar'

type CountupProgressBarProps = {
    onComplete: () => void // Callback to trigger when 1-minute completes
}

export const CountupProgressBar: React.FC<CountupProgressBarProps> = ({ onComplete }) => {
    const [progress, setProgress] = useState(0) // Progress from 0 to 100
    const [isComplete, setIsComplete] = useState(false) // To track if the progress is complete

    useEffect(() => {
        let interval: NodeJS.Timeout
        let timeElapsed = 0

        // This interval will update the progress every 100ms
        // eslint-disable-next-line prefer-const
        interval = setInterval(() => {
            if (timeElapsed < 30) {
                // For 1 minute (60 seconds)
                timeElapsed += 0.1
                setProgress((timeElapsed / 30) * 100) // Update progress
            } else {
                clearInterval(interval) // Stop the timer once 1 minute is complete
                setProgress(100) // Ensure progress is exactly 100%
                setIsComplete(true) // Mark as complete
            }
        }, 100) // Update every 100ms

        // Cleanup interval on unmount
        return () => clearInterval(interval)
    }, [])

    useEffect(() => {
        // Once the progress is complete, call the onComplete callback
        if (isComplete) {
            onComplete()
        }
    }, [isComplete, onComplete])

    return (
        <div className="w-full flex justify-center items-center">
            <RenderProgressBar progress={progress} />
        </div>
    )
}
