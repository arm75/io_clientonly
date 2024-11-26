import React, { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'

const TestComp: React.FC = () => {
    const [tokens, setTokens] = useState(Array(5).fill(null)) // Example with 5 tokens
    const [isLeftAligned, setIsLeftAligned] = useState(false)

    // Animation Variants for Tokens
    const tokenVariants = {
        hidden: { opacity: 0, scale: 0.5 },
        visible: { opacity: 1, scale: 1, transition: { duration: 0.5 } },
    }

    // Animation Variant for Row
    const rowVariants = {
        centered: { justifyContent: 'flex-end' },
        leftAligned: {
            justifyContent: 'flex-start',
            transition: { duration: 3.5, ease: 'easeInOut' },
        },
    }

    return (
        <div className="flex flex-col w-full items-center space-y-4">
            <button onClick={() => setIsLeftAligned((prev) => !prev)} className="px-4 py-2 bg-blue-500 text-white rounded-lg">
                {isLeftAligned ? 'Reset to Center' : 'Align Left'}
            </button>

            <motion.div className="flex w-full space-x-2" initial="centered" animate={isLeftAligned ? 'leftAligned' : 'centered'} variants={rowVariants}>
                {tokens.map((_, index) => (
                    <motion.div
                        key={index}
                        className="w-10 h-10 bg-indigo-600 rounded-full"
                        variants={tokenVariants}
                        initial="hidden"
                        animate="visible"
                        transition={{ duration: 0.5, delay: index * 0.1 }} // Stagger fade-in
                    />
                ))}
            </motion.div>
        </div>
    )
}

export default TestComp
