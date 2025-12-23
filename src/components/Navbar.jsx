import { useState } from 'react'
import { Link } from 'react-router-dom'

export default function Navbar() {
    const [isOpen, setIsOpen] = useState(false)

    return (
        <nav className="fixed w-full z-50 glass-nav transition-all duration-300">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <div className="flex items-center justify-between h-20">
                    <div className="flex-shrink-0">
                        <Link to="/" className="text-2xl font-bold tracking-tighter">
                            VISIBILITY<span className="text-accent">LABS</span>
                        </Link>
                    </div>
                    <div className="hidden md:block">
                        <div className="ml-10 flex items-baseline space-x-8">
                            <a href="/#home" className="hover:text-accent transition-colors px-3 py-2 rounded-md text-sm font-medium">Home</a>
                            <a href="/#services" className="hover:text-accent transition-colors px-3 py-2 rounded-md text-sm font-medium">Services</a>
                            <Link to="/service-guru" className="hover:text-accent transition-colors px-3 py-2 rounded-md text-sm font-medium">Service Guru</Link>
                            <a href="/#process" className="hover:text-accent transition-colors px-3 py-2 rounded-md text-sm font-medium">Process</a>
                            <a href="/#clients" className="hover:text-accent transition-colors px-3 py-2 rounded-md text-sm font-medium">Clients</a>
                            <a href="/#contact" className="bg-accent text-black hover:bg-white transition-colors px-4 py-2 rounded-full text-sm font-bold">Start Project</a>
                        </div>
                    </div>
                    <div className="-mr-2 flex md:hidden">
                        <button
                            onClick={() => setIsOpen(!isOpen)}
                            type="button"
                            className="inline-flex items-center justify-center p-2 rounded-md text-gray-400 hover:text-white hover:bg-gray-700 focus:outline-none"
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
                <div className="md:hidden glass border-t border-gray-800">
                    <div className="px-2 pt-2 pb-3 space-y-1 sm:px-3">
                        <a href="/#home" onClick={() => setIsOpen(false)} className="block px-3 py-2 rounded-md text-base font-medium hover:text-accent">Home</a>
                        <a href="/#services" onClick={() => setIsOpen(false)} className="block px-3 py-2 rounded-md text-base font-medium hover:text-accent">Services</a>
                        <Link to="/service-guru" onClick={() => setIsOpen(false)} className="block px-3 py-2 rounded-md text-base font-medium hover:text-accent">Service Guru</Link>
                        <a href="/#process" onClick={() => setIsOpen(false)} className="block px-3 py-2 rounded-md text-base font-medium hover:text-accent">Process</a>
                        <a href="/#clients" onClick={() => setIsOpen(false)} className="block px-3 py-2 rounded-md text-base font-medium hover:text-accent">Clients</a>
                        <a href="/#contact" onClick={() => setIsOpen(false)} className="block px-3 py-2 rounded-md text-base font-medium text-accent">Start Project</a>
                    </div>
                </div>
            )}
        </nav>
    )
}
