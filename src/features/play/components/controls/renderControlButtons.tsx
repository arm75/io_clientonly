// import { useEffect } from 'react'
// import { Button } from '../../../../app/components/shadcn/ui/button'
// import { useAtom } from 'jotai'
// import { sortedLettersAtom } from '../../state/atoms/oldAtoms'
// import { SortableTile } from '../../types/ui/sortableTile'

// // interface ItemType {
// // 	id: number
// // 	name: string
// // }

// const RENDER_LOG = import.meta.env.VITE_APP_RENDER_LOG

// export default function RenderControlButtons({ letters }: any): JSX.Element {
//     if (RENDER_LOG === 'true') console.log('<RenderPlayerLetters> rendered...')

//     const [sortedLetters, setSortedLetters] = useAtom(sortedLettersAtom)

//     useEffect(() => {
//         function transformLetters(letters: [string]) {
//             const sortableLetters: any = []
//             letters.forEach((letter: string, count: number) => {
//                 sortableLetters.push({ id: count, name: letter })
//             })
//             return sortableLetters
//         }

//         if (letters) {
//             const transformedLetters = transformLetters(letters)
//             setSortedLetters(transformedLetters)
//         }
//     }, [letters, setSortedLetters])

//     const shuffleArray = (array: SortableTile[]) => {
//         const shuffledArray = [...array]
//         for (let i = shuffledArray.length - 1; i > 0; i--) {
//             const j = Math.floor(Math.random() * (i + 1))
//             ;[shuffledArray[i], shuffledArray[j]] = [shuffledArray[j], shuffledArray[i]]
//         }
//         setSortedLetters(shuffledArray)
//     }

//     return (
//         <div className="mb-4 p-2 bg-gray-950 rounded-md">
//             <div className="flex p-2 justify-center items-center select-none bg-gray-950 rounded-md">
//                 <div className="px-4">
//                     <Button
//                         size={'lg'}
//                         className="h-[60px] w-96 bg-emerald-600 hover:bg-emerald-700 active:bg-sky-600"
//                         onClick={() => shuffleArray(sortedLetters)}
//                     >
//                         MAKE PLAY
//                     </Button>
//                 </div>
//                 <div className="px-4">
//                     <Button size={'lg'} className="h-[60px] w-96 bg-gray-600 hover:bg-gray-700 active:bg-sky-600" onClick={() => shuffleArray(sortedLetters)}>
//                         PASS TURN
//                     </Button>
//                 </div>
//             </div>
//         </div>
//     )
// }
