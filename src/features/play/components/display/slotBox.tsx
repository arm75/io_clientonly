// import React, { useEffect, useState } from 'react'

// const SlotBox = () => {
//     const [number, setNumber] = useState(0)

//     useEffect(() => {
//         const intervalId = setInterval(() => {
//             setNumber(Math.floor(Math.random() * 10)) // Generates a random number between 0-9
//         }, 100) // Change the number every 100 milliseconds

//         return () => clearInterval(intervalId) // Cleanup the interval on component unmount
//     }, [])

//     return (
//         <div className="flex items-center justify-center py-12">
//             <div className="w-12 h-12 bg-black border-4 border-purple-500 rounded-lg flex items-center justify-center text-white text-5xl">{number}</div>
//         </div>
//     )
// }

// export default SlotBox
