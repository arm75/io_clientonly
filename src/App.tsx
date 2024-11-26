import { BrowserRouter as Router, Route, Routes, Navigate } from 'react-router-dom'
import PageNotFound from './app/pages/notFoundPage'
import PlayPage from './features/play/playPage'

const RENDER_LOG = import.meta.env.VITE_APP_RENDER_LOG

export default function App() {
    if (RENDER_LOG === 'true') console.log('<App> rendered...')

    return (
        <Router>
            <Routes>
                <Route path="/" element={<PlayPage />} />

                <Route path="/404" element={<PageNotFound />} />
                <Route path="*" element={<Navigate to="/404" />} />
            </Routes>
        </Router>
    )
}
