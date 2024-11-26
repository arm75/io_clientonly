import './index.css'
import ReactDOM from 'react-dom/client'
import App from './App.tsx'
import { Provider } from 'jotai'
import { StrictMode } from 'react'

ReactDOM.createRoot(document.getElementById('root') as HTMLElement).render(
    <Provider>
        <>
            <StrictMode>
                <App />
            </StrictMode>
        </>
    </Provider>
)
