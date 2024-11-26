import React, { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { Button } from '../../app/components/shadcn/ui/button'

const ToggleBoxes = () => {
    const [showBox1, setShowBox1] = useState(true)

    const toggleBoxes = () => {
        setShowBox1((prev) => !prev)
    }

    return (
        <div className="">
            <AnimatePresence mode="wait">
                {showBox1 ? (
                    <motion.div
                        key="box1"
                        initial={{ y: -50, opacity: 0 }}
                        animate={{ y: 0, opacity: 1 }}
                        exit={{ y: 50, opacity: 0 }}
                        transition={{ duration: 0.5 }}
                        style={{
                            // position: 'absolute',
                            // width: '100%',
                            height: '100px',
                            background: 'skyblue',
                            display: 'flex',
                            alignItems: 'center',
                            justifyContent: 'center',
                        }}
                    >
                        <h2>Box 1</h2>
                    </motion.div>
                ) : (
                    <motion.div
                        key="box2"
                        initial={{ y: -50, opacity: 0 }}
                        animate={{ y: 0, opacity: 1, height: '200px' }}
                        exit={{ y: 50, opacity: 0 }}
                        transition={{ duration: 0.5 }}
                        style={{
                            // position: 'absolute',
                            // width: '100%',
                            height: '150px',
                            background: 'lightcoral',
                            display: 'flex',
                            alignItems: 'center',
                            justifyContent: 'center',
                        }}
                    >
                        <h2>Box 2</h2>
                    </motion.div>
                )}
            </AnimatePresence>
            <div className="flex">
                <Button className="bg-red-600 text-white" onClick={toggleBoxes}>
                    {showBox1 ? 'Show Box 2' : 'Show Box 1'}
                </Button>
            </div>
        </div>
    )
}

export default ToggleBoxes
