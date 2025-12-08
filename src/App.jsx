import { BrowserRouter, Routes, Route } from 'react-router-dom'
import { useContext, useRef } from 'react'
import { Canvas } from '@react-three/fiber'
import Experience from './components/Experience'
import Navbar from './components/Navbar'
import Footer from './components/Footer'
import Home from './pages/Home'
import PrivacyPolicy from './pages/PrivacyPolicy'
import TermsOfService from './pages/TermsOfService'
import { ThemeProvider, ThemeContext } from './context/ThemeContext'

function AppContent() {
    const { isExploding, setExplosionState } = useContext(ThemeContext)
    const scrollRef = useRef(0)

    const handleScroll = (e) => {
        const { scrollTop, scrollHeight, clientHeight } = e.target
        const maxScroll = scrollHeight - clientHeight
        scrollRef.current = maxScroll > 0 ? scrollTop / maxScroll : 0
    }

    return (
        <div className={`main-container ${isExploding ? 'theme-white' : 'theme-dark'}`}>
            <Canvas
                camera={{ position: [0, 0, 5], fov: 45 }}
                style={{ position: 'fixed', top: 0, left: 0, width: '100%', height: '100%', zIndex: 0 }}
                gl={{ antialias: false, stencil: false, depth: true, alpha: true }}
            >
                <Experience setExplosionState={setExplosionState} scrollRef={scrollRef} />
            </Canvas>

            <div
                className="scroll-container"
                onScroll={handleScroll}
                style={{
                    position: 'relative',
                    zIndex: 10,
                    height: '100vh',
                    overflowY: 'auto',
                    overflowX: 'hidden'
                }}
            >
                <Routes>
                    <Route path="/" element={<Home />} />
                    <Route path="/privacy-policy" element={<PrivacyPolicy />} />
                    <Route path="/terms-of-service" element={<TermsOfService />} />
                </Routes>
                <Footer />
            </div>

            <Navbar />
        </div>
    )
}

export default function App() {
    return (
        <BrowserRouter>
            <ThemeProvider>
                <AppContent />
            </ThemeProvider>
        </BrowserRouter>
    )
}
