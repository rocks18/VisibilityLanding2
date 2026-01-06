import { BrowserRouter, Routes, Route } from 'react-router-dom'
import { useEffect, useRef } from 'react'
import { logVisit } from './services/analytics'
import { Canvas } from '@react-three/fiber'
import Experience from './components/Experience'
import Navbar from './components/Navbar'
import Footer from './components/Footer'
import ScrollToTop from './components/ScrollToTop'
import Home from './pages/Home'
import ServiceGuruPage from './pages/ServiceGuruPage'
import PrivacyPolicy from './pages/PrivacyPolicy'
import TermsOfService from './pages/TermsOfService'

function App() {
    const hasLogged = useRef(false)

    useEffect(() => {
        if (!hasLogged.current) {
            logVisit()
            hasLogged.current = true
        }
    }, [])

    return (
        <BrowserRouter>
            <ScrollToTop />
            <div className="relative w-full min-h-screen bg-dark text-white">
                <Navbar />

                {/* 3D Background - Fixed */}
                <div className="fixed inset-0 z-0 pointer-events-none">
                    <Canvas camera={{ position: [0, 0, 5], fov: 75 }}>
                        <Experience />
                    </Canvas>
                </div>

                {/* Main Content - Scrollable */}
                <main className="relative z-10 w-full">
                    <Routes>
                        <Route path="/" element={<Home />} />
                        <Route path="/service-guru" element={<ServiceGuruPage />} />
                        <Route path="/privacy" element={<PrivacyPolicy />} />
                        <Route path="/terms" element={<TermsOfService />} />
                    </Routes>
                    <Footer />
                </main>
            </div>
        </BrowserRouter>
    )
}

export default App
