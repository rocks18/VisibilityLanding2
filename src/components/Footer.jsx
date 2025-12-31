import { Link, useLocation } from 'react-router-dom'

export default function Footer() {
    const location = useLocation()
    const isServiceGuru = location.pathname === '/service-guru'

    const footerClass = isServiceGuru
        ? "bg-white py-12 border-t border-gray-200 relative z-10"
        : "bg-black py-12 border-t border-gray-800 relative z-10"

    const textClass = isServiceGuru ? "text-gray-600 hover:text-blue-600" : "text-gray-400 hover:text-white"
    const logoClass = isServiceGuru ? "text-gray-900" : "text-white"

    return (
        <footer className={footerClass}>
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <div className="flex flex-col md:flex-row justify-between items-center">
                    <div className="mb-6 md:mb-0">
                        <span className={`text-2xl font-bold tracking-tighter ${logoClass}`}>
                            VISIBILITY<span className={isServiceGuru ? "text-blue-600" : "text-accent"}>LABS</span>
                        </span>
                        <p className={`${isServiceGuru ? 'text-gray-500' : 'text-gray-500'} text-sm mt-2`}>© 2025 Visibility Labs. All rights reserved.</p>
                    </div>
                    <div className="flex space-x-6">
                        <Link to="/privacy" className={`${textClass} transition-colors`}>Privacy Policy</Link>
                        <Link to="/terms" className={`${textClass} transition-colors`}>Terms of Service</Link>
                        <a href="#" className={`${textClass} transition-colors`}>Twitter</a>
                        <a href="#" className={`${textClass} transition-colors`}>LinkedIn</a>
                    </div>
                </div>
            </div>
        </footer>
    )
}
