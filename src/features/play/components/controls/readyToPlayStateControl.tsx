// import { useEffect, useState } from 'react'
// import { useAtom } from 'jotai'
// import { Progress } from '../../../../app/components/shadcn/ui/progress'
// import { showAdminGameControlsAtom } from '../../state/atoms/oldAtoms'

// export default function ReadyToPlayStateControl({ letters }: any): JSX.Element {
//     console.log('<ReadyToPlayStateControl /> rendered...')

//     const [barVal, setBarVal] = useState(0)

//     useEffect(() => {
//         console.log('useEffect ran.')

//         const intervalId = setInterval(() => {
//             setBarVal((prevBarVal) => {
//                 const newVal = prevBarVal + 5

//                 return newVal >= 100 ? 100 : newVal // Cap the value at 100
//             })
//         }, 20) // Update the progress bar every 500 milliseconds

//         return () => clearInterval(intervalId)
//     }, [])

//     const [showAdminGameControls, setShowAdminGameControls] = useAtom(showAdminGameControlsAtom)

//     return (
//         <div className="mb-4 p-2 bg-gray-950 rounded-md">
//             <div className="flex p-2 justify-center items-center select-none bg-gray-950 rounded-md">
//                 <div className="px-4">
//                     <h1 className="text-red-600">READY TO PLAY CONTROL</h1>
//                     <Progress value={barVal} />
//                     {/* <Progress.Root
// 						className="relative overflow-hidden bg-blackA6 rounded-full w-[300px] h-[25px]"
// 						style={{
// 							// Fix overflow clipping in Safari
// 							// https://gist.github.com/domske/b66047671c780a238b51c51ffde8d3a0
// 							transform: "translateZ(0)",
// 						}}
// 						value={progress}
// 					>
// 						<Progress.Indicator
// 							className="bg-white w-full h-full transition-transform duration-[660ms] ease-[cubic-bezier(0.65, 0, 0.35, 1)]"
// 							style={{ transform: `translateX(-${100 - progress}%)` }}
// 						/>
// 					</Progress.Root> */}
//                     {/* <Button
// 						size={"lg"}
// 						className="h-[60px] w-96 bg-emerald-600 hover:bg-emerald-700 active:bg-sky-600"
// 						onClick={() => shuffleArray(sortedLetters)}
// 					>
// 						MAKE PLAY
// 					</Button> */}
//                 </div>
//                 <div className="px-4">
//                     {/* <Button
// 						size={"lg"}
// 						className="h-[60px] w-96 bg-gray-600 hover:bg-gray-700 active:bg-sky-600"
// 						onClick={() => shuffleArray(sortedLetters)}
// 					>
// 						PASS TURN
// 					</Button> */}
//                 </div>
//             </div>
//             <div className="flex p-4 pb-0 justify-end">
//                 {showAdminGameControls ? <h1 className="text-red-600">&lt;ReadyToPlayStateControl /&gt;</h1> : null}
//             </div>
//         </div>
//     )
// }
