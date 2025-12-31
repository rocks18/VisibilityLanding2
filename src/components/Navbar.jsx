import { useState, useEffect } from 'react'
import { Link, useLocation } from 'react-router-dom'

export default function Navbar() {
    const [isOpen, setIsOpen] = useState(false)
    const location = useLocation()
    const isServiceGuru = location.pathname === '/service-guru'

    const handleScroll = (e, id) => {
        e.preventDefault()
        setIsOpen(false)

        const targetId = id.replace('#', '')
        const element = document.getElementById(targetId)

        // Case 1: Element exists on current page
        if (element) {
            window.scrollTo({
                top: element.offsetTop,
                behavior: 'smooth'
            })
            window.history.pushState(null, '', id)
            return
        }

        // Case 2: Navigate to page + hash
        if (id === '/service-guru') {
            window.location.href = '/service-guru'
            return
        }

        if (window.location.pathname !== '/') {
            window.location.href = `/${id}`
        }
    }

    const navClass = isServiceGuru
        ? "fixed w-full z-50 bg-white/80 backdrop-blur-md border-b border-gray-200 transition-all duration-300"
        : "fixed w-full z-50 glass-nav transition-all duration-300"

    const textClass = isServiceGuru ? "text-gray-900 hover:text-blue-600" : "text-white hover:text-accent"
    const logoClass = isServiceGuru ? "text-gray-900" : "text-white"
    const mobileMenuClass = isServiceGuru ? "md:hidden bg-white border-t border-gray-200" : "md:hidden glass border-t border-gray-800"

    return (
        <nav className={navClass}>
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <div className="flex items-center justify-between h-20">
                    <div className="flex-shrink-0">
                        <Link to="/" onClick={(e) => handleScroll(e, '#home')} className={`text-2xl font-bold tracking-tighter ${logoClass}`}>
                            VISIBILITY<span className={isServiceGuru ? "text-blue-600" : "text-accent"}>LABS</span>
                        </Link>
                    </div>
                    <div className="hidden md:block">
                        <div className="ml-10 flex items-baseline space-x-8">
                            <a href="/#home" onClick={(e) => handleScroll(e, '#home')} className={`${textClass} transition-colors px-3 py-2 rounded-md text-sm font-medium`}>Home</a>
                            <a href="/#services" onClick={(e) => handleScroll(e, '#services')} className={`${textClass} transition-colors px-3 py-2 rounded-md text-sm font-medium`}>Services</a>
                            <Link to="/service-guru" className={`${textClass} transition-colors px-3 py-2 rounded-md text-sm font-medium`}>Service Guru</Link>
                            <a href="/#process" onClick={(e) => handleScroll(e, '#process')} className={`${textClass} transition-colors px-3 py-2 rounded-md text-sm font-medium`}>Process</a>
                            <a href="/#clients" onClick={(e) => handleScroll(e, '#clients')} className={`${textClass} transition-colors px-3 py-2 rounded-md text-sm font-medium`}>Clients</a>
                            <a href="#contact" onClick={(e) => handleScroll(e, '#contact')} className={`bg-accent text-black hover:bg-white transition-colors px-4 py-2 rounded-full text-sm font-bold cursor-pointer ${isServiceGuru ? 'bg-blue-600 text-white hover:bg-blue-700' : ''}`}>Start Project</a>
                        </div>
                    </div>
                    <div className="-mr-2 flex md:hidden">
                        <button
                            onClick={() => setIsOpen(!isOpen)}
                            type="button"
                            className={`inline-flex items-center justify-center p-2 rounded-md focus:outline-none ${isServiceGuru ? 'text-gray-600 hover:text-gray-900 hover:bg-gray-100' : 'text-gray-400 hover:text-white hover:bg-gray-700'}`}
                        >
                            <svg className="h-6 w-6" stroke="currentColor" fill="none" viewBox="0 0 24 24">
                                {isOpen ? (
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12" />
                                ) : (
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 6h16M4 12h16M4 18h16" />
                                )}
                            </svg>
                        </button>
                    </div>
                </div>
            </div>

            {/* Mobile Menu */}
            {isOpen && (
                <div className={mobileMenuClass}>
                    <div className="px-2 pt-2 pb-3 space-y-1 sm:px-3">
                        <a href="/#home" onClick={(e) => handleScroll(e, '#home')} className={`block px-3 py-2 rounded-md text-base font-medium ${textClass}`}>Home</a>
                        <a href="/#services" onClick={(e) => handleScroll(e, '#services')} className={`block px-3 py-2 rounded-md text-base font-medium ${textClass}`}>Services</a>
                        <Link to="/service-guru" onClick={() => setIsOpen(false)} className={`block px-3 py-2 rounded-md text-base font-medium ${textClass}`}>Service Guru</Link>
                        <a href="/#process" onClick={(e) => handleScroll(e, '#process')} className={`block px-3 py-2 rounded-md text-base font-medium ${textClass}`}>Process</a>
                        <a href="/#clients" onClick={(e) => handleScroll(e, '#clients')} className={`block px-3 py-2 rounded-md text-base font-medium ${textClass}`}>Clients</a>
                        <a href="#contact" onClick={(e) => handleScroll(e, '#contact')} className={`block px-3 py-2 rounded-md text-base font-medium ${isServiceGuru ? 'text-blue-600' : 'text-accent'}`}>Start Project</a>
                    </div>
                </div>
            )}
        </nav>
    )
}
