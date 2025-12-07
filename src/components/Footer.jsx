import { Link } from 'react-router-dom'

export default function Footer() {
    return (
        <footer className="bg-black py-12 border-t border-gray-800 relative z-10">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <div className="flex flex-col md:flex-row justify-between items-center">
                    <div className="mb-6 md:mb-0">
                        <span className="text-2xl font-bold tracking-tighter">VISIBILITY<span className="text-accent">LABS</span></span>
                        <p className="text-gray-500 text-sm mt-2">© 2025 Visibility Labs. All rights reserved.</p>
                    </div>
                    <div className="flex space-x-6">
                        <Link to="/privacy" className="text-gray-400 hover:text-white transition-colors">Privacy Policy</Link>
                        <Link to="/terms" className="text-gray-400 hover:text-white transition-colors">Terms of Service</Link>
                        <a href="#" className="text-gray-400 hover:text-white transition-colors">Twitter</a>
                        <a href="#" className="text-gray-400 hover:text-white transition-colors">LinkedIn</a>
                    </div>
                </div>
            </div>
        </footer>
    )
}
