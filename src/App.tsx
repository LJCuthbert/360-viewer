import {BrowserRouter as Router, Routes, Route} from 'react-router-dom'
import './App.css'
import LandingPage from './pages/LandingPage.tsx'
import ViewPage from './pages/ViewPage.tsx'

function App() {
    return (
        <div className="App">
            <Router>
                <Routes>
                    <Route
                        path="/"
                        element={<LandingPage />}
                    />
                    <Route
                        path="/view/:url"
                        element={<ViewPage />}
                    />
                </Routes>
            </Router>
        </div>
    )
}

export default App
