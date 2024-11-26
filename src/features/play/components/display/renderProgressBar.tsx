import React from 'react'
import { motion } from 'framer-motion'

type ProgressBarProps = {
    progress: number // A number between 0 and 100
}

export const RenderProgressBar: React.FC<ProgressBarProps> = ({ progress }) => {
    return (
        <div className="w-full bg-gray-200 rounded-lg h-4 overflow-hidden relative">
            <motion.div
                className="bg-indigo-600 h-full"
                initial={{ width: '100%' }} // Set initial to 100% to avoid the jump
                animate={{ width: `${progress}%` }} // Animate to the current progress value
                transition={{ duration: 0.5, ease: 'easeInOut' }}
            />
            <div className="absolute inset-0 flex items-center justify-center text-sm text-white">{Math.round(progress)}%</div>
        </div>
    )
}
