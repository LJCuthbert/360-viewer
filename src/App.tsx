import {BrowserRouter as Router, Routes, Route} from 'react-router-dom';
import './App.css'
import LandingPage from "./pages/LandingPage.tsx";
import DynamicPage from "./pages/DynamicPage.tsx";

function App() {

  return (
    <>
        <Router>
            <div>
                <Routes>
                    <Route path="/" element={<LandingPage/>}/>
                    <Route path="/viewer/:url" element={<DynamicPage/>}/>
                </Routes>
            </div>
        </Router>
    </>
  )
}

export default App
