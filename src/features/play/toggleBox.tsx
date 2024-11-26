// import React, { useState } from 'react'
// import { motion, AnimatePresence } from 'framer-motion'

// const ToggleBox = () => {
//     const [isGreen, setIsGreen] = useState(true)

//     return (
//         <div className="flex flex-col items-center space-y-4">
//             <button className="bg-blue-500 text-white px-4 py-2 rounded" onClick={() => setIsGreen(!isGreen)}>
//                 {isGreen ? 'Hide Box' : 'Show Box'}
//             </button>

//             <AnimatePresence>
//                 {isGreen && (
//                     <motion.div
//                         className="w-40 h-40 bg-green-500 flex items-center justify-center rounded"
//                         initial={{ opacity: 0 }}
//                         animate={{ opacity: 1 }}
//                         exit={{ opacity: 0 }}
//                         transition={{ duration: 1 }}
//                     >
//                         <p className="text-white">Hello!</p>
//                     </motion.div>
//                 )}
//                 {!isGreen && (
//                     <motion.div
//                         className="w-40 h-40 bg-orange-500 flex items-center justify-center rounded"
//                         initial={{ opacity: 0 }}
//                         animate={{ opacity: 1 }}
//                         exit={{ opacity: 0 }}
//                         transition={{ duration: 1 }}
//                     >
//                         <p className="text-white">Hello!</p>
//                     </motion.div>
//                 )}
//             </AnimatePresence>
//         </div>
//     )
// }

// export default ToggleBox
