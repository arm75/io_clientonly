import React, { useState } from 'react'
import { motion } from 'framer-motion'

const PulsingButton = () => {
    const [isPulsing, setIsPulsing] = useState(false)

    return (
        <div className="flex flex-col items-center space-y-4">
            <button className="bg-gray-800 text-white px-4 py-2 rounded" onClick={() => setIsPulsing(!isPulsing)}>
                {isPulsing ? 'Stop Pulsing' : 'Start Pulsing'}
            </button>

            <motion.button
                className="px-6 py-3 rounded text-white font-bold bg-blue-500"
                animate={isPulsing ? { backgroundColor: ['#3b82f6', '#93c5fd'] } : {}}
                transition={{
                    duration: 1,
                    repeat: Infinity,
                    repeatType: 'reverse',
                    ease: 'easeInOut',
                }}
            >
                Pulsing Button
            </motion.button>
        </div>
    )
}

export default PulsingButton
