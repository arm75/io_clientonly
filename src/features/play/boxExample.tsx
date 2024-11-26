import React, { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'

const BoxExample = () => {
    const [boxes, setBoxes] = useState([
        { id: 1, color: 'red' },
        { id: 2, color: 'blue' },
        { id: 3, color: 'green' },
    ])

    const addBox = (index: number) => {
        const newBox = { id: Date.now(), color: 'purple' }
        const updatedBoxes = [...boxes.slice(0, index), newBox, ...boxes.slice(index)]
        setBoxes(updatedBoxes)
    }

    const removeBox = (id: number) => {
        setBoxes(boxes.filter((box) => box.id !== id))
    }

    return (
        <div>
            <div className="flex">
                <AnimatePresence>
                    {boxes.map((box) => (
                        <motion.div
                            key={box.id}
                            layout
                            initial={{ scale: 0, opacity: 0 }}
                            animate={{ scale: 1, opacity: 1, transition: { duration: 0.01 } }}
                            exit={{ scale: 0, opacity: 0, transition: { duration: 0.01 } }}
                            style={{
                                width: '100px',
                                height: '100px',
                                backgroundColor: box.color,
                                display: 'flex',
                                alignItems: 'center',
                                justifyContent: 'center',
                                borderRadius: '10px',
                            }}
                        >
                            <button
                                onClick={() => removeBox(box.id)}
                                style={{
                                    background: 'white',
                                    border: 'none',
                                    borderRadius: '5px',
                                    padding: '5px',
                                    cursor: 'pointer',
                                }}
                            >
                                X
                            </button>
                        </motion.div>
                    ))}
                </AnimatePresence>
            </div>
            <button onClick={() => addBox(1)}>Add Box in Position 2</button>
        </div>
    )
}

export default BoxExample
