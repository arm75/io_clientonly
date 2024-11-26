import { BrowserRouter as Router, Route, Routes, Navigate } from 'react-router-dom'
import LoginPage from './app/pages/loginPage'
import PageNotFound from './app/pages/notFoundPage'
import PlayPage from './features/play/playPage'

const RENDER_LOG = import.meta.env.VITE_APP_RENDER_LOG

export default function App() {
    if (RENDER_LOG === 'true') console.log('<App> rendered...')

    return (
        <Router>
            <Routes>
                <Route
                    path="/"
                    element={
                        // <AuthGuard>
                        <PlayPage />
                        // </AuthGuard>
                    }
                />
                {/* <Route path="/game">
                    <Route
                        path="play"
                        element={
                            <AuthGuard>
                                <PlayPage />
                            </AuthGuard>
                        }
                    />
                </Route>
                <Route
                    path="/admin/users"
                    element={
                        <AuthGuard>
                            <UsersPage />
                        </AuthGuard>
                    }
                /> */}
                {/* <Route path="/poo" element={<TestComp />} /> */}
                <Route path="/login" element={<LoginPage />} />
                <Route path="/404" element={<PageNotFound />} />
                <Route path="*" element={<Navigate to="/404" />} />
            </Routes>
        </Router>
    )
}
