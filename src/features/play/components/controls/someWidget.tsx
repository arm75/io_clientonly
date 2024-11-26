import { useState, useEffect } from 'react'
import axios from 'axios'

export default function WordWidget(props: { word?: string }) {
    const { word } = props

    const [status, setStatus] = useState(null)

    useEffect(() => {
        const fetchData = async () => {
            try {
                const response = await axios.get(`http://localhost:3000/is-word/${word}`)
                console.log(response.data)
                setStatus(response.data.isWord) // Assuming the API returns true or false
            } catch (error) {
                console.error('Error fetching data:', error)
            }
        }
        fetchData()
    }, [word]) // Fetch data whenever the word changes

    const getColor = () => {
        if (status === null) {
            return 'bg-slate-500 hover:bg-slate-300' // Initial color
        } else if (status === true) {
            return 'bg-emerald-600 hover:bg-emerald-400' // Word is valid
        } else {
            return 'bg-red-600 hover:bg-red-400' // Word is invalid
        }
    }

    return (
        <div
            className={`text-xs mb-1 text-white text-center px-4 rounded-md ${getColor()}`}
            // style={{ transition: "background-color 0.25s" }}
        >
            {word}
        </div>
    )
}
