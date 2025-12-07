import { BrowserRouter, Routes, Route } from 'react-router-dom'
import { Canvas } from '@react-three/fiber'
import Experience from './components/Experience'
import Navbar from './components/Navbar'
import Footer from './components/Footer'
import Home from './pages/Home'
import PrivacyPolicy from './pages/PrivacyPolicy'

function App() {
    return (
        <div className="relative w-full h-screen overflow-hidden bg-dark text-white">
            {/* 3D Background */}
            <div className="absolute inset-0 z-0">
                <Canvas camera={{ position: [0, 0, 5], fov: 75 }}>
                    <Experience>
                        {/* HTML Overlay Content managed by ScrollControls */}
                        <main className="relative z-10 w-full">
                            <BrowserRouter>
                                <Navbar />
                                <Routes>
                                    <Route path="/" element={<Home />} />
                                    <Route path="/privacy" element={<PrivacyPolicy />} />
                                </Routes>
                                <Footer />
                            </BrowserRouter>
                        </main>
                    </Experience>
                </Canvas>
            </div>
        </div>
    )
}

export default App
