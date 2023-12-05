import {BrowserRouter as Router, Routes, Route} from 'react-router-dom'
import './App.css'
import LandingPage from './pages/LandingPage.tsx'
import ViewPage from './pages/ViewPage.tsx'

function App() {
    return (
        <>
            <Router>
                <Routes>
                    <Route
                        path="/"
                        element={<LandingPage />}
                    />
                    <Route
                        path="/viewer/:url"
                        element={<ViewPage />}
                    />
                </Routes>
            </Router>
        </>
    )
}

export default App
